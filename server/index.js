const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors');
const { initializeApp } = require('firebase/app')
const { getDatabase, get, set, ref } = require('firebase/database');
const bcrypt = require('bcrypt');

const firebaseConfig = {
    apiKey: "AIzaSyCFCWpljnhH6mt83rd9JPdUqFshc5EPplg",
    authDomain: "reactchat-6d38f.firebaseapp.com",
    databaseURL: "https://reactchat-6d38f-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "reactchat-6d38f",
    storageBucket: "reactchat-6d38f.appspot.com",
    messagingSenderId: "664476639691",
    appId: "1:664476639691:web:edab4630f72f260686964e",
    databaseURL: "https://reactchat-6d38f-default-rtdb.asia-southeast1.firebasedatabase.app/",
  };

initializeApp(firebaseConfig);

const app = express();
const PORT = 8080;
app.use(cors());
app.use(bodyParser.json())
const databse = getDatabase();

app.post('/Register', async (req, res) => {
    function makeUserId(){
        let minm = 1e17;
        let maxm = 1e18;
        return Math.floor(Math.random() * (maxm - minm + 1)) + minm
    }

    const { username, password } = req.body;
    const usernameRef = ref(databse, 'usernames/' + username);

    try {
        const usernameSnapshot = await get(usernameRef);
        if (usernameSnapshot.exists()){
            return res.status(400).send('Username already taken');
        }

        const userID = makeUserId();
        const saltRounds = 10;
        const hashedPasswords = bcrypt.hash(password, saltRounds);

        const userRef = ref(databse, 'users/' + userID);
        const userData = {
            username: username,
            password: hashedPasswords
        };
        await set(userRef, userData);
        await set(usernameRef, userID);

        res.status(201).send('User registered successfully!');
    }catch(error){
        console.error('Error registering user:', error);
        res.status(500).send('Error registering user');
    }
})

app.post('/api', async (req, res) => {
    const { username, password } = req.body;
    res.status(201).send(`Recieved Message: ${username.data}`);

})

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
})