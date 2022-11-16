import React, {useState, useEffect} from 'react';
//import TextField from '@material-ui/core/TextField';
//import Button from '@material-ui/core/Button';

// preferred approach
import {TextField, Button} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import {Autocomplete} from '@mui/material';
import axios from 'axios';
import {DataGrid} from '@mui/x-data-grid';

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
const columns = [
    {field: 'id', headerName: 'ID', width: 120},
    {field: 'userId', headerName: 'User ID', width: 150},
    {field: 'fullName', headerName: 'Full Name', width: 300},
    {field: 'role', headerName: 'Role', width: 130},
    {field: 'userName', headerName: 'User Name', width: 150},
    {field: 'email', headerName: 'Email', width: 200},
    {field: 'phone', headerName: 'Phone', width: 200},
    {field: 'status', headerName: 'Status', width: 200},
];

function useOnceCall(cb, condition = true) {
    const isCalledRef = React.useRef(false);

    React.useEffect(() => {
        if (condition && !isCalledRef.current) {
            isCalledRef.current = true;
            cb();
        }
    }, [cb, condition]);
}

const CreateUser = () => {
    const [rows, setRows] = useState([])
    const classes = useStyles();
    const statusList = [
        {code: 'Active', label: 'Active'},
        {code: 'InActive', label: 'InActive'}
    ];

    const roleList = [
        {code: 'Admin', label: 'Admin'},
        {code: 'Agent', label: 'Agent'}
    ];
    const [fullName, setFullName] = useState('');
    const [role, setRole] = useState('Agent');
    const [userName, setUserName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState('InActive');
    const [password, setPassword] = useState();
    const [confirmPassword, setConfirmPassword] = useState();

    const [isSubmitClicked, setIsSubmitClicked] = useState(false);
    useOnceCall(() => {
        axios.get("https://soft-point-of-sale-act.herokuapp.com/api/user/list"
        )
            .then((response) => {
                    if (Object.entries(response.data).length !== 0) {
                        var allrows = [];
                        for (var i = 0; i < response.data.length; i++) {
                            var obj = response.data[i];
                            //alert(obj["userId"]);
                            var row = {
                                id: (i + 1), userId: obj["userId"], fullName: obj["fullName"],
                                role: obj["role"], userName: obj["userName"], email: obj["email"]
                                , phone: obj["phone"], status: obj["status"]
                            };
                            //rows.map(row);
                            allrows.push(row);
                        }
                        setRows(ro => rows.concat(allrows))
                    } else {
                        alert("Can't get list of Users.");
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
            if (password === confirmPassword) {
                if (fullName !== "" && status !== "" && userName !== "" &&
                    phone !== "" && email !== "" && role !== "" && password !== "") {
                    //alert("Status: "+status);
                    //alert("role: "+role);
                    //alert("password: "+password);
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
                            axios.post("https://soft-point-of-sale-act.herokuapp.com/api/user/create",
                                //axios.post("http://localhost:9095/api/account/create",
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
                                            alert("User is created.");
                                            //useOnceCall(() => {
                                            axios.get("https://soft-point-of-sale-act.herokuapp.com/api/user/list"
                                            )
                                                .then((response) => {
                                                        if (Object.entries(response.data).length !== 0) {
                                                            var allrows = [];
                                                            for (var i = 0; i < response.data.length; i++) {
                                                                var obj = response.data[i];
                                                                //alert(obj["userId"]);
                                                                var row = {
                                                                    id: (i + 1),
                                                                    userId: obj["userId"],
                                                                    fullName: obj["fullName"],
                                                                    role: obj["role"],
                                                                    userName: obj["userName"],
                                                                    email: obj["email"]
                                                                    ,
                                                                    phone: obj["phone"],
                                                                    status: obj["status"]
                                                                };
                                                                //rows.map(row);
                                                                allrows.push(row);
                                                            }
                                                            setRows(ro => rows.concat(allrows))
                                                        } else {
                                                            alert("Can't get list of Users.");
                                                        }
                                                    }
                                                )
                                                .catch((error) => {
                                                    console.log(error);
                                                    alert(error);
                                                })
                                            ;

                                            // empty dependency array means this effect will only run once
                                            //   },);
                                        } else {
                                            alert("User creation failed.");
                                        }
                                    }
                                )
                                .catch((error) => {
                                    console.log(error);
                                    alert(error);
                                })
                        }
                    }
                setIsSubmitClicked(false);
                }else {
                    setIsSubmitClicked(false);
                    alert("Fill all fields!");
                }
            } else {
                alert("Password and confirmed password are not the same!");
                setIsSubmitClicked(false);
            }
        }
    }, [fullName, role, userName, phone, email, password, confirmPassword, status, isSubmitClicked]);

    return (
        <form>
            <p><h2> Create new User</h2></p>
            <table>
                <tr>
                    <td>
                        <TextField
                            type={"text"}
                            autoFocus={true}
                            className={classes.textField}
                            label={"Full Name"}
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
                            placeholder={"Email"}
                            variant={"outlined"}
                            value={email}
                            onChange={(event) =>
                                setEmail(event.target.value)}
                        /></td>
                    <td>
                        <TextField
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
                            variant={"outlined"}
                            renderInput={(params) => <TextField {...params} variant="outlined" label="Status"/>}

                        /></td>
                    <td>
                        <Button
                            className={classes.button}
                            variant={"contained"}
                            color={"Primary"}
                            style={{backgroundColor:"green", color:"white"}}
                            onClick={() => setIsSubmitClicked(true)}
                        >
                            Create User
                        </Button>
                    </td>
                </tr>
            </table>
            <div style={{height: 400, width: '100%'}}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                    checkboxSelection
                />
            </div>
        </form>

    );

}

export default CreateUser;