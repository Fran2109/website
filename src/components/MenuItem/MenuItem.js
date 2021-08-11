import React, { /* useEffect, */useState } from 'react';
import './MenuItem.css';
import TreeView from '../TreeView/TreeView';
import { useTranslation } from "react-i18next";
import { IoBarChartSharp, IoOptions } from "react-icons/io5";

const MenuItem = ({item, option}) => {
  const [visibility, setVisibility] = useState(false);
  const[t] = useTranslation("global");
  return(
    <>
      <li className="dropdown-parent" onMouseLeave={()=>setVisibility(false)}>
        <span onClick={()=>setVisibility(!visibility)}>
          
          {item==="Schedule" ? 
            <IoOptions style={{width:"20px", height:"20px", marginRight:"10px", color:"white"}} />
          : 
            <IoBarChartSharp style={{width:"20px", height:"20px", marginRight:"10px", color:"white"}} />}
          <p>{t("Header.Label."+item.toString()+"-label")}</p>

        </span>
        <ul className={visibility? "dropdown-menu visible" : "dropdown-menu hidden"}>
          <TreeView list={option.children}/>
        </ul>
      </li>
    </>
  )
}

export default MenuItem;