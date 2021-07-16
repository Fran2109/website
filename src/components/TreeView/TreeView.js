import './TreeView.css';
import React from 'react';
import '@elastic/eui/dist/eui_theme_amsterdam_light.css';
import ItemGenerator from './../ItemGenerator/ItemGenerator';
import {EuiTreeView} from '@elastic/eui';

let itemsGenerated;

itemsGenerated = <ItemGenerator />;


export default () => {
  return (
    <div className="TreeList">
      {<EuiTreeView items={itemsGenerated.type} 
      expandByDefault={false}
      showExpansionArrows={true}
      display="default"
      aria-label="Sample Folder Tree"/>}     
    </div>
  );
};