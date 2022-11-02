import React, {useContext, useEffect, useState} from "react";
import './css/PaymentHistory.css'
import Navbar from "./NavBar";
import AuthContext from "./context/AuthContext";
import {TableContainer, Table, TableHead, TableRow, TableBody, TableCell} from '@material-ui/core';
import Config from "./config.json";
import {useParams} from "react-router";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

function PaymentDetail() {
    const {order_id} = useParams();
    const [transactionId, setTransactionId] = useState("");
    const [orderDate, setOrderDate] = useState("");
    const [orderId, setOrderId] = useState("");
    let {staff, authTokens} = useContext(AuthContext)
    const[products, setProducts] = useState([]);
    const [loading,setLoading] = useState(true)
    const columns = [
        {
            id: 'image',
            label: 'Product'
        },
        {
            id: 'name',
            label: 'Name'
        },
        {
            id: 'quantity',
            label: 'Quantity'
        },
        {
            id: 'price',
            label: 'Price'
        }

    ];

    //table header style
    const headerStyles = {
        fontSize: '20px',
        cursor: 'pointer',
        width: '10%',
        backgroundColor:'#358ED7'
    }

    //table style
    const styles = {
        fontSize: '20px',
        cursor: 'pointer',
        width: '10%'
    }

    useEffect(() => { // set the body css style
        document.body.classList.remove('home');
        document.body.classList.add('paymentHistory');
        return () => {
        };
    }, []);

    //fetch products with corresponding order id
    const getDetail = async () => {
        try{
            const response = await fetch(Config.SERVER_URL+'/api/order/'+order_id, {
                method: "GET",
                headers:{
                    'Content-Type':'application/json',
                    'Authorization':'Bearer ' + String(authTokens.access)
                },
            });

            if(response.status === 200){
                setLoading(false)
                const data = await response.json();
                setProducts(data);
                setTransactionId(data[0].transaction_id);
                setOrderDate(data[0].date_order);
                setOrderId(data[0].id);

            }else{
                setLoading(false)
                alert("Something Wrong")
            }
        }catch (err){
            setLoading(false)
            console.log(err);
            alert(err)
        }
    }

    //staff can visit orders from all users
    const getDetailStaff = async () => {
        try{
            const response = await fetch(Config.SERVER_URL+'/api/staff_order/'+order_id, {
                method: "GET",
                headers:{
                    'Content-Type':'application/json',
                    'Authorization':'Bearer ' + String(authTokens.access)
                },
            });

            if(response.status === 200){
                setLoading(false)
                const data = await response.json();
                setProducts(data);
                setTransactionId(data[0].transaction_id);
                setOrderDate(data[0].date_order);
                setOrderId(data[0].id);

            }else{
                setLoading(false)
                alert("Something Wrong")
            }
        }catch (err){
            setLoading(false)
            console.log(err);
            alert(err)
        }
    }

    //format different value
    const formatText = (columnName, row) => {
        switch (columnName) {
            case 'price':
                return `$${row.price}`;
            case 'name':
                return row.name;
            case 'quantity':
                return row.quantity;
            case 'image':
                return (
                    <img src={Config.SERVER_URL + "/" + row.image} alt="img" height="100" width="100"/>
                )
        }
    };

    useEffect(()=> {
        if (staff) {
            getDetailStaff();
        } else {
            getDetail();
        }
    },[])

    return(
        <div style={{ maxWidth: '100%', overflowX: 'auto' }}>
            {loading? <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open>
                <CircularProgress color="inherit" />
            </Backdrop>: loading}

            <div className="head" style={{width: "fit-content", margin: "auto",}}>
                <h2 align="center" >Order ID: {orderId}</h2>
                <h2 align="center">Transaction ID: #{transactionId}</h2>
                <h2 align="center">Order Date: {orderDate}</h2>
            </div>
        <TableContainer style={{maxHeight:500}}>
                <Navbar/>
                <Table style={{ width: 800 }}  stickyHeader aria-label="sticky table">
                <TableHead>
                    <TableRow>
                        {columns.map((column, index) => {
                            const { label } = column;
                            return (
                                <TableCell key={index} style={headerStyles} align="center">
                                    {label}
                                </TableCell>
                            )
                        })}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {(Array.isArray(products) && products.length >0) && products.map((row, index) => {
                        return(
                            <TableRow key={index} >
                                {columns.map((column,index) => {
                                    const columnName = column.id;
                                    const formattedText = formatText(columnName, row);
                                    return (
                                        <TableCell key={index} style={styles} align="center">
                                            {formattedText}
                                        </TableCell>
                                    );
                                })}
                            </TableRow>
                        )
                    })}
                </TableBody>
            </Table>
        </TableContainer>
        </div>
    )
}


export default PaymentDetail;
