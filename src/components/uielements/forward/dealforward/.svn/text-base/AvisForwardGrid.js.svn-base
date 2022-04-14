import {process} from '@progress/kendo-data-query';
import {Grid, GridColumn as Column} from '@progress/kendo-react-grid';
import React, {useState} from 'react';
import {DateUtil, NumberUtil} from "../../../../helpers/Utils";
import {getContrat} from "../../future/FutureUtil";


const AvisForwardGrid = ({data=[], children, deal, references}) => {

    const [gridDataState, setGridDataState] = useState({})

    const handleGridDataStateChange = (e) => {
        setGridDataState(e.data);
    }

    function soulteLabelFunction(item) {
        const contrat = getContrat(references, deal.contrat.contratId)
        let prixNet2 = item.settlementDeal.prix - item.settlementDeal.sens * item.settlementDeal.commission;
        let prixNet1 = parseFloat(deal.prix) - ((deal.sens == 1) ? 1 : -1) * parseFloat(deal.commission);
        let qtyDenouement = parseFloat(item.quantite) * parseFloat(contrat.quantiteUnitaire);
        let coefPrix = parseFloat(contrat.sousJacent.coefPrix);
        let soulte = (prixNet2 - prixNet1) * qtyDenouement * coefPrix;
        return NumberUtil.Format(String(soulte));
    }

    function settlementMapping() {
        return (data || []).map(stl => {
            return {
                prixLabel:NumberUtil.Format(stl.settlementDeal.prix),
                quantiteLabel:NumberUtil.Format(stl.quantite),
                soulteLabel: soulteLabelFunction(stl),
                tradeDateLabel:DateUtil.Format(stl.settlementDeal.tradeDate),
                ...stl
            }
        })
    }

    /*
    const checkboxColumn =
              <td>
                <input type="checkbox" checked={true} disabled="disabled" />
              </td>
  */

    return (
        <Grid
            style={{height: '250px', width: '104%', marginLeft: '-2%'}}
            resizable
            reorderable
            sortable
            data={[...settlementMapping()]}
        >
            <Column field="tradeDateLabel" title="Date dénouement"/>
            <Column field="quantiteLabel" title="Quantité"/>
            <Column field="prixLabel" title="Prix"/>
            <Column field="soulteLabel" title="Soulte"/>
        </Grid>
    )
}

export default AvisForwardGrid;