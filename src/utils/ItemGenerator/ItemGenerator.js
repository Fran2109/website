import { EuiIcon, EuiToken } from '@elastic/eui';

const ItemGenerator = (props) => {	
  let i=0;
  let itemsGenerated = [];

  console.log(props);
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
      i++;
      let subTypeGenerated = {
        label: subType.name,
        id: i,
        children: hasSubtype(subType.subTypes) ? subTypeGenerator(subType.subTypes) : null,
        useEmptyIcon: false,
        icon: <EuiIcon type="empty" />,
      }
      if(subTypeGenerated.children == null) {
        delete subTypeGenerated.children;
      }
      
      subTypesGenerated.push(subTypeGenerated);
    }
    return subTypesGenerated;
  };

  itemsGenerated=subTypeGenerator(props);
  console.log(itemsGenerated);
  return itemsGenerated;
}

export default ItemGenerator;