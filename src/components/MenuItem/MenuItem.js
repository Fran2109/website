import React, { useEffect,useState } from 'react';
import './MenuItem.css';
import OEE from './../../assets/icons/OEE.svg';
import TreeView from './../TreeView/TreeView';



const MenuItem = ({item, option}) => {
  const [visibility, setVisibility] = useState(false);
  const changeVisibility = () => {
    setVisibility(!visibility);
    console.log(visibility);
  }
  return(
    <>
      <li className="dropdown-parent" ><span onClick={changeVisibility}><img src={OEE}/>{item}</span>
        <ul className={visibility? "dropdown-menu-visible" : "dropdown-menu"}>
          <TreeView list={option.children}/>
        </ul>
      </li>
    </>
  )
}

export default MenuItem;