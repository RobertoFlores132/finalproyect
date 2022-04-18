import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import '../styles/styles.css';
import { fitlerCategoryThunk, 
         getProductsThunk, 
         getCategoriesThunk, 
         filterNameThunk } from '../redux/actions';
import { Link } from 'react-router-dom';

const Home = () => {

    const dispatch = useDispatch();
    const [ title, setTitle ] = useState("");
    const products = useSelector(state => state.products);
    const categories = useSelector(state => state.categories);
    
    const searchProduct = e => {
        e.preventDefault();
        dispatch(filterNameThunk(title));
    }

    useEffect(() => {
        dispatch(getProductsThunk());
        dispatch(getCategoriesThunk());
    }, [])

    return (
        <div className='home-container'>
           
            
            
           <div className='menu'>
               <h3>Categoría</h3>
            {
                categories.map(category => (
                    <button 
                    key={category.id}
                    onClick={() => dispatch(fitlerCategoryThunk(category.id))}
                    > {category.name}</button>
                ))
            } 
           </div>

           <div className='products-list'>
                <form onSubmit={searchProduct}>
                    <input 
                    type="text" 
                    placeholder='Buscar producto por nombre'
                    onChange={e => setTitle(e.target.value)}
                    value={title}
                    />
                    <button className='btn-search'><i class="fa-solid fa-magnifying-glass"></i></button>
                </form>
                <div className='products-list-cards'>
                    {
                        products.length === 0 ? (
                            <p>No se encontraron productos</p>
                        ) : (
                        
                        products.map(productItem => (
                            <div className='products-list-container' key={productItem.id}>
                                <Link to={`/product/${productItem.id}`}><img src={productItem.productImgs} alt="" /></Link>
                                <div className='products-list-info'>
                                    <div>
                                        <p> {productItem.title} </p>
                                        <p>Precio:</p>
                                        <p>{productItem.price}</p>
                                    </div>
                                </div>
                            </div>
                        ))
                
                        )
                    }
                </div>
            </div>
           
        </div>
    );
};

export default Home;