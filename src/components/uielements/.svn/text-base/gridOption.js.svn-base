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
            <Column field="ID" title="ID" />
            <Column field="TradeDate" title="Trade Date"  />
            <Column field="maturityDate" title="Maturity Date" />
            <Column field="valueDate" title="Value Date" />
            <Column field="contrePartie" title="Contre Partie" />
            <Column field="SousJacent" title="Sous-Jacent" />
            <Column field="Type" title="Type" />
            <Column field="Sens" title="Sens" />
            <Column field="typeOption" title="Type Option" />
            <Column field="strike" title="Strike" />
            <Column field="Quantite" title="Quantité" />
            <Column field="prixOption" title="Prix Option" />
            <Column field="statut" title="Statut" />
            <Column field="creePar" title="Créé par" />
           
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