import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import '../css/Login.css'; // Adjust the path as necessary

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setErrorMessage(''); // Reset error message

        try {
            const response = await axios.post('http://localhost:8080/Login', {
                username: username,
                password: password,
            });

            // If login is successful, redirect to home or another page
            console.log('Response:', response.data);
            //navigate('/'); // Change this to the appropriate route

        } catch (error) {
            if (error.response) {
                // Set the error message based on the response
                setErrorMessage(error.response.data);
            } else {
                setErrorMessage('An error occurred. Please try again.');
            }
        }
    };

    return (
        <div className="login-container">
            <Navbar />
            <div className='text-box'>
                <h1>Login</h1>
                {errorMessage && <p className="error">{errorMessage}</p>}
                <form onSubmit={handleLogin}>
                    <input 
                        type='text' 
                        placeholder='Username' 
                        className='input' 
                        value={username} 
                        onChange={(e) => setUsername(e.target.value)} 
                    />
                    <input 
                        type="password" 
                        placeholder='Password' 
                        className="input" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                    />
                    <button type="submit" className="button">Login</button>
                </form>
                <h4>Or</h4>
                <button type='button' className='button small' onClick={() => navigate('/Register')}>Register</button>
            </div>
        </div>
    );
};

export default Login;
