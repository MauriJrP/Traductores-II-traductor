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
		label: 'Tipo',
		minWidth: 170,
		align: 'right',
	},
];

// function createData(name, code, population, size) {
// 	const density = population / size;
// 	let obj = { name, code, population, size, density };
// 	console.log(obj);
// 	return obj;
// }

// const rows = [
// 	createData('India', 'IN', 1324171354, 3287263),
// 	createData('China', 'CN', 1403500365, 9596961),
// 	createData('Italy', 'IT', 60483973, 301340),
// 	createData('United States', 'US', 327167434, 9833520),
// 	createData('Canada', 'CA', 37602103, 9984670),
// 	createData('Australia', 'AU', 25475400, 7692024),
// 	createData('Germany', 'DE', 83019200, 357578),
// 	createData('Ireland', 'IE', 4857000, 70273),
// 	createData('Mexico', 'MX', 126577691, 1972550),
// 	createData('Japan', 'JP', 126317000, 377973),
// 	createData('France', 'FR', 67022000, 640679),
// 	createData('United Kingdom', 'GB', 67545757, 242495),
// 	createData('Russia', 'RU', 146793744, 17098246),
// 	createData('Nigeria', 'NG', 200962417, 923768),
// 	createData('Brazil', 'BR', 210147125, 8515767),
// ];

export default function TokensTable({ elements }) {
	console.log(elements);
	return (
		<Paper
			sx={{ width: '40%', overflow: 'hidden', margin: 'auto' }}
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
			{/* <TablePagination
				rowsPerPageOptions={[10, 25, 100]}
				component="div"
				count={rows.length}
				rowsPerPage={rowsPerPage}
				page={page}
				onPageChange={handleChangePage}
				onRowsPerPageChange={handleChangeRowsPerPage}
			/> */}
		</Paper>
	);
}
