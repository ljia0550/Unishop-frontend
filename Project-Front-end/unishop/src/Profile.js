import './css/loginAndRegister.css'
import './css/profile.css'
import React, {useContext, useEffect} from "react";
import {useState} from "react";
import AuthContext from "./context/AuthContext";
import NavBar from "./NavBar";
import {AiOutlineSetting} from "react-icons/ai";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import {NavLink} from "react-router-dom";

const Profile=()=> {
    const [loading,setLoading] = useState(true)
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    let {authTokens} = useContext(AuthContext)

    //get user info using authcontext
    let getProfile = async () => {
        try{
            const response = await fetch('http://127.0.0.1:8000/api/profile/', {
                method: "GET",
                headers:{
                    'Content-Type':'application/json',
                    'Authorization':'Bearer ' + String(authTokens.access)
                },
            });

            if(response.status === 200){
                const data = await response.json();
                setUsername(data?.username)
                setEmail(data?.email)
                setFirstName(data?.first_name)
                setLastName(data?.last_name)
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

    useEffect(()=>{
        getProfile();
    },[])

    //update user info
    let updateProfile = async (e) => {
        e.preventDefault();
        try{
            const response = await fetch('http://127.0.0.1:8000/api/profile/', {
                method: "PUT",
                headers:{
                    'Content-Type':'application/json',
                    'Authorization':'Bearer ' + String(authTokens.access)
                },
                body:JSON.stringify({
                    'username':e.target.username.value,
                    'email':e.target.email.value,
                    'first_name':e.target.firstName.value,
                    'last_name':e.target.lastName.value,
                })
            });

            if(response.status === 200){
                setLoading(false)
                alert('saved!')
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

    useEffect(() => { // set the body css style
        document.body.classList.remove('home');
        document.body.classList.add('profile');
        return () => {
        };
    }, []);

    return (
        <div id="profile">
            {loading? <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open>
                <CircularProgress color="inherit" />
            </Backdrop>: loading}
            <NavBar/>
            <h2 className="logo_profile">UniShop</h2>
            <br/>
            <br/>
            <h2 className="h2_profile"><AiOutlineSetting/>&nbsp;&nbsp;&nbsp;Profile</h2>
            <form onSubmit={updateProfile}>
                Username:
                <input className="input_profile" type="text" required="required" name="username"
                       defaultValue={username} onChange={(e) => setUsername(e.target.value)}/>
                Email:
                <input className="input_profile" type="text" required="required" name="email"
                       defaultValue={email} onChange={(e) => setEmail(e.target.value)}/>
                First Name:
                <input className="input_profile" type="text" required="required" name="firstName"
                       defaultValue={firstName} onChange={(e) => setFirstName(e.target.value)}/>
                Last Name:
                <input className="input_profile" type="text" required="required" name="lastName"
                       defaultValue={lastName} onChange={(e) => setLastName(e.target.value)}/>
                <button className="button" type="submit">Save</button>
                <NavLink to='/changePassword' className="changePassword_button" >Change password</NavLink>
            </form>
        </div>
    );
}

export default Profile;
