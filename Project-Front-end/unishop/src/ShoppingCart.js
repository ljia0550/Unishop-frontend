

import React, {useEffect, useState} from 'react';
import "./css/ShoppingCartStyle.css"
import NavBar from "./NavBar";
import {NavLink} from "react-router-dom";
import {useContext} from "react";
import AuthContext from "./context/AuthContext";
import Config from './config.json'

import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';



function total_price(jsonArray){ // calculate the total price
    let total = 0
    for(let i = 0; i < jsonArray.length; i++){
        total = total + jsonArray[i].price * jsonArray[i].quantity
    }
    return total
}
const ShoppingCart = () => {
    const [loading,setLoading] = useState(true)
    let {authTokens} = useContext(AuthContext)
    const [products, setProducts] = useState([])
    let fetchShoppingCartItems = async () => {
        setLoading(true)
        try{
            const response = await fetch('http://127.0.0.1:8000/api/shoppingcart', {
                method: "GET",
                headers:{
                    'Content-Type':'application/json',
                    'Authorization': 'Bearer ' + String(authTokens.access)
                }
            });
            const resJson = await response.json();
            if(response.status === 200){
                setProducts(resJson)
                setLoading(false)
            }else{
                setLoading(false)
                alert('Something went wrong!')
            }
        }catch (err){
            setLoading(false)
            console.log(err);
            alert(err)
        }
    }

    let updateShoppingCartItems = async () => {
        setLoading(true)
        try{
            const response = await fetch('http://127.0.0.1:8000/api/shoppingcart/', {
                method: "PUT",
                headers:{
                    'Content-Type':'application/json',
                    'Authorization': 'Bearer ' + String(authTokens.access)
                },
                body:JSON.stringify({
                    'items':products
                })
            });

            if(response.status === 200){
                setLoading(false)
            }else{
                setLoading(false)
                alert('Something went wrong!')
            }
        }catch (err){
            setLoading(false)
            console.log(err);
            alert(err)
        }
    }


    useEffect(()=> {
        fetchShoppingCartItems();
    },[])

    useEffect(() => { // set the body css style
        // 👇 add class to body element
        document.body.classList.remove('home');
        document.body.classList.add('cart');


        return () => {
        };
    }, []);

    return(
        <div>
            {/*Loading backdrop component*/}
            {loading? <Backdrop
                sx={{ color: '#a84949', zIndex: (theme) => theme.zIndex.drawer + 1 }} open>
                <CircularProgress color="inherit" />
            </Backdrop>: loading}
            <>
                <NavBar/>
                <div className="Cart-Container">
                    <div className="Header">
                        <h3 className="Heading">Shopping Cart</h3>
                    </div>
                    {products.map((item,index) => {
                        return (
                            <div className="Cart-Items" key={index}>
                                <div className="image-box">
                                    <img src={Config.SERVER_URL + "/" + item.image} height="100" width="100"/>
                                </div>
                                <div className="about">
                                    <h1 className="title">{item.name}</h1>
                                </div>
                                <div className="counter">
                                    <input
                                        className="quantity_input" type={"number"} min="0"
                                        required="required"
                                        defaultValue={item.quantity}
                                        onChange={(e) => {
                                            item.quantity=e.target.value
                                            updateShoppingCartItems()
                                        }}/>
                                    <span className= "pieces">&nbsp;pcs&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                                    <div className="count">unit price:&nbsp;&nbsp;${item.price}</div>
                                </div>
                                <div className="prices">${item.price*item.quantity}</div>
                            </div>
                        );
                    })}
                    <div className="checkout">
                        <div className="total">
                            <div>
                                <div className="Subtotal">Total</div>
                            </div>
                            <div className="total-amount">${total_price(products)}</div>
                        </div>
                        <NavLink to='/payment' className="button">Pay</NavLink>
                    </div>
                </div>
            </>
        </div>

    );
}

export default ShoppingCart;