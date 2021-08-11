import './Configuration.css';
import Gear from './../../assets/icons/gear.png';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { IoSettingsSharp } from "react-icons/io5";

const Configuration = () => {
    function getRandomInt(min:number, max:number) {
        return Math.floor(Math.random() * (max - min)) + min;
    }
    
    let random=0;
    
    const[rotate, setRotate] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            random = getRandomInt(1, 5);  
            setRotate(random)
        }, 5000);
        return () => clearInterval(interval);
      }, []);
    
    return(
        <div className="configurationBtn" >
            <Link to={"/IHBox/configuration"}>
                <div className="configuration">
                    <IoSettingsSharp style={{ transform: "rotate("+rotate*360+"deg)", transition: "50s", color:"white", width:"20px", height:"20px"}}/>
                </div>
            </Link>
        </div>
    )
}

export default Configuration;