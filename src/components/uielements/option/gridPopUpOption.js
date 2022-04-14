import {Grid, GridColumn as Column} from '@progress/kendo-react-grid';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {
    mappingListOption,
    montantGlobalLabelFunction,
    sensLabelFunction,
    sousJacentLabelFunction,
    tiersLabelFunction
} from "./OptionUtil";
import {auditHistoriqueListSelector, optionSelectedRowSelector} from "../../../redux/dealCapture/selectors/OptionSelectors";


const DataGrid = ({data, children}) => {

    const dispatch = useDispatch();
    const auditHistoriqueList = useSelector(auditHistoriqueListSelector);

    console.log("auditHistoriqueList",auditHistoriqueList)
    let [auditList,setAuditList] = useState([])

    useEffect(function () {
        setAuditList(mappingListOption(auditHistoriqueList))
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
            <Column  field="updateDate" filter="date" title="Date Modification"/>
            <Column field="tradeDateLabel" filter="date" title="Trade Date"/>
            <Column field="maturityDateLabel" title="Maturity Date"/>
            <Column field="valueDateLabel" title="Value Date"/>
            <Column field="contrepartieLabel" title="Contrepartie"/>
            <Column field="sousJacentLabel" title="Sous-jacent"/>
            <Column field="natureOptionLabel" title="Type"/>
            <Column field="sensLabel" title="Sens"/>
            <Column field="typeOption" title="Type option"/>
            <Column field="quantiteLabel" title="Quantité"/>
            <Column field="prixSousJacentLabel" title="Prix Sous-jacent"/>
            <Column field="prixOptionLabel" title="Prix Option"/>
            <Column field="commission" title="Commission"/>
            <Column field="typeDenouement" title="Dénouement"/>
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