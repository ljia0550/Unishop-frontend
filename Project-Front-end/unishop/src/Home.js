import './css/Home.css'
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import Navbar from "./NavBar";
import Config from './config.json'
import { TablePagination } from '@material-ui/core';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';



const Home = () => {
    const [loading, setLoading] = useState(true) // set the loading state

    const [products, setProducts] = useState([])
    const [total, setTotal] = useState(0)
    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(10);
    const [pageClass] = useState("page");
    const [search, setSearch] = useState(false);
    const [searchKey, setSearchKey] = useState('')
    const [sortProduct, setSortProduct] = useState('sort') 
    const [sortProducts, setSortProducts] = useState(['sort','price: low-high','price: high-low']) 
    console.log()

    let fetchProducts = async () => { // get the json array of products
        setLoading(true)
        let url = 'http://127.0.0.1:8000/api/products?page=' + (page + 1) + '&size=' + pageSize;
            if (sortProduct == 'price: low-high') {
                url = url + "&sort=price"
            } else if (sortProduct == 'price: high-low') {
                url = url + "&sort=-price"
            }
        console.log('home url:' + url )
        try {
            const response = await fetch(url, {
                method: "GET"


            });
            const resJson = await response.json();
            if (response.status === 200) {
                setProducts(resJson.results);
                setTotal(resJson.count);
                setLoading(false)
            } else {
                alert('Something went wrong!')
            }
        } catch (err) {
            console.log(err);
            alert(err)
        }
    }

    let startSearchProducts = async (e) => {
        setLoading(true)
        e.preventDefault()
        setSearchKey(e.target[0].value)
        console.log("e:", e)
        console.log(e.target[0].value)
        setPage(0);
        console.log('http://127.0.0.1:8000/api/products/?search=' + e.target[0].value + '&page=' + (page + 1) + '&size=' + pageSize)
        try {
            const response = await fetch('http://127.0.0.1:8000/api/products/?search=' + e.target[0].value + '&page=' + (page + 1) + '&size=' + pageSize, {
                method: "GET"

            });
            const resJson = await response.json();
            if (response.status === 200) {
                console.log(resJson)
                setProducts(resJson.results);
                setTotal(resJson.count);
                setSearch(true);
                setLoading(false)
            } else {
                alert('Something went wrong!')
            }
        } catch (err) {
            console.log(err);
            alert(err)
        }
    }

    let searchProducts = async (e) => { // search function

        try {
            let url = 'http://127.0.0.1:8000/api/products/?search=' + searchKey + '&page=' + (page + 1) + '&size=' + pageSize;
            if (sortProduct == 'price: low-high') {
                url = url + "&sort=price"
            } else if (sortProduct == 'price: high-low') {
                url = url + "&sort=-price"
            }
            console.log('search products url:' ,url)
            const response = await fetch(url, {
                method: "GET"

            });
            const resJson = await response.json();
            if (response.status === 200) {
                setProducts(resJson.results);
                setTotal(resJson.count);
                setSearch(true);
                setLoading(false)
            } else {
                alert('Something went wrong!')
            }
        } catch (err) {
            console.log(err);
            alert(err)
        }
    }
    const handleChangePage = (event, newPage) => {
        setPage(newPage);

    };



    useEffect(() => {
        if (search) {
            console.log("search")
            searchProducts();

        } else {

            console.log("fetch")
            fetchProducts();

        }

    }, [page,sortProduct])

    useEffect(() => {
        // 👇 add class to body element
        document.body.classList.add('home'); // apply the body css style
        return () => {
        };

    }, []);




    return (
        <div id="home_Products">
            {/*Loading backdrop component*/}
            {loading ? <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open>
                <CircularProgress color="inherit" />
            </Backdrop> : loading}

            {/* <title>Products</title> */}
            <Navbar />
            <div className='home_title'>UniShop</div>


            <select className='sortProducts' value={sortProduct} onChange={
                
                (e) => setSortProduct(e.target.value)}>
                {
                    // loop option
                    sortProducts.map((ele, index) => {
                        return (
                            <option key={index}>
                                {ele}
                                </option>
                        )
                    })
                }
            </select>


            <form className='home_form' onSubmit={startSearchProducts}>
                <input name='searchKeyword' className='home_input' type="text"></input>
                <button className='home_button' type='submit'>Search</button>
            </form>

            <div className='home_products-box'>
                {/*iterate the array*/}
                {
                    products.map((item, idx) => (
                        <NavLink key={idx} className='home_product' to={'/product/' + item.id}>
                            <div key={idx} className='home_single-product'>
                                <img src={Config.SERVER_URL + item.image} className='product-img' height="50%" width="100%" />
                                <div className='home_name'>{item.name}</div>
                                <div className='home_price'>${item.price}</div>
                            </div>
                        </NavLink>
                    ))

                }
            </div>
            {/*This is pagination component*/}
            <TablePagination className={pageClass} count={total} page={page}
                onPageChange={handleChangePage} rowsPerPage={pageSize} rowsPerPageOptions={[10]}
            />

        </div>

    );


}
export default Home;
