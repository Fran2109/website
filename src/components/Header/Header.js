import {React, useState, useEffect} from 'react';
/* import ReactDOM from 'react-dom'; */

import './Header.css';
import MenuItem from '../MenuItem/MenuItem';
import ItemGenerator from './../../utils/ItemGenerator/ItemGenerator';
import objectToGenerate from './../../utils/ItemGenerator/Object.json';
import User from './../../assets/icons/user.png';
import Graphic from './../../assets/icons/graphic.png';
import Clock from './../Clock/Clock';
import Gear from './../../assets/icons/gear.png';
import Idiom from './../../assets/icons/idiom.png';
import MenuOpen from './../../assets/icons/menuOpen.png';
import MenuClose from './../../assets/icons/menuClose.png';

const Header = () => {
    let options;

    options = ItemGenerator(objectToGenerate)

    const [categories, setCategories] = useState([]);
    
    const getCategories = new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve([ 
                {id: "1", name: "OEE", children: options[0] }, 
                {id: "2", name: "Delays", children: options[1] }, 
                {id: "3", name: "Schedule", children: options[2] }, 
                {id: "4", name: "Reports", children: options[3] } ])
        }, 1000);
    });

    useEffect(() => {
        getCategories.then(
            result => {
                setCategories(result);
            }
        )
    }, [] );

    const [visibility, setVisibility] = useState(false);
    const changeVisibility = () => {
        setVisibility(!visibility);
    }

    const HeaderBasic = () => {
        return (
            <>
                <ul className="headerLeft">
                    {categories.map((category) => {
                        return( 
                            <div className="items" key={category.id}>
                                <MenuItem item={category.name} option={category.children}/>
                            </div>
                        )
                    })}
                </ul>
                <div className="headerRight">
                    <img src={Graphic} alt="graphic"/>
                    <span><img src={User} alt="user"/>ADMIN</span>
                    <Clock/>
                    <img src={Idiom} alt="idiom"/>
                    <img src={Gear} alt="gear"/>
                </div>
            </>
        )
    }

    return (
        <div className="header">
            { window.innerWidth > 1000? 
                <HeaderBasic />
                :
                <>
                    {visibility?
                        <HeaderBasic />
                    :
                        null
                    }
                    <div className="headerMobile">
                        <button className="menu" onClick={changeVisibility}>
                            {!visibility?
                                <img src={MenuOpen} alt="menuOpen"/>
                            :
                                <img src={MenuClose} alt="menuClose"/>
                            }
                        </button>
                    </div>
                    
                </>
            }
        </div>
    )
};

export default Header;