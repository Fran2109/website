import React, { useEffect,useState } from 'react';
import './ListItem.css';

const ListItem = ({itemList}) => {
  /* const [visibilitySon, setVisibilitySon] = useState(false); */
  let visibilitySon=false;
  const ChangeVisibilitySon = () => {
    /* setVisibilitySon(!visibilitySon); */
    visibilitySon = !visibilitySon;
    console.log(visibilitySon);
  }
  return itemList.map((option) => {
    return (
      <>
        <li className="dropdown-parent" onClick={ChangeVisibilitySon}><span>{option.label}</span>
          {option.children != undefined  && visibilitySon===true ?
            <ul className="dropdown-menu-visible">
              <ListItem itemList={option.children}/>
            </ul>
          : null}
        </li>
      </>
    )
  })
}
export default ListItem;



/*import '@elastic/eui/dist/eui_theme_amsterdam_light.css';
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

export default Items;*/