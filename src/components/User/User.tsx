import './User.css';
import  { useState, useRef } from 'react';
import { useTranslation } from "react-i18next";
import { useHistory } from 'react-router-dom';
import { FaUser } from "react-icons/fa";
import { VscTriangleDown } from "react-icons/vsc";
import { useOnClickOutside } from 'usehooks-ts';

const User = () => {
    const[t] = useTranslation("global");
    const [visible, setVisible] = useState(false);
    let history = useHistory();
    const ref = useRef(null);
    let user : string | null =sessionStorage.getItem("token");
    const handleClickOutside = () => {
        setVisible(false);
    }
    useOnClickOutside(ref, handleClickOutside)
    return (
        <li className="user" ref={ref}>
            <span onClick={()=>setVisible(!visible)}>
                <FaUser style={{width:"20px", height:"20px", marginRight:"10px", color:"white"}} />
                {user !== null ? user.toUpperCase() : history.replace("/Login")}
                <VscTriangleDown className="IoTriangle"/>
            </span>
            <ul className={visible? "userOptions visible" : "userOptions hidden"}>
                <li onClick={()=>{
                    setVisible(false); 
                    sessionStorage.removeItem("token");
                    localStorage.setItem("ihBoxSystem_localstorage", false.toString());
                    history.replace("/Login")}}>
                    {t("Header.User.Log-out")}
                </li>
            </ul>
        </li>
    );
}

export default User;