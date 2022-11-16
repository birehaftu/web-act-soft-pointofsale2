import React, {useState, useEffect} from 'react';

import {TextField, Button} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import axios from 'axios';
import ReactDOM from "react-dom";
import {HashRouter} from "react-router-dom";
import {createBrowserHistory} from 'history';
import UserProfile from "./UserProfile";
import App from "../App";

const useStyles = makeStyles((theme) => ({
    textField: {
        margin: 20
    },
    button: {
        margin: 25
    }

}));

const LogIn = () => {
    const classes = useStyles();
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [isSubmitClicked, setIsSubmitClicked] = useState(false);

    UserProfile.setName(null);
    useEffect(() => {

        if (isSubmitClicked === true) {
            if (password !== "" && userName !== "") {
                axios.post("https://soft-point-of-sale-act.herokuapp.com/api/user/getUserLogIn/" + userName + "/" + password)
                    .then((response) => {
                            //alert(response.data);
                            if (response.data === true) { 
                                UserProfile.setName(userName);
                                window.localStorage.setItem('LogIn_STATE',response.data);
                                //const logIn = window.localStorage.getItem('LogIn_STATE');
                                //if(logIn!=null)
                                //{
                                //    const loggedIn=JSON.parse(logIn);
                                //}
                                //alert("Successful LogIn");
                                const history = createBrowserHistory();

                                ReactDOM.render(
                                    <React.StrictMode>
                                        {/* Use HashRouter instead of Router so that the app works when deployed to Github Pages */}

                                        <HashRouter history={history}>
                                            <App/>
                                        </HashRouter>
                                    </React.StrictMode>,
                                    document.getElementById('root')
                                );
                            } else {
                                alert("Invalid User name or password!");
                            }
                        }
                    )
                    .catch((error) => {
                        console.log(error);
                        alert(error);
                    })
                setIsSubmitClicked(false);
            } else {
                alert("Username and password can't be empty");
                setIsSubmitClicked(false);
            }
        }
    }, [userName, password, isSubmitClicked]);

    const handleKeypress = e => {
        //it triggers by pressing the enter key
        //alert("Pressed!"+e.key) ;
        if (e.key === "Enter") {
            setIsSubmitClicked(true);
        }
    };
    return (
        <form>
            <div class="centered">

            <table>
                <tr>
                    <td><h2>LogIn</h2></td>
                </tr>
                <tr>
                    <td>
                        <TextField
                            type={"text"}
                            className={classes.textField}
                            label={"User Name"}
                            placeholder={"User Name"}
                            variant={"outlined"}
                            value={userName}
                            onKeyPress={handleKeypress}
                            onChange={(event) =>
                                setUserName(event.target.value)}
                        />
                    </td>
                </tr>
                <tr>
                    <td>
                        <TextField
                            type={"password"}
                            className={classes.textField}
                            label={"Password"}
                            placeholder={"Password"}
                            variant={"outlined"}
                            value={password}
                            onKeyPress={handleKeypress}
                            onChange={(event) =>
                                setPassword(event.target.value)}
                        />
                    </td>
                </tr>
                <tr>
                    <td>
                        <Button
                            className={classes.button}
                            variant={"contained"}
                            style={{backgroundColor:"green", color:"white"}}
                            onClick={() => setIsSubmitClicked(true)}
                        >
                            LogIn
                        </Button>
                    </td>
                </tr>
            </table>
            </div>
        </form>
    );
}

export default LogIn;