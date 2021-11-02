import { createContext } from 'react';
import { UserInformationInterface } from '../utils/interfaces/interfaces';

const UserContext = createContext({} as UserInformationInterface);

export default UserContext;