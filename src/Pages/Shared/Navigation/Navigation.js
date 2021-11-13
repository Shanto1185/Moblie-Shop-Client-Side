import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Link, NavLink } from 'react-router-dom';
import { makeStyles } from '@mui/styles';
import { useTheme } from '@mui/material';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import useAuth from './../../../Hooks/useAuth';

const Navigation = () => {
    const { user, logOut } = useAuth();

    const theme = useTheme();

    const useStyle = makeStyles({
        navIcon: {
            [theme.breakpoints.up('sm')]: {
                display: 'none !important'
            }
        },

        navItemContainer: {
            [theme.breakpoints.down('sm')]: {
                display: 'none !important'
            }
        },

        smartTelecom: {
            [theme.breakpoints.up('sm')]: {
                textAlign: 'left'
            }
        }
    });

    const { navIcon, navItemContainer, smartTelecom } = useStyle();

    const list = (
        <Box
            sx={{ width: 250 }}
            role="presentation"
        >
            <List>
                <ListItem button>
                    <ListItemText>
                        <NavLink to="/dashboard" style={{ textDecoration: 'none', color: 'blue' }}>
                            <Button color="inherit">Dashboard</Button>
                        </NavLink>
                        {
                            user.email && <Button color="inherit" style={{ textDecoration: 'none', color: 'blue' }} onClick={logOut}>LogOut</Button>
                        }
                    </ListItemText>

                    <ListItemText>
                        <NavLink to="/login" style={{ textDecoration: 'none', color: 'white' }}>
                            {
                                !user.email && <Button color="inherit" style={{ textDecoration: 'none', color: 'blue' }}>Login</Button>
                            }
                        </NavLink>
                    </ListItemText>
                </ListItem>
            </List>
        </Box>
    );

    const [state, setState] = React.useState(false);

    return (
        <>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{ mr: 2 }}
                            className={navIcon}
                            onClick={() => setState(true)}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography className={smartTelecom} variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            <Link to="/home" style={{ textDecoration: 'none', color: 'white' }}><Button color="inherit">Mobile Shop</Button></Link>
                        </Typography>
                        <Box className={navItemContainer}>
                            {
                                user?.email ?
                                    <Box>
                                        <NavLink to="/dashboard" style={{ textDecoration: 'none', color: 'white' }}>
                                            <Button color="inherit">Dashboard</Button>
                                        </NavLink>
                                        <Button color="inherit" onClick={logOut}>Log Out</Button>
                                    </Box>
                                    :
                                    <NavLink to="/login" style={{ textDecoration: 'none', color: 'white' }}>
                                        <Button color="inherit">Login</Button>
                                    </NavLink>
                            }
                        </Box>
                    </Toolbar>
                </AppBar>
            </Box>

            <div>
                <React.Fragment>
                    <Drawer
                        open={state}
                        onClose={() => setState(false)}
                    >
                        {list}
                    </Drawer>
                </React.Fragment>
            </div>
        </>
    );
};

export default Navigation;