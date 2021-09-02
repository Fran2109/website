import React from 'react';
import './TreeView.css';
import {EuiTreeView} from '@elastic/eui';
import { VscTriangleDown } from "react-icons/vsc";
import { useTranslation } from "react-i18next";

const TreeView = ({ list, head }) => {
  const[t] = useTranslation("global");
  head="Header.Label."+head+".";
  const ifHasTranslation = (header, text) => {
    let flag = true;
    for (let i = 0; i < header.length; i++) {
      if(header[i]!==text[i])
      {
        flag = false;
      }
    }
    return flag?  false : true
  }
  const ItemGenerator = (props) => {	
    var i=0;
    let itemsGenerated = [];
    const hasSubtype = (subType) => {
      return subType.length>0? true : false;
    };
  
    const subTypeGenerator=(itemSubType)=>{
      let subTypesGenerated = [];
      itemSubType.sort(function(a, b) {
        if(a.Order < b.Order) return -1;
        if(a.Order > b.Order) return 1;
        return 0;
    });
      for(let subType of itemSubType)
      {
        i++;
        let subTypeGenerated = {
          label: ifHasTranslation(head, t(head+subType.Name))? t(head+subType.Name) : subType.Name,
          id: i.toString(),
          children: hasSubtype(subType.Children) ? subTypeGenerator(subType.Children) : null,
          icon: hasSubtype(subType.Children)? <VscTriangleDown className="IoTriangle" style={{marginTop: "8px", height: "10px", width: "10px"}}/> : null,
        }
        if(subTypeGenerated.children == null) {
          delete subTypeGenerated.children;
          delete subTypeGenerated.icon;
        }
        
        subTypesGenerated.push(subTypeGenerated);
      }
      return subTypesGenerated;
    };
  
    itemsGenerated=subTypeGenerator(props);
  
    return itemsGenerated;
  }

  let options = ItemGenerator(list);

  return (
    <>
      <div className="TreeList">
        {<EuiTreeView items={options} 
        expandByDefault={false}/>}
      </div>
    </>
  );
}

export default TreeView;