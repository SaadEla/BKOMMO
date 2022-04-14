import {orderBy, process} from '@progress/kendo-data-query';
import {Grid, GridColumn as Column} from '@progress/kendo-react-grid';
import React, {useEffect, useLayoutEffect, useRef, useState} from 'react';
import {openNotificationWithIcon} from "../feedback/notification";
import API_URL from "../../config/api/API_URL";
import {useDispatch, useSelector} from "react-redux";
import {selectionEcheanceIds} from "./../../redux/dealCapture/swap/swapSlice"
import {selectEcheanceIds} from "../../redux/dealCapture/selectors/selectors";

const DataGrid = ({contrepartieId,data, children}) => {


    const generateStellment=useSelector(selectEcheanceIds)
    let lastSelectedIndex = 0;
    const [sort, setSort] = useState([]);
    const [gridDataState, setGridDataState] = useState([])
    const firstUpdate = useRef(true);
    useEffect(function () {
        if (!firstUpdate.current)
        generateAvisSttlment();
    },[generateStellment])
    useEffect(() => {
        if (firstUpdate.current) {
            firstUpdate.current = false;
            return;
        }
    });

    function generateAvisSttlment() {
        if(prepareEcheanceIds())
        window.open(API_URL.SERVER_BASE_URL.concat(API_URL.GENERATE_AVIS_SETTLEMENT)
            .concat("?contrepartieId=" + contrepartieId + "&echeanceIds=" + prepareEcheanceIds() + "&noCacheVar=" + new Date().getTime().toString() + "&uid=" + 1), "_blank", "height=700,width=650,modal=yes,alwaysRaised=yes")
    }
    function prepareEcheanceIds() {
        let flagValidation = false;
        let param = new Object();
        let echeanceIds = "";
        for (let e of gridDataState) {
            if (e.selected) {
                flagValidation = true
                if (echeanceIds != "")
                    echeanceIds = echeanceIds + "," + e.echeanceId
                else
                    echeanceIds = e.echeanceId
            }
        }
        if (!flagValidation) {
            openNotificationWithIcon("error", "Veuillez choisir au moins une transaction!")
            return;
        }

        return echeanceIds;

    }
    useEffect(function () {
        setGridDataState(data)
    }, [data])
    const handleGridDataStateChange = (e) => {
        setGridDataState(e.data);
    }
    function prepareDataGrid(dataGrid) {
        return orderBy(dataGrid, sort)
    }

    /*
    const checkboxColumn =
              <td>
                <input type="checkbox" checked={true} disabled="disabled" />
              </td>
  */

    function selectionChange(event) {
        const data = gridDataState.map(item => {
            if (item.echeanceId === event.dataItem.echeanceId) {
                item.selected = !event.dataItem.selected;
            }
            return item;
        });
        setGridDataState(data);
    }

    function rowClick(event) {
        let last = lastSelectedIndex;
        const data = [...gridDataState];
        const current = data.findIndex(dataItem => dataItem === event.dataItem);

        if (!event.nativeEvent.shiftKey) {
            lastSelectedIndex = last = current;
        }

        if (!event.nativeEvent.ctrlKey) {
            data.forEach(item => (item.selected = false));
        }
        const select = !event.dataItem.selected;
        for (let i = Math.min(last, current); i <= Math.max(last, current); i++) {
            data[i].selected = select;
        }
        setGridDataState(data);
    };

    function headerSelectionChange(event) {
        const checked = event.syntheticEvent.target.checked;
        const data = gridDataState.map(item => {
            item.selected = checked;
            return item;
        });
        setGridDataState(data);
    }



    return (
        <Grid
            onRowClick={rowClick}
            selectedField="selected"
            onSelectionChange={selectionChange}
            onHeaderSelectionChange={headerSelectionChange}
            style={{height: '500px', width: '104%', marginLeft: '-2%'}}
            resizable
            reorderable
            sortable
            data={[...prepareDataGrid(gridDataState)]}

            sortable
            sort={sort}
            onSortChange={(e) => {
                setSort(e.sort);
            }}
        >
            <Column
                field="selected"
                width="50px"
                headerSelectionValue={
                    data.findIndex(dataItem => dataItem.selected === false) === -1
                }/>

            <Column field="sousJacent" title="Sous-jacent"/>
            <Column field="tradeDateLabel" title="Trade Date"/>
            <Column field="maturityDateLabel" title="Maturity Date"/>
            <Column format="{0:n2}" field="quantite" title="Qty(globale)"/>
            <Column field="sensLabel" title="Sens"/>
            <Column field="echeanceDebutLabel" title="Début Echéance"/>
            <Column field="echeanceFinLabel" title="Fin Echéance"/>
            <Column format="{0:n2}" field="echeanceQuantite" title="Qty(Echéance)"/>
        </Grid>
    )
}

export default DataGrid;