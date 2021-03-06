import React, { useState } from "react";

import { Tabs, Select, Space, Modal, Form, Button } from "antd";
import { EcheancierHeader } from "./EcheancierHeader";
import { EcheancierDataGrid } from "./EcheancierDataGrid";
import { DealOptionForm } from "./DealOptionForm";
import {
  addDealOption,
  removeSelectDealOption,
  genereDealOptionEcheancier,
  updateDealOptionEcheancier,
} from "../../../../redux/dealCapture/option/DealOptionSlice";
import { OptionEcheance } from "./OptionEcheance";
import { useDispatch, useSelector } from "react-redux";
import {
  dealOptionDealSelector,
  dealOptionSelectedEcheanceSelector,
  dealOptionUpdateFlagSelector,
} from "../../../../redux/dealCapture/selectors/OptionSelectors";
import {
  checkEcheancier,
  getContrePartie,
  getSousjacent,
  getStatut,
} from "../OptionUtil";
import { Divider } from "antd";
import DealOptionFormFooter from "./DealOptionFormFooter";
import CustomDialog from "../../../feedback/modal";
import { OptionCheckLimit } from "./OptionCheckLimit";
import { getContrat } from "../../future/FutureUtil";
import { SettlementOffset } from "./SettlementOffset";
import { generateEcheancierOptionAPI } from "../../../../redux/dealCapture/rest/OptionRestCall";
import { DateUtil } from "../../../../helpers/Utils";

const { TabPane } = Tabs;
const { Option } = Select;

