import './User.css';
import React, { useState } from 'react';
import UserIco from './../../assets/icons/user.png';
import { useTranslation } from "react-i18next";

const User = ({ listUsers }) => {
    const[t/* , i18n */] = useTranslation("global");
    const [id, setId] = useState(1);
    const [visible, setVisible] = useState(false);
    return (
        <li className="user" onMouseLeave={()=>setVisible(false)}>
            <span onClick={()=>setVisible(!visible)}>
                <img src={UserIco} alt="user"/>{listUsers.hasOwnProperty(id)? id===0? t("Header.User.Logged-out") : listUsers[id].name : null}
            </span>
            <ul className={visible? "userOptions visible" : "userOptions hidden"}>
                {id!==0?
                    <li onClick={()=>{
                        setId(0); 
                        setVisible(false); 
                        sessionStorage.removeItem('token');
                        window.location = origin}}>
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