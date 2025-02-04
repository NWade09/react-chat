const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors');
const { initializeApp } = require('firebase/app')
const { getDatabase, get, set, ref } = require('firebase/database');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const session = require('express-session');
function generateSessionId(){ return crypto.randomBytes(16).toString('hex');}

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

const sessionConfig = {
    secret: generateSessionId(),
    resave: true,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        secure: false,
        sameSite: 'lax'
    },
}

initializeApp(firebaseConfig);

const app = express();
const database = getDatabase();
const PORT = 8080;

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));
app.use(bodyParser.json())
app.use(session(sessionConfig))

app.post('/Register', async (req, res) => {
    function makeUserId(){
        let minm = 1e17;
        let maxm = 1e18;
        return Math.floor(Math.random() * (maxm - minm + 1)) + minm
    }

    const { username, password } = req.body;
    const usernameRef = ref(database, 'usernames/' + username);

    try {
        const usernameSnapshot = await get(usernameRef);
        if (usernameSnapshot.exists()){
            return res.status(400).send('Username already taken');
        }

        const userID = makeUserId();
        const saltRounds = 10;
        const hashedPasswords = await bcrypt.hash(password, saltRounds);

        const userRef = ref(database, 'users/' + userID);
        const userData = {
            username: username,
            password: hashedPasswords
        };

        console.log(userData)
        await set(userRef, userData);
        await set(usernameRef, userID);

        res.status(201).send('User registered successfully!');

    }catch(error){
        console.error('Error registering user:', error);
        res.status(500).send('Error registering user');
    }
})

app.post('/Login', async (req, res) => {
    const { username, password } = req.body;
    const usernameRef = ref(database, 'usernames/' + username);
    
    try {
        const usernameSnapshot = await get(usernameRef);
        if (!usernameSnapshot.exists()) {
            return res.status(401).send('Invalid username or password');
        }

        const userID = usernameSnapshot.val();
        const userRef = ref(database, 'users/' + userID);
        const userSnapshot = await get(userRef);

        if (userSnapshot.exists()) {
            const user = userSnapshot.val();
            const passwordMatch = await bcrypt.compare(password, user.password);
            if (passwordMatch) {
                req.session.userID = userID;
                req.session.username = username;
                req.session.save();
                return res.status(200).json({
                    message: 'Login successful',
                    sessionData: {
                        userID: req.session.userID,
                        username: req.session.username
                    }
                });
            }
        }
        
        res.status(401).send('Invalid username or password');
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).send('Error logging in');
    }
});

app.get('/session-details', (req, res) => {
    if (req.session.userID && req.session.username) {
        // Send session data as JSON
        res.json({
            userID: req.session.userID,
            username: req.session.username
        });
    } else {
        console.log(req.session)
        res.status(401).send('No session data found');
    }
});
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
})