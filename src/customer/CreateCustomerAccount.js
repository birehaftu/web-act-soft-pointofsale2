    import React, {useState, useEffect} from 'react';
import {TextField, Button} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import {Autocomplete} from '@mui/material';
import axios from 'axios';
    import {DataGrid} from "@mui/x-data-grid";

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
const CreateCustomerAccount = () => {
    /*function useOneTime(cb2, condition2 = true) {
        const isCalledRef2 = React.useRef(false);

        React.useEffect(() => {
            if (condition2 && !isCalledRef2.current) {
                isCalledRef2.current = true;
                cb2();
            }
        }, [cb2, condition2]);
    }*/
    const [rows, setRows] = useState([])
    const columns = [
        {field: 'id', headerName: 'ID', width: 100},
        {field: 'accountId', headerName: 'Account ID', width: 170},
        {field: 'accountNumber', headerName: 'Account No.', width: 170},
        {field: 'fullName', headerName: 'Full Name', width: 300},
        {field: 'email', headerName: 'Email', width: 150},
        {field: 'phone', headerName: 'Phone', width: 150},
        {field: 'accountType', headerName: 'Account Type', width: 180},
        {field: 'balance', headerName: 'Balance', width: 150},
        {field: 'status', headerName: 'status', width: 180},
    ];
    const classes = useStyles();
    const accountTypeList = [
        {code: 'Saving', label: 'Saving'},
        {code: 'Government', label: 'Government'},
        {code: 'Loan', label: 'Loan'},
        {code: 'IFB', label: 'IFB'}
    ];
    const customerList = [];//[{code: '0', label: 'please select'}];
    const statusList = [
        {code: 'Active', label: 'Active'},
        {code: 'InActive', label: 'InActive'}
    ];
    useOnceCall(() => {
        axios.get("https://soft-point-of-sale-act.herokuapp.com/api/customerAccount/list"
        )
            .then((response) => {
                    if (Object.entries(response.data).length !== 0) {
                        var allrows = [];
                        for (var i = 0; i < response.data.length; i++) {
                            var obj = response.data[i];
                            //alert(obj["userId"]);
                            var row = {
                                id: (i + 1), accountId: obj["accountId"], accountNumber: obj["accountNumber"], fullName: obj["customer_account"]["fullName"],
                                email: obj["customer_account"]["email"],phone: obj["customer_account"]["phone"], accountType: obj["accountType"],
                                balance: obj["balance"], status: obj["status"]
                            };
                            //rows.map(row);
                            allrows.push(row);
                        }
                        setRows(ro => rows.concat(allrows))
                    } else {
                        alert("Can't get list of Customer Account.");
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
        axios.get("https://soft-point-of-sale-act.herokuapp.com/api/customer/list"
        )
            .then((response) => {
                    //alert(response.data);
                    //if (!Object.keys(response.data).length) {
                    if (Object.entries(response.data).length !== 0){
                        //customerList = [response.data];
                        for (var i = 0; i < response.data.length; i++) {
                            //alert(i);
                            //document.write("<br><br>array index: " + i);
                            var obj = response.data[i];
                            var customerId = "";
                            var phone = "";
                            for (var key in obj) {
                                if (key === "customerId") {
                                    customerId = obj[key];
                                    //alert("customerId:"+customerId);
                                }
                                if (key === "phone") {
                                    phone = obj[key];
                                }
                            }
                            if (customerId !== "" && phone !== "") {
                                //alert("Code: "+customerId+" "+" phone: "+phone)
                                customerList.push({code: customerId, label: phone})
                            }
                        }
                    } else {
                        alert("Can't get list of customers.");
                    }
                }
            )
            .catch((error) => {
                console.log(error);
                alert(error);
            })
        ;
    }, );
    const [status, setStatus] = useState('InActive');
    const [balance, setBalance] = useState('0.0');
    const [accountType, setAccountType] = useState('');
    const [customer, setCustomer] = useState('');

    const [isSubmitClicked, setIsSubmitClicked] = useState(false);

    useEffect(() => {

        if (isSubmitClicked === true) {
            if (customer !== "" && accountType !== "" && status !== "" && balance !== "") {
                //alert(customer);
                axios.post("https://soft-point-of-sale-act.herokuapp.com/api/customerAccount/create",
                    {
                        "accountType": accountType,
                        "customer": {
                            "customerId": customer
                        },
                        "status": status,
                        "balance": balance
                    }
                )
                    .then((response) => {
                            //alert(response.data);
                            if (response.data === true) {
                                alert("Customer account is created.");
                               // useOnceCall(() => {
                                    axios.get("https://soft-point-of-sale-act.herokuapp.com/api/customerAccount/list"
                                    )
                                        .then((response) => {
                                                if (Object.entries(response.data).length !== 0) {
                                                    var allrows = [];
                                                    for (var i = 0; i < response.data.length; i++) {
                                                        var obj = response.data[i];
                                                        //alert(obj["userId"]);
                                                        var row = {
                                                            id: (i + 1), accountId: obj["accountId"], accountNumber: obj["accountNumber"], fullName: obj["customer_account"]["fullName"],
                                                            email: obj["customer_account"]["email"],phone: obj["customer_account"]["phone"], accountType: obj["accountType"],
                                                            balance: obj["balance"], status: obj["status"]
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
                                alert("Customer account creation failed.");
                            }
                        }
                    )
                    .catch((error) => {
                        console.log(error);
                        alert(error);
                    })
                setIsSubmitClicked(false);
            } else {
                alert("Please fill all fields");
                setIsSubmitClicked(false);
            }
        }
    }, [customer, accountType, status, customer, isSubmitClicked]);

    return (
        <form>
            <p><h2> Create new Customer Account</h2></p>
            <table>
                <tr>
                    <td>
                        <Autocomplete
                            onChange={(event, value) => setCustomer(value===null?'':value["code"] )}
                            id="combo-box-customer"
                            className={classes.Autocomplete}
                            options={customerList}
                            variant={"outlined"}
                            renderInput={(params) => <TextField {...params} variant="outlined" label="Customer"/>}

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
                        <TextField
                            type={"number"}
                            className={classes.textField}
                            label={"Balance"}
                            placeholder={"Balance"}
                            variant={"outlined"}
                            value={balance}
                            onChange={(event) =>
                                setBalance(event.target.value)}
                        />
                    </td>
                </tr>
                <tr>
                    <td>
                        <Autocomplete
                            onChange={(event, value) => setAccountType(value===null?'':value["code"])}
                            id="combo-box-AccountType"
                            className={classes.Autocomplete}
                            options={accountTypeList}
                            variant={"outlined"}
                            renderInput={(params) => <TextField {...params} variant="outlined" label="Account Type"/>}

                        /></td>
                    <td>
                        <Button
                            className={classes.button}
                            variant={"contained"}
                            color={"Primary"}
                            style={{backgroundColor:"green", color:"white"}}
                            onClick={() => setIsSubmitClicked(true)}
                        >
                            Create Account
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

export default CreateCustomerAccount;