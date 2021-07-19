import React from 'react';
import ReactDOM from 'react-dom';
import './Header.css';
import MenuItem from '../MenuItem/MenuItem';


export default () => {

    return (
    <div className="header">
        <div className="headerLeft">
            <MenuItem item={"OEE"}/>
            <MenuItem item={"Delays"}/>
            <MenuItem item={"Schedule"}/>   
            <MenuItem item={"Reports"}/>
        </div>
    </div>
    )
};