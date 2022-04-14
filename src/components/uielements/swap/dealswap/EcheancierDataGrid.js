import React, {useEffect, useState} from "react";
import {GridColumn as Column} from "@progress/kendo-react-grid/dist/npm/GridColumn";
import {Grid} from "@progress/kendo-react-grid";
import {Modal} from "antd";
import {SwapEcheance} from "./SwapEcheance";
import {useDispatch, useSelector} from "react-redux";
import {
    dealSwapEcheancesSelector,
    dealSwapSelectedEcheanceSelector,
    dealSwapDealSelector
} from "../../../../redux/dealCapture/selectors/selectors";
import {selectingDealSwap} from "../../../../redux/dealCapture/swap/DealSwapSlice";
import {compareEcheance} from "../SwapUtil";
import {NumberUtil} from "../../../../helpers/Utils";

export function EcheancierDataGrid({showMoadlSwapEcheance,}) {

    const dispatch = useDispatch();
    const echeances = useSelector(dealSwapEcheancesSelector)
    const [selectedEcheance, setSelectedEcheance] = useState();

    const echeance = useSelector(dealSwapSelectedEcheanceSelector);
    const deal = useSelector(dealSwapDealSelector);

    useEffect(function () {
        setSelectedEcheance(echeance)
    },[echeance])
    function handleOnRowClick(e) {
        dispatch(selectingDealSwap(e.dataItem))
        setSelectedEcheance(e.dataItem)
    }

    function soulteLabelFunction(item) {
        let soulte = 0;
        if (NumberUtil.Format(item.prixEcheance)!=0){
        
            soulte = ((deal.sens==1)?1:-1) * NumberUtil.Parse(item.quantite) * (NumberUtil.Parse(item.prixEcheance)-NumberUtil.Parse(deal.prixFixe));
        }
        return NumberUtil.Format(soulte);

    }
    function prepareEchancierDataGrid() {
        return echeances.map(
            (item, index) => ({...item,
                quantite:NumberUtil.Format(item.quantite),
                prixEcheance:NumberUtil.Format(item.prixEcheance),
                selected: compareEcheance(item,selectedEcheance),
                Sens:soulteLabelFunction(item)}));
    }

    return <>
        <Grid
            style={{height: '300px', width: '100%'}}
            resizable
            reorderable
            sortable={true}
            data={[...prepareEchancierDataGrid()]}
            onRowDoubleClick={showMoadlSwapEcheance}
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