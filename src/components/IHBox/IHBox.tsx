import './IHBox.css';
import {  useState, useEffect } from 'react';
import Header from '../Header/Header';
import Logo from './../../assets/images/logo.png';
import ConfigurationPage from '../ConfigurationPage/ConfigurationPage';
import Overview from '../Overview/Overview';
import { Route, Switch } from 'react-router-dom';
import PageNotFound from '../PageNotFound/PageNotFound';
import DBContext from '../../context/DBContext';
import { 
    MenuItemInterface, 
    MenuDataInterface, 
    MenuItemPropertiesInterface, 
    MenuDataTableInterface, 
    MenuDataTable1Interface,
    MenuDataTable2Interface,
    MenuDataProcessedInterface
 } from '../../utils/interfaces/interfaces';
import menuData from '../../data/menuData.json';

declare const window: any;

const IHBox = () => {
    const [headerOptions, setHeaderOptions] = useState<MenuItemInterface[]>();
    const [trendingOption, setTrendingOption] = useState<MenuItemInterface[]>();
    const [configurationOptions, setConfigurationOptions] = useState<MenuItemInterface[]>();
    useEffect(() => {
        window.Core.Json.CallProcedure("FrontEnd.GetMenuData", null, {
            onSuccess: function (data : MenuDataInterface) {
                function getLenghtOfObject(obj : MenuDataInterface) {
                    return Object.keys(obj).length;
                }
            
                function orderObject(data : MenuDataInterface){
                    let md:MenuDataProcessedInterface;
                    md = {Items: []};
                    let items:MenuDataTableInterface[];
                    items=[];
                    let itemParameters: MenuDataTable1Interface[];
                    itemParameters=[];
                    let itemProperties: MenuDataTable2Interface[];
                    itemProperties=[];
                    items = (getLenghtOfObject(data) > 0) ? data.Table : items;
                    itemParameters = (getLenghtOfObject(data) > 1) ? data.Table1 : itemParameters;
                    itemProperties = (getLenghtOfObject(data) > 2) ? data.Table2 : itemProperties;
                    
                    let parameters: MenuItemPropertiesInterface[];
                    parameters=[]; 
                    let properties: MenuItemPropertiesInterface[];
                    properties=[];
                
                    itemParameters.forEach(ip => {
                        let id = parseInt(ip.MenuLinkID.toString(), 32);
                        let option=
                        {
                            Name: ip.Name, 
                            Value: ip.Value
                        };
                        parameters[id]=option; 
                    });
                    itemProperties.forEach(ip => {
                        let id = parseInt(ip.MenuId.toString(), 32);
                        let option=
                        {
                            Name: ip.Name, 
                            Value: ip.Value
                        };
                        properties[id]=option; 
                    });

                    let itemsById: MenuItemInterface[];
                    itemsById = [];
                
                    for (let i = 0; i < items.length; i++)
                    {
                        let row = items[i];
                        let mi: MenuItemInterface;
                        mi = 
                        {
                            Id: parseInt(row.Id.toString(), 32),
                            Parent: row.Parent ? parseInt(row.Parent.toString(), 32) : null,
                            Name: row.Name ? row.Name : null,
                            RouteId: row.RouteID ? parseInt(row.RouteID.toString(), 32) : null,
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
                        let mi: MenuItemInterface;
                        mi = kvp;
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
            
                function filterByGroup(menu:MenuDataProcessedInterface, group:string) {
                    let options:MenuItemInterface[];
                    options=[];
                    menu.Items.forEach(function (item) {
                        if (item.Group === group) {
                            options.push(item);
                        }
                    });
                    options.sort(function(a, b) {
                        if(a.Order!==null && b.Order!==null){
                            if(a.Order < b.Order) return -1;
                            if(a.Order > b.Order) return 1;    
                        }
                        return 0;
                    });
                    return options;
                }
                let categories=orderObject(data);
                /* const mData = menuData as MenuDataInterface;
                let categories=orderObject(mData); */
                
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