import '../css/Login.css';
import axios from 'axios';
import Navbar from './Navbar';
import { Link } from 'react-router-dom';

function Login(){
    return(
        <div className='Login-Page'>
        <Navbar />
        <div className='text-box'>
            <h1>Login</h1>
            <form>
                <input type='text' placeholder='Username' className='input' />
                <input type="password" placeholder="Password" className="input" />
                <button type="submit" className="button">Login</button>
            </form>
            <h4>Or</h4>
            <Link to='/Register'><button type='submit' className='button small' >Create Account</button> </Link>
        </div>
        </div>
    )
}

export default Login;