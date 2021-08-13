import './User.css';
import  { useState } from 'react';
import { useTranslation } from "react-i18next";
import { useHistory } from 'react-router-dom';
import { IoPersonSharp, IoTriangle } from "react-icons/io5";
import useClickOutside from './../../utils/useClickOutside/useClickOutside';

const User = () => {
    const[t] = useTranslation("global");
    const [visible, setVisible] = useState(false);
    let history = useHistory();
    let domNode = useClickOutside(() => {
        setVisible(false);
      });
    return (
        <li className="user" ref={domNode}/* onMouseLeave={()=>setVisible(false)} */>
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
                <IoTriangle className="IoTriangle"/>
            </span>
            <ul className={visible? "userOptions visible" : "userOptions hidden"}>
                <li onClick={()=>{
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