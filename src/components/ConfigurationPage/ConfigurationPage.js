import './ConfigurationPage.css';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useTranslation } from "react-i18next";
import { IoSettingsSharp } from "react-icons/io5";
import {  Route, Switch } from 'react-router-dom';
/* import PageNotFound from './../PageNotFound/PageNotFound.tsx'; */

const ConfigurationPage = () => {
    const [configurations, setConfigurations] = useState([]);
    const [width, setWidth] = useState(window.innerWidth);
    const [visibility, setVisibility] = useState(false);
    const[t] = useTranslation("global");
    const getConfigurations = new Promise((resolve, reject) => {
        resolve([ 
            {id: "1", previous:"ConfigurationPage.sectionOne.", name: "title", children:[
                    {id: "2", name: "accountInformation"},
                    {id: "3", name: "datasources"},
                    {id: "4", name: "tags"},
                    {id: "5", name: "securityprofiles"},
                    {id: "6", name: "users"},
                    {id: "7", name: "networkoverview"},
                    {id: "8", name: "sendagentcommands"},
                    {id: "9", name: "mobile-devices"},
                    {id: "10", name: "audit"},
                    {id: "11", name: "backupConfiguration"},
                    {id: "12", name: "tagsexportconfiguration"},
                    {id: "13", name: "systemnetworkconfiguration"},
                    {id: "14", name: "resettofactorydefaults"}
                ] },
            {id: "15", previous:"ConfigurationPage.sectionTwo.", name: "title", children:[
                    {id: "16", name: "events"},
                    {id: "17", name: "event-categories"},
                    {id: "18", name: "event-codes"},
                    {id: "19", name: "schedule.products"},
                    {id: "20", name: "equipmentmodels"},
                    {id: "21", name: "equipments"},
                    {id: "22", name: "equipments-events"},
                    {id: "23", name: "schedule.equipment-products"}
                ] },
            {id: "24", previous:"ConfigurationPage.sectionThree.", name: "title", children:[
                    {id: "25", name: "oeeconfiguration"},
                    {id: "26", name: "delaycategories"},
                    {id: "27", name: "delaycodes"},
                    {id: "28", name: "oee-event-codes"},
                    {id: "29", name: "products"},
                    {id: "30", name: "lineproducts"},
                    {id: "31", name: "shifts"},
                    {id: "32", name: "resettofactorydefaultsoee"},
                    {id: "33", name: "usermanualoee"}
                ] },
            {id: "34", previous:"ConfigurationPage.sectionFour.", name: "title", children:[
                    {id: "35", name: "screenbuilder"}
                ] },
            {id: "36", previous:"ConfigurationPage.sectionFive.", name: "title", children:[
                    {id: "37", name: "about"},
                    {id: "38", name: "howto"}
                ] }
            ])
    }); 

    useEffect(() => {
        getConfigurations.then(configurations => {
            setConfigurations(configurations);
        });
        const interval = setInterval(() => {
            if (window.innerWidth !== width) {
                setWidth(window.innerWidth);
            }
        }, 100);
        return () => clearInterval(interval);
      }, []);

    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }

    const OptionsConfiguration = () => {
        return(
            <div className="ConfigurationLeft">
                {configurations.map((configuration) => {
                    return(
                        <div key={configuration.id} className="ConfigurationLeftContent" style={configuration.previous==="ConfigurationPage.sectionFive."? {marginBottom:"60px"} : null}>
                            <h4>{t(configuration.previous+configuration.name)}</h4>
                            <ul className="Options">
                                {configuration.children.map((option) => {
                                    return(
                                        <>
                                            {getRandomInt(0,3)!==0?
                                            <Link to={`/IHBox/configuration/${option.name}`} key={option.id} >
                                                <li >
                                                    {t(configuration.previous+option.name)}
                                                </li>    
                                            </Link>
                                            :
                                            null}
                                        </>
                                    )
                                })}
                            </ul>
                        </div>
                    );
                })}
            </div>
        )
    }
    return(
        <div className="ConfigurationPage">
            <div className="ConfigurationPageContent">
                { width > 1000?
                <>
                    <OptionsConfiguration />
                </>
                :
                <>
                    <IoSettingsSharp onClick={()=>setVisibility(!visibility)} style={{
                                position: "absolute",
                                top: "0px",
                                left: "100%",
                                marginLeft:"-30px", 
                                marginTop:"10px",
                                color: "black"}}/>
                    {visibility?
                            <OptionsConfiguration />
                        :
                            null
                    }
                </>
                }
                <div className="ConfigurationRight">
                {/* <Switch>
                    <Route >
                        <PageNotFound />
                    </Route>
                </Switch> */}
                </div>
            </div>
        </div>
    );
}

export default ConfigurationPage;