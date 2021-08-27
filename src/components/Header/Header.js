import {React, useState, useEffect} from 'react';

import './Header.css';
import MenuItem from '../MenuItem/MenuItem';
import ItemGenerator from './../../utils/ItemGenerator/ItemGenerator';
import objectToGenerate from './../../utils/ItemGenerator/Object.json';
import Clock from './../Clock/Clock';
import Trending from './../Trending/Trending.tsx';
import Language from './../Language/Language';
import Configuration from '../Configuration/Configuration.tsx';
import MenuOpen from './../../assets/icons/menuOpen.png';
import MenuClose from './../../assets/icons/menuClose.png';
import User from './../User/User';

const Header = () => {
    let options;
    const [categories, setCategories] = useState([]);
    const [width, setWidth] = useState(window.innerWidth);
    
    options = ItemGenerator(objectToGenerate);
    
    const getCategories = new Promise((resolve, reject) => {
        resolve([ 
            {id: "1", name: "OEE", children: [
                {id: "5", label: "Overview", url:"/IHBox/oeeOverview" } ] },
            {id: "2", name: "Delays", children: [
                {id: "6", label: "Declare" },
                {id: "7", label: "Manager" }
            ] },
            {id: "3", name: "Schedule", url:"/IHBox/schedule" }, 
            {id: "4", name: "Reports", children: [
                {id: "8", label: "OEE" },
                {id: "9", label: "Losses" },
                {id: "10", label: "Events" },
                {id: "11", label: "Delays" },
                {id: "12", label: "Batch" },
                {id: "13", label: "Last 24 Hours", children: options[1].children}                
            ] } ])
    }); 

    useEffect(() => {
        getCategories.then(
            result => {
                setCategories(result);
            }
        )       
        const interval = setInterval(() => {
            if (window.innerWidth !== width) {
                setWidth(window.innerWidth);
            }
        }, 100);
        return () => clearInterval(interval); 
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
                                <MenuItem item={category}/>
                            </div>
                        )
                    })}
                </ul>

                <div className="headerRight">
                    <Trending/>
                    <User/>
                    <Clock/>
                    <Language/>
                    <Configuration/>
                </div>
            </>
        )
    }

    return (
        <div className="header">
            { width > 1000?
                <>
                    <HeaderBasic />
                </>
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