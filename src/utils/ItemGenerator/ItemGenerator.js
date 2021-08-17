/* import { EuiIcon, EuiToken } from '@elastic/eui'; */
import {VscChevronRight} from "react-icons/vsc";

const ItemGenerator = (props) => {	
  var i=0;
  let itemsGenerated = [];

  const hasSubtype = (subType) => {
    return subType !== undefined? true : false;
  };

  const subTypeGenerator=(itemSubType)=>{
    let subTypesGenerated = [];
    for(let subType of itemSubType)
    {
      i++;
      let subTypeGenerated = {
        label: subType.name,
        id: i.toString(),
        children: hasSubtype(subType.subTypes) ? subTypeGenerator(subType.subTypes) : null,
        icon: hasSubtype(subType.subTypes)? <VscChevronRight style={{color:"black"}} /> : null,
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

export default ItemGenerator;