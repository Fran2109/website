import { EuiIcon, EuiToken } from '@elastic/eui';
import {items} from './Object.json';

function ItemGenerator(){	
  let i=1;
  let itemsGenerated;

  const hasSubtype = (subType) => {
    if(subType != undefined) {
      return true;
    }
    else
    {
      return false;
    }
  };

  const subTypeGenerator=(itemSubType)=>{
    let subTypesGenerated = [];
    for(let subType of itemSubType)
    {
      let subTypeGenerated = {
        label: subType.name,
        id: i,
        children: hasSubtype(subType.subTypes) ? subTypeGenerator(subType.subTypes) : null,
      }
      if(subTypeGenerated.children == null) {
        delete subTypeGenerated.children;
      }
      i++;
      subTypesGenerated.push(subTypeGenerated);
    }
    return subTypesGenerated;
  };

  itemsGenerated = [];
  itemsGenerated=subTypeGenerator(items);

  /*console.log(itemsGenerated); */
  return itemsGenerated;
}

export default ItemGenerator();