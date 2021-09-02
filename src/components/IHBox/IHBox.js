import './IHBox.css';
import Header from '../Header/Header';
import Logo from './../../assets/images/logo.png';
import ConfigurationPage from '../ConfigurationPage/ConfigurationPage';
import Overview from './../Overview/Overview.tsx';
import {  Route, Switch } from 'react-router-dom';
import PageNotFound from '../PageNotFound/PageNotFound.tsx';

const IHBox = () => {
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
    );
}

export default IHBox;