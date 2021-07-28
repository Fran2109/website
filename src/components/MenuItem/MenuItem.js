import React, { /* useEffect, */useState } from 'react';
import './MenuItem.css';
import OEE from './../../assets/icons/OEE.svg';
import TreeView from './../TreeView/TreeView';

const MenuItem = ({item, option}) => {
  const [visibility, setVisibility] = useState(false);
  const changeVisibility = () => {
    setVisibility(!visibility);
  }
  return(
    <>
      <li className="dropdown-parent"><span onClick={ window.innerWidth < 1000? changeVisibility : ()=>{}}><img src={OEE} alt=""/>{item}</span>
        <ul className={visibility? "dropdown-menu-visible" : "dropdown-menu"}>
          <TreeView list={option.children}/>
        </ul>
      </li>
    </>
  )
}

export default MenuItem;