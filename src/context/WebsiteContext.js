import React from 'react';

const WebsiteContext = React.createContext({
    /* Languages: [
            { id: 0, name: "ES" },
            { id: 1, name: "EN" },
            { id: 2, name: "PT" }
    ] */
    Languages: { id: 0, name: "ES" }
});

export default WebsiteContext;