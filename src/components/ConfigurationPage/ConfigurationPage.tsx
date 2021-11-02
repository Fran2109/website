import './ConfigurationPage.css';
import { Link, Switch, Route } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import { useTranslation } from "react-i18next";
import { IoSettingsSharp } from "react-icons/io5";
import DBContext from '../../context/DBContext';
import UserContext from '../../context/UserContext';
import useWindowSize from '../../utils/useWindowSize/useWindowSize';
import { 
    PermissionsInterface, 
    MenuItemInterface, 
    DBOptionsInterface, 
    ModuleInterface,
    ModuleActionsAndPagesInterface,
    ModuleActionsInterface,
    UserInfoInterface,
    UserInfoTableInterface
} from '../../utils/interfaces/interfaces';
import UserInformation from '../UserInformation/UserInformation';
import Products from '../Products/Products';
import permissionsData from '../../data/permissionsData.json';
import userinfoData from '../../data/userinfoData.json';

declare const window: any;

const ConfigurationPage = () => {
    const [configurationsOptions, setConfigurationsOptions] = useState<MenuItemInterface[]>();
    const [permissions, setPermissions] = useState<ModuleActionsAndPagesInterface[]>();
    const [userName, setUserName] = useState<string | null>();
    const [tymeZone, setTymeZone] = useState<UserInfoTableInterface>();
    const [width] = useWindowSize();
    const [visibility, setVisibility] = useState(false);
    const[t] = useTranslation("global");
    const DB= useContext<DBOptionsInterface>(DBContext);

    useEffect(() => {
        setConfigurationsOptions(DB.configurationOptions);
        setUserName(sessionStorage.getItem("token"));

        var QP = new window.Core.Database.QueryParameters();
        window.Core.Json.CallProcedure("[IHBoxSystem].FrontEnd.GetUserSecurityModulesActions", QP, {
            onSuccess: function (data : PermissionsInterface) {

                function orderPermissions(data : PermissionsInterface)
                {
                    let records: ModuleInterface[];
                    records = data.Table;

                    let actions: ModuleInterface[];
                    actions = data.Table1; 

                    let mdls:ModuleActionsAndPagesInterface[];
                    mdls = [];

                    for (var i = 0; i < records.length; i++) {
                        let data: ModuleInterface;
                        data = records[i];
                        
                        let obj:ModuleActionsAndPagesInterface
                        obj = {
                            id: data.ModuleId, 
                            code: data.Code, 
                            name: data.Name, 
                            value: data.Value, 
                            actions: [],
                        }; 
                        for(var j=0 ; j<actions.length; j++)
                        {
                            let data2:ModuleInterface;
                            data2= actions[j];
                            if(data.ModuleId===data2.ModuleId)
                            {
                                let obj2:ModuleActionsInterface;
                                obj2 = {
                                    id: data2.ActionId,
                                    code: data2.Code, 
                                    name: data2.Name,
                                    value: data2.Value,
                                }
                                obj.actions.push(obj2);
                            }
                        }
                        mdls.push(obj);
                    }
                    return mdls;
                }
               /*  const pData = permissionsData as PermissionsInterface;
                setPermissions(orderPermissions(pData)); */
                setPermissions(orderPermissions(data));
            },
            Async: false,
            CachePerUser: true, 
        }, "APP");

        var QP = new window.Core.Database.QueryParameters();
        window.Core.Json.CallProcedure("FrontEnd.GetUserSystemInfo", QP, {
            onSuccess: function (data : UserInfoInterface) {
                setTymeZone(data.Table[0]);

                /* const uData = userinfoData as unknown as UserInfoInterface;
                setTymeZone(uData.Table[0]); */
            },
            Async: false,
            Secured: true,
            CachePerUser: true, 
        }, "APP");

    }, [DB])
    
    function orderObject(obj:MenuItemInterface[]){
        obj.sort(function(a, b) {
            if(a.Order!==null && b.Order!==null){
                if(a.Order < b.Order) return -1;
                if(a.Order > b.Order) return 1;    
            }
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
                                            <Link to={`/IHBox/configuration/${option.Id}`} key={option.Id}>
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
        <UserContext.Provider value={{userName, tymeZone, permissions}}>

        
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
                    <Switch>
                        <Route path="/IHBox/configuration/35" exact>
                            <UserInformation />
                        </Route>
                        <Route path="/IHBox/configuration/70951" exact>
                            <Products />
                        </Route>
                    </Switch>  
                </div>
            </div>
        </div>
        </UserContext.Provider>
    );
}

export default ConfigurationPage;