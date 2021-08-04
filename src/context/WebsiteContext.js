import React from 'react';
import ItemGenerator from './../utils/ItemGenerator/ItemGenerator';
import objectToGenerate from './../utils/ItemGenerator/Object.json';

const WebsiteContext = React.createContext({
    menus: [ItemGenerator(objectToGenerate)]
});

export default WebsiteContext;