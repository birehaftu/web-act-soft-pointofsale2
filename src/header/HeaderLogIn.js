import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import {useHistory} from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: "green",
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
                    <Button color="inherit" onClick={() => history.push('/')}>
                        LogIn
                    </Button>
                </Toolbar>
            </AppBar>
        </div>
    );
}

export default Header;
