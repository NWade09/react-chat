import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../css/Navbar.css'

function Navbar({active = null}){
    const location = useLocation();
    const sessionData = JSON.parse(sessionStorage.getItem('sessionData'));

    return (
    <div className="navbar">
        <Link to={'/'} className={location.pathname === '/' ? "active" : ""}>Home</Link>
        {sessionData ?
            <div className='navbar-right'>
                <div className='dropdown'>
                <Link>Log out</Link>
                </div>

            </div> : 
            <div className='navbar-right'>
            <div className="dropdown">

                <Link className={location.pathname === '/Login'? "dropbtn active": "dropbtn"} to={'/Login'}>Log In</Link>
            </div>
            <Link className={location.pathname === '/Register' ? "active" : ""} to={'/Register'}>Register</Link>
            
        </div>}
    </div>
    )
}

export default Navbar;  