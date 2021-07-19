import '@elastic/eui/dist/eui_theme_amsterdam_light.css';
import React, { useState } from 'react';
import './MenuItem.css';
import OEE from './../../assets/icons/OEE.svg';
import ItemGenerator from './../ItemGenerator/ItemGenerator';

/*
import {
  EuiContextMenu,
  EuiPopover,
  EuiButton,
  EuiFormRow,
  EuiSwitch,
  EuiSpacer,
  EuiIcon, 
  EuiTreeView, 
  EuiToken,
  EuiContextMenuPanel,
  EuiContextMenuItem, 
} from '@elastic/eui';*/


let itemGenerated;
itemGenerated = <ItemGenerator />;
itemGenerated = itemGenerated.type;

export default ({item})=> {
  
    const [visibility, setVisibility] = useState(false);

    const changeVisibility = () => {
      setVisibility(!visibility);
    };

    const buttonOnClick = (itemGenerated)=>{
      return itemGenerated.map((item ) =>{
          return (
            <div className="option">{item.label}</div>
          )
      });
    };
    return(
        <div className="menu-item">
          <button className="menu-item-button" onClick={changeVisibility}>
            <div className="menu-item-icon">
                <img src={OEE} alt="Sin Logo"></img>
            </div>
            <div className="menu-item-text">
                {item}
            </div>
          </button>
          <div className={visibility ? 'visible' : 'hidden'}> 
            {buttonOnClick(itemGenerated)}
          </div>
        </div>
    )
};



/*<EuiPopover
            id="contextMenuExample"
            button={button}
            isOpen={isPopoverOpen}
            closePopover={closePopover}
            panelPaddingSize="l"
            anchorPosition="downCenter"
            paddingSize="l">
                <EuiContextMenu initialPanelId={0} panels={OEE_items} />
            </EuiPopover>*/
/*const OEE_items = [

        <EuiContextMenuItem key="treeview" onClick={closePopover}>
          <TreeList />
        </EuiContextMenuItem>,
        <EuiContextMenuItem key="overview" onClick={closePopover}>
          Overview
        </EuiContextMenuItem>,
        <EuiContextMenuItem key="angular" onClick={closePopover}>
          Angular
        </EuiContextMenuItem>,
        <EuiContextMenuItem key="c#" onClick={closePopover}>
          C#
        </EuiContextMenuItem>,
        <EuiContextMenuItem key="nelson" onClick={closePopover}>
          Nelson
        </EuiContextMenuItem>,
        <EuiContextMenuItem key="maxim" onClick={closePopover}>
          maxim
        </EuiContextMenuItem>,
        <EuiContextMenuItem key="ionic" onClick={closePopover}>
          IONIC
        </EuiContextMenuItem>,
        <EuiContextMenuItem key="react" onClick={closePopover}>
          React
        </EuiContextMenuItem>,
        <EuiContextMenuItem key="typescript" onClick={closePopover}>
          Typescript
        </EuiContextMenuItem>,
        <EuiContextMenuItem key="redux" onClick={closePopover}>
          Redux
        </EuiContextMenuItem>,
    ];*/

    /*const OEE_items=[
      {
        id: 0,
        title: "Items",
        items: [
          {
            name: 'Computers',
            panel: 1,
          },
          {
            name: 'Phones',
            panel: 2,
           
          },
          {
            name: 'Tablets',
            panel: 3,
            
          },
          {
            name: 'Televisions',
            panel: 4,
          },
          {
            name: 'Clocks',
            onClick: () => {
              closePopover();
            },
          },
        ],
      },
      {
        id: 1,
        title: "Items",
        items: [
          {
            name: 'Asus',
            onClick: () => {
              closePopover();
            },
          },
          {
            name: 'Acer',
            onClick: () => {
              closePopover();
            },
          },
          {
            name: 'Alienware',
            onClick: () => {
              closePopover();
            },
          },
        ],
      },
      {
        id: 2,
        title: "Phones",
        items: [
          {
            name: 'Samsung',
            panel: 5,
          },
          {
            name: 'Motorola',
            panel: 6,
          },
          {
            name: 'LG',
            panel: 7,
          },
          {
            name: 'IPhone',
            panel: 6,
          },
        ],
      },
      {
        id: 3,
        title: "Tablets",
        items: [
          {
            name: 'Samsung',
            onClick: () => {
              closePopover();
            },
          },
          {
            name: 'Exo',
            onClick: () => {
              closePopover();
            },
          },
          {
            name: 'Lenovo',
            onClick: () => {
              closePopover();
            },
          },
          {
            name: 'BGH',
            onClick: () => {
              closePopover();
            },
          },
        ],
      },
      {
        id: 4,
        title: "Televisions",
        items: [
          {
            name: 'Samsung',
            onClick: () => {
              closePopover();
            },
          },
          {
            name: 'LG',
            onClick: () => {
              closePopover();
            },
          },
          {
            name: 'Philips',
            onClick: () => {
              closePopover();
            },
          },
          {
            name: 'BGH',
            onClick: () => {
              closePopover();
            },
          },
        ],
      },
      {
        id: 5,
        title: "Samsung",
        items: [
          {
            name: '64GB',
            onClick: () => {
              closePopover();
            },
          },
          {
            name: '32GB',
            onClick: () => {
              closePopover();
            },
          },
          {
            name: '16GB',
            onClick: () => {
              closePopover();
            },
          },
        ],
      },
      {
        id: 6,
        title: "Motorola",
        items: [
          {
            name: '64GB',
            onClick: () => {
              closePopover();
            },
          },
          {
            name: '32GB',
            onClick: () => {
              closePopover();
            },
          },
          {
            name: '16GB',
            onClick: () => {
              closePopover();
            },
          },
        ],
      },
      {
        id: 7,
        title: "LG",
        items: [
          {
            name: '64GB',
            onClick: () => {
              closePopover();
            },
          },
          {
            name: '32GB',
            onClick: () => {
              closePopover();
            },
          },
          {
            name: '16GB',
            onClick: () => {
              closePopover();
            },
          },
        ],
      },
      {
        id: 8,
        title: "IPhone",
        items: [
          {
            name: '64GB',
            onClick: () => {
              closePopover();
            },
          },
          {
            name: '32GB',
            onClick: () => {
              closePopover();
            },
          },
          {
            name: '16GB',
            onClick: () => {
              closePopover();
            },
          },
        ],
      },
    ]*/