import React, { useState, useRef } from 'react';
import './MenuItem.css';
import TreeView from '../TreeView/TreeView';
import { useTranslation } from "react-i18next";
import { IoBarChartSharp, IoOptions } from "react-icons/io5";
import { VscTriangleDown } from "react-icons/vsc";
import { Link } from "react-router-dom";
import { useOnClickOutside } from 'usehooks-ts';
import { MenuItemInterface } from '../../utils/interfaces/interfaces';

const MenuItem = ({item} : {item:MenuItemInterface}) => {
  const [visibility, setVisibility] = useState(false);
  const[t] = useTranslation("global");
  const ref = useRef(null);

  const handleClickOutside = () => {
    setVisibility(false);
  }
  useOnClickOutside(ref, handleClickOutside)
  return(
    <li className="dropdown-parent"  ref={ref} >
        {item.URL!==null ? 
          <Link to={item.URL} className="Link">
            <IoOptions style={{width:"20px", height:"20px", marginRight:"10px", color:"white"}} />
            <p>{t("Header.Label."+item.Name.toString()+".Head")}</p>
          </Link>
          :
          <span onClick={()=>setVisibility(!visibility)}>
            {item.Name==="Mimics"?
            <>
              {item.Children.length>0?
              <>
                <p>{t("Header.Label."+item.Name.toString()+".Head")}</p>
                <VscTriangleDown className="IoTriangle"/>
              </>
              :
              null}
            </>
            :
            <>
              <IoBarChartSharp style={{width:"20px", height:"20px", marginRight:"10px", color:"white"}} />
              <p>{t("Header.Label."+item.Name.toString()+".Head")}</p>
              <VscTriangleDown className="IoTriangle"/>
            </>}
          </span>
        }   
      
      <ul className={visibility? "dropdown-menu visible" : "dropdown-menu hidden"}>
        {
          item.Children.length > 0?
          <TreeView list={item.Children} head={item.Name}/>
          :
          null
        }
      </ul>
    </li>
  )
}

export default MenuItem;