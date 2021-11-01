import './IHBox.css';
import { React, useState, useEffect } from 'react';
import Header from '../Header/Header.tsx';
import Logo from './../../assets/images/logo.png';
import ConfigurationPage from '../ConfigurationPage/ConfigurationPage.tsx';
import Overview from './../Overview/Overview.tsx';
import { Route, Switch } from 'react-router-dom';
import PageNotFound from '../PageNotFound/PageNotFound';
import DBContext from '../../context/DBContext.ts';
import menuData from './../../data/menuData';

const IHBox = () => {
    const [headerOptions, setHeaderOptions] = useState();
    const [trendingOption, setTrendingOption] = useState();
    const [configurationOptions, setConfigurationOptions] = useState();
    useEffect(() => {
        window.Core.Json.CallProcedure("FrontEnd.GetMenuData", null, {
            onSuccess: function (data) {
                function getLenghtOfObject(obj) {
                    console.log(obj)
                    return Object.keys(obj).length;
                }
            
                function orderObject(data){
                    let md = {Items: []};
                    console.log(md)
                    let items;
                    console.log(items)
                    let itemParameters;
                    console.log(itemParameters)
                    let itemProperties;
                    console.log(itemProperties)
                    items = (getLenghtOfObject(data) > 0) ? data.Table : items;
                    console.log(data.Table)
                    itemParameters = (getLenghtOfObject(data) > 1) ? data.Table1 : itemParameters;
                    console.log(data.Table1)
                    itemProperties = (getLenghtOfObject(data) > 2) ? data.Table2 : itemProperties;
                    console.log(data.Table2)
                
                    let parameters=[]; 
                    let properties=[]; 
                    console.log(parameters)
                    console.log(properties)
                
                    itemParameters.forEach(ip => {
                        let id = parseInt(ip.MenuLinkID, 32);
                        let option=
                        {
                            Name: ip.Name, 
                            Value: ip.Value
                        };
                        parameters[id]=option; 
                    });
                    console.log(parameters);
                    itemProperties.forEach(ip => {
                        let id = parseInt(ip.MenuId, 32);
                        let option=
                        {
                            Name: ip.Name, 
                            Value: ip.Value
                        };
                        properties[id]=option; 
                    });
                    console.log(properties)
                
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
                    console.log(itemsById);
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
                    console.log(md);
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
                    console.log(options);
                    return options;
                }
                //let categories=orderObject(data);
                let categories=orderObject(menuData);
                //console.log(categories);
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