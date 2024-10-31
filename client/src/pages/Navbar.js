import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../css/Navbar.css'

function Navbar({active = null}){
    const location = useLocation();
    console.log(location.pathname)
    return (
    <div className="navbar">
        <Link to={'/'} className={location.pathname == '/' ? "active" : ""}>Home</Link>
        <div className='navbar-right'>
            <div className="dropdown">
                <Link className={location.pathname == '/Login'? "dropbtn active": "dropbtn"} to={'/Login'}>Log In</Link>
            </div>
            <Link className={location.pathname == '/Register' ? "active" : ""} to={'/Register'}>Register</Link>
        </div>
    </div>
    )
}

export default Navbar;  