import './css/loginAndRegister.css'
import {useState} from "react";
import {useNavigate} from "react-router-dom";
function Register() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");

    let navigate = useNavigate();
    //post register info
    let handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const response = await fetch('http://127.0.0.1:8000/api/register/', {
                method: "POST",
                body: JSON.stringify({
                    username: username,
                    password: password,
                    email: email,
                    first_name: firstName,
                    last_name: lastName,
                })
            });

            const resJson = await response.json();
            if(response.status === 201){
                navigate('/login')
                alert('Register successfully!')
            }else{
                alert('Something went wrong!')
            }
        }catch (err){
            console.log(err);
            alert(err)
        }
    }
    return (
        <div id="login">
            <title>Register</title>
            <h1>UniShop</h1>
            <form onSubmit={handleSubmit}>
                <input className="input" type="text" required="required" placeholder="Username"
                       onChange={(e) => setUsername(e.target.value)}/>
                <input className="input" type="text" required="required" placeholder="Password"
                       onChange={(e) => setPassword(e.target.value)}/>
                <input className="input" type="text" required="required" placeholder="Email"
                       onChange={(e) => setEmail(e.target.value)}/>
                <input className="input" type="text" required="required" placeholder="FirstName"
                       onChange={(e) => setFirstName(e.target.value)}/>
                <input className="input" type="text" required="required" placeholder="LastName"
                       onChange={(e) => setLastName(e.target.value)}/>
                <button className="button" type="submit">Register</button>
            </form>
        </div>
    );
}

export default Register;
