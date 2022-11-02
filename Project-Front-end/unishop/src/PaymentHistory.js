import React, {useContext, useEffect, useState} from "react";
import './css/PaymentHistory.css'
import Navbar from "./NavBar";
import AuthContext from "./context/AuthContext";
import {TableContainer, Table, TableHead, TableRow, TableBody, TableCell, TablePagination} from '@material-ui/core';
import Config from "./config.json";
import {NavLink, useNavigate} from "react-router-dom";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

function PaymentHistory() {
    //navigation to paymentDetails
    const navigate = useNavigate();
    const paymentDetail = (order_id) => {
        navigate('/paymentDetail/'+order_id);
    };

    //table header name
    const columns = [
        {
            id: 'id',
            label: 'Order ID'
        },
        {
            id: 'transaction_id',
            label: 'Transaction ID'
        },
        {
            id: 'date_order',
            label: 'Order Date'
        },
        {
            id: 'total',
            label: 'Total'
        }
    ];

    //table row styles
    const styles = {
        fontSize: '20px',
        cursor: 'pointer',
        width: '25%',
    };

    useEffect(() => { // set the body css style
        document.body.classList.add('paymentHistory');
        document.body.classList.remove('home');
        return () => {
        };
    }, []);

    let {authTokens, staff} = useContext(AuthContext)
    const[orders, setOrders] = useState([]);
    const[page, setPage]= useState(0);
    const[total, setTotal]=useState(0);
    const[rowsPerPage]=useState(5);
    const[count] = useState(5);
    const [loading,setLoading] = useState(true)

    let getOrder = async () => {
        try{
            const response = await fetch(Config.SERVER_URL+'/api/order/?page='+(page+1)+'&size='+count, {
                method: "GET",
                headers:{
                    'Content-Type':'application/json',
                    'Authorization':'Bearer ' + String(authTokens.access)
                },
            });

            if(response.status === 200){
                setLoading(false)
                const data = await response.json();
                setOrders(data?.results);
                setTotal(data?.count);

            }else if (response.status === 404) {
                setLoading(false)
            }else {
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
    let getOrderStaff = async () => {
        try{
            const response = await fetch(Config.SERVER_URL+'/api/staff_order/?page='+(page+1)+'&size='+count, {
                method: "GET",
                headers:{
                    'Content-Type':'application/json',
                    'Authorization':'Bearer ' + String(authTokens.access)
                },
            });

            if(response.status === 200){
                setLoading(false)
                const data = await response.json();
                setOrders(data?.results);
                setTotal(data?.count);

            }else if (response.status === 404) {
                setLoading(false)
            }else {
                setLoading(false)
                alert("Something Wrong")
            }
        }catch (err){
            setLoading(false)
            console.log(err);
            alert(err)
        }
    }

    //fetch data with specific size when page changed
    useEffect(()=> {
        if (staff) {
            getOrderStaff();
        } else {
            getOrder();
        }
    },[page])

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    //format different value
    const formatText = (columnName, row) => {
        switch (columnName) {
            case 'total':
                return `$${row.total}`;
            case 'transaction_id':
                return `#${row.transaction_id}`;
            case 'id':
                return row.id;
            default:
                return row.date_order;
        }
    };

    //display when the history is empty
    let NoOrderHistory = () => {
        return (
            <div>
                <Navbar/>
                <div id="payment">
                    <h2>No Order History</h2>
                    <NavLink to='/' className="button">Go back to homepage</NavLink>
                </div>
            </div>
        )
    }

    function DisplayOrders() {
        return(
            <div style={{ maxWidth: '100%', overflowX: 'auto' }}>
                {loading? <Backdrop
                    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open>
                    <CircularProgress color="inherit" />
                </Backdrop>: loading}
                <div className="head" style={{width: "fit-content", margin: "auto",}}>
                    <h2>Order History</h2>
                </div>
            <TableContainer style={{ maxWidth: '100%', overflowX: 'auto' }} >
                <Navbar/>
                <Table style={{ width: 800 }}  aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            {columns.map((column, index) => {
                                const {label} = column;
                                return (
                                    <TableCell key={index} style={styles} align="center">
                                        {label}
                                    </TableCell>
                                )
                            })}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {(Array.isArray(orders) && orders.length >0) && orders.map((row, index) => {
                            return(
                                <TableRow key={index} onClick={()=>paymentDetail(row.id)}>
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
                        <TableRow>
                            <TablePagination count={total} page={page} onPageChange={handleChangePage}
                                             rowsPerPageOptions = {[5]}   rowsPerPage={rowsPerPage}/>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
            </div>
        )
    }

    if(orders ===[]){
        return NoOrderHistory()
    }else{
        return DisplayOrders()
    }
}

export default PaymentHistory;
