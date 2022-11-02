import './css/loginAndRegister.css'
import './css/profile.css'
import './css/Payment.css'
import React, {useContext, useEffect, useState} from "react";
import Navbar from "./NavBar";
import {NavLink} from "react-router-dom";
import Config from "./config.json";
import AuthContext from "./context/AuthContext";


const Payment = () => {
    const [successfullyPaid, setSuccessfullyPaid] = useState(false);
    let {authTokens} = useContext(AuthContext)

    //clear current shopping cart after payment
    let checkout = async ()=> {
        let response = await fetch(Config.SERVER_URL+'/api/checkout/', {
            method:'PUT',
            headers:{
                'Content-Type':'application/json',
                'Authorization':'Bearer ' + String(authTokens.access)
            },
        })

        if(response.status === 200){

        }else if(response.status === 401) {
            alert('Wrong')
        }
        else{

            alert('Something went wrong!')
        }
    }
    useEffect(() => { // set the body css style
        document.body.classList.add('paymentHistory');
        document.body.classList.remove('home');
        return () => {
        };
    }, []);
    //display payment successful
    let SuccessfulPayment = () => {
        return (
            <div>
                <title>Credit Card Payment</title>
                <Navbar/>
                <div id="payment">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/3/3b/Eo_circle_green_checkmark.svg" height="100"
                         width= "100" alt="green tick" />
                    <h2>Payment Successful</h2>
                    <NavLink to='/' className="button">Go back to homepage</NavLink>
                </div>
            </div>
        )
    }

    //show payment card
    let PaymentOn = () => {
        return (
            <div>
                <title>Credit Card Payment</title>
                <Navbar/>
                <div id="profile">
                    <h1>Credit Card Details</h1>
                    <form onSubmit={checkStateSuccess}>
                        Card Number<input name="cardNumber"  className="input1" type="text" required="required"
                                          placeholder="16 digits" pattern="[0-9]{16}" title="Invalid Card Number"
                                          />
                        Expire Date<input className="input1" type="text" required="required" placeholder="MM/YY"
                                          pattern="(?:0[1-9]|1[0-2])/[0-9]{2}" title={"Invalid Expire Date"}
                                          />
                        CVC<input className="input1" type="text" required="required" placeholder="XXX"
                                  pattern="[0-9]{3}" title="Invalid CVC"
                                  />
                        <button className="button" type="submit"> Pay Now</button>
                    </form>
                </div>
            </div>
        )
    }

    //check payment success
    let checkStateSuccess = (e) => {
        e.preventDefault()
        setSuccessfullyPaid( true);
        checkout()
    }

    if (successfullyPaid) {
        return SuccessfulPayment()
    } else {
        return PaymentOn()
    }
}

export default Payment;
