import '@elastic/eui/dist/eui_theme_amsterdam_light.css';
import React, { useState } from 'react';


export default ({itemGenerated})=>{
  const [visibility, setVisibility] = useState(false);

  const changeVisibility = () => {
    setVisibility(!visibility);
    console.log(visibility);
  }

  const hasChildren = (children) => {
    return children != undefined? true :  false;
  };

  return itemGenerated.map((item ) =>{
    if(hasChildren(item.children))
    {
    return(
        <>
            <li className="visible"/* {visibility ? 'visible' : 'hidden'} */ onClick={changeVisibility}>  {item.label} S </li>
        </>
    )
    }
    else
    {
    return(
        <li className="visible"/* {visibility ? 'visible' : 'hidden'} */ onClick={changeVisibility}>  {item.label} N </li>
    )
    }
});
}
