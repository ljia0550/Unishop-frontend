import './css/loginAndRegister.css'
import './css/product.css'
import React, {useContext, useEffect} from "react";
import {useState} from "react";
import Navbar from "./NavBar";
import {useParams} from "react-router";
import AuthContext from "./context/AuthContext";
import Config from './config.json'
import {useNavigate} from "react-router-dom";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";


function Product(){
    const { productId } = useParams()
    let {authTokens} = useContext(AuthContext)
    const [loading,setLoading] = useState(true)
    const [name, setName] = useState()
    const [price, setPrice] = useState()
    const [description, setDescription] = useState()
    const [image, setImage] = useState()
    const navigate = useNavigate();

    let getProduct = async (e )=> {
        let response = await fetch(Config.SERVER_URL+'/api/product/'+productId, {
            method:'GET',
            headers:{
                'Content-Type':'application/json',
                'Authorization':'Bearer ' + String(authTokens.access)
            },
        })
        if(response.status === 200){
            setLoading(false)
            let data = await response.json()
            setName(data?.name)
            setPrice(data?.price)
            setDescription(data?.description)
            setImage(data?.image)
        }else if(response.status === 404) {
            setLoading(false)
            navigate('/404')
        }
        else{
            setLoading(false)
            alert('Something went wrong!')
        }
    }

    let addToCart = async (e )=> {
        let response = await fetch(Config.SERVER_URL+'/api/product/' + productId + '/add/', {
            method:'POST',
            headers:{
                'Content-Type':'application/json',
                'Authorization':'Bearer ' + String(authTokens.access)
            },
        })

        if(response.status === 201){
            setLoading(false)
            alert('Added')
        }else if(response.status === 400) {
            setLoading(false)
            alert('You can only add 5 different products in the shopping cart')
        }
        else{
            setLoading(false)
            alert('Something went wrong!')
        }
    }

    useEffect(() => {
        // 👇 add class to body element
        document.body.classList.add('login_background'); // apply the body css style
        return () => {
        };

    }, []);

    useEffect(()=> {
        getProduct()
    },[])

    return (
        <main className="container">
            {loading? <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open>
                <CircularProgress color="inherit" />
            </Backdrop>: loading}
            <Navbar/>
            <div className="left-column">
                <img className="image" src={Config.SERVER_URL+image}  alt="iamge Here"/>
            </div>

            <div className="right-column">

                <div className="product-description">
                    <h1>{name}</h1>
                    <p>{description}</p>
                </div>

                <div className="product-price">
                    <span>{price}$&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                    <button className="button_product" onClick={addToCart}>Add to cart</button>
                </div>
            </div>
        </main>
    );
}

export default Product;
