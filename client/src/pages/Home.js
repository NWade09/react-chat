import '../css/Navbar.css';
import Navbar from './Navbar';

function Home(){
    return(
        <div className="HomeDiv">
            <Navbar />
            <button type='submit'>Make API call</button>
        </div>
    )
}

export default Home;