import './LogIn.css';
import User from './../../assets/icons/user.png';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import OEEasy from './../../assets/icons/OEEasyLogo.png';
import Language from './../Language/Language';
import { useTranslation } from "react-i18next";
import { BrowserRouter as Router, Redirect } from 'react-router-dom';

async function loginUser(credentials) {
    return fetch('http://localhost:8080/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
    })
      .then(data => data.json())
   }

const LogIn = ({ setToken }) => {
    const[t] = useTranslation("global");
    const [username, setUserName] = useState();
    const [password, setPassword] = useState();

    const handleSubmit = async e => {
        
        e.preventDefault();
        if (username===undefined || password===undefined)
        {
            alert(t("LogIn.alertEmpty"));
        }
        else
        {
            if(username.toString()==="admin" && password.toString()==="admin")
            {
                const token = await loginUser({
                username,
                password
                });
                setToken(token)
                /* return <Redirect to='/IHBox'  /> */
                /*{<Redirect from="/" to="/asfd" />}*/
                {{/* <Router path="/projects">
                    <Redirect to="/projects/another-project" />
                </Router> */}}
                /* window.location = '/'; */
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
                <div className="OEEasy">
                    <img src={OEEasy} style={{width: "180px", height: "55px"}} alt="OEEasy" />
                </div>
                <Language heightTitle="80px" />
            </div>    
            <div className="LogInContainer">
                <div className="LogInIco">
                    <img src={User} alt="User" />
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