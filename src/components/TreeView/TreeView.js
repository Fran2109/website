import React, {useState} from 'react';
import '@elastic/eui/dist/eui_theme_amsterdam_light.css';
import './TreeView.css';
import {EuiTreeView} from '@elastic/eui';
import { render } from '@testing-library/react';

const TreeView = ({list}) => {

  const [visibility, setVisibility] = useState(false);
  const changeVisibility = () => {
    setVisibility(!visibility);
  }
render()
  return (
    <>
      <button onClick={changeVisibility}> Click </button>
      <div className="TreeList">
        {<EuiTreeView items={list} 
        expandByDefault={visibility}
        display="default"
        aria-label="Sample Folder Tree"/>}     
      </div>
    </>
  );
};

export default TreeView;