export function DealOption({
  onFinish,
  form,
  checkedLimitDealOption,
  optionCheckLimitModalVisible,
  setOptionCheckLimitModalVisible,
  references,
  dealOptionData,
}) {
  const [formSettlemntDtOffset] = Form.useForm();
  const dispatch = useDispatch();
  const [tabPosition, setTabPosition] = useState("left");
  const [optionEcheanceVisible, setOptionEcheanceVisible] = useState(false);
  const [settlementDateOffsetVisible, setSettlementDateOffsetVisible] =
    useState(false);
  const selectedEcheance = useSelector(dealOptionSelectedEcheanceSelector);
  const updateDealOptionFlag = useSelector(dealOptionUpdateFlagSelector);
  const [echeanceFrom, setEcheanceFrom] = useState();
  const [flagUpdate, setFlagUpdate] = useState();
  const [updatePrix, setUpdatePrix] = useState();
  const [settlementDateOffset, setSettlementDateOffset] = useState();
  const deal = useSelector(dealOptionDealSelector);

  function changeTabPosition(tabPosition) {
    setTabPosition(tabPosition);
  }

  function add() {
    setFlagUpdate(false);
    setOptionEcheanceVisible(true);
  }

  function remove() {
    dispatch(removeSelectDealOption());
  }

  function update() {
    setUpdatePrix(null);
    setFlagUpdate(true);
    setOptionEcheanceVisible(true);
  }

  function generateEcheancier() {
    formSettlemntDtOffset.resetFields();
    if (checkEcheancier(deal)) {
      setSettlementDateOffsetVisible(true);
    }

    // dispatch(genereDealOptionEcheancier(echeanceFrom))
  }

  function onChangeEcheance(values) {
    dispatch(updateDealOptionEcheancier(prepareEcheance(values)));
    console.log(values);
    setEcheanceFrom(prepareEcheance(values));
  }

  /* function settlementOffsetChangedEvent(event):void
    {
        deal.settlementOffset = event.data.settlementOffset;
        //Alert.show(""+deal.settlementOffset);
        var param:Object = new Object();
        param.valueDate = valueDateInput.text;
        param.maturityDate = maturityDateInput.text;
        param.typeExercice = typeExerciceCombo.selectedItem.id ;
        param.frequence = frequenceCombo.selectedItem.id;
        param.settlementOffset = deal.settlementOffset;
        param.quantite = NumberUtil.Parse(quantiteInput.text);
        param.natureOption = natureOptionRadioGroup.selectedValue;
        if(natureOptionRadioGroup.selectedValue=='M'){
            param.contratId=0;
            param.sousJacentId = sousJacentCombo.selectedItem.sousJacentId;
        }else{
            param.sousJacentId =0;
            param.contratId = contratCombo.selectedItem.contratId;
        }

        echeancier_service.send(param);
    }*/

  function prepareEcheance(values) {
    return {
      ...values,
      commission: values.commission
        ? parseFloat(String(values.commission).replace(/ /g, ""))
        : undefined,
      prixOption: values.prixOption
        ? parseFloat(String(values.prixOption).replace(/ /g, ""))
        : undefined,
      strike: values.strike
        ? parseFloat(String(values.strike).replace(/ /g, ""))
        : undefined,
      prixSousJacent: values.prixSousJacent
        ? parseFloat(String(values.prixSousJacent).replace(/ /g, ""))
        : undefined,
      contrat: getContrat(references, values.contratId),
      strategieLeg: {
        strategie: { strategieType: { id: values.strategieTypeId } },
      },
      modePaiement: { id: values.modePaiementId },
      //modePaiementId: deal.modePaiement && deal.modePaiement.id,
      quantite: parseFloat(
        values.quantite && String(values.quantite).replace(/ /g, "")
      ),
      prixFixe: parseFloat(
        values.prixFixe && String(values.prixFixe).replace(/ /g, "")
      ),
      tiers: { ...getContrePartie(references, values.tiersId) },
      statut: { libelle: values.statutId },
      sousJacent: { ...getSousjacent(references, values.sousJacentId) },
    };
  }

  function settlementOffsetChangedEvent() {
    /*
        param.valueDate = valueDateInput.text;
        param.maturityDate = maturityDateInput.text;
        param.typeExercice = typeExerciceCombo.selectedItem.id ;
        param.frequence = frequenceCombo.selectedItem.id;
        param.settlementOffset = deal.settlementOffset;
        param.quantite = NumberUtil.Parse(quantiteInput.text);
        param.natureOption = natureOptionRadioGroup.selectedValue;
*/
    const param = {
      valueDate: DateUtil.Format(deal.valueDate),
      maturityDate: DateUtil.Format(deal.maturityDate),
      typeExercice: parseFloat(deal.typeExercice),
      frequence: deal.frequence,
      settlementOffset: deal.settlementOffset,
      quantite: parseFloat(deal.quantite),
      natureOption: deal.natureOption,
    };
    if (deal.natureOption == "M") {
      param.contratId = 0;
      param.sousJacentId = deal.sousJacent.sousJacentId;
    } else {
      param.sousJacentId = 0;
      param.contratId = deal.contrat.contratId;
    }

    dispatch(generateEcheancierOptionAPI(param));
  }
  function settlementDateOffsetChangeHandle(item) {
    setSettlementDateOffsetVisible(false);
    setSettlementDateOffset(
      parseFloat(item.settlementDateOffset.replace(/ /g, ""))
    );
    dispatch(
      updateDealOptionEcheancier({
        settlementOffset: parseFloat(
          item.settlementDateOffset.replace(/ /g, "")
        ),
      })
    );

    settlementOffsetChangedEvent();
  }
  function onSubmitsettlementDateOffset() {
    formSettlemntDtOffset.submit();
  }
  function exercer() {
    setUpdatePrix(true);
    setFlagUpdate(true);
    setOptionEcheanceVisible(true);
  }
  return (
    <div>
      <Tabs tabPosition={tabPosition}>
        <TabPane tab="Deal" key="1">
          <DealOptionForm
            onFinish={onFinish}
            form={form}
            dealOptionData={dealOptionData}
            onChange={onChangeEcheance}
            references={references}
          ></DealOptionForm>
          <CustomDialog
            className={"check-limit-option"}
            title="Check limit"
            visible={optionCheckLimitModalVisible}
            onOk={() => {
              setOptionCheckLimitModalVisible(false);
            }}
            onCancel={() => setOptionCheckLimitModalVisible(false)}
            centered
            footer={[
              <Button onClick={() => setOptionCheckLimitModalVisible(false)}>
                Fermer
              </Button>,
            ]}
          >
            <OptionCheckLimit
              checkedLimitDealOption={checkedLimitDealOption}
            ></OptionCheckLimit>
          </CustomDialog>
        </TabPane>
        <TabPane tab="Ech??ancier" key="2">
          <EcheancierHeader
            updateDealOptionFlag={updateDealOptionFlag}
            flagUpdate={flagUpdate}
            exercer={exercer}
            generateEcheancier={generateEcheancier}
            echeance={selectedEcheance}
            add={add}
            remove={remove}
            update={update}
          ></EcheancierHeader>
          <EcheancierDataGrid
            showMoadlOptionEcheance={update}
          ></EcheancierDataGrid>
          {/** debut edit echeancier*/}
          <CustomDialog
            className={"dealOptionEcheance"}
            title="Option Echeance"
            visible={optionEcheanceVisible}
            onOk={() => setOptionEcheanceVisible(false)}
            onCancel={() => setOptionEcheanceVisible(false)}
            centered
            footer={null}
          >
            <OptionEcheance
              updatePrix={updatePrix}
              hideModal={() => setOptionEcheanceVisible(false)}
              flagUpdate={flagUpdate}
              echeance={selectedEcheance}
            ></OptionEcheance>
          </CustomDialog>
          <CustomDialog
            className={"settlementDateOffset"}
            title="Settlement date offset"
            visible={settlementDateOffsetVisible}
            onOk={() => onSubmitsettlementDateOffset()}
            onCancel={() => setSettlementDateOffsetVisible(false)}
            centered
            cancelText={"Annuler"}
          >
            <SettlementOffset
              form={formSettlemntDtOffset}
              onFinish={settlementDateOffsetChangeHandle}
            ></SettlementOffset>
          </CustomDialog>
        </TabPane>
      </Tabs>
    </div>
  );
}
