// import logo from './logo.svg';
import './App.css';
import Lexer from './Lexer';
import TokensTable from './TokensTable';
import { useState } from 'react';

function App() {
	let [elements, setElements] = useState([]);

	const translate = () => {
		const text = document.querySelector('#editor').value;
		const result = document.querySelector('#result');
		const lexer = new Lexer();

		if (text.length > 0) {
			setElements(lexer.getElements(text));
			// let test = '';
			// elements.forEach((element) => {
			// 	test += `${element.type.padEnd(5, ' ')}${element.token}:\n\t->\t${
			// 		element.lexeme
			// 	}\n`;
			// });
			// result.value = test;
		}
	};

	return (
		<div className="bg-slate-100 h-screen">
			<h1 className="bg-slate-700 p-5 font-bold text-3xl text-center text-white">
				Traductor
			</h1>
			<div className="container mx-auto bg-slate-100 py-20 grid grid-cols-7 gap-x-10">
				<div className="editor flex flex-col items-center col-span-3">
					<h2 className="text-3xl font-bold bg-slate-900 text-white w-full text-center">
						Editor
					</h2>
					<textarea
						id="editor"
						name="editor"
						cols="60"
						rows="20"
						autoFocus={true}
						className="px-3 py-5 bg-slate-50 border-2 border-t-0 border-slate-700 resize-none text-sm outline-0 w-full font-bold"
					></textarea>
				</div>
				<div className="flex flex-col justify-center">
					<div
						className="bg-blue-500 text-white font-bold p-1 lg:p-4 rounded-md text-center hover:bg-blue-600 hover:cursor-pointer"
						onClick={translate}
					>
						<p className="text-xl hidden lg:inline-block">Traducir</p>
						<img
							src={process.env.PUBLIC_URL + '/img/arrow.png'}
							alt="Arrow"
							className="lg:hidden"
						/>
					</div>
				</div>
				<div className="result flex flex-col items-center col-span-3">
					<h2 className="text-3xl font-bold bg-slate-900 text-white w-full text-center">
						Resultado
					</h2>
					<textarea
						id="result"
						name="editor"
						rows="20"
						autoFocus={true}
						className="px-3 py-5 bg-slate-50 border-2 border-t-0 border-slate-700 resize-none text-sm outline-0 w-full font-bold"
						readOnly={true}
					></textarea>
				</div>
			</div>
			<TokensTable elements={elements} />
		</div>
	);
}

export default App;
