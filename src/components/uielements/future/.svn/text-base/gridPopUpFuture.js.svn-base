import {Grid, GridColumn as Column} from '@progress/kendo-react-grid';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {
    mappingListFuture,
    montantGlobalLabelFunction,
    sensLabelFunction,
    sousJacentLabelFunction,
    tiersLabelFunction
} from "./FutureUtil";
import {auditHistoriqueListSelector, futureSelectedRowSelector} from "../../../redux/dealCapture/selectors/FutureSelectors";


const DataGrid = ({data, children}) => {

    const dispatch = useDispatch();
    const auditHistoriqueList = useSelector(auditHistoriqueListSelector);

    console.log("auditHistoriqueList",auditHistoriqueList)
    let [auditList,setAuditList] = useState([])

    useEffect(function () {
        setAuditList(mappingListFuture(auditHistoriqueList))
    }, [auditHistoriqueList])

    /* if(auditHistoriqueList)
     for (let i = 0; i < auditHistoriqueList.length; i++) {
         auditList.push(auditHistoriqueList[i])
     }*/

    const [gridDataState, setGridDataState] = useState({})

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
            style={{height: '590px', width: '104%', marginLeft: '-2%'}}
            resizable
            reorderable
            sortable
            data={[...auditList]}
        >
            <Column width="140" field="updateDate" filter="date" title="Date Modification"/>
            <Column field="kplusId" title="Kondor ID"/>
            <Column field="tradeDateLabel" filter="date" title="Trade Date"/>
            <Column field="contrepartieLabel"  title="Broker"/>
            <Column field="contrat.label"  title="Contrat"/>
            <Column field="sensLabel" title="Sens"/>
            <Column field="quantite" title="Quantité"/>
            <Column field="prixLabel" title="Prix"/>
            <Column field="commission" title="Commission"/>
            <Column field="statut.libelle" title="Statut"/>
            <Column field="usernameLabel" title="User"/>
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