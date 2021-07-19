import '@elastic/eui/dist/eui_theme_amsterdam_light.css';
import React, { useState } from 'react';
import './MenuItem.css';
import OEE from './../../assets/icons/OEE.svg';
import ItemGenerator from '../ItemGenerator/ItemGenerator';
import Items from '../Items/Items';

let itemGenerated;
itemGenerated = <ItemGenerator />;
itemGenerated = itemGenerated.type;

export default ({item})=>{

  const [visibility, setVisibility] = useState(false);

  const changeVisibility = () => {
    setVisibility(!visibility);
    console.log(visibility);
  }


  return(
    <div className="menu-item">
      
      <button className="menu-item-button"  onClick={changeVisibility} >
        <div className="menu-item-icon">
            <img src={OEE} alt="Sin Logo"></img>
        </div>
        <div className="menu-item-text">
            {item}
        </div>
      </button>
        <ul className={visibility ? 'visible' : 'hidden'} onClick={changeVisibility}>  <Items itemGenerated={itemGenerated}/>  </ul>
    </div>
)
};