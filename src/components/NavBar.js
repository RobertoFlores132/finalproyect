import { type } from '@testing-library/user-event/dist/type';
import axios from 'axios';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getCartThunk, loginThunk } from '../redux/actions';
import { Link } from 'react-router-dom';
import navbar from '../styles/navbar.css'
import Cart from './Cart';

const NavBar = () => {

    const [ isLoginOpen, setIsLoginOpen ] = useState(false);
    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");
    const [ loginError, setLoginError ] = useState("");
    const dispatch = useDispatch();
    const [ cartIsOpen, setCartIsOpen ] = useState(false)

    const openCart = () => {
        setCartIsOpen(!cartIsOpen);
        dispatch(getCartThunk())
    } 

    const login = e => {
        e.preventDefault();
        const credentials = {email, password}
        dispatch(loginThunk(credentials))
        .then(res => {
            localStorage.setItem("token", res.data.data.token);
            setLoginError("");
            setIsLoginOpen(false);
            })
        .catch(error => {
            setLoginError(error.response.data.message)
        })
    }

    return (
        <div className='navbar'>
            <nav>
                <Link to={'/'}><strong>e-commerce</strong></Link> 
                <div>
                    <button onClick={() => setIsLoginOpen(!isLoginOpen)}>
                    <i class="fa-solid fa-user"></i>
                    </button>
                    <button onClick={openCart}>
                    <i class="fa-solid fa-cart-shopping"></i>
                    </button>
                </div>
                
            </nav>

            
                    <form onSubmit={login} className={`login ${isLoginOpen ? 'open' : ''}`}>

                        {
                            localStorage.getItem("token") ? (
                            <button type="button" onClick={() => localStorage.setItem("token", "")}>
                                Cerrar Sesión
                            </button>
                             ) : (
                           <div className='login-open'>
                               <h3>Credenciales de prueba:</h3>
                               <p><b>Email: </b>test3@gmail.com</p>
                               <p><b>Contraseña:</b>pass1234</p>
                                <input 
                                    type="email" 
                                    placeholder='e-mail'
                                    onChange={e => setEmail(e.target.value)}
                                    value={email}
                                />
                                <input 
                                    type="password" 
                                    placeholder='Contraseña'
                                    onChange={e => setPassword(e.target.value)}
                                    value={password}
                                />
                                <button>Enviar</button>
                                <p>{loginError}</p> 
                            </div>
                        
                        )
                            
                        }
        
                        
                </form>

            <Cart cartIsOpen = {cartIsOpen}/>
            
        </div>
    );
};

export default NavBar;