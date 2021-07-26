import React from 'react';
import ReactDOM from 'react-dom';
import './Header.css';
import MenuItem from '../MenuItem/MenuItem';
import ItemGenerated from './../ItemGenerator/ItemGenerator';

let options;
options = <ItemGenerated />;
console.log(options);
options = options.type;
console.log(options);

export default () => {

    return (
    <div className="header">
        <ul className="headerLeft">
            <MenuItem item={"OEE"} option={options[0]}/>
            <MenuItem item={"Delays"} option={options[1]}/>
            <MenuItem item={"Schedule"} option={options[2]}/>   
            <MenuItem item={"Reports"} option={options[3]}/>
        </ul>
    </div>
    )
};