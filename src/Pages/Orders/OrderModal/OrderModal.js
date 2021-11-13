import React, { useState } from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import useAuth from './../../../Hooks/useAuth';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const OrderModal = ({ handleClose, open, details }) => {

    const { user } = useAuth()
    const { name } = details;
    const initialInfo = { productName: name, userName: user.displayName, email: user.email, address: '', phone: '' }
    const [bookingInfo, setBookingInfo] = useState(initialInfo)


    const handleOnBlur = e => {
        const field = e.target.name;
        const value = e.target.value;
        const newInfo = { ...bookingInfo };
        newInfo[field] = value;
        setBookingInfo(newInfo);
    }

    const handleSubmit = e => {

        const makeOrder = {
            ...bookingInfo,
            productName: name
        }
        console.log(makeOrder)

        fetch('https://aqueous-reef-70969.herokuapp.com/orders', {
            method: "POST",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(makeOrder)
        })
            .then(res => res.json())
            .then(data => {
                if (data.insertedId) {
                    alert('your order is successfully added')
                    handleClose();
                }
            })
        e.preventDefault();
    }

    return (
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={open}
            onClose={handleClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
        >
            <Fade in={open}>
                <Box sx={style}>
                    <Typography sx={{ mt: 2, fontWeight: 'bolder' }} id="transition-modal-title" variant="h4" component="h2">
                        {name}
                    </Typography>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            sx={{ widh: '90 %', margin: 1 }}
                            id="outlined-size-small"
                            onBlur={handleOnBlur}
                            defaultValue={name}
                            size="small"
                        />
                        <TextField
                            sx={{ widh: '90 %', margin: 1 }}
                            id="outlined-size-small"
                            name='userName'
                            onBlur={handleOnBlur}
                            defaultValue={user.displayName}
                            size="small"
                        />
                        <TextField
                            sx={{ widh: '90 %', margin: 1 }}
                            id="outlined-size-small"
                            name='email'
                            onBlur={handleOnBlur}
                            defaultValue={user.email}
                            size="small"
                        />
                        <TextField
                            sx={{ widh: '90 %', margin: 1 }}
                            id="outlined-size-small"
                            name='address'
                            onBlur={handleOnBlur}
                            defaultValue='address'
                            size="small"
                        />
                        <TextField
                            sx={{ widh: '90 %', margin: 1 }}
                            id="outlined-size-small"
                            name='phone'
                            onBlur={handleOnBlur}
                            defaultValue='Phone-Number'
                            size="small"
                        />

                        <br />
                        <Button type='submit' variant="contained">Submit</Button>
                    </form>
                </Box>
            </Fade>
        </Modal>
    );
};

export default OrderModal;