import React from 'react'
import { Table, TableContainer, TableRow, TableBody, TableHead, TableCell, Paper } from '@mui/material'

const UsersList = () => {
    return (
        <>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Email</TableCell>
                            <TableCell align="right">Name</TableCell>
                            <TableCell align="right">Date of Creation</TableCell>
                            <TableCell align="right">Phone</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {/* {rows.map((row) => (
                            <TableRow
                                key={row.name}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {row.name}
                                </TableCell>
                                <TableCell align="right">{row.calories}</TableCell>
                                <TableCell align="right">{row.fat}</TableCell>
                                <TableCell align="right">{row.carbs}</TableCell>
                                <TableCell align="right">{row.protein}</TableCell>
                            </TableRow>
                        ))} */}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}

export default UsersList