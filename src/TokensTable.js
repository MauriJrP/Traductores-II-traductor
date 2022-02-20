import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

const columns = [
	{ id: 'lexeme', label: 'Lexema', minWidth: 170 },
	{ id: 'token', label: 'Token', minWidth: 100 },
	{
		id: 'type',
		label: 'Numero',
		minWidth: 170,
		align: 'right',
	},
];

export default function TokensTable({ elements }) {
	console.log(elements);
	return (
		<Paper
			sx={{ width: '45%', overflow: 'hidden', margin: 'auto' }}
			elevation={24}
		>
			<TableContainer sx={{ maxHeight: 300 }}>
				<Table stickyHeader aria-label="sticky table">
					<TableHead>
						<TableRow>
							{columns.map((column) => (
								<TableCell
									key={column.id}
									align={column.align}
									style={{ minWidth: column.minWidth, fontWeight: 'bold' }}
								>
									{column.label}
								</TableCell>
							))}
						</TableRow>
					</TableHead>
					<TableBody>
						{elements.map((element) => {
							console.log(element);
							return (
								<TableRow
									hover
									role="checkbox"
									tabIndex={-1}
									key={element.type}
								>
									{columns.map((column) => {
										console.log(column);
										const value = element[column.id];
										return (
											<TableCell
												key={column.id}
												align={column.align}
												sx={{ maxWidth: 15, width: '70%', overflow: 'auto' }}
											>
												{value}
											</TableCell>
										);
									})}
								</TableRow>
							);
						})}
					</TableBody>
				</Table>
			</TableContainer>
		</Paper>
	);
}
