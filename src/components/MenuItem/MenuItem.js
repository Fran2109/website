import React, { /* useEffect, */useState } from 'react';
import './MenuItem.css';
import TreeView from '../TreeView/TreeView';
import { useTranslation } from "react-i18next";
import { IoBarChartSharp, IoOptions, IoTriangle } from "react-icons/io5";
import { Link } from "react-router-dom";

const MenuItem = ({item, option}) => {
  const [visibility, setVisibility] = useState(false);
  const[t] = useTranslation("global");
  return(
    <>
      <li className="dropdown-parent" onMouseLeave={()=>setVisibility(false)}>
        <span onClick={()=>setVisibility(!visibility)}>
          
          {item==="Schedule" ? 
              <>
                <IoOptions style={{width:"20px", height:"20px", marginRight:"10px", color:"white"}} />
                <p>{t("Header.Label."+item.toString()+"-label")}</p>
              </>
            : 
              <>
                <IoBarChartSharp style={{width:"20px", height:"20px", marginRight:"10px", color:"white"}} />
                <p>{t("Header.Label."+item.toString()+"-label")}</p>
                {/* <IoTriangle style={{width:"8px", height:"8px", color:"rgba(62, 110, 184, 0.37)", transform: "rotate(180deg)", marginLeft:"5px"}}/> */}
              </>
          }
        
        </span>
        <ul className={visibility? "dropdown-menu visible" : "dropdown-menu hidden"}>
          
          {item==="OEE" ?
            <Link to="/IHBox/oeeOverview">
              <li className="Options">
                Overview
              </li> 
            </Link>
            : 
            <TreeView list={option.children}/>}
        </ul>
      </li>
    </>
  )
}

export default MenuItem;