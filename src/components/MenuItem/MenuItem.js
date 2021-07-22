import React, { useEffect,useState } from 'react';
import './MenuItem.css';
import OEE from './../../assets/icons/OEE.svg';
import ListItem from '../ListItem/ListItem';
import ItemGenerated from './../ItemGenerator/ItemGenerator';

let options;
options = <ItemGenerated />;
console.log(options);
options = options.type;
console.log(options);

const MenuItem = ({item}) => {

  /*
  const [options, setOptions] = useState([]);

  const getOptions = new Promise((resolve, reject) => {
      setTimeout(() => {
          resolve([
                { id: "1", name: "Computers", children: [{name:"Asus"}, {name:"Acer"}, {name:"Alienware"}]},
                { id: "2", name: "Phones", children: [{name:"Asus"}, {name:"Acer"}, {name:"Alienware"}]},
                { id: "3", name: "Tablets", children: [{name:"Asus"}, {name:"Acer"}, {name:"Alienware"}]},
                { id: "4", name: "Televisions", children: [{name:"Asus"}, {name:"Acer"}, {name:"Alienware"}]},
                { id: "5", name: "Clocks", children: [{name:"Asus"}, {name:"Acer"}, {name:"Alienware"}]}
            ])
        }, 100);
    })
    
    useEffect(() => {
        getOptions.then(
            result => {
                setOptions(result);
            }
        )
    }, []);
    */
  return(
    <>
      <li className="dropdown-parent"><span><img src={OEE}/>{item}</span>
        <ul className="dropdown-menu">
          <ListItem itemList={options}/>
        </ul>
      </li>
    </>
  )
}

export default MenuItem;
/*import '@elastic/eui/dist/eui_theme_amsterdam_light.css';
import React, { useState } from 'react';
import './MenuItem.css';
import OEE from './../../assets/icons/OEE.svg';
import ItemGenerator from '../ItemGenerator/ItemGenerator';
import Items from '../Items/Items';

let itemGenerated;
itemGenerated = <ItemGenerator />;
itemGenerated = itemGenerated.type;

export default ({item})=>{

  const [visibility, setVisibility] = useState(false);

  const changeVisibility = () => {
    setVisibility(!visibility);
  }


  return(
    <div className="menu-item">
      <button className="menu-item-button"  onClick={changeVisibility} >
        <div className="menu-item-icon">
            <img src={OEE} alt="Sin Logo"></img>
        </div>
        <div className="menu-item-text">
            {item}
        </div>
      </button>
      <ul className="visible">  
        <Items itemList={itemGenerated} visible={visibility}/>
      </ul>
    </div>
  )
};*/