import './User.css';
import React, { useState } from 'react';
import UserIco from './../../assets/icons/user.png';
import { useTranslation } from "react-i18next";
import { useHistory } from 'react-router-dom';

const User = ({ listUsers }) => {
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
                history.replace("")
            }
            </>
            <span onClick={()=>setVisible(!visible)}>
                <img src={UserIco} alt="user"/>{listUsers.hasOwnProperty(id)? sessionStorage.getItem("token") : null}
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