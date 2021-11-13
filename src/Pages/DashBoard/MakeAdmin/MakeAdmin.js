import React, { useState } from 'react';
import { Button, TextField, Alert } from '@mui/material';
import useAuth from '../../../Hooks/useAuth';

const MakeAdmin = () => {
    const [email, setEmail] = useState('');
    const [success, setSuccess] = useState(false);
    const { token } = useAuth();


    const handleOnBlur = event => {
        setEmail(event.target.value);
        event.preventDefault();
    }

    const handleSubmit = e => {
        const user = { email }
        fetch('https://aqueous-reef-70969.herokuapp.com/users/admin', {
            method: "PUT",
            headers: {
                'authorization': `Bearer ${token}`,
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount) {
                    setSuccess(true);
                    console.log(data);
                }
            })

        e.preventDefault();
    }
    return (
        <div>
            make me a admin
            <form onSubmit={handleSubmit}>
                <TextField
                    sx={{ width: '30%' }}
                    label="Email"
                    type="email"
                    onBlur={handleOnBlur}
                    variant="standard" />
                <br />
                <Button type="submit" variant="contained" sx={{ marginTop: 5 }}>Make Admin</Button>
            </form>
            {
                success && <Alert severity="success">Made Admin Successfully!</Alert>
            }
        </div>
    );
};

export default MakeAdmin;