import React from 'react';
import './TreeView.css';
import {EuiTreeView} from '@elastic/eui';

const TreeView = ({list}) => {

  return (
    <>
      <div className="TreeList">
        {<EuiTreeView items={list} 
        expandByDefault={true}/>}
      </div>
    </>
  );
}

export default TreeView;