import React, { useContext } from 'react';
import './UserInformation.css';
import UserContext from '../../context/UserContext';
import { 
    UserInformationInterface
} from '../../utils/interfaces/interfaces';

const UserInformation = () => {
    const UserInfo= useContext<UserInformationInterface>(UserContext);
    return (
        <div className="UserInformation">
            {console.log(UserInfo)}
            <h1>
                User Information
            </h1>
            <h3>
                Name: {UserInfo.userName!==null && UserInfo.userName!==undefined? UserInfo.userName.toUpperCase() : null}
            </h3>
            {UserInfo.tymeZone!==undefined?
            <>
                <h3> Account ID: {UserInfo.tymeZone.AccountID}</h3>
                <h3> Email: {UserInfo.tymeZone.Email}</h3>
                <h3> IHServerHost: {UserInfo.tymeZone.IHServerHost}</h3>
                <h3> Max Tags: {UserInfo.tymeZone.MaxTags}</h3>
                <h3> TimeZoneAbbreviation: {UserInfo.tymeZone.TimeZoneAbbreviation}</h3>
                <h3> TimeZoneIsDST: {UserInfo.tymeZone.TimeZoneIsDST}</h3>
                <h3> TimeZoneName: {UserInfo.tymeZone.TimeZoneName}</h3>
                <h3> TimeZoneOffset: {UserInfo.tymeZone.TimeZoneOffset}</h3>
            </>
            :null}
            <h3>Permits</h3>
                {UserInfo.permissions!==undefined?
                    <ul>
                        {UserInfo.permissions.map((permissions) => {
                            return(
                                permissions.value===true?
                                <li key={permissions.code}>
                                    {permissions.name}
                                    {permissions.actions!==undefined?
                                        <ul>
                                            {permissions.actions.map((action) => {
                                                return(
                                                    <li key={action.code}>{action.name}</li>
                                                )
                                            })}
                                        </ul>
                                    :null}
                                </li>
                                :null
                            )
                        })}
                    </ul>
                :null}
            
        </div>
        
    )
}

export default UserInformation;