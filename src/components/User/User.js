import './User.css';
import React, { useState } from 'react';
import { useTranslation } from "react-i18next";
import { useHistory } from 'react-router-dom';
import { IoPersonSharp, IoTriangle } from "react-icons/io5";

const User = () => {
    const[t] = useTranslation("global");
    const [id, setId] = useState(1);
    const [visible, setVisible] = useState(false);
    let history = useHistory();
    return (
        <li className="user" onMouseLeave={()=>setVisible(false)}>
            <>
            {
                sessionStorage.getItem("token") !== null ?
                null
                :
                history.replace("/Login")
            }
            </>
            <span onClick={()=>setVisible(!visible)}>
                <IoPersonSharp style={{width:"20px", height:"20px", marginRight:"10px", color:"white"}} />
                <p>{sessionStorage.getItem("token").toUpperCase()}</p>
                <IoTriangle style={{transform: "rotate(180deg)", color:"#07b", width:"8px", height:"8px", marginLeft:"5px" }}/>
            </span>
            <ul className={visible? "userOptions visible" : "userOptions hidden"}>
                <li onClick={()=>{
                    setId(0); 
                    setVisible(false); 
                    sessionStorage.removeItem("token");
                    history.replace("/Login")}}>
                    {t("Header.User.Log-out")}
                </li>
            </ul>
        </li>
    );
}

export default User;