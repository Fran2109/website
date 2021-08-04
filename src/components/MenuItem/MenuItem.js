import React, { /* useEffect, */useState } from 'react';
import './MenuItem.css';
import OEE from './../../assets/icons/OEE.svg';
import TreeView from './../TreeView/TreeView';
import { useTranslation } from "react-i18next";

const MenuItem = ({item, option}) => {
  const [visibility, setVisibility] = useState(false);
  const[t/* , i18n */] = useTranslation("global");

  return(
    <>
      <li className="dropdown-parent" onMouseLeave={()=>setVisibility(false)}>
        <span onClick={()=>setVisibility(!visibility)}>
          <img src={OEE} alt=""/>{t("Header.Label."+item.toString()+"-label")}
        </span>
        <ul className={visibility? "dropdown-menu visible" : "dropdown-menu hidden"}>
          <TreeView list={option.children}/>
        </ul>
      </li>
    </>
  )
}

export default MenuItem;