import './LogIn.css';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import FourIPlatform from './../../assets/images/4IPlatform.png';
import FourIPlatformSecond from './../../assets/images/4IPlatform2.png';
import Language from './../Language/Language';
import { useTranslation } from "react-i18next";
import { useHistory } from 'react-router-dom';
import { FaUser } from "react-icons/fa";

async function loginUser(credentials) {
    return(credentials.username)
   }

const LogIn = ({ setToken }) => {
    const[t] = useTranslation("global");
    const [username, setUserName] = useState();
    const [password, setPassword] = useState();
    const [width, setWidth] = useState(window.innerWidth);
    let history = useHistory();
    useEffect(() => {
        const interval = setInterval(() => {
            if (window.innerWidth !== width) {
                setWidth(window.innerWidth);
            }
        }, 100);
        return () => clearInterval(interval);
      }, []);

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
                        { width > 1000?
                        <img src={FourIPlatform} style={{width: "240px", height: "55px", filter: "brightness(0) saturate(0)"}} alt="4IPlatform" />
                        :
                        <img src={FourIPlatformSecond} style={{width: "133px", height: "55px", filter: "brightness(0) saturate(0)"}} alt="4IPlatform" />
                        }
                    </div>
                    <button style={{color:"black"}} onClick={() => {
                        window.SecurityLogin.Logoff();
                        document.cookie = "autoLogin=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                        var login = window.SecurityLogin.Login("admin", "admin");
                        if(login)
                        {
                            console.log("Login OK");
                        }
                        else
                        {
                            console.log("Login NO OK");
                        }
                    }}>
                        login
                    </button>

                    <Language heightTitle="80px" />
                </div>    
            </div>
            <div className="LogInMain">
                <div className="LogInContainer First">
                    <div className="LogInIco">
                        <FaUser style={{width:"60px", height:"60px", color:"white"}} />
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
                <span>
                    <p>{t("LogIn.footerMessage.one")}</p>
                    <p>{t("LogIn.footerMessage.two")}</p>
                    <p>{t("LogIn.footerMessage.three")}</p>
                </span>
            </div> 
        </div>
    )
}

LogIn.propTypes = {
    setToken: PropTypes.func.isRequired
}

export default LogIn;