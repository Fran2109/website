import './User.css';
import  { useState } from 'react';
import { useTranslation } from "react-i18next";
import { useHistory } from 'react-router-dom';
import { FaUser } from "react-icons/fa";
import { VscTriangleDown } from "react-icons/vsc";
import useClickOutside from '../../utils/useClickOutside/useClickOutside';

const User = () => {
    const[t] = useTranslation("global");
    const [visible, setVisible] = useState(false);
    let history = useHistory();
    let domNode = useClickOutside(() => {
        setVisible(false);
      });
    return (
        <li className="user" ref={domNode}>
            <span onClick={()=>setVisible(!visible)}>
                <FaUser style={{width:"20px", height:"20px", marginRight:"10px", color:"white"}} />
                <p>{sessionStorage.getItem("token") !== null ? sessionStorage.getItem("token").toUpperCase() : history.replace("/Login")}</p>
                <VscTriangleDown className="IoTriangle"/>
            </span>
            <ul className={visible? "userOptions visible" : "userOptions hidden"}>
                <li onClick={()=>{
                    setVisible(false); 
                    sessionStorage.removeItem("token");
                    localStorage.setItem("ihBoxSystem_localstorage", false);
                    history.replace("/Login")}}>
                    {t("Header.User.Log-out")}
                </li>
            </ul>
        </li>
    );
}

export default User;