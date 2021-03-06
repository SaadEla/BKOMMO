import React, { useEffect, useState } from "react";
import { Checkbox, Col, Radio, Row, Select } from "antd";
import { Form, Input, Button } from "antd";
import "./DealOptionForm.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  dealOptionDealSelector,
  dealOptionSuffixMontantGlobalSelector,
  dealOptionSuffixPrixSelector,
  dealOptionUpdateFlagSelector,
} from "../../../../redux/dealCapture/selectors/OptionSelectors";
import { Tabs } from "antd";
import { OptionContrat } from "./OptionContrat";
import { updateDealOptionEcheancier } from "../../../../redux/dealCapture/option/DealOptionSlice";
import { updateDealForwardEcheancier } from "../../../../redux/dealCapture/forward/DealForwardSlice";
import { getStatut } from "../OptionUtil";

const UPDATE_ACTION = "update";
const { TabPane } = Tabs;

let suffixMontantGlobal = "";
let suffixPrix = "";

const FORWARD_DEAL = "F";

function CustomInputPrix(props) {
  return <Input {...props} suffix={suffixPrix}></Input>;
}

function CustomInputMontantGlobal(props) {
  return <Input {...props} suffix={suffixMontantGlobal}></Input>;
}

export function DealOptionForm({
  onFinish,
  form,
  onChange,
  references,
  dealOptionData,
}) {
  const deal = useSelector(dealOptionDealSelector);
  const [actionType, setActionType] = useState();
  const dealRef = dealOptionData.references;
  let primeBrute;
  let commissionGlobal;
  const dispatch = useDispatch();
  const updateFlagOption = useSelector(dealOptionUpdateFlagSelector);

  suffixMontantGlobal = useSelector(dealOptionSuffixMontantGlobalSelector);
  suffixPrix = useSelector(dealOptionSuffixPrixSelector);

  const [typeTiers, setTypeTiers] = useState("B");

  function calculQuantiteGlobal() {
    if (deal.natureOption == "F") {
      if (deal.quantite && deal.contrat && deal.contrat.contratId) {
        const qty = deal.quantite * deal.contrat.quantiteUnitaire;
        return qty;
      }
    }
    return null;
  }

  function calculcommissionGlobal() {
    if (!deal.commission || !deal.quantite) {
      commissionGlobal = null;
      return null;
    }
    if (typeTiers == "B") {
      //option avec broker
      return deal.commission * deal.quantite;
    } else {
      //option avec contrepartie
      if (deal.natureOption == "F") {
        //option sur contrat future
        if (deal.contrat.contratId != null) {
          let contrat = deal.contrat;
          commissionGlobal =
            deal.commission *
            deal.quantite *
            contrat.quantiteUnitaire *
            contrat.sousJacent.coefPrix;
          return commissionGlobal;
        }
        commissionGlobal = "";
        return;
      } else {
        //option sur mati??re premi??re
        if (deal.sousJacent.sousJacentId != null) {
          const sj = deal.sousJacent;
          commissionGlobal = deal.commission * deal.quantite * sj.coefPrix;
          return commissionGlobal;
        }
        commissionGlobal = "";
      }
    }

    commissionGlobal = "";
    return null;
  }

  function calculPrimeBrute() {
    if (deal.prixOption && deal.quantite) {
      let qtyUnitaire = 1;
      let coefPrix = 1;
      if (deal.natureOption == "F") {
        if (deal.contrat.contratId != null) {
          qtyUnitaire = deal.contrat.quantiteUnitaire;
          coefPrix = deal.contrat.sousJacent.coefPrix;
        }
      } else {
        coefPrix = deal.sousJacent.coefPrix;
      }

      primeBrute = deal.prixOption * deal.quantite * qtyUnitaire * coefPrix;
      return primeBrute;
    }
    primeBrute = "";
    return null;
  }

  function calculPrimeNette() {
    commissionGlobal = calculcommissionGlobal();
    primeBrute = calculPrimeBrute();
    console.log("commissionGlobal1", typeTiers, primeBrute, commissionGlobal);
    if (primeBrute) {
      let PrimeNette;
      if (typeTiers == "C") {
        //contrepartie
        PrimeNette =
          primeBrute -
          (deal.sens == 1 ? 1 : -1) * parseFloat(commissionGlobal || 0);
      } else {
        //broker
        PrimeNette = primeBrute + parseFloat(commissionGlobal || 0);
      }
      return PrimeNette;
    }
    return null;
  }

  useEffect(
    function () {
      /* if(deal.hasOwnProperty("dealId")&&(deal.dealId>0)){
             setActionType(UPDATE_ACTION);
         }
         if(actionType ===UPDATE_ACTION){*/

      if (dealRef.brokers)
        for (let tb of dealRef.brokers) {
          if (tb.tiersId == deal.tiers.tiersId) {
            // tiersCombo.selectedItem=tb;
            setTypeTiers("B");
            /* if(!flagUpdate){
                         tiersCombo.dataProvider= new ArrayCollection([tb]);
                     }*/
            break;
          }
        }
      if (dealRef.counterparties)
        for (let tc of dealRef.counterparties) {
          if (tc.tiersId == deal.tiers.tiersId) {
            //tiersCombo.selectedItem=tc;
            setTypeTiers("C");
            /*if(!flagUpdate){
                        tiersCombo.dataProvider= new ArrayCollection([tc]);
                    }*/
            break;
          }
        }
      form.setFieldsValue({
        dealId: deal.dealId,
        natureOption: deal.natureOption,
        tiersId: deal.tiers.tiersId,
        tradeDate: deal.tradeDate,
        valueDate: deal.valueDate,
        maturityDate: deal.maturityDate,
        quantite: deal.quantite,
        frequence: deal.frequence,
        sens: deal.sens,
        sousJacentId: deal.sousJacent.sousJacentId,
        contratId: deal.contrat.contratId,
        typeOption: deal.typeOption,
        typeExercice: parseFloat(deal.typeExercice) || "",
        strike: deal.strike,
        prixSousJacent: deal.prixSousJacent,
        prixOption: deal.prixOption,
        commission: deal.commission,
        typeDenouement: deal.typeDenouement,
        modePaiementId: deal.modePaiement && deal.modePaiement.id,
        statutId: deal.statut.libelle,
        strategieTypeId: deal.strategieLeg.strategie.strategieType.id,
        quantiteGlobal: calculQuantiteGlobal() || 0,
        commissionGlobal: calculcommissionGlobal() || 0,
        primeBrute: calculPrimeBrute() || 0,
        primeNette: calculPrimeNette() || 0,
      });
      //   }
    },
    [deal]
  );

  const onChangeEcheance = (values) => {
    onChange(form.getFieldValue());
  };

  function calculMontantGlobal() {
    return deal.prixFixe * deal.quantite * deal.sousJacent.coefPrix;
  }

  function onRadioBrokercontrepartieChange(item) {
    dispatch(updateDealOptionEcheancier({ tiers: {} }));
    setTypeTiers(item);
  }

  const operations = (
    <Radio.Group
      disabled={!updateFlagOption}
      onChange={(e) => onRadioBrokercontrepartieChange(e.target.value)}
      value={typeTiers}
      buttonStyle="solid"
    >
      <Radio.Button value={"B"}>Broker</Radio.Button>
      <Radio.Button value={"C"}>Contrepartie</Radio.Button>
    </Radio.Group>
  );

  function handleNatureOptionchange(item) {
    return dispatch(updateDealOptionEcheancier({ natureOption: item }));
  }

  return (
    <Form
      form={form}
      name="advanced_search"
      className="ant-deal-option-form"
      onFinish={onFinish}
      onValuesChange={onChangeEcheance}
    >
      <div className="card-container">
        <Tabs
          activeKey={deal.natureOption}
          onChange={(item) => handleNatureOptionchange(item)}
          tabBarExtraContent={operations}
          type={"card"}
          centered
        >
          <TabPane
            disabled={!updateFlagOption}
            tab="Option sur contrat future"
            key="F"
          >
            <OptionContrat
              deal={deal}
              form={form}
              natureOprion={"F"}
              typeTiers={typeTiers}
              references={dealRef}
              CustomInputMontantGlobal={CustomInputMontantGlobal}
              CustomInputPrix={CustomInputPrix}
            ></OptionContrat>
          </TabPane>
          <TabPane
            disabled={!updateFlagOption}
            tab="Option sur mati??re premi??re"
            key="M"
          >
            <OptionContrat
              deal={deal}
              form={form}
              natureOprion={"M"}
              typeTiers={typeTiers}
              references={dealRef}
              CustomInputMontantGlobal={CustomInputMontantGlobal}
              CustomInputPrix={CustomInputPrix}
            ></OptionContrat>
          </TabPane>
        </Tabs>
      </div>
    </Form>
  );
}
