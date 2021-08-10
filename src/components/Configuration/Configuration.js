import './Configuration.css';
import Gear from './../../assets/icons/gear.png';
import { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';

const Configuration = () => {
    
    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }
    
    let random;
    
    const[rotate, setRotate] = useState(1);

    /* setInterval(() => {random = getRandomInt(1, 11); setRotate(random)}, 5000); */
    
    /* setInterval(() => {random = Math.random()*10; setRotate(random)}, 5000); */
    let history = useHistory();
    return(
        <Link to={"/IHBox/configuration"}>
            <div className="configuration">
                {<img src={Gear} alt="gear" style={{transform: "rotate("+rotate*360+"deg)", transition: "all 50s"}}/>}
            </div>
        </Link>
    )
}

export default Configuration;