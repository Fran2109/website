import './IHBox.css';
import { React, useState, useEffect } from 'react';
import Header from '../Header/Header';
import Logo from './../../assets/images/logo.png';
import ConfigurationPage from '../ConfigurationPage/ConfigurationPage';
import Overview from './../Overview/Overview.tsx';
import { Route, Switch } from 'react-router-dom';
import PageNotFound from '../PageNotFound/PageNotFound.tsx';
import DBContext from './../../context/DBContext';
import menuData from './../../data/menuData';

const IHBox = () => {
    const [ menus, setMenus ] = useState();
    const [headerOptions, setHeaderOptions] = useState();
    const [trendingOption, setTrendingOption] = useState();
    const [configurationOptions, setConfigurationOptions] = useState();

    function getLenghtOfObject(obj) {
        return Object.keys(obj).length;
    }

    function orderObject(data){
        let md = {Items: []};
        let items;
        let itemParameters;
        let itemProperties;
        items = (getLenghtOfObject(data) > 0) ? data.Table : items;
        itemParameters = (getLenghtOfObject(data) > 1) ? data.Table1 : itemParameters;
        itemProperties = (getLenghtOfObject(data) > 2) ? data.Table2 : itemProperties;
        
    
        let parameters=[]; 
        let properties=[]; 
    
    
        itemParameters.forEach(ip => {
            let id = parseInt(ip.MenuLinkID, 32);
            let option=
            {
                Name: ip.Name, 
                Value: ip.Value
            };
            parameters[id]=option; 
        });
    
        itemProperties.forEach(ip => {
            let id = parseInt(ip.MenuId, 32);
            let option=
            {
                Name: ip.Name, 
                Value: ip.Value
            };
            properties[id]=option; 
        });
    
        let itemsById = [];
    
        for (let i = 0; i < items.length; i++)
        {
            let row = items[i];
            let mi = 
            {
                Id: parseInt(row.Id, 32),
                Parent: row.Parent ? parseInt(row.Parent, 32) : null,
                Name: row.Name ? row.Name : null,
                RouteId: row.RouteID ? parseInt(row.RouteID, 32) : null,
                Enabled: row.Enabled,
                Visible: row.Visible,
                Group: row.Group ? row.Group : null,
                Route: row.Route,
                Children: [],
                Order: row.SortOrder ? row.SortOrder : null,
            };      
    
            mi.Parameters = parameters[mi.Id]
            mi.Properties = properties[mi.Id]
    
            mi.URL = mi.Route !== null? mi.Route : null;//ResolveURL(mi.Route, mi.Parameters);
    
            itemsById[mi.Id] = mi;
        }
        itemsById.forEach(kvp => {
            let mi = kvp;
            if (mi.Parent !== null)
            {
                if (itemsById[mi.Parent].Id !== undefined)
                {
                    itemsById[mi.Parent].Children.push(mi)
                }
            }
            else {
                md.Items.push(mi); 
            }
        });
        return md;
    }

    function filterByGroup(menu, group) {
        let options=[];
        menu.Items.forEach(function (item) {
            if (item.Group === group) {
                options.push(item);
            }
        });
        options.sort(function(a, b) {
            if(a.Order < b.Order) return -1;
            if(a.Order > b.Order) return 1;
            return 0;
        });
        return options;
    }

    useEffect(() => {
        window.Core.Json.CallProcedure("FrontEnd.GetMenuData", null, {
            onSuccess: function (data) {
                /* let categories=orderObject(data); */
                let categories=menuData;
                console.log(categories);
                if(filterByGroup(categories, "navbar_left_with_modules").length > 0)
                {
                    setHeaderOptions(filterByGroup(categories, "navbar_left_with_modules"))
                }
                if(filterByGroup(categories, "navbar_right_with_modules").length > 0)
                {
                    setTrendingOption(filterByGroup(categories, "navbar_right_with_modules"))
                }
                if(filterByGroup(categories, "ih_configuration").length > 0)
                {
                    setConfigurationOptions(filterByGroup(categories, "ih_configuration"))
                }
            },
            Async: false
        }, "APP");
        
    }, []);




    //////////////////////////////////////////////////////////
    /* var QP = new window.Core.Database.QueryParameters();
    QP.Add('Timezone', 'VARCHAR', 'ART');
    QP.Add('@ihId', 'INT', 1046);

    window.Core.Json.CallProcedure("[IHBoxSystem].EQUIP.GetEquipmentAgentConnectionStatus", QP, {
        onSuccess: function (response) {
            console.log(response);
        }
        , Async: false
        , Cache: false
        , Secured: true
    , }, "APP");
    QP = new window.Core.Database.QueryParameters();
    window.Core.Json.CallProcedure("[IHBoxSystem].FrontEnd.GetUserSecurityModulesActions", QP, {
        onSuccess: function (response) { console.log(response); },
        Async: false,
        CachePerUser: true, 
    }, "APP"); */
    
    return (
        <>
            <DBContext.Provider value={{headerOptions, trendingOption, configurationOptions}}>
                <div className="IHBox">
                    <Header />
                    <Switch>
                        <Route path="/IHBox/oeeOverview" exact>
                            <Overview />
                        </Route>
                        <Route path="/IHBox/configuration">
                            <ConfigurationPage />
                        </Route>
                        <Route path="/IHBox" exact>
                            <div className="Logo">
                                <img src={Logo} alt="Logo" />
                            </div>
                        </Route>
                        <Route >
                            <PageNotFound />
                        </Route>
                    </Switch>  
                </div>
            </DBContext.Provider>
        </>
    );
}

export default IHBox;