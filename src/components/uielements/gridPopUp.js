import { process } from '@progress/kendo-data-query';
import { Grid, GridColumn as Column} from '@progress/kendo-react-grid';
import React, { useState } from 'react';




const DataGrid = ({data,children}) => {

    const [gridDataState,setGridDataState] = useState({})

    const handleGridDataStateChange = (e) => {
        setGridDataState(e.data);
    }         
    
    /*
    const checkboxColumn =
              <td>
                <input type="checkbox" checked={true} disabled="disabled" />
              </td>
  */
    
    
    return (
        <Grid
            style={{ height: '590px', width: '104%' , marginLeft: '-2%'}} 
            resizable
            reorderable
            sortable
           // data={[ ...products ]}
        >
            <Column field="dateModification" title="Date Modification" />
            <Column field="KondorID" title="Kondor ID" />
            <Column field="TradeDate" title="Trade Date"  />
            <Column field="Broker" title="Broker" />
            <Column field="Contrat" title="Contrat" />
            <Column field="Sens" title="Sens" />
            <Column field="Quantite" title="Quantité" />
            <Column field="prix" title="Prix" />
            <Column field="commision" title="Commission" />
            <Column field="statut" title="Statut" />
            <Column field="user" title="User" />
        </Grid>
        /*<Grid
            data={process(data, gridDataState)}
            sortable
            {...gridDataState}
            onDataStateChange={handleGridDataStateChange}
            resizable
            reorderable
            style={{  width: '100%' }}

            >
            
            {children}
            
        </Grid>*/
    ) 
}

export default DataGrid;