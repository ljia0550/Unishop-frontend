import React, {useContext, useEffect, useState} from "react";
import "./css/PageNotFound.css"
import "./css/ChangePassword.css"
import {NavLink, useNavigate} from "react-router-dom";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import AuthContext from "./context/AuthContext";
// this is the page for changing password

const ChangePassword = () =>{
    const [loading,setLoading] = useState(false)
    let {authTokens} = useContext(AuthContext)
    const navigate = useNavigate();

    let handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const response = await fetch('http://127.0.0.1:8000/api/change_password/', {
                method: "PUT",
                headers:{
                    'Content-Type':'application/json',
                    'Authorization': 'Bearer ' + String(authTokens.access)
                },
                body: JSON.stringify({
                    'password': e.target.password.value,
                    'password2': e.target.password2.value,
                    'old_password': e.target.old_password.value
                })
            });
            setLoading(true)
            const resJson = await response.json();
            if(response.status === 200){
                setLoading(false)
                alert('Change password successfully!')
                navigate('/profile')
            }
            else if (response.status === 400){
                setLoading(false)
                alert(JSON.stringify(resJson))
            }
            else{
                setLoading(false)
                alert('Something went wrong!')
            }
        }catch (err){
            setLoading(false)
            console.log(err);
            alert(err)
        }
    }

    return(
        <div className= "changePassword">
            {/*Loading backdrop component*/}
            {loading? <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open>
                <CircularProgress color="inherit" />
            </Backdrop>: loading}

            <h2 align={"center"}>Change your password </h2>
            <form onSubmit={handleSubmit}>
                <input className="input"
                       type="password"
                       required="required"
                       placeholder="Enter your old Password"
                       name="old_password"
                       align={"center"}

                />
                <input className="input"
                       type="password"
                       required="required"
                       placeholder="Enter new Password"
                       name="password"
                       align={"center"}

                />
                <input className="input"
                       type="password"
                       required="required"
                       placeholder="Enter new Password again"
                       name="password2"
                       align={"center"}

                />
                <button className="confirm_button" >Confirm</button>
            </form>

        </div>
    );

}

export default ChangePassword;