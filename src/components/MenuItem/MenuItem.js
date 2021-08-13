import React, { useEffect, useState, useRef } from 'react';
import './MenuItem.css';
import TreeView from '../TreeView/TreeView';
import { useTranslation } from "react-i18next";
import { IoBarChartSharp, IoOptions, IoTriangle } from "react-icons/io5";
import { Link } from "react-router-dom";

let useClickOutside = (handler) => {
  let domNode = useRef();

  useEffect(() => {
    let maybeHandler = (event) => {
      if(!domNode.current.contains(event.target)){
        handler();
      }
    };
    document.addEventListener('mousedown', maybeHandler);

    return () => {
      document.removeEventListener('mousedown', maybeHandler);
    }
  }, []);
  return domNode;
};




const MenuItem = ({item}) => {
  const [visibility, setVisibility] = useState(false);
  const[t] = useTranslation("global");

  let domNode = useClickOutside(() => {
    setVisibility(false);
  });
  return(
    <>
      <li className="dropdown-parent" ref={domNode}/*  onMouseLeave={()=>setVisibility(false)} */>
        
          {item.url!==undefined ? 
            <>
              <Link to={item.url} className="Link">
                <IoOptions style={{width:"20px", height:"20px", marginRight:"10px", color:"white"}} />
                <p>{t("Header.Label."+item.name.toString()+"-label")}</p>
              </Link>
            </>
            :
            <>
              <span onClick={()=>setVisibility(!visibility)}>
                <IoBarChartSharp style={{width:"20px", height:"20px", marginRight:"10px", color:"white"}} />
                <p>{t("Header.Label."+item.name.toString()+"-label")}</p>
                <IoTriangle style={{transform: "rotate(180deg)", color:"#07b", width:"8px", height:"8px", marginLeft:"5px" }}/>
              </span>
            </>
          }   
        
        <ul className={visibility? "dropdown-menu visible" : "dropdown-menu hidden"}>
          {item.name==="OEE" ?
            <Link to="/IHBox/oeeOverview">
              <li className="Options">
                Overview
              </li> 
            </Link>
            : 
            item.children!==undefined?
            <TreeView list={item.children}/>
            :
            null
          }
        </ul>
      </li>
    </>
  )
}

export default MenuItem;