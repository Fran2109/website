import './IHBox.css';
import Header from '../Header/Header';
import Logo from './../../assets/images/logo.png';

const IHBox = () => {
    var QP = new window.Core.Database.QueryParameters();
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
    }, "APP");

    return (
        <div className="IHBox">
            <Header />
                <div className="Logo">
                    <img src={Logo} alt="Logo" />
                </div>
        </div>
    );
}

export default IHBox;