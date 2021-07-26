import React from 'react';
import '@elastic/eui/dist/eui_theme_amsterdam_light.css';
import './TreeView.css';
import {EuiTreeView} from '@elastic/eui';

export default ({list}) => {
  return (
    <div className="TreeList">
      {<EuiTreeView items={list} 
      expandByDefault={false}
      showExpansionArrows={false}
      display="default"
      aria-label="Sample Folder Tree"/>}     
    </div>
  );
};