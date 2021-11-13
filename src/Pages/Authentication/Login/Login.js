import React from 'react';
import Grid from '@mui/material/Grid';
import { Container } from '@mui/material';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
import { useState } from 'react';
import { NavLink, useLocation, useHistory } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import useAuth from './../../../Hooks/useAuth';

const Login = () => {

    const { user, error, loginWithGoogl, handleOldLogin, isLoading } = useAuth();

    const [logninData, setLoginData] = useState({})

    const location = useLocation();
    const history = useHistory();

    const handleLogin = e => {
        const field = e.target.name;
        const value = e.target.value;
        // console.log(field, value)
        const newLoginData = { ...logninData };
        newLoginData[field] = value;
        console.log(newLoginData)
        setLoginData(newLoginData);
    }

    const handleSubimt = e => {

        handleOldLogin(logninData?.email, logninData?.password, location, history)

        e.preventDefault();
        // console.log(logninData.email, logninData.password)
        // console.log('clicked')
    }
    const handleGoogleLogin = () => {
        loginWithGoogl(location, history)

    }


    return (
        <Container sx={{ mt: 5 }}>
            <Grid container spacing={2}>
                <Typography sx={{ mx: 'auto' }} variant="h4" gutterBottom component="div">
                    Please Login
                </Typography>
                {!isLoading && <form onSubmit={handleSubimt}>
                    <TextField
                        onBlur={handleLogin}
                        sx={{ width: '75%', m: 2 }}
                        id="standard-basic"
                        label="Your Email"
                        variant="standard"
                        name="email"
                    />
                    <TextField
                        onBlur={handleLogin}
                        sx={{ width: '75%', m: 2 }}
                        id="standard-basic"
                        label="Password"
                        type="password"
                        variant="standard"
                        name="password"
                    />
                    <Button
                        sx={{ width: '75%', m: 2 }}
                        variant="contained"
                        type="submit"
                    >
                        Login
                    </Button>

                    <Button
                        sx={{ width: '75%', m: 2 }}
                        variant="contained"
                        onClick={handleGoogleLogin}
                    >
                        Login With Google
                    </Button>



                    <NavLink
                        style={{ textDecoration: 'none' }}
                        to="/register">
                        <Button
                            variant="text">
                            New to Mobile_Shop? Please Register.
                        </Button>
                    </NavLink>
                </form>}

                {isLoading && <CircularProgress />}

                {user?.email && <Alert severity="success">
                    Login Successful</Alert>}

                {error && <Alert severity="error">{error}</Alert>}

            </Grid>
        </Container>
    );
};

export default Login;