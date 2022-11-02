import './css/loginAndRegister.css'
import React, {useState, useContext, useEffect} from "react";
import {NavLink, } from "react-router-dom";
import './css/loginAndRegister.css'
import { useNavigate } from 'react-router-dom';
import AuthContext from "./context/AuthContext";
import Navbar from "./NavBar";

const Login = () => {
    let {loginUser} = useContext(AuthContext) // jwt part
    const navigate = useNavigate();
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        // 👇 add class to body element
        document.body.classList.add('login_background'); // apply the body css style
        return () => {
        };

    }, []);

    return (
        <div id="login">
            <title>Login</title>
            <Navbar/>
            <div>
                <h1 className="logo">UniShop</h1>
                <br/>
                <br/>
                <form onSubmit={loginUser}>
                    <input className="input"
                           type="text"
                           required="required"
                           placeholder="Enter Username"
                           name="username"
                        // onChange={(e) => setUserName(e.target.value)}
                    />

                    <input className="input"
                           type="password"
                           required="required"
                           placeholder="Enter Password"
                           name="password"
                        // onChange={(e) => setPassword(e.target.value)}
                    />
                    <button className="button" type="submit">Login</button>
                </form>
            </div>
            <br/>
            <NavLink to = '/register'>Don't have an account? Register</NavLink>
        </div>
    );
}
export default Login;
