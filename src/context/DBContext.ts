import { createContext } from 'react';
import { DBOptionsInterface } from '../utils/interfaces/interfaces';

const DBContext = createContext({} as DBOptionsInterface);

export default DBContext;