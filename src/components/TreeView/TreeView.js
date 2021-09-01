import React from 'react';
import './TreeView.css';
import {EuiTreeView} from '@elastic/eui';
import {VscChevronRight} from "react-icons/vsc";

const TreeView = ({list}) => {
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
          label: subType.Name,
          id: i.toString(),
          children: hasSubtype(subType.Children) ? subTypeGenerator(subType.Children) : null,
          icon: hasSubtype(subType.Children)? <VscChevronRight style={{color:"black"}} /> : null,
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