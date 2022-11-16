    import React, {useState, useEffect} from 'react';
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

const CustomerCard = () => {

    const [rows, setRows] = useState([])
    const columns = [
        {field: 'id', headerName: 'ID', width: 100},
        {field: 'cardId', headerName: 'card ID', width: 170},
        {field: 'cardCode', headerName: 'card No.', width: 170},
        {field: 'fullName', headerName: 'Full Name', width: 300},
        {field: 'email', headerName: 'Email', width: 150},
        {field: 'phone', headerName: 'Phone', width: 150},
        {field: 'accountType', headerName: 'Account Type', width: 180},
        {field: 'balance', headerName: 'Balance', width: 150},
        {field: 'status', headerName: 'status', width: 180},
    ];
    useOnceCall(() => {
        axios.get("https://soft-point-of-sale-act.herokuapp.com/api/customerCard/list"
        )
            .then((response) => {
                    if (Object.entries(response.data).length !== 0) {
                        var allrows = [];
                        for (var i = 0; i < response.data.length; i++) {
                            var obj = response.data[i];
                            //alert(obj["userId"]);
                            var row = {
                                id: (i + 1), cardId: obj["cardId"],cardCode: obj["cardCode"] ,accountNumber: obj["customer_account"]["accountNumber"],
                                fullName: obj["customer_account"]["customer_account"]["fullName"],
                                email: obj["customer_account"]["customer_account"]["email"],
                                phone: obj["customer_account"]["customer_account"]["phone"],
                                accountType: obj["customer_account"]["accountType"],
                                balance: obj["customer_account"]["balance"], status: obj["status"]
                            };
                            //rows.map(row);
                            allrows.push(row);
                        }
                        setRows(ro => rows.concat(allrows))
                    } else {
                        alert("Can't get list of Customer Cards.");
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
            <p><h2> Customer Card Information</h2></p>

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

export default CustomerCard;