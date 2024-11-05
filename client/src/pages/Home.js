import React, { useEffect } from 'react';
import '../css/Navbar.css'
import Navbar from '../components/Navbar';

function Home() {
    useEffect(() => {
        const sessionData = JSON.parse(sessionStorage.getItem('sessionData'));
        console.log('Session Data from sessionStorage:', sessionData);
    }, []);
    return (
        <div>
            <Navbar />
            <h1>Home Page</h1>
            <button onClick={() => console.log('Session Data:', JSON.parse(sessionStorage.getItem('sessionData')))}>
                Get Session Details
            </button>
        </div>
    );
}

export default Home;
