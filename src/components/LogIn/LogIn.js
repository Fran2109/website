import './LogIn.css';
import User from './../../assets/icons/user.png';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import FourIPlatform from './../../assets/images/4IPlatform.png';
import Language from './../Language/Language';
import { useTranslation } from "react-i18next";
import { useHistory } from 'react-router-dom';
import { IoPersonSharp } from "react-icons/io5";

async function loginUser(credentials) {
    return(credentials.username)
   }

const LogIn = ({ setToken }) => {
    const[t] = useTranslation("global");
    const [username, setUserName] = useState();
    const [password, setPassword] = useState();
    let history = useHistory();
    const handleSubmit = async e => {
        
        e.preventDefault();
        if (username===undefined || password===undefined)
        {
            alert(t("LogIn.alertEmpty"));
        }
        else
        {
            if((username.toString()==="admin" && password.toString()==="admin") || (username.toString()==="user" && password.toString()==="user"))
            {
                const token = await loginUser({
                username,
                password
                });
                setToken(token)
                history.push(`/IHBox`);
            }
            else
            {
                alert(t("LogIn.alertWrong"));
            }
        }
      }

    return (
        <div className="LogIn">
            <div className="LogInHeader">
                <div className="LogInHeaderContainer" style={{color: "black"}}>
                    <div className="OEEasy">
                        <img src={FourIPlatform} style={{width: "240px", height: "55px", filter: "brightness(0) saturate(0)"}} alt="4IPlatform" />
                    </div>
                    <Language heightTitle="80px" />
                </div>    
            </div>
            <div className="LogInMain">
                <div className="LogInContainer First">
                    <div className="LogInIco">
                        <IoPersonSharp style={{width:"60px", height:"60px", color:"white"}} />
                    </div>
                    <div className="LogInContent">
                        <form className="Form" onSubmit={handleSubmit} >
                            <label>
                                <input className="username" type="text" placeholder={t("LogIn.username")} style={{textAlign: "center"}} onChange={e => setUserName(e.target.value)}/>
                            </label>
                            <label>
                                <input className="password" type="password" placeholder={t("LogIn.password")} style={{textAlign: "center"}} onChange={e => setPassword(e.target.value)}/>
                            </label>
                            <button type="submit">
                                {t("LogIn.submit")}
                            </button>
                        </form>
                    </div>
                    <div className="LogInInfo">
                        <span>{t("LogIn.message")}</span>
                    </div>
                </div>
            </div>
            <div className="LogInFooter">
                <span>{t("LogIn.footerMessage")}</span>
            </div> 
        </div>
    )
}

LogIn.propTypes = {
    setToken: PropTypes.func.isRequired
}

export default LogIn;