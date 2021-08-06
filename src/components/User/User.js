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
            <span onClick={()=>setVisible(!visible)}>
                <img src={UserIco} alt="user"/>{listUsers.hasOwnProperty(id)? id===0? t("Header.User.Logged-out") : sessionStorage.getItem("token") : null}
            </span>
            <ul className={visible? "userOptions visible" : "userOptions hidden"}>
                {id!==0?
                    <li onClick={()=>{
                        setId(0); 
                        setVisible(false); 
                        sessionStorage.removeItem("token");
                        history.replace("/")}}>
                        {t("Header.User.Log-out")}
                    </li>
                :
                    listUsers.map((userOption) => {
                        return( 
                            userOption.id!==0?
                            <li onClick={()=>{setId(userOption.id); setVisible(false)}} key={userOption.id}>
                                {userOption.name}
                            </li>
                            :
                            null
                        )
                    })
                }
            </ul>
        </li>
    );
}

export default User;