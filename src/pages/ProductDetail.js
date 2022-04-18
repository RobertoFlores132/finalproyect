import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {  addProductThunk, getProductsThunk } from '../redux/actions';
import { Link } from 'react-router-dom';
import '../styles/productdetail.css'

const ProductDetail = () => {

    const {id} = useParams();

    const dispatch = useDispatch();

    const products = useSelector(state => state.products);
    
    const productsFound = products.find(productsItem => productsItem.id === Number(id));

    const [ productsFiltered, setProductsFiltered ] = useState([]);
    const [ quantity, setQuantity ] = useState(0);

    useEffect(() => {
        dispatch(getProductsThunk());
    }, []);

    useEffect(() => {
        if(productsFound){
           axios.get(`https://ecommerce-api-react.herokuapp.com/api/v1/products?category=${productsFound?.category.id}`)
        .then(res => setProductsFiltered(res.data.data.products)); 
        }
    }, [dispatch, productsFound]);

    const addProduct = () => {
        const products = {
            id,
            quantity
        }

        dispatch(addProductThunk(products))
    }

    return (
        <div className='product-description'>
            <div className='product-name'>
                <h1>{productsFound?.title}</h1>
            </div>
            <div className='product-image'>
                <img src={productsFound?.productImgs} alt="" />
            </div>
            <div className='product-characteristics'>
                <h3>{productsFound?.description}</h3>
                <h3>Precio: {productsFound?.price}</h3> 
                <label htmlFor="quantity"></label> 
                <span>Cantidad:</span> 
                <input type="number" 
                id='add'
                onChange={e => setQuantity(e.target.value)}
                vaule={quantity}
                />
            <button onClick={addProduct}>
            Agregar al carrito <i className="fa-solid fa-cart-shopping"></i>
            </button>
            </div>

            <div className='suggestions'>
               
                {
                    productsFiltered.map(productItem => (
                         <div key={productItem.id}> 
                                <div className='suggestions-image'>
                                    <Link to={`/product/${productItem.id}`}><img src={productItem.productImgs} alt="" /></Link>
                                </div>
                            <div className='suggestions-name'>
                                {productItem.title}
                                </div>
                        </div>
                    ))
                }
            </div>
            
        </div>
    );
};

export default ProductDetail;