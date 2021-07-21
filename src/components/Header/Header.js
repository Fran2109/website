import React from 'react';
import ReactDOM from 'react-dom';
import './Header.css';
import MenuItem from '../MenuItem/MenuItem';


export default () => {

    return (
    <div className="header">
        <ul className="headerLeft">
            <MenuItem item={"OEE"}/>
            <MenuItem item={"Delays"}/>
            <MenuItem item={"Schedule"}/>   
            <MenuItem item={"Reports"}/>
        </ul>
    </div>
    )
};