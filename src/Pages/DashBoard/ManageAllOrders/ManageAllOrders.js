import React, { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';

const ManageAllOrders = () => {


    const [allOrders, setAllOrders] = useState([]);

    useEffect(() => {
        fetch('https://aqueous-reef-70969.herokuapp.com/orders')
            .then(res => res.json())
            .then(data => {
                setAllOrders(data)
                console.log(setAllOrders)
            })
    }, [])

    return (
        <div>
            <h1>All Orders List</h1>
            <TableContainer component={Paper}>
                <Table aria-label="Appointments Table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell align="center">Product Name</TableCell>
                            <TableCell align="center">Take Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {allOrders.map((order) => (
                            <TableRow
                                key={order._id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {order.userName}
                                </TableCell>
                                <TableCell align="center">{order.productName}</TableCell>
                                <TableCell align="center"><Button variant="contained">Proced To Shiping</Button></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default ManageAllOrders;