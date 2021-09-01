import {React, useState, useEffect} from 'react';

import './Header.css';
import MenuItem from '../MenuItem/MenuItem';
import ItemGenerator from './../../utils/ItemGenerator/ItemGenerator';
import objectToGenerate from './../../utils/ItemGenerator/Object.json';
import Clock from './../Clock/Clock';
import Trending from './../Trending/Trending.tsx';
import Language from './../Language/Language';
import Configuration from '../Configuration/Configuration.tsx';
import MenuOpen from './../../assets/icons/menuOpen.png';
import MenuClose from './../../assets/icons/menuClose.png';
import User from './../User/User';

const Header = () => {
    let options;
    /* const [categories, setCategories] = useState([]); */
    const [width, setWidth] = useState(window.innerWidth);
    let menuOptions = [];
    options = ItemGenerator(objectToGenerate);
    
    /* const getCategories = new Promise((resolve, reject) => {
        resolve([ 
            {id: "1", name: "OEE", children: [
                {id: "5", label: "Overview", url:"/IHBox/oeeOverview" } ] },
            {id: "2", name: "Delays", children: [
                {id: "6", label: "Declare" },
                {id: "7", label: "Manager" }
            ] },
            {id: "3", name: "Schedule", url:"/IHBox/schedule" }, 
            {id: "4", name: "Reports", children: [
                {id: "8", label: "OEE" },
                {id: "9", label: "Losses" },
                {id: "10", label: "Events" },
                {id: "11", label: "Delays" },
                {id: "12", label: "Batch" },
                {id: "13", label: "Last 24 Hours", children: options[1].children}                
            ] } ])
    });  */

    useEffect(() => {
        /* getCategories.then(
            result => {
                setCategories(result);
            }
        )      */  
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

    /* useEffect(() => {
        window.Core.Json.CallProcedure("FrontEnd.GetMenuData", null, {
            onSuccess: function (data) {
                let categories=orderObject(data);
                console.log(categories);
            },
            Async: false
        }, "APP");
    }, []); */

    let categories = {
        "Items": [
            {
                "Id": 32,
                "Parent": null,
                "Name": "Trending",
                "RouteId": 5,
                "Enabled": true,
                "Visible": true,
                "Group": "navbar_left_no_modules",
                "Route": "!/trending(/custom/:params)",
                "Children": [],
                "Order": null,
                "Properties": {
                    "Name": "localize-key",
                    "Value": "menu_item_trending"
                },
                "URL": "!/trending(/custom/:params)"
            },
            {
                "Id": 34,
                "Parent": null,
                "Name": "Configuration",
                "RouteId": null,
                "Enabled": true,
                "Visible": true,
                "Group": "ih_configuration",
                "Route": null,
                "Children": [
                    {
                        "Id": 35,
                        "Parent": 34,
                        "Name": "Account Configuration",
                        "RouteId": 9,
                        "Enabled": true,
                        "Visible": true,
                        "Group": null,
                        "Route": "!/ih/configuration(/:section)(/:sectionParam1)(/:sectionParam2)",
                        "Children": [],
                        "Order": 1,
                        "Parameters": {
                            "Name": "section",
                            "Value": "accountinformation"
                        },
                        "Properties": {
                            "Name": "localize-key",
                            "Value": "accountinformation_nav_label"
                        },
                        "URL": "!/ih/configuration(/:section)(/:sectionParam1)(/:sectionParam2)"
                    },
                    {
                        "Id": 36,
                        "Parent": 34,
                        "Name": "Users",
                        "RouteId": 9,
                        "Enabled": true,
                        "Visible": true,
                        "Group": null,
                        "Route": "!/ih/configuration(/:section)(/:sectionParam1)(/:sectionParam2)",
                        "Children": [],
                        "Order": 5,
                        "Parameters": {
                            "Name": "section",
                            "Value": "users"
                        },
                        "Properties": {
                            "Name": "localize-key",
                            "Value": "users_nav_label"
                        },
                        "URL": "!/ih/configuration(/:section)(/:sectionParam1)(/:sectionParam2)"
                    },
                    {
                        "Id": 37,
                        "Parent": 34,
                        "Name": "Data Sources",
                        "RouteId": 9,
                        "Enabled": true,
                        "Visible": true,
                        "Group": null,
                        "Route": "!/ih/configuration(/:section)(/:sectionParam1)(/:sectionParam2)",
                        "Children": [],
                        "Order": 2,
                        "Parameters": {
                            "Name": "section",
                            "Value": "datasources"
                        },
                        "Properties": {
                            "Name": "localize-key",
                            "Value": "datasources_nav_label"
                        },
                        "URL": "!/ih/configuration(/:section)(/:sectionParam1)(/:sectionParam2)"
                    },
                    {
                        "Id": 39,
                        "Parent": 34,
                        "Name": "Tags",
                        "RouteId": 9,
                        "Enabled": true,
                        "Visible": true,
                        "Group": null,
                        "Route": "!/ih/configuration(/:section)(/:sectionParam1)(/:sectionParam2)",
                        "Children": [],
                        "Order": 3,
                        "Parameters": {
                            "Name": "section",
                            "Value": "tags"
                        },
                        "Properties": {
                            "Name": "localize-key",
                            "Value": "tags_nav_label"
                        },
                        "URL": "!/ih/configuration(/:section)(/:sectionParam1)(/:sectionParam2)"
                    },
                    {
                        "Id": 40,
                        "Parent": 34,
                        "Name": "Tags Export",
                        "RouteId": 9,
                        "Enabled": true,
                        "Visible": true,
                        "Group": null,
                        "Route": "!/ih/configuration(/:section)(/:sectionParam1)(/:sectionParam2)",
                        "Children": [],
                        "Order": 10,
                        "Parameters": {
                            "Name": "section",
                            "Value": "tagsexportconfiguration"
                        },
                        "Properties": {
                            "Name": "localize-key",
                            "Value": "tagsExportConfiguration_nav_label"
                        },
                        "URL": "!/ih/configuration(/:section)(/:sectionParam1)(/:sectionParam2)"
                    },
                    {
                        "Id": 64,
                        "Parent": 34,
                        "Name": "System Network Configuration",
                        "RouteId": 9,
                        "Enabled": true,
                        "Visible": true,
                        "Group": null,
                        "Route": "!/ih/configuration(/:section)(/:sectionParam1)(/:sectionParam2)",
                        "Children": [],
                        "Order": 11,
                        "Parameters": {
                            "Name": "section",
                            "Value": "systemnetworkconfiguration"
                        },
                        "Properties": {
                            "Name": "localize-key",
                            "Value": "systemNetworkConfiguration_nav_label"
                        },
                        "URL": "!/ih/configuration(/:section)(/:sectionParam1)(/:sectionParam2)"
                    },
                    {
                        "Id": 65,
                        "Parent": 34,
                        "Name": "Reset to Factory Defaults",
                        "RouteId": 9,
                        "Enabled": true,
                        "Visible": true,
                        "Group": null,
                        "Route": "!/ih/configuration(/:section)(/:sectionParam1)(/:sectionParam2)",
                        "Children": [],
                        "Order": 12,
                        "Parameters": {
                            "Name": "section",
                            "Value": "resettofactorydefaults"
                        },
                        "Properties": {
                            "Name": "localize-key",
                            "Value": "resetToFactoryDefaults_nav_label"
                        },
                        "URL": "!/ih/configuration(/:section)(/:sectionParam1)(/:sectionParam2)"
                    },
                    {
                        "Id": 68,
                        "Parent": 34,
                        "Name": "Profiles",
                        "RouteId": 9,
                        "Enabled": true,
                        "Visible": true,
                        "Group": null,
                        "Route": "!/ih/configuration(/:section)(/:sectionParam1)(/:sectionParam2)",
                        "Children": [],
                        "Order": 4,
                        "Parameters": {
                            "Name": "section",
                            "Value": "securityprofiles"
                        },
                        "Properties": {
                            "Name": "localize-key",
                            "Value": "profiles_nav_label"
                        },
                        "URL": "!/ih/configuration(/:section)(/:sectionParam1)(/:sectionParam2)"
                    },
                    {
                        "Id": 71,
                        "Parent": 34,
                        "Name": "Audit",
                        "RouteId": 9,
                        "Enabled": true,
                        "Visible": true,
                        "Group": null,
                        "Route": "!/ih/configuration(/:section)(/:sectionParam1)(/:sectionParam2)",
                        "Children": [],
                        "Order": 8,
                        "Parameters": {
                            "Name": "section",
                            "Value": "audit"
                        },
                        "Properties": {
                            "Name": "localize-key",
                            "Value": "audit_nav_label"
                        },
                        "URL": "!/ih/configuration(/:section)(/:sectionParam1)(/:sectionParam2)"
                    },
                    {
                        "Id": 72,
                        "Parent": 34,
                        "Name": "Backup / Restore",
                        "RouteId": 9,
                        "Enabled": true,
                        "Visible": true,
                        "Group": null,
                        "Route": "!/ih/configuration(/:section)(/:sectionParam1)(/:sectionParam2)",
                        "Children": [],
                        "Order": 9,
                        "Parameters": {
                            "Name": "section",
                            "Value": "backupConfiguration"
                        },
                        "Properties": {
                            "Name": "localize-key",
                            "Value": "backup_nav_label"
                        },
                        "URL": "!/ih/configuration(/:section)(/:sectionParam1)(/:sectionParam2)"
                    },
                    {
                        "Id": 73,
                        "Parent": 34,
                        "Name": "Network Overview",
                        "RouteId": 9,
                        "Enabled": true,
                        "Visible": true,
                        "Group": null,
                        "Route": "!/ih/configuration(/:section)(/:sectionParam1)(/:sectionParam2)",
                        "Children": [],
                        "Order": 6,
                        "Parameters": {
                            "Name": "section",
                            "Value": "networkoverview"
                        },
                        "Properties": {
                            "Name": "localize-key",
                            "Value": "networkoverview_nav_label"
                        },
                        "URL": "!/ih/configuration(/:section)(/:sectionParam1)(/:sectionParam2)"
                    },
                    {
                        "Id": 202886,
                        "Parent": 34,
                        "Name": "Agent Command",
                        "RouteId": 9,
                        "Enabled": true,
                        "Visible": true,
                        "Group": null,
                        "Route": "!/ih/configuration(/:section)(/:sectionParam1)(/:sectionParam2)",
                        "Children": [],
                        "Order": 7,
                        "Parameters": {
                            "Name": "section",
                            "Value": "sendagentcommands"
                        },
                        "Properties": {
                            "Name": "localize-key",
                            "Value": "send_agent_commands_nav_label"
                        },
                        "URL": "!/ih/configuration(/:section)(/:sectionParam1)(/:sectionParam2)"
                    },
                    {
                        "Id": 302148,
                        "Parent": 34,
                        "Name": "Mobile-devices",
                        "RouteId": 9,
                        "Enabled": true,
                        "Visible": true,
                        "Group": "ih_configuration",
                        "Route": "!/ih/configuration(/:section)(/:sectionParam1)(/:sectionParam2)",
                        "Children": [],
                        "Order": 8,
                        "Parameters": {
                            "Name": "section",
                            "Value": "mobile-devices"
                        },
                        "Properties": {
                            "Name": "localize-key",
                            "Value": "mobile-devices"
                        },
                        "URL": "!/ih/configuration(/:section)(/:sectionParam1)(/:sectionParam2)"
                    }
                ],
                "Order": 1,
                "Properties": {
                    "Name": "localize-key",
                    "Value": "configuration_label"
                },
                "URL": null
            },
            {
                "Id": 69,
                "Parent": null,
                "Name": "About",
                "RouteId": null,
                "Enabled": true,
                "Visible": true,
                "Group": "ih_configuration",
                "Route": null,
                "Children": [
                    {
                        "Id": 70,
                        "Parent": 69,
                        "Name": "About",
                        "RouteId": 9,
                        "Enabled": true,
                        "Visible": true,
                        "Group": null,
                        "Route": "!/ih/configuration(/:section)(/:sectionParam1)(/:sectionParam2)",
                        "Children": [],
                        "Order": 1,
                        "Parameters": {
                            "Name": "section",
                            "Value": "about"
                        },
                        "Properties": {
                            "Name": "localize-key",
                            "Value": "about_label"
                        },
                        "URL": "!/ih/configuration(/:section)(/:sectionParam1)(/:sectionParam2)"
                    },
                    {
                        "Id": 302144,
                        "Parent": 69,
                        "Name": "HowTo",
                        "RouteId": 9,
                        "Enabled": true,
                        "Visible": true,
                        "Group": null,
                        "Route": "!/ih/configuration(/:section)(/:sectionParam1)(/:sectionParam2)",
                        "Children": [],
                        "Order": 2,
                        "Parameters": {
                            "Name": "section",
                            "Value": "howto"
                        },
                        "Properties": {
                            "Name": "localize-key",
                            "Value": "howto_label"
                        },
                        "URL": "!/ih/configuration(/:section)(/:sectionParam1)(/:sectionParam2)"
                    }
                ],
                "Order": 999999,
                "Properties": {
                    "Name": "localize-key",
                    "Value": "about_label"
                },
                "URL": null
            },
            {
                "Id": 96,
                "Parent": null,
                "Name": "Trending",
                "RouteId": 5,
                "Enabled": true,
                "Visible": true,
                "Group": "navbar_right_with_modules",
                "Route": "!/trending(/custom/:params)",
                "Children": [],
                "Order": null,
                "Properties": {
                    "Name": "localize-key",
                    "Value": "menu_item_trending"
                },
                "URL": "!/trending(/custom/:params)"
            },
            {
                "Id": 70913,
                "Parent": null,
                "Name": "TOOLS",
                "RouteId": null,
                "Enabled": true,
                "Visible": true,
                "Group": "ih_configuration",
                "Route": null,
                "Children": [
                    {
                        "Id": 37961,
                        "Parent": 70913,
                        "Name": "Mimic Builder",
                        "RouteId": 9,
                        "Enabled": true,
                        "Visible": true,
                        "Group": null,
                        "Route": "!/ih/configuration(/:section)(/:sectionParam1)(/:sectionParam2)",
                        "Children": [],
                        "Order": 2,
                        "Parameters": {
                            "Name": "section",
                            "Value": "screenbuilder"
                        },
                        "Properties": {
                            "Name": "localize-key",
                            "Value": "screens_screenbuilder_nav_label"
                        },
                        "URL": "!/ih/configuration(/:section)(/:sectionParam1)(/:sectionParam2)"
                    }
                ],
                "Order": 5,
                "Properties": {
                    "Name": "localize-key",
                    "Value": "screenbuilder_nav_label"
                },
                "URL": null
            },
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
                    },
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
                "Id": 70947,
                "Parent": null,
                "Name": "OEE Configuration",
                "RouteId": null,
                "Enabled": true,
                "Visible": true,
                "Group": "ih_configuration",
                "Route": null,
                "Children": [
                    {
                        "Id": 70948,
                        "Parent": 70947,
                        "Name": "Lines and Machines",
                        "RouteId": 9,
                        "Enabled": true,
                        "Visible": true,
                        "Group": null,
                        "Route": "!/ih/configuration(/:section)(/:sectionParam1)(/:sectionParam2)",
                        "Children": [],
                        "Order": 1,
                        "Parameters": {
                            "Name": "section",
                            "Value": "oeeconfiguration"
                        },
                        "Properties": {
                            "Name": "localize-key",
                            "Value": "oee_configuration_label"
                        },
                        "URL": "!/ih/configuration(/:section)(/:sectionParam1)(/:sectionParam2)"
                    },
                    {
                        "Id": 70949,
                        "Parent": 70947,
                        "Name": "Delay Categories",
                        "RouteId": 9,
                        "Enabled": true,
                        "Visible": true,
                        "Group": null,
                        "Route": "!/ih/configuration(/:section)(/:sectionParam1)(/:sectionParam2)",
                        "Children": [],
                        "Order": 2,
                        "Parameters": {
                            "Name": "section",
                            "Value": "delaycategories"
                        },
                        "Properties": {
                            "Name": "localize-key",
                            "Value": "delay_categories_label"
                        },
                        "URL": "!/ih/configuration(/:section)(/:sectionParam1)(/:sectionParam2)"
                    },
                    {
                        "Id": 70950,
                        "Parent": 70947,
                        "Name": "Delay Codes",
                        "RouteId": 9,
                        "Enabled": true,
                        "Visible": true,
                        "Group": null,
                        "Route": "!/ih/configuration(/:section)(/:sectionParam1)(/:sectionParam2)",
                        "Children": [],
                        "Order": 3,
                        "Parameters": {
                            "Name": "section",
                            "Value": "delaycodes"
                        },
                        "Properties": {
                            "Name": "localize-key",
                            "Value": "delay_codes_label"
                        },
                        "URL": "!/ih/configuration(/:section)(/:sectionParam1)(/:sectionParam2)"
                    },
                    {
                        "Id": 70951,
                        "Parent": 70947,
                        "Name": "Products",
                        "RouteId": 9,
                        "Enabled": true,
                        "Visible": true,
                        "Group": null,
                        "Route": "!/ih/configuration(/:section)(/:sectionParam1)(/:sectionParam2)",
                        "Children": [],
                        "Order": 4,
                        "Parameters": {
                            "Name": "section",
                            "Value": "products"
                        },
                        "Properties": {
                            "Name": "localize-key",
                            "Value": "products_label"
                        },
                        "URL": "!/ih/configuration(/:section)(/:sectionParam1)(/:sectionParam2)"
                    },
                    {
                        "Id": 70952,
                        "Parent": 70947,
                        "Name": "Line Products",
                        "RouteId": 9,
                        "Enabled": true,
                        "Visible": true,
                        "Group": null,
                        "Route": "!/ih/configuration(/:section)(/:sectionParam1)(/:sectionParam2)",
                        "Children": [],
                        "Order": 5,
                        "Parameters": {
                            "Name": "section",
                            "Value": "lineproducts"
                        },
                        "Properties": {
                            "Name": "localize-key",
                            "Value": "line_products_label"
                        },
                        "URL": "!/ih/configuration(/:section)(/:sectionParam1)(/:sectionParam2)"
                    },
                    {
                        "Id": 70953,
                        "Parent": 70947,
                        "Name": "Shifts",
                        "RouteId": 9,
                        "Enabled": true,
                        "Visible": true,
                        "Group": null,
                        "Route": "!/ih/configuration(/:section)(/:sectionParam1)(/:sectionParam2)",
                        "Children": [],
                        "Order": 6,
                        "Parameters": {
                            "Name": "section",
                            "Value": "shifts"
                        },
                        "Properties": {
                            "Name": "localize-key",
                            "Value": "shifts_label"
                        },
                        "URL": "!/ih/configuration(/:section)(/:sectionParam1)(/:sectionParam2)"
                    },
                    {
                        "Id": 71680,
                        "Parent": 70947,
                        "Name": "Reset to Factory Defaults",
                        "RouteId": 9,
                        "Enabled": true,
                        "Visible": true,
                        "Group": null,
                        "Route": "!/ih/configuration(/:section)(/:sectionParam1)(/:sectionParam2)",
                        "Children": [],
                        "Order": 7,
                        "Parameters": {
                            "Name": "section",
                            "Value": "resettofactorydefaultsoee"
                        },
                        "Properties": {
                            "Name": "localize-key",
                            "Value": "resetToFactoryDefaults_oee_nav_label"
                        },
                        "URL": "!/ih/configuration(/:section)(/:sectionParam1)(/:sectionParam2)"
                    },
                    {
                        "Id": 71681,
                        "Parent": 70947,
                        "Name": "User Manual",
                        "RouteId": 9,
                        "Enabled": true,
                        "Visible": true,
                        "Group": null,
                        "Route": "!/ih/configuration(/:section)(/:sectionParam1)(/:sectionParam2)",
                        "Children": [],
                        "Order": 8,
                        "Parameters": {
                            "Name": "section",
                            "Value": "usermanualoee"
                        },
                        "Properties": {
                            "Name": "localize-key",
                            "Value": "user_manual_nav_label"
                        },
                        "URL": "!/ih/configuration(/:section)(/:sectionParam1)(/:sectionParam2)"
                    },
                    {
                        "Id": 302120,
                        "Parent": 70947,
                        "Name": "Event Codes",
                        "RouteId": 9,
                        "Enabled": true,
                        "Visible": true,
                        "Group": "ih_configuration",
                        "Route": "!/ih/configuration(/:section)(/:sectionParam1)(/:sectionParam2)",
                        "Children": [],
                        "Order": 4,
                        "Parameters": {
                            "Name": "section",
                            "Value": "oee-event-codes"
                        },
                        "Properties": {
                            "Name": "localize-key",
                            "Value": "menu_item_oee-event-codes_label"
                        },
                        "URL": "!/ih/configuration(/:section)(/:sectionParam1)(/:sectionParam2)"
                    }
                ],
                "Order": 4,
                "Properties": {
                    "Name": "localize-key",
                    "Value": "menu_item_configuration_oee_label"
                },
                "URL": null
            },
            {
                "Id": 302112,
                "Parent": null,
                "Name": "OEE",
                "RouteId": 72867,
                "Enabled": true,
                "Visible": true,
                "Group": "OEE.operation-container-modes",
                "Route": "!/operation-container/oee(/)",
                "Children": [],
                "Order": 1,
                "Properties": {
                    "Name": "operation-code",
                    "Value": "oee"
                },
                "URL": "!/operation-container/oee(/)"
            },
            {
                "Id": 302113,
                "Parent": null,
                "Name": "Production",
                "RouteId": 72868,
                "Enabled": true,
                "Visible": true,
                "Group": "OEE.operation-container-modes",
                "Route": "!/operation-container/production(/)",
                "Children": [],
                "Order": 2,
                "Properties": {
                    "Name": "operation-code",
                    "Value": "production"
                },
                "URL": "!/operation-container/production(/)"
            },
            {
                "Id": 302114,
                "Parent": null,
                "Name": "Information Core",
                "RouteId": null,
                "Enabled": true,
                "Visible": true,
                "Group": "ih_configuration",
                "Route": null,
                "Children": [
                    {
                        "Id": 302086,
                        "Parent": 302114,
                        "Name": "Equipments",
                        "RouteId": 9,
                        "Enabled": true,
                        "Visible": true,
                        "Group": null,
                        "Route": "!/ih/configuration(/:section)(/:sectionParam1)(/:sectionParam2)",
                        "Children": [],
                        "Order": 6,
                        "Parameters": {
                            "Name": "section",
                            "Value": "equipments"
                        },
                        "Properties": {
                            "Name": "localize-key",
                            "Value": "equipments"
                        },
                        "URL": "!/ih/configuration(/:section)(/:sectionParam1)(/:sectionParam2)"
                    },
                    {
                        "Id": 302087,
                        "Parent": 302114,
                        "Name": "Equipment Models",
                        "RouteId": 9,
                        "Enabled": true,
                        "Visible": true,
                        "Group": null,
                        "Route": "!/ih/configuration(/:section)(/:sectionParam1)(/:sectionParam2)",
                        "Children": [],
                        "Order": 5,
                        "Parameters": {
                            "Name": "section",
                            "Value": "equipmentmodels"
                        },
                        "Properties": {
                            "Name": "localize-key",
                            "Value": "equipment-models"
                        },
                        "URL": "!/ih/configuration(/:section)(/:sectionParam1)(/:sectionParam2)"
                    },
                    {
                        "Id": 302088,
                        "Parent": 302114,
                        "Name": "Equipment Events",
                        "RouteId": 9,
                        "Enabled": true,
                        "Visible": true,
                        "Group": null,
                        "Route": "!/ih/configuration(/:section)(/:sectionParam1)(/:sectionParam2)",
                        "Children": [],
                        "Order": 7,
                        "Parameters": {
                            "Name": "section",
                            "Value": "equipment-events"
                        },
                        "Properties": {
                            "Name": "localize-key",
                            "Value": "menu_item_equipment-events_label"
                        },
                        "URL": "!/ih/configuration(/:section)(/:sectionParam1)(/:sectionParam2)"
                    },
                    {
                        "Id": 302115,
                        "Parent": 302114,
                        "Name": "Event Codes",
                        "RouteId": 9,
                        "Enabled": true,
                        "Visible": true,
                        "Group": "ih_configuration",
                        "Route": "!/ih/configuration(/:section)(/:sectionParam1)(/:sectionParam2)",
                        "Children": [],
                        "Order": 3,
                        "Parameters": {
                            "Name": "section",
                            "Value": "event-codes"
                        },
                        "Properties": {
                            "Name": "localize-key",
                            "Value": "menu_item_event-codes_label"
                        },
                        "URL": "!/ih/configuration(/:section)(/:sectionParam1)(/:sectionParam2)"
                    },
                    {
                        "Id": 302116,
                        "Parent": 302114,
                        "Name": "Equipment Products",
                        "RouteId": 9,
                        "Enabled": true,
                        "Visible": true,
                        "Group": "ih_configuration",
                        "Route": "!/ih/configuration(/:section)(/:sectionParam1)(/:sectionParam2)",
                        "Children": [],
                        "Order": 8,
                        "Parameters": {
                            "Name": "section",
                            "Value": "schedule.equipment-products"
                        },
                        "Properties": {
                            "Name": "localize-key",
                            "Value": "menu_item_schedule.equipment-products_label"
                        },
                        "URL": "!/ih/configuration(/:section)(/:sectionParam1)(/:sectionParam2)"
                    },
                    {
                        "Id": 302117,
                        "Parent": 302114,
                        "Name": "Products",
                        "RouteId": 9,
                        "Enabled": true,
                        "Visible": true,
                        "Group": "ih_configuration",
                        "Route": "!/ih/configuration(/:section)(/:sectionParam1)(/:sectionParam2)",
                        "Children": [],
                        "Order": 4,
                        "Parameters": {
                            "Name": "section",
                            "Value": "schedule.products"
                        },
                        "Properties": {
                            "Name": "localize-key",
                            "Value": "menu_item_schedule.products_label"
                        },
                        "URL": "!/ih/configuration(/:section)(/:sectionParam1)(/:sectionParam2)"
                    },
                    {
                        "Id": 302118,
                        "Parent": 302114,
                        "Name": "Event Categories",
                        "RouteId": 9,
                        "Enabled": true,
                        "Visible": true,
                        "Group": "ih_configuration",
                        "Route": "!/ih/configuration(/:section)(/:sectionParam1)(/:sectionParam2)",
                        "Children": [],
                        "Order": 2,
                        "Parameters": {
                            "Name": "section",
                            "Value": "event-categories"
                        },
                        "Properties": {
                            "Name": "localize-key",
                            "Value": "menu_item_event-categories_label"
                        },
                        "URL": "!/ih/configuration(/:section)(/:sectionParam1)(/:sectionParam2)"
                    },
                    {
                        "Id": 302119,
                        "Parent": 302114,
                        "Name": "Events",
                        "RouteId": 9,
                        "Enabled": true,
                        "Visible": true,
                        "Group": "ih_configuration",
                        "Route": "!/ih/configuration(/:section)(/:sectionParam1)(/:sectionParam2)",
                        "Children": [],
                        "Order": 1,
                        "Parameters": {
                            "Name": "section",
                            "Value": "events"
                        },
                        "Properties": {
                            "Name": "localize-key",
                            "Value": "menu_item_events_label"
                        },
                        "URL": "!/ih/configuration(/:section)(/:sectionParam1)(/:sectionParam2)"
                    }
                ],
                "Order": 1,
                "Properties": {
                    "Name": "localize-key",
                    "Value": "menu_item_core.information-core_label"
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
        ]
    }

    function filterByGroup(menu, group) {
        let options=[];
        menu.Items.forEach(function (item) {
            if (item.Group === group) {
                options.push(item);
            }
        });
        console.log(options);
        options.sort(function(a, b) {
            if(a.Order < b.Order) return -1;
            if(a.Order > b.Order) return 1;
            return 0;
        });
        console.log(options);
        return options;
    }

    menuOptions = filterByGroup(categories, "navbar_left_with_modules")
    console.log(menuOptions);
    const HeaderBasic = () => {
        return (
            <>
                <ul className="headerLeft">
                    {menuOptions.map((option) => {
                        return( 
                            <div className="items" key={option.Id}>
                                <MenuItem item={option}/>
                            </div>
                        )
                    })}
                </ul>

                <div className="headerRight">
                    <Trending/>
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