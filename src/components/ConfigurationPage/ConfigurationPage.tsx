import './ConfigurationPage.css';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useTranslation } from "react-i18next";
import { IoSettingsSharp } from "react-icons/io5";
import DBContext from '../../context/DBContext';
import { useContext } from 'react';
import useWindowSize from '../../utils/useWindowSize/useWindowSize';
import { PermissionsInterface, MenuItemInterface, DBOptionsInterface } from '../../utils/interfaces/interfaces';
declare const window: any;

/* import PageNotFound from './../PageNotFound/PageNotFound.tsx'; */

const ConfigurationPage = () => {
    const [configurationsOptions, setConfigurationsOptions] = useState<MenuItemInterface[]>();
    const [width] = useWindowSize();
    const [visibility, setVisibility] = useState(false);
    const[t] = useTranslation("global");
    const DB= useContext<DBOptionsInterface>(DBContext);

    useEffect(() => {
        console.log(DB);
        setConfigurationsOptions(DB.configurationOptions);
        
        var QP = new window.Core.Database.QueryParameters();

        window.Core.Json.CallProcedure("[IHBoxSystem].FrontEnd.GetUserSecurityModulesActions", QP, {
            onSuccess: function (data : PermissionsInterface) {
                console.log(data);
            },
            Async: false,
            CachePerUser: true, 
        }, "APP");



    }, [DB])
    
    function orderObject(obj:MenuItemInterface[]){
        obj.sort(function(a, b) {
            if(a.Order < b.Order) return -1;
            if(a.Order > b.Order) return 1;
            return 0;
        });
        return obj;
    }

    const ifHasTranslation = (header : string, text : string) => {
        let flag = true;
        for (let i = 0; i < header.length; i++) {
        if(header[i]!==text[i])
        {
            flag = false;
        }
        }
        return flag?  false : true
    }

    const OptionsConfiguration = () => {
        return(
            <div className="ConfigurationLeft">
                {configurationsOptions!==undefined?
                <>
                    {configurationsOptions.map((configuration) => {
                        return(
                            <ul key={configuration.Id} className="ConfigurationLeftContent" >
                                {ifHasTranslation("ConfigurationPage."+configuration.Name, t("ConfigurationPage."+configuration.Name+".Head"))?
                                <h4>{t("ConfigurationPage."+configuration.Name+".Head")}</h4>
                                :
                                <h4>{configuration.Name}</h4>} 
                                <ul className="Options">
                                    {orderObject(configuration.Children).map((option) => {
                                        return(
                                            <Link to={`/IHBox/configuration/${option.Name}`} key={option.Id}>
                                                <li >
                                                    {ifHasTranslation("ConfigurationPage."+configuration.Name+"."+option.Name, t("ConfigurationPage."+configuration.Name+"."+option.Name))?
                                                    t("ConfigurationPage."+configuration.Name+"."+option.Name)
                                                    :
                                                    option.Name}
                                                </li>    
                                            </Link>
                                        )
                                    })}
                                </ul>
                            </ul>
                        );
                    })}
                </>
                :
                null}
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
                    
                </div>
            </div>
        </div>
    );
}

export default ConfigurationPage;