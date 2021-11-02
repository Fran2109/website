import react from 'react';
import { Treeview } from '@4iplatform/tree-search';
import productsData from '../../data/productsData.json';
const Products = () =>{
    return(
        <div>
            <Treeview tree={productsData}/>
        </div>
    )
}

export default Products;