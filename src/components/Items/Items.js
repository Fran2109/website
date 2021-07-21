import '@elastic/eui/dist/eui_theme_amsterdam_light.css';
import React, { useState } from 'react';


const Items = ({itemList, visible=false})=>{
  let visibility = visible;
  var son="";

  const [visibilitySon, setVisibilitySon] = useState(false);

  const changeVisibility = () => {
    visibility = !visibility;
  }

  const changeVisibilitySon = () => {
    setVisibilitySon(!visibilitySon);
  }

  const hasChildren = (children) => {
    return children != undefined? true :  false;
  };

    return itemList.map((itemSpecific ) =>{
    if(visible==true)
    {
        if(hasChildren(itemSpecific.children))
        {
            visibilitySon==true? son="N" : son="S";
            return(
                <>
                    <li className={visibility ? 'visible' : 'hidden'} onClick={changeVisibilitySon}> 
                        {itemSpecific.label} {son} 
                    </li>
                    <ul>
                        <Items itemList={itemSpecific.children} visible={visibilitySon}/>
                    </ul>
                </>
            )
        }
        else
        {
            return(
                <>
                    <li className={visibility ? 'visible' : 'hidden'} onClick={changeVisibility}> 
                        {itemSpecific.label} N
                    </li>
                </>
            )
        }
    }
    });
}

export default Items;