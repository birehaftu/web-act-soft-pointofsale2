import React, {useState, useEffect} from 'react';
import {TextField, Button} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import {Autocomplete} from '@mui/material';
import axios from 'axios';
import useAxios from "axios-hooks";
import {DataGrid} from "@mui/x-data-grid";
import Datetime from 'react-datetime';
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
const CreateCustomer = () => {


    const classes = useStyles();
    const [fullName, setFullName] = useState('');
    const [dob, setDob] = useState();
    const maritalStatusList = [
        {code: 'Single', label: 'Single'},
        {code: 'Married', label: 'Married'},
        {code: 'Divorced', label: 'Divorced'},
        {code: 'Widowed', label: 'Widowed'},
        {code: 'Separated ', label: 'Separated'}
    ];
    const [maritalStatus, setMaritalStatus] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [rows, setRows] = useState([])
    const columns = [
        {field: 'id', headerName: 'ID', width: 100},
        {field: 'customerId', headerName: 'Customer ID', width: 170},
        {field: 'fullName', headerName: 'Full Name', width: 300},
        {field: 'email', headerName: 'Email', width: 150},
        {field: 'phone', headerName: 'Phone', width: 150},
        {field: 'dob', headerName: 'Date of Birth', width: 180},
        {field: 'address', headerName: 'address', width: 150},
        {field: 'maritalStatus', headerName: 'Marital Status', width: 180},
    ];
    const [isSubmitClicked, setIsSubmitClicked] = useState(false);

    useOnceCall(() => {
        axios.get("https://soft-point-of-sale-act.herokuapp.com/api/customer/list"
        )
            .then((response) => {
                if (Object.entries(response.data).length !== 0) {
                    var allrows = [];
                    for (var i = 0; i < response.data.length; i++) {
                        var obj = response.data[i];
                        //alert(obj["userId"]);
                        var row = {
                            id: (i + 1), customerId: obj["customerId"], fullName: obj["fullName"],
                            dob: obj["dob"], address: obj["address"], email: obj["email"]
                            , phone: obj["phone"], maritalStatus: obj["maritalStatus"]
                        };
                        //rows.map(row);
                        allrows.push(row);
                    }
                    setRows(ro => rows.concat(allrows))
                } else {
                    alert("Can't get list of Customers.");
                }
            }
            )
            .catch((error) => {
                console.log(error);
                alert(error);
            })
        ;
    },);

    useEffect(() => {

        if (isSubmitClicked === true) {
            if (fullName !== "" && dob !== "" && maritalStatus !== "" &&
                phone !== "" && email !== "" && address !== "") {
                var today =new Date();
                var bodDate = new Date(dob);
                //alert("today:"+today);
                //alert("DOB:"+bodDate);
                var todayFrom_18= new Date((today.getFullYear()-18), today.getMonth(), today.getDay());
                //alert("todayFrom_18:"+todayFrom_18);
                if(todayFrom_18<bodDate){
                    setIsSubmitClicked(false);
                    alert("Customer must be 18 and above age!");
                }else {
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
                            axios.post("https://soft-point-of-sale-act.herokuapp.com/api/customer/create",
                                {
                                    "fullName": fullName,
                                    "dob": dob,
                                    "maritalStatus": maritalStatus,
                                    "phone": phone,
                                    "email": email,
                                    "address": address
                                }
                            )
                                .then((response) => {
                                        //alert(response.data);
                                        if (response.data === true) {
                                            alert("Customer is created.");
                                            // window.location.reload(true);
                                            //useOnceCall(() => {
                                            axios.get("https://soft-point-of-sale-act.herokuapp.com/api/customer/list"
                                            )
                                                .then((response) => {
                                                        if (Object.entries(response.data).length !== 0) {
                                                            var allrows = [];
                                                            for (var i = 0; i < response.data.length; i++) {
                                                                var obj = response.data[i];
                                                                //alert(obj["userId"]);
                                                                var row = {
                                                                    id: (i + 1),
                                                                    customerId: obj["customerId"],
                                                                    fullName: obj["fullName"],
                                                                    dob: obj["dob"],
                                                                    address: obj["address"],
                                                                    email: obj["email"]
                                                                    ,
                                                                    phone: obj["phone"],
                                                                    maritalStatus: obj["maritalStatus"]
                                                                };
                                                                //rows.map(row);
                                                                allrows.push(row);
                                                            }
                                                            setRows(ro => rows.concat(allrows))
                                                        } else {
                                                            alert("Can't get list of Customers.");
                                                        }
                                                    }
                                                )
                                                .catch((error) => {
                                                    console.log(error);
                                                    alert(error);
                                                })
                                            ;
                                            //},);
                                        } else {
                                            alert("Customer creation failed.");
                                        }
                                    }
                                )
                                .catch((error) => {
                                    console.log(error);
                                    alert(error);
                                })
                        }
                    }
                }
                setIsSubmitClicked(false);
            } else {
                setIsSubmitClicked(false);
                alert("Please fill all fields");
            }
        }
    }, [fullName, dob, maritalStatus, phone, email, address, isSubmitClicked]);

    return (
        <form>
       { /*form to create customer*/}
       { /* form to create customer
       for multiple lines
       line 3 */}
            <p><h2> Create new Customer</h2></p>
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
                        <Autocomplete
                            onChange={(event, value) => setMaritalStatus(value===null?'':value["code"])}
                            id="combo-box-meritalstatus"
                            options={maritalStatusList}
                            className={classes.Autocomplete}
                            variant={"outlined"}
                            renderInput={(params) => <TextField {...params} variant="outlined" label="Marital Status"/>}
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
                            type={"text"}
                            className={classes.textField}
                            label={"address"}
                            placeholder={"address"}
                            variant={"outlined"}
                            value={address}
                            onChange={(event) =>
                                setAddress(event.target.value)}
                        />
                    </td>
                </tr>
                <tr>
                    <td>

                        <TextField
                            type={"date"}
                            className={classes.textField}
                            placeholder={"dob"}
                            variant={"outlined"}
                            value={dob}
                            onChange={(event) => setDob(event.target.value)}
                        /></td>
                    <td>
                        <Button
                            className={classes.button}
                            variant={"contained"}
                            color={"Primary"}
                            style={{backgroundColor:"green", color:"white"}}
                            onClick={() => setIsSubmitClicked(true)}
                        >
                            Create Customer
                        </Button>
                    </td>
                </tr>
            </table>
            <div style={{height: 400, width: '100%'}}>
                <DataGrid
                    columns={columns}
                    rows={rows}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                    checkboxSelection
                />
            </div>
        </form>
    );
}

export default CreateCustomer;