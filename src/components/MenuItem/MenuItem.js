import React from 'react';
import ReactDOM from 'react-dom';
import './MenuItem.css';
import OEE from './../../assets/icons/OEE.svg';

export default ({item})=> {
    return(
        <div className="menu-item">
            <div className="menu-item-icon">
                <img src={OEE} alt="Sin Logo"></img>
            </div>
            <div className="menu-item-text">
                <button>{item}</button>
            </div>
        </div>    
    )
};