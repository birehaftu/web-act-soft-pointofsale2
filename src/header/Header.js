import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import {HashRouter, useHistory} from "react-router-dom";
import UserProfile from "../users/UserProfile";
import App from "../App";
import ReactDOM from "react-dom";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor:"green",

    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));

const Header = () => {

    const history = useHistory();

    const classes = useStyles();

    function handleSubmit(e) {
        //e.preventDefault();
        //alert('You clicked logout.');
        //window.localStorage.setItem('LogIn_STATE',response.data);
        window.localStorage.removeItem("LogIn_STATE");
        UserProfile.setName("");
        //history.push("/");
        ReactDOM.render(
            <React.StrictMode>
                <HashRouter history={history.push("/")}>
                    <App/>
                </HashRouter>
            </React.StrictMode>,
            document.getElementById('root')
        );
    }
    return (
        <div className={classes.root}>
            <AppBar position="static" style={{backgroundColor:"green"}}>
                <Toolbar>
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                        <AccountBalanceIcon />
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        Soft Point of Sale
                    </Typography>
                    <Button color="inherit" onClick={() => history.push('')}>
                        Users
                    </Button>
                    <Button color="inherit" onClick={() => history.push('/user/UpdateUser')}>
                        Update User
                    </Button>
                    <Button color="inherit" onClick={() => history.push('/customer/createCustomer')}>
                        Customers
                    </Button>
                    <Button color="inherit" onClick={() => history.push('/customer/createCustomerAccount')}>
                        Customers Account
                    </Button>
                    <Button color="inherit" onClick={() => history.push('/customer/CustomerCard')}>
                        Customer Cards
                    </Button>
                    <Button color="inherit" onClick={() => history.push('/customer/CustomerTransaction')}>
                        Customer Transaction
                    </Button>

                    <Button color="inherit" onClick={handleSubmit}>
                        Logout
                    </Button>
                </Toolbar>
            </AppBar>
        </div>
    );
}

export default Header;
