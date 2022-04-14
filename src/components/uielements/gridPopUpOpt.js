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
            <Column field="tradeDate" title="Trade Date"  />
            <Column field="maturityDate" title="Maturity Date" />
            <Column field="valueDate" title="Value Date" />
            <Column field="contrePartie" title="Contre Partie" />
            <Column field="sousJacent" title="Sous Jacent" />
            <Column field="type" title="Type" />
            <Column field="sens" title="Sens" />
            <Column field="typeOption" title="Type Option" />
            <Column field="quantite" title="Quantité" />
            <Column field="prixSousJacent" title="Prix Sous Jacent" />
            <Column field="prixOption" title="Prix Option" />
            <Column field="commission" title="Commission" />
            <Column field="denouement" title="Dénouement" />
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