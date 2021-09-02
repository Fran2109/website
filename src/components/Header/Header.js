import {React, useState, useEffect} from 'react';

import './Header.css';
import MenuItem from '../MenuItem/MenuItem';
import Clock from './../Clock/Clock';
import Trending from './../Trending/Trending.tsx';
import Language from './../Language/Language';
import Configuration from '../Configuration/Configuration.tsx';
import MenuOpen from './../../assets/icons/menuOpen.png';
import MenuClose from './../../assets/icons/menuClose.png';
import User from './../User/User';

const Header = () => {
    const [width, setWidth] = useState(window.innerWidth);
    const[menuOptions, setMenuOptions] = useState([]);
    const[trendingOption, setTrendingOption] = useState();

    useEffect(() => {
        const interval = setInterval(() => {
            if (window.innerWidth !== width) {
                setWidth(window.innerWidth);
            }
        }, 100);
        return () => clearInterval(interval); 
    }, [] );
    
    const [visibility, setVisibility] = useState(false);
    
    const changeVisibility = () => {
        setVisibility(!visibility);
    }

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

    useEffect(() => {
        /* window.Core.Json.CallProcedure("FrontEnd.GetMenuData", null, {
            onSuccess: function (data) {
                let categories=orderObject(data);
                console.log(categories);
                setMenuOptions(filterByGroup(categories, "navbar_left_with_modules"))
                if(filterByGroup(categories, "navbar_right_with_modules").length > 0)
                {
                    setTrendingOption(filterByGroup(categories, "navbar_right_with_modules"))
                }
            },
            Async: false
        }, "APP"); */
        
        setMenuOptions([
            {
                "Id": 70914,
                "Parent": null,
                "Name": "OEE",
                "RouteId": null,
                "Enabled": true,
                "Visible": true,
                "Group": "navbar_left_with_modules",
                "Route": null,
                "Children": [
                    {
                        "Id": 70918,
                        "Parent": 70914,
                        "Name": "Overview",
                        "RouteId": 39940,
                        "Enabled": true,
                        "Visible": true,
                        "Group": null,
                        "Route": "!/oeeOverview(/:ihid)(/:id)(/:shiftId)(/:time)(/)",
                        "Children": [],
                        "Order": 1,
                        "Properties": {
                            "Name": "localize-key",
                            "Value": "menu_item_OEE_overview"
                        },
                        "URL": "!/oeeOverview(/:ihid)(/:id)(/:shiftId)(/:time)(/)"
                    },
                    {
                        "Id": 302306,
                        "Parent": 70914,
                        "Name": "New Menu",
                        "RouteId": null,
                        "Enabled": true,
                        "Visible": true,
                        "Group": "navbar_left_with_modules",
                        "Route": null,
                        "Children": [
                            {
                                "Id": 302307,
                                "Parent": 302306,
                                "Name": "New Item",
                                "RouteId": 73733,
                                "Enabled": true,
                                "Visible": true,
                                "Group": null,
                                "Route": "!/screens/32",
                                "Children": [],
                                "Order": 1,
                                "URL": "!/screens/32"
                            }
                        ],
                        "Order": 2,
                        "URL": null
                    }
                ],
                "Order": 1,
                "Properties": {
                    "Name": "localize-key",
                    "Value": "menu_item_OEE"
                },
                "URL": null
            },
            {
                "Id": 70915,
                "Parent": null,
                "Name": "Delays",
                "RouteId": null,
                "Enabled": true,
                "Visible": true,
                "Group": "navbar_left_with_modules",
                "Route": null,
                "Children": [
                    {
                        "Id": 70920,
                        "Parent": 70915,
                        "Name": "Declare",
                        "RouteId": 39969,
                        "Enabled": true,
                        "Visible": true,
                        "Group": null,
                        "Route": "!/delayssimple",
                        "Children": [],
                        "Order": 1,
                        "Properties": {
                            "Name": "localize-key",
                            "Value": "menu_item_delays_declare"
                        },
                        "URL": "!/delayssimple"
                    },
                    {
                        "Id": 70919,
                        "Parent": 70915,
                        "Name": "Manager",
                        "RouteId": 39945,
                        "Enabled": true,
                        "Visible": true,
                        "Group": null,
                        "Route": "!/delays1",
                        "Children": [],
                        "Order": 2,
                        "Properties": {
                            "Name": "localize-key",
                            "Value": "menu_item_delays_manager"
                        },
                        "URL": "!/delays1"
                    }
                ],
                "Order": 2,
                "Properties": {
                    "Name": "localize-key",
                    "Value": "menu_item_delays"
                },
                "URL": null
            },
            {
                "Id": 302145,
                "Parent": null,
                "Name": "Schedule",
                "RouteId": 72929,
                "Enabled": true,
                "Visible": true,
                "Group": "navbar_left_with_modules",
                "Route": "!/schedule",
                "Children": [],
                "Order": 3,
                "Properties": {
                    "Name": "localize-key",
                    "Value": "menu_item_schedule.schedule_label"
                },
                "URL": "!/schedule"
            },
            {
                "Id": 70917,
                "Parent": null,
                "Name": "Reports",
                "RouteId": null,
                "Enabled": true,
                "Visible": true,
                "Group": "navbar_left_with_modules",
                "Route": null,
                "Children": [
                    {
                        "Id": 70921,
                        "Parent": 70917,
                        "Name": "OEE",
                        "RouteId": 39942,
                        "Enabled": true,
                        "Visible": true,
                        "Group": null,
                        "Route": "!/oeeReport",
                        "Children": [],
                        "Order": 1,
                        "Properties": {
                            "Name": "localize-key",
                            "Value": "menu_item_oee_report"
                        },
                        "URL": "!/oeeReport"
                    },
                    {
                        "Id": 302089,
                        "Parent": 70917,
                        "Name": "Losses",
                        "RouteId": 72865,
                        "Enabled": true,
                        "Visible": true,
                        "Group": "navbar_left_with_modules",
                        "Route": "!/losses(/)",
                        "Children": [],
                        "Order": 1,
                        "Parameters": {
                            "Name": "section",
                            "Value": "oee.losses"
                        },
                        "Properties": {
                            "Name": "localize-key",
                            "Value": "menu_item_OEE.losses_label"
                        },
                        "URL": "!/losses(/)"
                    },
                    {
                        "Id": 70944,
                        "Parent": 70917,
                        "Name": "Delays",
                        "RouteId": 39968,
                        "Enabled": true,
                        "Visible": true,
                        "Group": null,
                        "Route": "!/delays3",
                        "Children": [],
                        "Order": 2,
                        "Properties": {
                            "Name": "localize-key",
                            "Value": "menu_item_delays_report"
                        },
                        "URL": "!/delays3"
                    },
                    {
                        "Id": 302121,
                        "Parent": 70917,
                        "Name": "Events",
                        "RouteId": 72898,
                        "Enabled": true,
                        "Visible": true,
                        "Group": null,
                        "Route": "!/eventssummaryreport",
                        "Children": [],
                        "Order": 2,
                        "URL": "!/eventssummaryreport"
                    },
                    {
                        "Id": 70945,
                        "Parent": 70917,
                        "Name": "Batch",
                        "RouteId": 39941,
                        "Enabled": true,
                        "Visible": true,
                        "Group": null,
                        "Route": "!/oeeBatch(/:id)",
                        "Children": [],
                        "Order": 3,
                        "Properties": {
                            "Name": "localize-key",
                            "Value": "menu_item_batch_report"
                        },
                        "URL": "!/oeeBatch(/:id)"
                    },
                    {
                        "Id": 70946,
                        "Parent": 70917,
                        "Name": "Last 24 Hours",
                        "RouteId": 39944,
                        "Enabled": true,
                        "Visible": true,
                        "Group": null,
                        "Route": "!/last24hoursreport",
                        "Children": [],
                        "Order": 4,
                        "Properties": {
                            "Name": "localize-key",
                            "Value": "menu_item_oee_last24hoursreport_label"
                        },
                        "URL": "!/last24hoursreport"
                    }
                ],
                "Order": 4,
                "Properties": {
                    "Name": "localize-key",
                    "Value": "menu_item_reports"
                },
                "URL": null
            },
            {
                "Id": 302149,
                "Parent": null,
                "Name": "Mimics",
                "RouteId": null,
                "Enabled": true,
                "Visible": true,
                "Group": "navbar_left_with_modules",
                "Route": null,
                "Children": [
                    {
                        "Id": 302304,
                        "Parent": 302149,
                        "Name": "Nuevo Me",
                        "RouteId": null,
                        "Enabled": true,
                        "Visible": true,
                        "Group": "navbar_left_with_modules",
                        "Route": null,
                        "Children": [
                            {
                                "Id": 302305,
                                "Parent": 302304,
                                "Name": "New Item",
                                "RouteId": 73732,
                                "Enabled": true,
                                "Visible": true,
                                "Group": null,
                                "Route": "!/screens/31",
                                "Children": [],
                                "Order": 1,
                                "URL": "!/screens/31"
                            }
                        ],
                        "Order": 1,
                        "URL": null
                    }
                ],
                "Order": 1000000,
                "URL": null
            }
        ]);
        
    }, []);

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

    console.log(menuOptions);
    const HeaderBasic = () => {
        return (
            <>
                <ul className="headerLeft">
                    {menuOptions!==null?
                        menuOptions.map((option) => {
                            return( 
                                <div className="items" key={option.Id}>
                                    <MenuItem item={option}/>
                                </div>
                            )
                        })
                        :
                        null
                    }
                </ul>

                <div className="headerRight">
                    {
                        trendingOption!==undefined?
                            <Trending/>
                        :
                            null
                    }
                    <User/>
                    <Clock/>
                    <Language/>
                    <Configuration/>
                </div>
            </>
        )
    }

    return (
        <div className="header">
            { width > 1000?
                <>
                    <HeaderBasic />
                </>
                :
                <>

                    <div className="headerMobile">
                        <button className="menu" onClick={changeVisibility}>
                            {!visibility?
                                <img src={MenuOpen} alt="menuOpen"/>
                            :
                                <img src={MenuClose} alt="menuClose"/>
                            }
                        </button>
                    </div>
                    {visibility?
                        <HeaderBasic />
                    :
                        null
                    }
                </>
            }
        </div>
    )
};

export default Header;