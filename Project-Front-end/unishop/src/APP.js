import React, {Fragment} from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from "./Login";
import Register from "./Register";
import NavBar from "./NavBar";
import ChangePassword from "./ChangePassword";
import Profile from "./Profile";
import Home from "./Home";
import Payment from "./Payment";
import Product from "./Product";
import PrivateRoute from "./utils/PrivateRoute";
import {AuthProvider} from "./context/AuthContext";
import ShoppingCart from "./ShoppingCart";
import PaymentHistory from "./PaymentHistory";
import PageNotFound from "./PageNotFound";
import PaymentDetail from "./PaymentDetail"

function App(){
    return(
        <div>
            <Router>
                    <Routes>
                        {/*<Header/>*/}
                            <Route element={<AuthProvider/>}>
                                <Route exact path='/' element={<Home />} />
                                <Route path='/login' exact element={<Login/>} />
                                <Route path='/register' element={<Register />} />
                                <Route path='/404' element={<PageNotFound/>}/>
                                <Route path='*' element={<PageNotFound/>}/>
                                <Route element={<PrivateRoute/>}>
                                    <Route path='/product/:productId' element={<Product/>}/>
                                    <Route path='/profile' element={<Profile/>}/>
                                    <Route path='/shoppingCart' element={<ShoppingCart/>}/>
                                    <Route path='/payment' element={<Payment/>}/>
                                    <Route path='/paymentHistory' element={<PaymentHistory/>}/>
                                    <Route path='/paymentDetail/:order_id' element={<PaymentDetail/>}/>
                                    <Route path='/changePassword' element={<ChangePassword/>}/>
                                </Route>
                            </Route>
                    </Routes>
            </Router>
        </div>
    );
}

export default App;
