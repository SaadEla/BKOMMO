import {Grid, GridColumn as Column} from '@progress/kendo-react-grid';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {
    mappingListSwap,
    montantGlobalLabelFunction,
    sensLabelFunction,
    sousJacentLabelFunction,
    tiersLabelFunction
} from "./SwapUtil";
import {auditHistoriqueListSelector, swapSelectedRowSelector} from "../../../redux/dealCapture/selectors/selectors";
import {orderBy} from "@progress/kendo-data-query";


const DataGrid = ({data, children}) => {

    const dispatch = useDispatch();
    const auditHistoriqueList = useSelector(auditHistoriqueListSelector);

    let [auditList,setAuditList] = useState([])
    const [sort, setSort] = useState([]);

    useEffect(function () {
        setAuditList(mappingListSwap(auditHistoriqueList))
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
    function prepareDataGrid(dataGrid) {
        return orderBy(dataGrid, sort)
    }

    return (

        <Grid
            style={{height: '590px', width: '104%', marginLeft: '-2%'}}
            resizable
            reorderable
            sortable
            data={[...prepareDataGrid(auditList)]}

            sortable
            sort={sort}
            onSortChange={(e) => {
                setSort(e.sort);
            }}
        >
            <Column width="140" field="updateDate" filter="date" title="Date Modification"/>
            <Column field="kplusId" title="Kondor ID"/>
            <Column field="tradeDateLabel" filter="date" title="Trade Date"/>
            <Column field="maturityDateLabel" title="Maturity Date"/>
            <Column field="contrepartieLabel" title="Contre Partie"/>
            <Column field="sousJacentLabel" title="Sous Jacent"/>
            <Column field="sensLabel" title="Sens"/>
            <Column field="quantite" title="Quantité"/>
            <Column field="prixFixe" title="Prix"/>
            <Column field="montantGlobalLabel" title="Montant Global"/>
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