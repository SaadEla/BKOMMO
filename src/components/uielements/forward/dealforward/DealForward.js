import React, { useEffect, useState } from "react";

import { Tabs, Select, Space, Modal, Form, Button, Card, Spin } from "antd";
import { EcheancierHeader } from "./EcheancierHeader";
import { EcheancierDataGrid } from "./EcheancierDataGrid";
import { DealForwardForm } from "./DealForwardForm";
import {
  addDealForward,
  removeSelectDealForward,
  genereDealForwardEcheancier,
  updateDealForwardEcheancier,
} from "../../../../redux/dealCapture/forward/DealForwardSlice";
import { ForwardEcheance } from "./ForwardEcheance";
import { useDispatch, useSelector } from "react-redux";
import {
  checkPositionForwardSelector,
  dealForwardDealSelector,
  dealForwardSelectedEcheanceSelector,
  dealForwardSettlementsSelector,
  dealForwardUpdateFlagSelector,
  loadCheckPositionSelector,
} from "../../../../redux/dealCapture/selectors/ForwardSelectors";
import { getContrePartie, getSousjacent, getStatut } from "../ForwardUtil";
import { Divider } from "antd";
import DealForwardFormFooter from "./DealForwardFormFooter";
import CustomDialog from "../../../feedback/modal";
import { ForwardCheckLimit } from "./ForwardCheckLimit";
import AvisGrid from "../../gridAvisSet";
import AvisForwardGrid from "./AvisForwardGrid";
import { getBroker, getContrat } from "../../future/FutureUtil";
import { Grid, GridToolbar } from "@progress/kendo-react-grid";
import { GridColumn as Column } from "@progress/kendo-react-grid/dist/npm/GridColumn";
import { DateUtil, NumberUtil } from "../../../../helpers/Utils";
import { soulteForwardAPI } from "../../../../redux/dealCapture/rest/ForwardRestCall";

const { TabPane } = Tabs;
const { Option } = Select;

