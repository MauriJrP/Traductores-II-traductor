class Lexer {
	constructor() {
		this.operators = new Set([
			'=',
			'+',
			'-',
			'*',
			'/',
			'<',
			'>',
			'!',
			'<=',
			'>=',
			'==',
			'!=',
			'&&',
			'||',
		]);
		this.symbols = new Set([';', ',', '(', ')', '{', '}', '$']);
	}

	getElements = (text) => {
		// [{ token: 'test1', lexeme: 'test1' }];
		let tokenComplete = false;
		let stringStack = [];
		let elements = [];
		let state = 'nextToken';
		let lexeme = '';
		let token = '';
		let type = '';

		// -------- ------- ------ ----- Lexer ----- ------ ------- --------
		let i = 0;
		while (i <= text.length) {
			if (this.isTokenComplete(text[i], i, text.length, state, tokenComplete)) {
				tokenComplete = false;
				token = this.getToken(state, lexeme);
				type = this.getType(token);
				if (lexeme !== '')
					elements.push({ token: token, lexeme: lexeme, type: type });
				lexeme = '';
				state = 'nextToken';
				if (text.length === i) ++i; // Avoid infinite loop
			}

			if (state === 'nextToken') {
				// skip whitespace
				if (text[i] === ' ' || text[i] === '\n' || text[i] === '\t') ++i;
				else if (this.isLetter(text[i]) || text[i] === '_')
					state = 'identifier';
				else if (this.isNumber(text[i])) state = 'number';
				else if (this.isOperator(text[i], text[i + 1])) state = 'operator';
				else if (this.isSymbol(text[i])) state = 'symbol';
				else if (text[i] === '"') {
					state = 'string';
				} else state = 'error';
			} else if (state === 'identifier') {
				if (this.isLetter(text[i]) || text[i] === '_' || this.isNumber(text[i]))
					lexeme += text[i++];
				else if (this.isOperator(text[i], text[i + 1])) tokenComplete = true;
				else if (text[i] !== '$' && this.isSymbol(text[i]))
					tokenComplete = true;
				else {
					lexeme += text[i++];
					state = 'error';
				}
			} else if (state === 'string') {
				if (
					(stringStack.length === 0 && text[i] === '"') ||
					(stringStack.length > 0 && text[i] !== '"')
				) {
					if (text[i] === '"') stringStack.push(text[i]);
					lexeme += text[i++];
				} else {
					lexeme += text[i++];
					tokenComplete = true;
					stringStack = [];
				}
			} else if (state === 'number') {
				if (this.isNumber(text[i])) lexeme += text[i++];
				else if (text[i] === '.') {
					lexeme += text[i++];
					state = 'float';
				} else if (this.isOperator(text[i], text[i + 1])) tokenComplete = true;
				else if (text[i] !== '$' && this.isSymbol(text[i]))
					tokenComplete = true;
				else {
					lexeme += text[i++];
					state = 'error';
				}
			} else if (state === 'float') {
				if (this.isNumber(text[i])) lexeme += text[i++];
				else if (this.isOperator(text[i], text[i + 1])) tokenComplete = true;
				else if (text[i] !== '$' && this.isSymbol(text[i]))
					tokenComplete = true;
				else {
					lexeme += text[i++];
					state = 'error';
				}
			} else if (state === 'operator') {
				let isTwoChar = this.isTwoCharOperator(text[i], text[i + 1]);

				if (isTwoChar) lexeme += text[i++] + text[i++];
				else lexeme += text[i++];
				tokenComplete = true;
			} else if (state === 'symbol') {
				lexeme += text[i++];
				tokenComplete = true;
			} else {
				console.log('error');
				++i;
			}
		}

		// console.log(elements);
		return elements;
	};

	getToken = (state, lexeme) => {
		if (state === 'identifier') {
			if (lexeme === 'if') return 'if';
			else if (lexeme === 'else') return 'else';
			else if (lexeme === 'while') return 'while';
			else if (lexeme === 'return') return 'return';
			else if (lexeme === 'int') return 'Tipo de dato';
			else if (lexeme === 'float') return 'Tipo de dato';
			else if (lexeme === 'void') return 'Tipo de dato';
			else return 'id';
		} else if (state === 'string') return 'cadena';
		else if (state === 'number') return 'constante';
		else if (state === 'float') return 'constante';
		else if (state === 'operator') {
			if (
				lexeme === '<=' ||
				lexeme === '>=' ||
				lexeme === '<' ||
				lexeme === '>'
			)
				return 'opRelacional';
			else if (lexeme === '==' || lexeme === '!=') return 'opRelacional';
			else if (lexeme === '||') return 'opLogico';
			else if (lexeme === '&&') return 'opLogico';
			else if (lexeme === '!') return 'opLogico';
			else if (lexeme === '+' || lexeme === '-') return 'opSuma';
			else if (lexeme === '*' || lexeme === '/') return 'opMultiplicacion';
			else if (lexeme === '=') return '=';
			else return 'operador';
		} else if (state === 'symbol') {
			if (lexeme === ';') return ';';
			else if (lexeme === ',') return ',';
			else if (lexeme === '(') return '(';
			else if (lexeme === ')') return ')';
			else if (lexeme === '{') return '{';
			else if (lexeme === '}') return '}';
			else if (lexeme === '$') return '$';
			else return 'simbolo';
		} else if (state === 'error') return 'error';
	};

	getType = (token) => {
		if (token === 'Tipo de dato') return '0';
		else if (token === 'id') return '1';
		else if (token === ';') return '2';
		else if (token === ',') return '3';
		else if (token === '(') return '4';
		else if (token === ')') return '5';
		else if (token === '{') return '6';
		else if (token === '}') return '7';
		else if (token === '=') return '8';
		else if (token === 'if') return '9';
		else if (token === 'while') return '10';
		else if (token === 'return') return '11';
		else if (token === 'else') return '12';
		else if (token === 'constante') return '13';
		else if (token === 'opSuma') return '14';
		else if (token === 'opLogico') return '15';
		else if (token === 'opMultiplicacion') return '16';
		else if (token === 'opRelacional') return '17';
		else if (token === '$') return '18';
		else if (token === 'error') return '-1';
	};

	isTokenComplete = (c, i, l, state, tc) => {
		if (state === 'string' && !tc) return false;
		if (c === ' ' || c === '\n' || c === '\t' || i === l || tc) return true;
		else return false;
	};
	isLetter = (char) => /[a-zA-Z]/.test(char);
	isNumber = (char) => /[0-9]/.test(char);
	isOperator = (char, char2) =>
		this.operators.has(char) || this.operators.has(char + char2);
	isTwoCharOperator = (char, char2) => this.operators.has(char + char2);
	isSymbol = (char) => this.symbols.has(char);
}

export default Lexer;
