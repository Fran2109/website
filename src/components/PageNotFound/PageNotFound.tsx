import "./PageNotFound.css";
import wire from './../../assets/images/404.png';
import {Link} from 'react-router-dom';
import { useTranslation } from "react-i18next";
import Header from '../Header/Header';
const PageNotFound = () => {
    const[t] = useTranslation("global");
    return(
        <div className="PageNotFound">
            <Header/>
            <img src={wire} alt="404"/>
            <div className="Message">
                <h1>404</h1>
                <h3>{t("PageNotFound.Message")}</h3>
                <h4>{t("PageNotFound.MessageOne")}<Link to="/">{t("PageNotFound.MessageTwo")}</Link></h4>
            </div>
        </div>
    )
}

export default PageNotFound;