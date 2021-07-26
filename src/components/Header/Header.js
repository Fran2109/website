import {React, useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import './Header.css';
import MenuItem from '../MenuItem/MenuItem';
import ItemGenerator from './../../utils/ItemGenerator/ItemGenerator';
import objectToGenerate from './../../utils/ItemGenerator/Object.json';

export default () => {
    let options;
    options= ItemGenerator(objectToGenerate.items)
    const [categorys, setCategorys] = useState([]);
    console.log(options);

    const getCategorys = new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve([ 
                {name: "OEE", children: options[0] }, 
                {name: "Delays", children: options[1]}, 
                {name: "Schedule", children: options[2]}, 
                {name: "Reports", children: options[3]} ])
        }, 100);
    });

    useEffect(() => {
        getCategorys.then(
            result => {
                setCategorys(result);
            }
        )
    }, []);
console.log(categorys);
    return (
    <div className="header">
        <ul className="headerLeft">
            {categorys.map((category) => {
                return <MenuItem item={category.name} option={category.children}/>
            })}
        </ul>
    </div>
    )
};