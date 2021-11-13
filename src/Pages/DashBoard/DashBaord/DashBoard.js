import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Button } from '@mui/material';
import { Switch, Route, Link, useRouteMatch } from "react-router-dom";
import MyOrders from './../MyOrders/MyOrders';
import MakeAdmin from './../MakeAdmin/MakeAdmin';
import AddProduct from './../AddProduct/AddProduct';
import useAuth from './../../../Hooks/useAuth';
import AdminRoute from '../../Authentication/AdminRoute/AdminRoute';
import ManageAllOrders from './../ManageAllOrders/ManageAllOrders';
import PayMethod from '../PayMethod/PayMethod';
import AddReview from './../AddReview/AddReview'


const drawerWidth = 240;

function DashBoard(props) {
    const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);
    let { path, url } = useRouteMatch();
    const { admin, logOut, user } = useAuth();

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const drawer = (
        <div>
            <Toolbar />
            <Divider />
            <Link to="/home" style={{ textDecoration: 'none', color: '#F08080' }}><Button color="inherit">Home</Button></Link>
            <br />
            {!admin && <Box>
                <Link to={`${url}`} style={{ textDecoration: 'none', color: '#F08080' }}><Button color="inherit">My Orders</Button></Link>
                <br />
                <Link to={`${url}/payMethod`} style={{ textDecoration: 'none', color: '#F08080' }}><Button color="inherit">Pay Method</Button></Link>
                <br />
                <Link to={`${url}/addReview`} style={{ textDecoration: 'none', color: '#F08080' }}><Button color="inherit">Add Review</Button></Link>
                <br />
                <Button onClick={logOut} variant="contained">LogOut</Button>
            </Box>}
            <br />
            {admin && <Box>
                <Link to={`${url}`} style={{ textDecoration: 'none', color: '#F08080' }}><Button color="inherit">Manage All Orders</Button></Link>
                <br />
                <Link to={`${url}/makeAdmin`} style={{ textDecoration: 'none', color: '#F08080' }}><Button color="inherit">Make Admin</Button></Link>
                <br />
                <Link to={`${url}/addProduct`} style={{ textDecoration: 'none', color: '#F08080' }}><Button color="inherit">Add Product</Button></Link>
                <br />
            </Box>}
        </div>
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar
                position="fixed"
                sx={{
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                    ml: { sm: `${drawerWidth}px` },
                }}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap component="div">
                        {user.displayName}
                    </Typography>
                </Toolbar>
            </AppBar>
            <Box
                component="nav"
                sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
                aria-label="mailbox folders"
            >
                {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                >
                    {drawer}
                </Drawer>
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: 'none', sm: 'block' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                    open
                >
                    {drawer}
                </Drawer>
            </Box>
            <Box
                component="main"
                sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
            >
                <Toolbar />
                <Switch>
                    {!admin && <Route exact path={path}>
                        <MyOrders></MyOrders>
                    </Route>}
                    {admin && <Route exact path={path}>
                        <ManageAllOrders></ManageAllOrders>
                    </Route>}
                    <AdminRoute path={`${path}/makeAdmin`}>
                        <MakeAdmin></MakeAdmin>
                    </AdminRoute>
                    <AdminRoute path={`${path}/addProduct`}>
                        <AddProduct></AddProduct>
                    </AdminRoute>
                    <Route path={`${path}/payMethod`}>
                        <PayMethod></PayMethod>
                    </Route>
                    <Route path={`${path}/addReview`}>
                        <AddReview></AddReview>
                    </Route>
                </Switch>
            </Box>
        </Box>
    );
}

DashBoard.propTypes = {
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window: PropTypes.func,
};

export default DashBoard;
