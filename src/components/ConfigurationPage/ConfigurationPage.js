import './ConfigurationPage.css';
import Header from './../Header/Header';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
const ConfigurationPage = () => {
    const [configurations, setConfigurations] = useState([]);
    const getConfigurations = new Promise((resolve, reject) => {
        resolve([ 
            {id: "1", name: "Platform Configuration", children:[
                    {id: "2", name: "Account Information"},
                    {id: "3", name: "Data Sources"},
                    {id: "4", name: "Tags"},
                    {id: "5", name: "Profiles"},
                    {id: "6", name: "Users"},
                    {id: "7", name: "Network Overview"},
                    {id: "8", name: "Agent Command"},
                    {id: "9", name: "Mobile Devices"},
                    {id: "10", name: "Audit"},
                    {id: "11", name: "Backup/Restore"},
                    {id: "12", name: "Raw Data Export"},
                    {id: "13", name: "System Network Configurations"},
                    {id: "14", name: "Reset to Factory Defaults"}
                ] },
            {id: "15", name: "Information Core", children:[
                    {id: "16", name: "Events"},
                    {id: "17", name: "Event Categories"},
                    {id: "18", name: "Event Codes"},
                    {id: "19", name: "Products"},
                    {id: "20", name: "Equipment Models"},
                    {id: "21", name: "Equipments"},
                    {id: "22", name: "Equipments Events"},
                    {id: "23", name: "Equipments Products"}
                ] },
            {id: "24", name: "OEE Configuration", children:[
                    {id: "25", name: "OEE Configuration"},
                    {id: "26", name: "Delay Categories"},
                    {id: "27", name: "Delay Codes"},
                    {id: "28", name: "Events Codes"},
                    {id: "29", name: "Products"},
                    {id: "30", name: "Line Products"},
                    {id: "31", name: "Shifts"},
                    {id: "32", name: "Reset to Factory Defaults"},
                    {id: "33", name: "User Manual"}
                ] },
            {id: "34", name: "Tools", children:[
                    {id: "35", name: "Mimic Builder"}
                ] },
            {id: "36", name: "About", children:[
                    {id: "37", name: "About"},
                    {id: "38", name: "How To"}
                ] }
            ])
    }); 

    useEffect(() => {
        getConfigurations.then(configurations => {
            setConfigurations(configurations);
        });
    }, [])
    return(
        <div className="ConfigurationPage">
            <Header/>
            <div className="ConfigurationPageContent">
                <div className="ConfigurationLeft">
                    {configurations.map(configuration => {
                        return(
                            <div key={configuration.id} className="ConfigurationLeftContent" style={configuration.name=="About"? {marginBottom:"60px"} : null}>
                                <h4>{configuration.name}</h4>
                                <ul className="Options">
                                    {configuration.children.map(option => {
                                        return(
                                            <li key={option.id}>
                                                <Link to={`/configuration/${option.name}`}>{option.name}</Link>
                                            </li>
                                        )
                                    })}
                                </ul>
                            </div>
                        );
                    })}
                </div>
                <div className="ConfigurationRight">

                </div>
            </div>
        </div>
    );
}

export default ConfigurationPage;