export function DealForward({
  onFinish,
  form,
  checkedLimitDealForward,
  forwardCheckLimitModalVisible,
  setForwardCheckLimitModalVisible,
  references,
  dealForwardData,
}) {
  const dispatch = useDispatch();
  const deal = useSelector(dealForwardDealSelector);
  const settlements = useSelector(dealForwardSettlementsSelector);
  const [tabPosition, setTabPosition] = useState("left");
  const [forwardEcheanceVisible, setForwardEcheanceVisible] = useState(false);
  const selectedEcheance = useSelector(dealForwardSelectedEcheanceSelector);
  const updateDealForwardFlag = useSelector(dealForwardUpdateFlagSelector);
  const [echeanceFrom, setEcheanceFrom] = useState();
  const [flagUpdate, setFlagUpdate] = useState();
  const [soulteList, setSoulteList] = useState([]);
  const loadCheckPosition = useSelector(loadCheckPositionSelector);
  const position = useSelector(checkPositionForwardSelector);

  useEffect(
    function () {
      if (deal.soultes)
        setSoulteList(
          (deal.soultes || []).map(function (item) {
            return {
              tradeDateLabel: DateUtil.Format(item.settlementDeal.tradeDate),
              maturityDateLabel: DateUtil.Format(
                item.settlementDeal.maturityDate
              ),
              sensLabel: soulteLabelFunction2(item),
              ...item,
            };
          })
        );
      else setSoulteList([]);
    },
    [deal]
  );

  useEffect(
    function () {
      if (position) position_service_resultHandler();
    },
    [position]
  );

  function position_service_resultHandler() {
    // var position = parseFloat(position);
    var qty = parseFloat(deal.sens) * Number(deal.quantite);
    var sensDeal = parseFloat(deal.sens);
    //denoumentAlert.visible = (sensDeal*position<0)&&(actionType!=UPDATE_ACTION);
    //denoumentAlert.includeInLayout = (sensDeal*position<0)&&(actionType!=UPDATE_ACTION);
    if (qty * position < 0) {
      //  this.currentState="settlementState";
      //   this.title = "Deal Forward - Dénouement";
      //deal.commission = "0";
      // commissionInput.dispatchEvent(new FocusEvent(FocusEvent.FOCUS_OUT));
      //denoumentAlert.visible = (actionType!=UPDATE_ACTION);
      let param = {};
      if (deal.dealId) param.dealId = deal.dealId;
      param.tradeDate = DateUtil.Format(deal.tradeDate);
      param.sens = deal.sens;
      param.quantite = deal.quantite;
      param.contratId = deal.contrat.contratId;
      param.counterpartyId = deal.contrepartie.tiersId;
      // soulte_service.send(param);
      dispatch(soulteForwardAPI(param));
    }
    /*else{
            this.currentState="initiationState";
            this.title = "Deal Forward - Initiation";
        }*/
  }

  function soulteLabelFunction2(item, column) {
    let prixNet1 =
      item.settlementDeal.prix -
      item.settlementDeal.sens * item.settlementDeal.commission;
    let prixNet2 =
      NumberUtil.Parse(deal.prix) +
      (deal.sens == 1 ? 1 : -1) * NumberUtil.Parse(deal.commission);
    let qtyDenouement =
      NumberUtil.Parse(item.quantite) *
      NumberUtil.Parse(deal.contrat.quantiteUnitaire);
    let coefPrix = NumberUtil.Parse(deal.contrat.sousJacent.coefPrix);

    let soulte =
      (deal.sens == 1 ? -1 : 1) *
      (prixNet2 - prixNet1) *
      qtyDenouement *
      coefPrix;
    return soulte ? NumberUtil.Format(String(soulte || 0) || 0) : "-";
  }
  function changeTabPosition(tabPosition) {
    setTabPosition(tabPosition);
  }

  function add() {
    setFlagUpdate(false);
    setForwardEcheanceVisible(true);
  }

  function remove() {
    dispatch(removeSelectDealForward());
  }

  function update() {
    setFlagUpdate(true);
    setForwardEcheanceVisible(true);
  }

  function generateEcheancier() {
    dispatch(genereDealForwardEcheancier(echeanceFrom));
  }

  function onChangeEcheance(values) {
    dispatch(updateDealForwardEcheancier(prepareEcheance(values)));
    console.log(values);
    setEcheanceFrom(prepareEcheance(values));
  }

  function prepareEcheance(values) {
    let contrat = {
      sousJacent: {
        devise: "",
        unite: { shortName: "" },
      },
    };
    if (values.sousJacentId) {
      let newContrat = getContrat(references, values.contratId);
      if (
        newContrat &&
        newContrat.sousJacent.sousJacentId == values.sousJacentId
      )
        contrat = newContrat;
      contrat = {
        ...contrat,
        sousJacent: { ...getSousjacent(references, values.sousJacentId) },
      };
    } else {
      //  contrat=getContrat(references, values.contratId);
    }

    return {
      ...values,
      commission: parseFloat(
        values.commission && String(values.commission).replace(/ /g, "")
      ),
      quantite: parseFloat(
        values.quantite && String(values.quantite).replace(/ /g, "")
      ),
      prix: parseFloat(values.prix && String(values.prix).replace(/ /g, "")),
      contrepartie: { ...getContrePartie(references, values.tiersId) },
      statut: { ...getStatut(values.statutId) },
      strategieLeg: {
        strategie: { strategieType: { id: values.strategieTypeId } },
      },
      contrat: contrat,
      broker: { ...getBroker(references, values.tiersId) },
    };
  }

  return (
    <Tabs tabPosition={tabPosition}>
      <TabPane tab="Deal" key="1">
        <DealForwardForm
          soulteList={soulteList}
          loadCheckPosition={loadCheckPosition}
          setSoulteList={setSoulteList}
          onFinish={onFinish}
          form={form}
          deal={deal}
          onChange={onChangeEcheance}
          references={references}
        />

        {soulteList.length > 0 && (
          <Grid
            style={{ height: "20vh", width: "104%", marginLeft: "-2%" }}
            resizable
            reorderable
            data={soulteList}
            //skip={skip}
            // take={take}
            // total={dataGrid.length}
            //   pageable={true}
            //   onPageChange={pageChange}
            sortable
            //   sort={sort}
            //  onSortChange={(e) => {
            // />/       setSort(e.sort);
            //   />/    }}
            selectedField="selected"
            //     onRowClick={(e) => handleOnRowClick(e)}
            //     onRowDoubleClick={e => handleRowDoubleClick(e)}
          >
            <GridToolbar>
              <h4 style={{ color: "rgba(19,105,180,0.9)" }}>Deals Dénoués</h4>
            </GridToolbar>
            <Column field="tradeDateLabel" title="Trade Date" />
            <Column field="maturityDateLabel" title="Maturity Date" />
            <Column field="settlementDeal.quantite" title="Quantité initiale" />
            <Column field="quantite" title="Quantité ouverte" />
            <Column field="quantiteDenouement" title="Quantité dénouement" />
            <Column field="settlementDeal.prix" title="Prix initial" />
            <Column field="sensLabel" title="Soulte(sens BMCE)" />
          </Grid>
        )}

        <CustomDialog
          className={"check-limit-forward"}
          title="Check limit"
          visible={forwardCheckLimitModalVisible}
          onOk={() => setForwardCheckLimitModalVisible(false)}
          onCancel={() => setForwardCheckLimitModalVisible(false)}
          centered
          footer={[
            <Button onClick={() => setForwardCheckLimitModalVisible(false)}>
              Fermer
            </Button>,
          ]}
        >
          <ForwardCheckLimit
            checkedLimitDealForward={checkedLimitDealForward}
          ></ForwardCheckLimit>
        </CustomDialog>
      </TabPane>
      <TabPane tab="Settlement" key="2">
        <AvisForwardGrid
          references={references}
          deal={deal}
          data={settlements}
        ></AvisForwardGrid>
      </TabPane>
    </Tabs>
  );
}
