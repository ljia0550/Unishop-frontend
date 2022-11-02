import React, {useContext} from 'react';
import './css/NavBarElement.css'
import {Link, NavLink} from "react-router-dom";
import {
    AiOutlineClockCircle,
    AiOutlineHome, AiOutlineLogin,
    AiOutlineLogout,
    AiOutlineShoppingCart,
    AiOutlineUser
} from "react-icons/ai";
import AuthContext from "./context/AuthContext";

const NavBar = (props) => {
    let {user, staff, logoutUser} = useContext(AuthContext)

    function logout(){ // pop up alert
        alert("Logout successfully!")
    }
    return (
        <div id='section'>
            {staff ? (
                <NavLink to ='/paymentHistory'><AiOutlineClockCircle/>&nbsp;Payment History</NavLink>
            ): (
                <NavLink to ='/'><AiOutlineHome/>&nbsp;Home</NavLink>
            )}

            {staff ? (
                null
            ): (
                <NavLink to ='/profile'><AiOutlineUser/>&nbsp;Profile</NavLink>
            )}

            {staff ? (
                null
            ): (
                <NavLink to ='/shoppingCart'><AiOutlineShoppingCart/>&nbsp;Shopping Cart</NavLink>
            )}

            {staff ? (
                null
            ): (
                <NavLink to ='/paymentHistory'><AiOutlineClockCircle/>&nbsp;Payment History</NavLink>
            )}

            {user ? (
                <NavLink to="/" onClick={function(event){ logoutUser(); logout()}}>  <AiOutlineLogout/>&nbsp;Logout</NavLink>
            ): (
                <NavLink to="/login" ><AiOutlineLogin/>&nbsp;Login</NavLink>
            )}

        </div>
    );
};
export default NavBar;
