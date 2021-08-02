import {React, useState, useEffect} from 'react';
/* import ReactDOM from 'react-dom'; */

import './Header.css';
import MenuItem from '../MenuItem/MenuItem';
import ItemGenerator from './../../utils/ItemGenerator/ItemGenerator';
import objectToGenerate from './../../utils/ItemGenerator/Object.json';
import Clock from './../Clock/Clock';
import Trending from './../Trending/Trending';
import Gear from './../../assets/icons/gear.png';
import Idiom from './../../assets/icons/idiom.png';
import MenuOpen from './../../assets/icons/menuOpen.png';
import MenuClose from './../../assets/icons/menuClose.png';
import User from './../User/User';

const Header = () => {
    let options;
    const [users, setUsers] = useState([]);
    const [categories, setCategories] = useState([]);

    options = ItemGenerator(objectToGenerate);
    
    const getCategories = new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve([ 
                {id: "1", name: "OEE", children: options[0] }, 
                {id: "2", name: "Delays", children: options[1] }, 
                {id: "3", name: "Schedule", children: options[2] }, 
                {id: "4", name: "Reports", children: options[3] } ])
        }, 1000);
    }); 

    const getUsers = new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve([ 
                { id: 0, name: "Unsigned" },
                { id: 1, name: "User 1" },
                { id: 2, name: "User 2" },
                { id: 3, name: "User 3" },
                { id: 4, name: "User 4" },
                { id: 5, name: "User 5" } ])
        }, 1000);
    }); 

    useEffect(() => {
        getCategories.then(
            result => {
                setCategories(result);
            }
        )
        getUsers.then(
            result => {
                setUsers(result);
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
                    <Trending/>

                    <User listUsers={users}/>
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
                    <div className="headerMobile">
                        <button className="menu" onClick={changeVisibility}>
                            {!visibility?
                                <img src={MenuOpen} alt="menuOpen"/>
                            :
                                <img src={MenuClose} alt="menuClose"/>
                            }
                        </button>
                    </div>
                    {visibility?
                        <HeaderBasic />
                    :
                        null
                    }
                </>
            }
        </div>
    )
};

export default Header;