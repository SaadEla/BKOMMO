import React, {useEffect, useState} from "react";
import {GridColumn as Column} from "@progress/kendo-react-grid/dist/npm/GridColumn";
import {Grid} from "@progress/kendo-react-grid";
import {Modal} from "antd";
import {ForwardEcheance} from "./ForwardEcheance";
import {useDispatch, useSelector} from "react-redux";
import {
    dealForwardEcheancesSelector,
    dealForwardSelectedEcheanceSelector
} from "../../../../redux/dealCapture/selectors/ForwardSelectors";
import {selectingDealForward} from "../../../../redux/dealCapture/forward/DealForwardSlice";
import {compareEcheance} from "../ForwardUtil";
import {NumberUtil} from "../../../../helpers/Utils";

export function EcheancierDataGrid({showMoadlForwardEcheance,}) {

    const dispatch = useDispatch();
    const echeances = useSelector(dealForwardEcheancesSelector)
    const [selectedEcheance, setSelectedEcheance] = useState();

    const echeance = useSelector(dealForwardSelectedEcheanceSelector);

    useEffect(function () {
        setSelectedEcheance(echeance)
    },[echeance])
    function handleOnRowClick(e) {
        dispatch(selectingDealForward(e.dataItem))
        setSelectedEcheance(e.dataItem)
    }

    function prepareEchancierDataGrid() {
        return (echeances || []).map(
            (item, index) => ({...item,
                quantite:NumberUtil.Format(item.quantite),
                prixEcheance:NumberUtil.Format(item.prixEcheance),
                selected: compareEcheance(item,selectedEcheance)}));
    }

    return <>
        <Grid
            style={{height: '300px', width: '100%'}}
            resizable
            reorderable
            sortable={true}
            data={[...prepareEchancierDataGrid()]}
            onRowDoubleClick={showMoadlForwardEcheance}
            selectedField={"selected"}
            onRowClick={(e) => handleOnRowClick(e)}
        >
            <Column field="debut" title="Début de période"/>
            <Column field="fin" title="Fin de période"/>
            <Column field="quantite" title="Quantité"/>
            <Column field="prixEcheance" title="Prix variable"/>
            <Column field="Sens" title="Soulte(Sens BMCE)"/>
        </Grid>
    </>

}