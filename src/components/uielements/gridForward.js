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
            <Column field="KondorID" title="Kondor ID" />
            <Column field="TradeDate" title="Trade Date"  />
            <Column field="maturityDate" title="Maturity Date" />
            <Column field="contrePartie" title="Contre Partie" />
            <Column field="Contrat" title="Contrat" />
            <Column field="Sens" title="Sens" />
            <Column field="Quantite" title="Quantité" />
            <Column field="prix" title="Prix" />
            <Column field="commision" title="Commission" />
            <Column field="globalBrut" title="Global Brut" />
            <Column field="globalNet" title="Global Net" />
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