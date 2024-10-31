import '../css/Navbar.css';
import axios from 'axios';
import Navbar from './Navbar';

const apiCall = async () => {
    try{
        const response = await axios.post('http://localhost:8080/api', {
            username: 'test',
            password: 'password'
        });
        console.log(`Recieved!`);
    }catch(error){
        console.error(`Something went wrong... ${error}`);
    }
};

function Home(){
    const username = '';
    return(
        <div className="HomeDiv">
            <Navbar />
            <button type='submit' onClick={apiCall}>Make API call</button>
        </div>
    )
}

export default Home;