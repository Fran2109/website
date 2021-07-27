import {React, useState, useEffect} from 'react';
/* import ReactDOM from 'react-dom'; */
import './Header.css';
import MenuItem from '../MenuItem/MenuItem';
import ItemGenerator from './../../utils/ItemGenerator/ItemGenerator';
import objectToGenerate from './../../utils/ItemGenerator/Object.json';
import Clock from './../Clock/Clock';

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
    }/* , [] */);

    return (
    <div className="header">
        <ul className="headerLeft">
            {categories.map((category) => {
                return( 
                    <div key={category.id}>
                        <MenuItem item={category.name} option={category.children}/>
                    </div>
                )
            })}
        </ul>
        <div className="headerRight">
            <Clock/>
        </div>
    </div>
    )
};

export default Header;