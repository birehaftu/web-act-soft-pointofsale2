import React, {useState, useEffect} from 'react';
//import TextField from '@material-ui/core/TextField';
//import Button from '@material-ui/core/Button';


import {useConfirm} from 'material-ui-confirm';
// preferred approach
import {TextField, Button} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import {Autocomplete} from '@mui/material';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
    textField: {
        margin: 20
    }, Autocomplete: {
        margin: 5,
        width: 200
    },
    button: {
        margin: 25
    }
}));

function useOnceCall(cb, condition = true) {
    const isCalledRef = React.useRef(false);

    React.useEffect(() => {
        if (condition && !isCalledRef.current) {
            isCalledRef.current = true;
            cb();
        }
    }, [cb, condition]);
}
const UpdateUser = () => {

    function fillALl(value) {
        if(value!==null) {
            let uname;
            uname = value["label"] ?? '';
            setUser(value["code"]);
            axios.post("https://soft-point-of-sale-act.herokuapp.com/api/user/getByUserName/" + uname
            )
                .then((response) => {
                        //alert(response.data);
                        //if (!Object.keys(response.data).length) {
                        if (response.data !== null) {
                            var obj = response.data
                            var userId = "";
                            var phone = "";
                            for (var key in obj) {
                                if (key === "userName") {
                                    //alert(obj[key]);
                                    setUserName(obj[key]);
                                    document.getElementById("userName").value = obj[key];
                                } else if (key === "phone") {
                                    setPhone(obj[key]);
                                    document.getElementById("phone").value = obj[key];
                                } else if (key === "email") {
                                    setEmail(obj[key]);
                                    document.getElementById("email").value = obj[key];
                                } else if (key === "fullName") {
                                    setFullName(obj[key]);
                                    document.getElementById("fullName").value = obj[key];
                                } else if (key === "role") {
                                    setRole(obj[key]);
                                    document.getElementById("combo-box-role").value = obj[key];
                                } else if (key === "status") {
                                    setStatus(obj[key]);
                                    document.getElementById("combo-box-status").value = obj[key];
                                }
                            }
                        } else {
                            alert("Can't get list of users.");
                        }
                    }
                )
                .catch((error) => {
                    console.log(error);
                    alert(error);
                })
            ;
        }

    }

    const [rows, setRows] = useState([])
    const classes = useStyles();
    const statusList = [
        {code: 'Active', label: 'Active'},
        {code: 'InActive', label: 'InActive'}
    ];


    const confirm = useConfirm();
    const roleList = [
        {code: 'Admin', label: 'Admin'},
        {code: 'Agent', label: 'Agent'}
    ];
    const [user, setUser] = useState('');
    const [fullName, setFullName] = useState('');
    const [role, setRole] = useState('Agent');
    const [userName, setUserName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState('InActive');
    const [password, setPassword] = useState();
    const [confirmPassword, setConfirmPassword] = useState();
    const userList = [];
    const [isSubmitClicked, setIsSubmitClicked] = useState(false);
    const [isDeleteClicked, setIsDeleteClicked] = useState(false);

    useEffect(() => {
        axios.get("https://soft-point-of-sale-act.herokuapp.com/api/user/list"
        )
            .then((response) => {
                    if (Object.entries(response.data).length !== 0) {
                        //customerList = [response.data];
                        for (var i = 0; i < response.data.length; i++) {
                            var obj = response.data[i];
                            var uId = "";
                            var uN = "";
                            for (var key in obj) {
                                if (key === "userId") {
                                    uId = obj[key];
                                }
                                if (key === "userName") {
                                    uN = obj[key];
                                }
                            }
                            if (uId !== "" && uN !== "") {
                                userList.push({code: uId, label: uN})
                            }
                        }
                    } else {
                        alert("Can't get list of users.");
                    }
                }
            )
            .catch((error) => {
                console.log(error);
                alert(error);
            })
        ;

// empty dependency array means this effect will only run once
    },);
    useEffect(() => {

        if (isSubmitClicked === true) {
            if (password === confirmPassword && (password !== "" && confirmPassword !== "")) {
                if (fullName !== "" && status !== "" && userName !== "" &&
                    phone !== "" && email !== "" && role !== "") {
                    var pattern = new RegExp(/^[0-9\b]+$/);
                    if (!pattern.test(phone)) {
                        setIsSubmitClicked(false);
                        alert("please enter a valid phone!");
                    } else if (phone.length != 10) {
                        setIsSubmitClicked(false);
                        alert("please enter a valid phone!");
                    } else {
                        let regEmail =  new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
                        if(!regEmail.test(email)){
                            setIsSubmitClicked(false);
                            alert("please enter a valid email!");
                        } else {
                            axios.post("https://soft-point-of-sale-act.herokuapp.com/api/user/update",
                                {
                                    "fullName": fullName,
                                    "role": role,
                                    "userName": userName,
                                    "phone": phone,
                                    "email": email,
                                    "password": password,
                                    "status": status
                                }
                            )
                                .then((response) => {
                                        //alert(response.data);
                                        if (response.data === true) {
                                            alert("User is Updated.");
                                        } else {
                                            alert("User update is failed.");
                                        }
                                    }
                                )
                                .catch((error) => {
                                    console.log(error);
                                    alert(error);
                                })

                            setIsSubmitClicked(false);
                        }
                    }

                } else {
                    alert("Fill all fields! password is optional!");
                    setIsSubmitClicked(false);
                }
            } else {
                alert("Password and confirmed password are not the same!");
                setIsSubmitClicked(false);
            }
        }
    }, [fullName, role, userName, phone, email, password, confirmPassword, status, isSubmitClicked]);
    const handleClick = () => {
        confirm({description: 'Are you sure you want to delete user: ' + userName + ' ?'})
            .then(() => {
                // alert(user);
                if (user !== '') {
                    //alert(user);
                    axios.post("https://soft-point-of-sale-act.herokuapp.com/api/user/delete",
                        {
                            "id": user
                        }
                    )
                        .then((response) => {
                                //alert(response.data);
                                if (response.data === true) {
                                    alert("User is Delete.");
                                } else {
                                    alert("User Delete is failed. May be user has started using the system!");
                                }
                            }
                        )
                        .catch((error) => {
                            console.log(error);
                            alert(error);
                        })

                } else {
                    alert("Please select a user from the drop down list!");
                }

            })
            .catch(() => { /* ... */
            });
    };

    return (
        <form>
            <p><h2> Update User</h2></p>
            <table>
                <tr>
                    <td>
                        <Autocomplete
                            onChange={(event, value) => fillALl(value)}
                            id="combo-box-user"
                            className={classes.Autocomplete}
                            options={userList}
                            variant={"outlined"}
                            renderInput={(params) => <TextField {...params} variant="outlined" label="User"/>}

                        /></td>
                </tr>
                <tr>
                    <td>
                        <TextField
                            type={"text"}
                            autoFocus={true}
                            className={classes.textField}
                            label={"Full Name"}
                            id={"fullName"}
                            placeholder={"Full Name"}
                            variant={"outlined"}
                            value={fullName}
                            onChange={(event) =>
                                setFullName(event.target.value)}
                        /></td>
                    <td>
                        <TextField
                            type={"text"}
                            className={classes.textField}
                            label={"User Name"}
                            id={"userName"}
                            placeholder={"User Name"}
                            variant={"outlined"}
                            value={userName}
                            onChange={(event) =>
                                setUserName(event.target.value)}
                        />
                    </td>
                    <td>
                        <TextField
                            type={"tel"}
                            className={classes.textField}
                            label={"Phone"}
                            id={"phone"}
                            placeholder={"Phone"}
                            variant={"outlined"}
                            value={phone}
                            onChange={(event) =>
                                setPhone(event.target.value)}
                        />
                    </td>
                    <td>
                        <TextField
                            type={"email"}
                            className={classes.textField}
                            label={"Email"}
                            id={"email"}
                            placeholder={"Email"}
                            variant={"outlined"}
                            value={email}
                            onChange={(event) =>
                                setEmail(event.target.value)}
                        /></td>
                    <td>
                        <TextField
                            id={"password"}
                            type={"password"}
                            className={classes.textField}
                            label={"Password"}
                            placeholder={"Password"}
                            variant={"outlined"}
                            value={password}
                            onChange={(event) =>
                                setPassword(event.target.value)}
                        />
                    </td>
                </tr>
                <tr>
                    <td>
                        <TextField
                            type={"password"}
                            className={classes.textField}
                            label={"Confirm Password"}
                            placeholder={"Confirm Password"}
                            variant={"outlined"}
                            value={confirmPassword}
                            onChange={(event) =>
                                setConfirmPassword(event.target.value)}
                        /></td>
                    <td>
                        <Autocomplete
                            onChange={(event, value) => setRole(value===null?'':value["code"])}
                            id="combo-box-role"
                            options={roleList}
                            className={classes.Autocomplete}
                            value={role}
                            variant={"outlined"}
                            renderInput={(params) => <TextField {...params} variant="outlined" label="Role"/>}

                        /></td>
                    <td>
                        <Autocomplete
                            onChange={(event, value) => setStatus(value===null?'':value["code"])}
                            id="combo-box-status"
                            className={classes.Autocomplete}
                            //sx={{width: 200, fullWidth: false}}
                            options={statusList}
                            value={status}
                            variant={"outlined"}
                            renderInput={(params) => <TextField {...params} variant="outlined" label="Status"/>}

                        /></td>
                    <td>
                        <Button
                            id={"update"}
                            className={classes.button}
                            variant={"contained"}
                            color={"Primary"}
                            style={{backgroundColor:"green", color:"white"}}
                            onClick={() => setIsSubmitClicked(true)}
                        >
                            Update User
                        </Button>
                    </td>
                    <td>
                        <Button
                            id={"delete"}
                            className={classes.button}
                            variant={"contained"}
                            color={"Primary"}
                            style={{backgroundColor:"green", color:"white"}}
                            onClick={handleClick}
                        >
                            Delete User
                        </Button>
                    </td>
                </tr>
            </table>

        </form>
    );

}

export default UpdateUser;