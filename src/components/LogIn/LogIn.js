import './Login.css';
import { useState } from 'react';
/* import PropTypes from 'prop-types'; */
import FourIPlatform from './../../assets/images/4IPlatform.png';
import FourIPlatformSecond from './../../assets/images/4IPlatform2.png';
import Language from '../Language/Language.js';
import { useTranslation } from "react-i18next";
import { useHistory } from 'react-router-dom';
import { FaUser } from "react-icons/fa";
import useWindowSize from '../../utils/useWindowSize/useWindowSize';

/* async function loginUser(credentials) {
    return(credentials.username)
   } */

const Login = ({ setToken }) => {
    const[t] = useTranslation("global");
    const [username, setUserName] = useState();
    const [password, setPassword] = useState();
    const [width] = useWindowSize();
    let history = useHistory();

    function tryLogin(username, password) {
        window.SecurityLogin.Logoff();
        document.cookie = "autoLogin=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        var login = window.SecurityLogin.Login(username, password);
        if (login) {
            setToken(username);
            localStorage.setItem("ihBoxSystem_localstorage", true);
            history.push(`/IHBox`);
        } else {
            alert(t("Login.alertWrong"));
        }
    }

    const handleSubmit = async e => {
        e.preventDefault();
        if (username===undefined || password===undefined)
        {
            alert(t("Login.alertEmpty"));
        }
        else
        {
            tryLogin(username, password);
        }
      }

    return (
        <div className="Login">
            <div className="LoginHeader">
                <div className="LoginHeaderContainer" style={{color: "black"}}>
                    <div className="OEEasy">
                        { width > 1000?
                        <img src={FourIPlatform} style={{width: "240px", height: "55px", filter: "brightness(0) saturate(0)"}} alt="4IPlatform" />
                        :
                        <img src={FourIPlatformSecond} style={{width: "133px", height: "55px", filter: "brightness(0) saturate(0)"}} alt="4IPlatform" />
                        }
                    </div>

                    <Language heightTitle="80px" />
                </div>    
            </div>
            <div className="LoginMain">
                <div className="LoginContainer First">
                    <div className="LoginIco">
                        <FaUser style={{width:"60px", height:"60px", color:"white"}} />
                    </div>
                    <div className="LoginContent">
                        <form className="Form" onSubmit={handleSubmit} >
                            <label>
                                <input className="username" type="text" placeholder={t("Login.username")} style={{textAlign: "center"}} onChange={e => setUserName(e.target.value)}/>
                            </label>
                            <label>
                                <input className="password" type="password" placeholder={t("Login.password")} style={{textAlign: "center"}} onChange={e => setPassword(e.target.value)}/>
                            </label>
                            <button type="submit">
                                {t("Login.submit")}
                            </button>
                        </form>
                    </div>
                    <div className="LoginInfo">
                        <span>{t("Login.message")}</span>
                    </div>
                </div>
            </div>
            <div className="LoginFooter">
                <span>
                    <p>{t("Login.footerMessage.one")}</p>
                    <p>{t("Login.footerMessage.two")}</p>
                    <p>{t("Login.footerMessage.three")}</p>
                </span>
            </div> 
        </div>
    )
}

/* Login.propTypes = {
    setToken: PropTypes.func.isRequired
}
 */
export default Login;