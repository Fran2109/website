import './Configuration.css';
import Gear from './../../assets/icons/gear.png';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const Configuration = () => {
    function getRandomInt(min:number, max:number) {
        return Math.floor(Math.random() * (max - min)) + min;
    }
    
    let random;
    
    const[rotate, setRotate] = useState(1);

    setInterval(() => {random = getRandomInt(1, 11); setRotate(random)}, 5000);
    
    return(
        <div className="configurationBtn">
            <Link to={"/IHBox/configuration"}>
                <div className="configuration">
                    {<img src={Gear} alt="gear" style={{transform: "rotate("+rotate*360+"deg)", transition: "all 50s"}} />}
                </div>
            </Link>
        </div>
    )
}

export default Configuration;