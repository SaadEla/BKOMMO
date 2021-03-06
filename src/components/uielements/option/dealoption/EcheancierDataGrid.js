import React, { useEffect, useState } from "react";
import { GridColumn as Column } from "@progress/kendo-react-grid/dist/npm/GridColumn";
import { Grid } from "@progress/kendo-react-grid";
import { Checkbox, Modal, Spin } from "antd";
import { OptionEcheance } from "./OptionEcheance";
import { useDispatch, useSelector } from "react-redux";
import {
  dealLoadGenerateEcheancierOptionSelector,
  dealOptionDealSelector,
  dealOptionEcheancesSelector,
  dealOptionSelectedEcheanceSelector,
  dealOptionUpdateFlagSelector,
} from "../../../../redux/dealCapture/selectors/OptionSelectors";
import { selectingDealOption } from "../../../../redux/dealCapture/option/DealOptionSlice";
import { compareEcheance } from "../OptionUtil";
import { NumberUtil } from "../../../../helpers/Utils";

export function EcheancierDataGrid({ showMoadlOptionEcheance }) {
  const dispatch = useDispatch();
  const echeances = useSelector(dealOptionEcheancesSelector);
  const [selectedEcheance, setSelectedEcheance] = useState();
  const deal = useSelector(dealOptionDealSelector);
  const loadGenerateEcheancier = useSelector(
    dealLoadGenerateEcheancierOptionSelector
  );

  const echeance = useSelector(dealOptionSelectedEcheanceSelector);
  const updateFlagOption = useSelector(dealOptionUpdateFlagSelector);

  useEffect(
    function () {
      setSelectedEcheance(echeance);
    },
    [echeance]
  );
  function handleOnRowClick(e) {
    dispatch(selectingDealOption(e.dataItem));
    setSelectedEcheance(e.dataItem);
  }

  function prepareEchancierDataGrid() {
    return echeances.map((item, index) => ({
      ...item,
      quantite: NumberUtil.Format(item.quantite),
      prixEcheance: NumberUtil.Format(item.prixEcheance),
      soulteLabel: soulteLabelFunction(item),
      selected: compareEcheance(item, selectedEcheance),
    }));
  }

  function soulteLabelFunction(item) {
    let qtyUnit = 1;
    let coefPrix = 0;
    if (deal.natureOption == "F") {
      qtyUnit = deal.contrat.quantiteUnitaire;
      coefPrix = deal.contrat.sousJacent.coefPrix;
    } else {
      coefPrix = deal.sousJacent.coefPrix;
    }

    let diffPrix = 0;
    if (deal.typeOption == "C")
      diffPrix = Number(item.prixEcheance) - parseFloat(deal.strike);
    else diffPrix = parseFloat(deal.strike) - Number(item.prixEcheance);

    let payOff = 0;
    if (item.exerce)
      payOff = qtyUnit * Number(item.quantite) * coefPrix * diffPrix;

    return NumberUtil.Format(payOff.toString()) || 0;
  }
  return (
    <Spin spinning={loadGenerateEcheancier}>
      <Grid
        style={{ height: "300px", width: "100%" }}
        resizable
        reorderable
        sortable={true}
        data={[...prepareEchancierDataGrid()]}
        onRowDoubleClick={
          showMoadlOptionEcheance
          //updateFlagOption ? showMoadlOptionEcheance : null
        }
        selectedField={"selected"}
        onRowClick={(e) => handleOnRowClick(e)}
      >
        <Column field="kplusId" title="Kondor ID" />
        <Column field="debut" title="D??but de p??riode" />
        <Column field="fin" title="Fin de p??riode" />
        <Column field="settlementDate" title="Settlement Date" />
        <Column field="quantite" title="Quantit??" />
        <Column
          field="exerce"
          cell={(props) => (
            <td>
              <Checkbox checked={props.dataItem[props.field]}></Checkbox>
            </td>
          )}
          title="Option exerc??e"
        />
        <Column field="prixEcheance" title="Prix Ech??ance" />

        {deal.typeDenouement == "C" && (
          <Column field="soulteLabel" title="Soulte" />
        )}
      </Grid>
    </Spin>
  );
}
