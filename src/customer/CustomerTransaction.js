import React, {useState} from 'react';
import axios from 'axios';
import {DataGrid} from "@mui/x-data-grid";

function useOnceCall(cb, condition = true) {
    const isCalledRef = React.useRef(false);

    React.useEffect(() => {
        if (condition && !isCalledRef.current) {
            isCalledRef.current = true;
            cb();
        }
    }, [cb, condition]);
}

const CustomerTransaction = () => {
    const [rows, setRows] = useState([])
    const columns = [
        {field: 'id', headerName: 'ID', width: 100},
        {field: 'transactionId', headerName: 'Txn ID', width: 170},
        {field: 'userName', headerName: 'Agent User.', width: 170},
        {field: 'phone', headerName: 'Phone', width: 150},
        {field: 'amount', headerName: 'amount', width: 180},
        {field: 'status', headerName: 'status', width: 180},
        {field: 'goodName', headerName: 'Reason', width: 180},
        {field: 'cardCode', headerName: 'card No.', width: 170},
        {field: 'fullName', headerName: 'Full Name', width: 300},
        {field: 'accountType', headerName: 'Account Type', width: 180},
        {field: 'balance', headerName: 'Balance', width: 150},
    ];

    useOnceCall(() => {
        axios.get("https://soft-point-of-sale-act.herokuapp.com/api/cardTransaction/list"
        )
            .then((response) => {
                    if (Object.entries(response.data).length !== 0) {
                        var allrows = [];
                        for (var i = 0; i < response.data.length; i++) {
                            var obj = response.data[i];
                            //alert(obj["userId"]);
                            var row = {
                                id: (i + 1),
                                transactionId: obj["transactionId"],
                                userName: obj["transaction_user"]["fullName"],
                                accountNumber: obj["transaction_card"]["customer_account"]["accountNumber"],
                                fullName: obj["transaction_card"]["customer_account"]["customer_account"]["fullName"],
                                phone: obj["transaction_card"]["customer_account"]["customer_account"]["phone"],
                                accountType: obj["transaction_card"]["customer_account"]["accountType"],
                                balance: obj["transaction_card"]["customer_account"]["balance"],
                                cardCode: obj["transaction_card"]["cardCode"],
                                amount: obj["amount"],
                                status: obj["status"],
                                goodName: obj["goodName"]
                            };
                            //rows.map(row);
                            allrows.push(row);
                        }
                        setRows(ro => rows.concat(allrows))
                    } else {
                        alert("Can't get list of Transacions.");
                    }
                }
            )
            .catch((error) => {
                console.log(error);
                alert(error);
            })
        ;
    },);


    return (
        <form>
            <p><h2> Customer Transaction Information</h2></p>

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

export default CustomerTransaction;