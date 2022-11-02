import React from "react";
import "./css/PageNotFound.css"
import {NavLink} from "react-router-dom";
// this is the page for not found product
const PageNotFound = () =>{
    return(
        <body>
        <div>
            <p className={"logo404"}>UniShop</p>
            <h1 className={"h1_404"}>404</h1>
            <br/>
            <h2 className={"h2_404"}> Page Not Found!</h2>
            <p className={"p_404"}>The page you are looking for does not exist.</p>
            <p className={"p_404"}>Click the button below to go back to the homepage.</p>
            <br/>
            <NavLink to='/' className="button_404">Home</NavLink>
        </div>
        </body>

    );
}

export default PageNotFound;