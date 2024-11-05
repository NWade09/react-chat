import '../css/Chat.css';
import '../css/Navbar.css';
import Navbar from '../components/Navbar.js';
import { ref, push, onChildAdded } from "firebase/database";
import { useState, useEffect } from 'react';
import database from '../components/firebaseConfig';
import { useNavigate } from 'react-router-dom';

function Chat() {
    const sessionData = JSON.parse(sessionStorage.getItem('sessionData'));
    const navigate = useNavigate()
    if (!sessionData){
        navigate('/Login');
    }
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    useEffect(() => {
        const messagesRef = ref(database, 'messages');
    
        const unsubscribe = onChildAdded(messagesRef, (snapshot) => {
            const newMessage = snapshot.val();
            setMessages((prevMessages) => [...prevMessages, newMessage]);
        });
    
        // Clean up the listener when the component unmounts
        return () => unsubscribe();
    }, []);

    const sendMessage = (e) => {
        e.preventDefault();
        if (message.trim() === '') return;

        const messagesRef = ref(database, 'messages');

        push(messagesRef, {
            text: message,
            name: sessionData.username,
            timestamp: Date.now(),
        });

        setMessage('');
    };

    return (
        <div className='chat-container'>
            <Navbar />

            <ul id='messages'>
                {messages.map((msg, index) => (
                    <li key={index} className='message'>
                        <div className='message-header'>
                            <span className='message-name'>{msg.name}</span>
                            <span className='message-date'>{new Date(msg.timestamp).toLocaleString({hour12: true})}</span>
                        </div>
                        <div className='message-text'>{msg.text}</div>
                    </li>
                ))}
            </ul>

            <form className='input-container' onSubmit={sendMessage}>
                <input
                    type='text'
                    placeholder='Type a message...'
                    className='message-input'
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />
                <button type='submit' className='send-button'>Send</button>
            </form>
        </div>
    );
}

export default Chat;
