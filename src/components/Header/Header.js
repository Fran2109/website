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
    const [users, setUsers] = useState([]);
    const [categories, setCategories] = useState([]);
    const [width, setWidth] = useState(window.innerWidth);
    
    options = ItemGenerator(objectToGenerate);
    
    const getCategories = new Promise((resolve, reject) => {
        resolve([ 
            {id: "1", name: "OEE", children: [
                {id: "5", name: "Overview", url:"/IHBox/oeeOverview" } ] },
            {id: "2", name: "Delays", children: [
                {id: "6", name: "Declare" },
                {id: "7", name: "Manager" }
            ] },
            {id: "3", name: "Schedule", url:"IHBox/schedule" }, 
            {id: "4", name: "Reports", children: [
                {id: "8", name: "OEE" },
                {id: "9", name: "Losses" },
                {id: "10", name: "Events" },
                {id: "11", name: "Deleys" },
                {id: "12", name: "Batch" },
                {id: "13", name: "Last 24 Hours" }                
            ] } ])
    }); 

    const getUsers = new Promise((resolve, reject) => {
        resolve([ 
            { id: 0, name: "Unsigned" },
            { id: 1, name: "User 1" },
            { id: 2, name: "User 2" },
            { id: 3, name: "User 3" },
            { id: 4, name: "User 4" },
            { id: 5, name: "User 5" } ])
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

    setInterval(() => {setWidth(window.innerWidth)},1000);
    
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