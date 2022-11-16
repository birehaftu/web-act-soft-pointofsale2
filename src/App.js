import './App.css';
 import LogIn from "./users/LogIn";
import Header from "./header/Header"
import HeaderLogIn from "./header/HeaderLogIn"
import UserProfile from './users/UserProfile';
import { ConfirmProvider } from 'material-ui-confirm';
import {Route, Switch} from "react-router-dom";
import CreateUser from "./users/CreateUser";
import CreateCustomer from "./customer/CreateCustomer";
import CreateCustomerAccount from "./customer/CreateCustomerAccount";
import CustomerCard from "./customer/CustomerCard";
import CustomerTransaction from "./customer/CustomerTransaction";
import UpdateUser from "./users/UpdateUser";
import {makeStyles} from "@material-ui/core/styles";
const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor:"green",
    },
}));
const App = () => {
    document.title = "ACT Soft point of Sale";
    const classes = useStyles();
    // <> </> is called a React Fragment
    const logIn = window.localStorage.getItem('LogIn_STATE');     
    if(UserProfile.getName()==="" && logIn===null) {
    return (

        <ConfirmProvider>
            <>
                <HeaderLogIn/>
                <Switch  className={classes.root}>
                    <Route
                        exact
                        path="/"
                        render={() => <LogIn/>}/>
                    <Route
                        exact
                        path='/customer/createCustomer'
                        render={() => <LogIn />} />
                    <Route
                        exact
                        path='/user/UpdateUser'
                        render={() => <LogIn />} />
                    <Route
                        exact
                        path='/customer/createCustomerAccount'
                        render={() => <LogIn />} />
                    <Route
                        exact
                        path='/customer/CustomerCard'
                        render={() => <LogIn />} />
                    <Route
                        exact
                        path='/customer/CustomerTransaction'
                        render={() => <LogIn />} />
                </Switch>
            </>

        </ConfirmProvider>
    );
    }else {
        if(logIn){ 
            return (

        <ConfirmProvider>
        <>
            <Header/>
            <Switch   className={classes.root}>

                <Route
                    exact
                    path='/'
                    render={() => <CreateUser />} />
                <Route
                    exact
                    path='/customer/createCustomer'
                    render={() => <CreateCustomer />} />
                <Route
                    exact
                    path='/user/UpdateUser'
                    render={() => <UpdateUser />} />
                <Route
                    exact
                    path='/customer/createCustomerAccount'
                    render={() => <CreateCustomerAccount />} />
                <Route
                    exact
                    path='/customer/CustomerCard'
                    render={() => <CustomerCard />} />
                <Route
                    exact
                    path='/customer/CustomerTransaction'
                    render={() => <CustomerTransaction />} />
            </Switch>
        </>

    </ConfirmProvider>
    );
    }else{
        return (

            <ConfirmProvider>
                <>
                    <HeaderLogIn/>
                    <Switch  className={classes.root}>
                        <Route
                            exact
                            path="/"
                            render={() => <LogIn/>}/>
                        <Route
                            exact
                            path='/customer/createCustomer'
                            render={() => <LogIn />} />
                        <Route
                            exact
                            path='/user/UpdateUser'
                            render={() => <LogIn />} />
                        <Route
                            exact
                            path='/customer/createCustomerAccount'
                            render={() => <LogIn />} />
                        <Route
                            exact
                            path='/customer/CustomerCard'
                            render={() => <LogIn />} />
                        <Route
                            exact
                            path='/customer/CustomerTransaction'
                            render={() => <LogIn />} />
                    </Switch>
                </>
    
            </ConfirmProvider>
        );
    }
}
}

export default App;
