import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import useAuth from './../../../Hooks/useAuth';
import Button from '@mui/material/Button';

const MyOrders = () => {
    const { user } = useAuth();

    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const url = `https://aqueous-reef-70969.herokuapp.com/orders?email=${user.email}`;
        fetch(url)
            .then(res => res.json())
            .then(data => {
                setOrders(data)
            })
    }, [user.email])

    //Delete Order
    const handleDelete = id => {
        const proceed = window.confirm('Do yant to delete this order?')
        if (proceed) {
            const url = `https://aqueous-reef-70969.herokuapp.com/orders/${id}`;
            fetch(url, {
                method: 'DELETE'
            })
                .then(res => res.json())
                .then(data => {
                    if (data.deletedCount) {
                        const remaining = orders.filter(order => order._id !== id);
                        alert('This is order is successfully deleted');
                        setOrders(remaining);
                    }

                })
        }
    }
    return (
        <div>
            <h1>Your Order</h1>
            <TableContainer component={Paper}>
                <Table aria-label="Appointments Table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell align="center">Product Name</TableCell>
                            <TableCell align="center">Make Decession</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {orders.map((order) => (
                            <TableRow
                                key={order._id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {user.displayName}
                                </TableCell>
                                <TableCell align="center">{order.productName}</TableCell>
                                <TableCell align="center"><Button onClick={() => handleDelete(order._id)} variant="contained">Delete Order</Button></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

        </div>
    );
};

export default MyOrders;