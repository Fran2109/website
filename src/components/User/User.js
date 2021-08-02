import './User.css';
import React, { useState } from 'react';
import UserIco from './../../assets/icons/user.png';

const User = ({ listUsers }) => {
    const [id, setId] = useState(0);

    return (
        <li className="user">
            <span>
                <img src={UserIco} alt="user"/>{listUsers.hasOwnProperty(id)? listUsers[id].name : null}
            </span>
            <ul className="userOptions">
                {id!==0?
                    <li onClick={()=>setId(0)}>
                        Sign Out
                    </li>
                :
                    listUsers.map((userOption) => {
                        return( 
                            userOption.id!==0?
                            <li onClick={()=>setId(userOption.id)} key={userOption.id}>
                                {userOption.name}
                            </li>
                            :
                            null
                        )
                    })
                }
            </ul>
        </li>
    );
}

export default User;