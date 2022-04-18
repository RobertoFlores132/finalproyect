import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';
import { deleteCartThunk } from '../redux/actions';
import cart from '../styles/cart.css'

const Cart = ({ cartIsOpen }) => {

    const cart = useSelector(state => state.cart)

    const navigate = useNavigate();

    const dispatch = useDispatch();

    return (
        <div className={`cart-modal ${cartIsOpen ? 'open' : ''}`}>
            <h3>Carrito</h3>
            <ul className='cart-list'>
            {
                cart.map(carts =>(
                    <li  key={carts.id} onClick={() => navigate(`/product/${carts.id}`)}>
                            <h2>{carts.title}</h2> 
                            <p> <b>Cantidad:</b>  <b>{carts.productsInCart.quantity}</b> <b>piezas</b> </p>
                            <button onClick={() => dispatch(deleteCartThunk(carts.id))}>
                                Eliminar
                            </button>
                    </li>
                ))
            }
            </ul>
        </div>
    );
};

export default Cart;