/**
 * MODIFICATION HISTORY
 *
 * 1- add disabled property to radio button and others (updateFlag)
 * 2 - Init date value with J date
 *3 - Ajouter la fct checkPosition_callback
 *
 */

import React, { useEffect, useState } from "react";
import { Checkbox, Col, Row, Select, Spin } from "antd";
import { Form, Input, Button } from "antd";
import {
  optionsContrePartie,
  optionsFrequence,
  optionsSousjacents,
  optionsStatuts,
} from "../ForwardUtil";
import DatePicker from "../../DatePick";
import RadioBox, { RadioGroup } from "../../radio";
import NumberFormat from "react-number-format";
import "./DealForwardForm.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  checkPositionForwardSelector,
  dealForwardSuffixMontantGlobalSelector,
  dealForwardSuffixPrixSelector,
  dealForwardUpdateFlagSelector,
  updateFlagDealForwardSelector,
} from "../../../../redux/dealCapture/selectors/ForwardSelectors";
import {
  getContrat,
  getSousjacent,
  optionsContrat,
  optionsContrats,
  optionsStrategieType,
  optionsStrategieTypes,
} from "../../future/FutureUtil";
import { DateUtil, NumberUtil } from "../../../../helpers/Utils";
import { updateDealForwardEcheancier } from "../../../../redux/dealCapture/forward/DealForwardSlice";
import {
  commissionForwardAPI,
  dealMaturityForwardAPI,
  positionForwardAPI,
  soulteForwardAPI,
} from "../../../../redux/dealCapture/rest/ForwardRestCall";
import { errorNotif } from "../../../feedback/CustomNotification";

const FORWARD_DEAL = "F";

let suffixMontantGlobal = "";
let suffixPrix = "";

function CustomInputPrix(props) {
  return <Input {...props} suffix={suffixPrix}></Input>;
}

function CustomInputMontantGlobal(props) {
  return <Input {...props} suffix={suffixMontantGlobal}></Input>;
}

export function DealForwardForm({
  soulteList,
  loadCheckPosition,
  setSoulteList,
  onFinish,
  form,
  deal,
  onChange,
  references,
}) {
  const dealForwardUpdateFlag = useSelector(dealForwardUpdateFlagSelector);
  suffixMontantGlobal = useSelector(dealForwardSuffixMontantGlobalSelector);
  suffixPrix = useSelector(dealForwardSuffixPrixSelector);
  const [strategieList, setStrategieList] = useState([]);
  const dispatch = useDispatch();
  const [contratList, setContratList] = useState([]);
  const position = useSelector(checkPositionForwardSelector);
  const updateFlag = useSelector(updateFlagDealForwardSelector);
  useEffect(
    function () {
      const sousJacent = getSousjacent(
        references,
        deal.contrat.sousJacent.sousJacentId
      );
      form.setFieldsValue({
        strategieTypeId:
          deal.strategieLeg &&
          deal.strategieLeg.strategie &&
          deal.strategieLeg.strategie.strategieType.id,
        statut: deal.statut.libelle,
        contratId: deal.contrat.contratId,
        statutId: deal.statut.statutId,
        sousJacentId: deal.contrat.sousJacent.sousJacentId,
        tradeDate: deal.tradeDate ? deal.tradeDate : new Date(),
        valueDate: deal.valueDate,
        maturityDate: deal.maturityDate,
        maturity: deal.contrat.maturity,
        quantite: deal.quantite,
        prix: deal.prix,
        montantGlobalBrut: calculMontantGlobalBrut(),
        montantGlobalNet: calculMontantGlobalNet(),
        commission: deal.commission,
        tiersId: deal.contrepartie.tiersId,
        frequence: deal.frequence,
        sens: deal.sens,
        devise:
          sousJacent &&
          sousJacent.devise.shortName +
            (sousJacent.coefPrix == 1 ? "" : " - Cents"),
        market: sousJacent && sousJacent.market.shortName,
        unite:
          sousJacent &&
          sousJacent.unite.shortName + "-" + sousJacent.unite.name,
      });
      setContratList(
        references.contrats.filter(
          contratFilterFunnction(sousJacent && sousJacent.sousJacentId)
        )
      );
      setStrategieList(
        references.strategieTypes.filter(strategieTypeFilterFunction)
      );
    },
    [deal]
  );

  useEffect(
    function () {
      if (position || position == 0) position_service_resultHandler(position);
    },
    [position]
  );

  const onChangeEcheance = (values) => {
    onChange(form.getFieldValue());
  };

  function calculMontantGlobalNet() {
    const contrat = getContrat(references, deal.contrat.contratId);
    if (deal.prix && deal.quantite && deal.contrat.contratId != null) {
      let prixbrut = parseFloat(deal.prix);
      let prixNet =
        prixbrut - (deal.sens == 1 ? 1 : -1) * parseFloat(deal.commission);
      let qtyGlobale =
        parseFloat(deal.quantite) * parseFloat(contrat.quantiteUnitaire);
      let coefPrix = parseFloat(contrat.sousJacent.coefPrix);
      let mntGlobalNet = prixNet * qtyGlobale * coefPrix;
      return mntGlobalNet;
    }
    return null;
  }

  function calculMontantGlobalBrut() {
    const contrat = getContrat(references, deal.contrat.contratId);
    if (deal.prix && deal.quantite && deal.contrat.contratId != null) {
      let prixbrut = parseFloat(deal.prix);
      let prixNet =
        prixbrut - (deal.sens == 1 ? 1 : -1) * parseFloat(deal.commission);
      let qtyGlobale =
        parseFloat(deal.quantite) * parseFloat(contrat.quantiteUnitaire);
      let coefPrix = parseFloat(contrat.sousJacent.coefPrix);
      let mntGlobalBrut = prixbrut * qtyGlobale * coefPrix;
      return mntGlobalBrut;
    }
    return null;
  }

  function handleSousJacentchange(sj) {
    // dispatch(updateDealFutureEcheancier({contrat: {sousJacent:{devise: {},market:{},unite:{}}}}))
    //form.setFieldsValue({contratId: null})
    setContratList(contratList.filter(contratFilterFunnction(sj)));
    //  checkPosition();
    selectCommission();
  }

  /* function sousJacentCombo_changeHandler(event:ListEvent):void
    {
        contratList.filterFunction=contratFilterFunnction;
        contratList.refresh();

        selectCommission();

    }*/
  function contratFilterFunnction(selected) {
    return (item) => prepareContratFilterFunnction(item, selected);
  }

  function prepareContratFilterFunnction(item, selectedSousJacent) {
    var date = null;
    if (deal.tradeDate) {
      date = DateUtil.ToJsDate(deal.tradeDate);
    }
    var maturity = null;
    if (item.maturity != null && item.maturity != "") {
      maturity = DateUtil.ToJsDate(item.maturity, "DD/MM/YYYY");
    }

    if (date != null && maturity != null && date.getTime() > maturity.getTime())
      return false;

    if (!selectedSousJacent) return true;
    if (item.contratId && item.contratId != null) {
      return item.sousJacent.sousJacentId == selectedSousJacent;
    }
    return true;
  }

  function strategieTypeFilterFunction(item) {
    if (item.id == null) return true;
    if (item.deal1Type === FORWARD_DEAL && item.deal1Sens === deal.sens)
      return true;
    if (item.deal1Type === FORWARD_DEAL && item.deal1Sens === deal.sens)
      return true;
    if (item.deal2Type === FORWARD_DEAL && item.deal2Sens === deal.sens)
      return true;

    return false;
  }

  function sensRadioGroupChangeHandler(item) {
    dispatch(
      updateDealForwardEcheancier({
        strategieLeg: { strategie: { strategieType: { id: null } } },
      })
    );
    setStrategieList(
      references.strategieTypes.filter(strategieTypeFilterFunction)
    );
    checkPosition();
  }

  function position_service_resultHandler(resp) {
    let position = Number(resp);
    let qty = Number(deal.sens) * Number(deal.quantite);
    let sensDeal = Number(deal.sens);
    //   denoumentAlert.visible = (sensDeal*position<0)&&(actionType!=UPDATE_ACTION);
    // denoumentAlert.includeInLayout = (sensDeal*position<0)&&(actionType!=UPDATE_ACTION);
    if (qty * position < 0) {
      //this.currentState="settlementState";
      //this.title = "Deal Forward - D??nouement";
      // commission = "0";
      form.setFieldsValue({ commission: 0 });
      //todo commissionInput.dispatchEvent(new FocusEvent(FocusEvent.FOCUS_OUT));
      //denoumentAlert.visible = (actionType!=UPDATE_ACTION);
      var param = {};
      if (deal.dealId) param.dealId = deal.dealId;
      param.tradeDate = DateUtil.Format(deal.tradeDate);
      param.sens = deal.sens;
      param.quantite = deal.quantite;
      param.contratId = deal.contrat.contratId;
      param.counterpartyId = deal.contrepartie.tiersId;
      dispatch(soulteForwardAPI(param));
    } else {
      // todo this.currentState="initiationState";
      //todo this.title = "Deal Forward - Initiation";
    }
  }

  function checkPosition() {
    //setSoulteList([])
    if (
      deal.tradeDate &&
      form.getFieldValue("contratId") &&
      deal.contrepartie &&
      deal.contrepartie.tiersId
    ) {
      setTimeout(function () {
        dispatch(
          positionForwardAPI(
            {
              dealId: deal.dealId,
              tradeDate: deal.tradeDate,
              contratId: deal.contrat.contratId,
              counterpartyId: deal.contrepartie.tiersId,
            },
            checkPosition_callback
          )
        );
      }, 10);
    }
  }
  const checkPosition_callback = (res) => {
    let position = res;
    let sensDeal = deal.sens;
    let qty = sensDeal * deal.quantite;
    if (sensDeal * position < 0 && !dealForwardUpdateFlag) {
      errorNotif(
        "Deal au sens inverse de la position. D??nouement ?? effectuer."
      );
    }
  };
  function quantiteInput_focusOutHandler(event) {
    checkPosition();
  }

  function selectCommission(maturityDate) {
    if (
      form.getFieldValue("sousJacentId") &&
      deal.tradeDate &&
      (deal.maturityDate || maturityDate)
    ) {
      setTimeout(function () {
        let param = {};
        param.sousJacentId = form.getFieldValue("sousJacentId"); // deal.sousJacent && deal.sousJacent.sousJacentId
        param.tradeDate = DateUtil.Format(deal.tradeDate);
        param.maturityDate = maturityDate
          ? maturityDate
          : DateUtil.Format(deal.maturityDate);
        // commission_service.send(param);
        dispatch(commissionForwardAPI(param));
      }, 20);
    }
  }

  function tradeDateInput_changeHandler(event) {
    if (!deal.contrat.contratId) {
      //  const sousJacent = getSousjacent(references, deal.contrat.sousJacent.sousJacentId);
      contratFilterFunnction(form.getFieldValue("sousJacentId"));
      //  contratList.refresh();
    }
    checkPosition();
  }

  function contratCombo_changeHandler(event) {
    //  refreshContratInfo(contratCombo.selectedItem);
    checkPosition();
    getDealMaturity();
    // calculMontantGlobal();
  }

  function getDealMaturity() {
    if (form.getFieldValue("contratId")) {
      var param = {};
      param.contratId = form.getFieldValue("contratId"); //contratCombo.selectedItem.contratId;
      //dealMaturity_service.send(param);
      dispatch(dealMaturityForwardAPI(param, selectCommission));
    }
  }
  console.log("haaaaaaaaaaaa", updateFlag);
  return (
    <Form
      form={form}
      name="advanced_search"
      className="ant-deal-future-form"
      onFinish={onFinish}
      onValuesChange={onChangeEcheance}
    >
      <Row gutter={[12, 0]}>
        <Col span={13}>
          <Form.Item
            className={"form-left-part"}
            colon={false}
            name={`sens`}
            label={`Sens`}
            rules={[
              {
                required: true,
                message: "Champ obligatoire!",
              },
            ]}
          >
            <RadioGroup
              onChange={(item) => sensRadioGroupChangeHandler(item)}
              //  defaultValue={deal.sens}
            >
              <RadioBox value={1} disabled={!updateFlag}>
                Achat
              </RadioBox>
              <RadioBox value={-1} disabled={!updateFlag}>
                Vente
              </RadioBox>
            </RadioGroup>
          </Form.Item>
          <Form.Item
            className={"form-left-part"}
            colon={false}
            name={`strategieTypeId`}
            label={`Strat??gie`}
            /*rules={[
                            {
                                required: true,
                                message: 'Champ obligatoire!',
                            },
                        ]}*/
          >
            <Select
              allowClear
              showSearch
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
              // defaultValue={deal.contrepartie.tiersId}
              //onChange={(e) => console.log(e)}
              style={{ maxWidth: "100%" }}
            >
              {optionsStrategieType(strategieList)}
            </Select>
          </Form.Item>

          <Form.Item
            className={"form-left-part"}
            colon={false}
            name={`tiersId`}
            label={`Contrepartie`}
            rules={[
              {
                required: true,
                message: "Champ obligatoire!",
              },
            ]}
          >
            <Select
              allowClear
              showSearch
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
              // defaultValue={deal.contrepartie.tiersId}
              onChange={checkPosition}
              style={{ maxWidth: "100%" }}
            >
              {optionsContrePartie(references)}
            </Select>
          </Form.Item>
          <Form.Item
            className={"form-left-part"}
            colon={false}
            name={`tradeDate`}
            label={`Trade date`}
            rules={[
              {
                required: true,
                message: "Champ obligatoire!",
              },
            ]}
          >
            <DatePicker
              onChange={tradeDateInput_changeHandler}
              width={"100%"}
            ></DatePicker>
          </Form.Item>

          <Form.Item
            className={"form-left-part"}
            colon={false}
            name={`sousJacentId`}
            label={`Sous-jacent`}
            rules={[
              {
                required: true,
                message: "Champ obligatoire!",
              },
            ]}
          >
            <Select
              style={{ width: "100%" }}
              showSearch
              filterOption={(input, option) =>
                option.children[0].toLowerCase().indexOf(input.toLowerCase()) >=
                0
              }
              // defaultValue={deal.sousJacent.sousJacentId}
              onChange={(e) => handleSousJacentchange(e)}
              allowClear
              // style={{width: '120px'}}
            >
              {optionsSousjacents(references)}
            </Select>
          </Form.Item>

          <Form.Item
            className={"form-left-part"}
            colon={false}
            name={`contratId`}
            label={`Contrat`}
            rules={[
              {
                required: true,
                message: "Champ obligatoire!",
              },
            ]}
          >
            <Select
              onChange={contratCombo_changeHandler}
              showSearch
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
              disabled={form.getFieldValue("sousJacentId") ? false : true}
              //onChange={e=>handleFutureSearchModel({statutId:e})}
              allowClear
              //  defaultValue={deal.frequence}
              //  style={{width: '150px'}}
            >
              {optionsContrat(contratList)}
            </Select>
          </Form.Item>

          {deal.contrat.contratId && (
            <>
              {" "}
              <Row>
                <Col span={15}>
                  <Form.Item
                    className={"detaildata form-left-part"}
                    labelCol={{ span: 14 }}
                    colon={false}
                    name={`market`}
                    label={`March??`}
                    rules={[
                      {
                        required: false,
                        message: "Champ obligatoire!",
                      },
                    ]}
                  >
                    <Input></Input>
                  </Form.Item>
                </Col>
                <Col span={9}>
                  <Form.Item
                    className={"detaildata form-left-part"}
                    labelCol={{ span: 12 }}
                    colon={false}
                    name={`devise`}
                    label={`Devise`}
                    rules={[
                      {
                        required: false,
                        message: "Champ obligatoire!",
                      },
                    ]}
                  >
                    <Input disabled={true}></Input>
                  </Form.Item>
                </Col>
              </Row>
              <Form.Item
                className={"detaildata form-left-part"}
                colon={false}
                name={`maturity`}
                label={`Maturit??`}
                rules={[
                  {
                    required: false,
                    message: "Champ obligatoire!",
                  },
                ]}
              >
                <Input disabled={true}></Input>
              </Form.Item>
              <Form.Item
                className={"detaildata form-left-part"}
                colon={false}
                name={`unite`}
                label={`Quantit?? unitaire`}
                rules={[
                  {
                    required: false,
                    message: "Champ obligatoire!",
                  },
                ]}
              >
                <Input value={"USD"} disabled={true}></Input>
              </Form.Item>
            </>
          )}
        </Col>

        <Col span={11}>
          {!(soulteList && soulteList.length > 0) && (
            <Form.Item
              colon={false}
              name={`maturityDate`}
              label={`Maturity date`}
              rules={[
                {
                  required: true,
                  message: "Champ obligatoire!",
                },
              ]}
            >
              <DatePicker
                // defaultValue={DateUtil.ToJsDate(deal.tradeDate)}
                width={"100%"}
              ></DatePicker>
            </Form.Item>
          )}

          <Form.Item
            colon={false}
            name={`quantite`}
            label={`Nombre de contrats`}
            rules={[
              {
                required: true,
                message: "Champ obligatoire!",
              },
            ]}
          >
            <NumberFormat
              onBlur={quantiteInput_focusOutHandler}
              // defaultValue={deal.quantite}
              customInput={Input}
              // style={{width: '162px'}}
              //  name="montant"
              // value={this.state.montant}
              //onChange={(e)=>this.setState( {montant:parseFloat(e.target.value.replace(/ /g,"")) } )}
              required={true}
              thousandSeparator={" "}
              decimalSeparator={"."}
              disabled={!updateFlag}
            />
          </Form.Item>

          <Form.Item
            colon={false}
            name={`prix`}
            label={`Prix unitaire`}
            rules={[
              {
                required: true,
                message: "Champ obligatoire!",
              },
            ]}
          >
            <NumberFormat
              onBlur={checkPosition}
              // defaultValue={deal.quantite}
              customInput={CustomInputPrix}
              // style={{width: '162px'}}
              //  name="montant"
              // value={this.state.montant}
              //onChange={(e)=>this.setState( {montant:parseFloat(e.target.value.replace(/ /g,"")) } )}
              required={true}
              thousandSeparator={" "}
              decimalSeparator={"."}
              disabled={!updateFlag}
            />
          </Form.Item>

          <Form.Item
            colon={false}
            name={`commission`}
            label={`Commission unitaire`}
            rules={[
              {
                required: true,
                message: "Champ obligatoire!",
              },
            ]}
          >
            <NumberFormat
              // defaultValue={deal.quantite}
              customInput={CustomInputPrix}
              // style={{width: '162px'}}
              //  name="montant"
              // value={this.state.montant}
              //onChange={(e)=>this.setState( {montant:parseFloat(e.target.value.replace(/ /g,"")) } )}
              required={true}
              thousandSeparator={" "}
              decimalSeparator={"."}
              disabled={!updateFlag}
            />
          </Form.Item>
          {deal.dealId && deal.commission != deal.commissionStandard ? (
            <div
              style={{
                paddingLeft: "150px",
                color: "#ff4d4f",
                fontSize: "12px",
              }}
            >
              Commission diff??rente de la grille tarifaire!
            </div>
          ) : (
            ""
          )}
          <Form.Item
            className={"newcalcule"}
            colon={false}
            name={`montantGlobalBrut`}
            label={`Global brut`}
            rules={[
              {
                required: true,
                message: "Champ obligatoire!",
              },
            ]}
          >
            <NumberFormat
              disabled={true}
              // defaultValue={deal.quantite}
              customInput={CustomInputMontantGlobal}
              // style={{width: '162px'}}
              //  name="montant"
              // value={this.state.montant}
              //onChange={(e)=>this.setState( {montant:parseFloat(e.target.value.replace(/ /g,"")) } )}
              required={true}
              thousandSeparator={" "}
              decimalSeparator={"."}
            />
          </Form.Item>

          <Form.Item
            className={"newcalcule"}
            colon={false}
            name={`montantGlobalNet`}
            label={`Global net`}
            rules={[
              {
                required: true,
                message: "Champ obligatoire!",
              },
            ]}
          >
            <NumberFormat
              disabled={true}
              // defaultValue={deal.quantite}
              customInput={CustomInputMontantGlobal}
              // style={{width: '162px'}}
              //  name="montant"
              // value={this.state.montant}
              //onChange={(e)=>this.setState( {montant:parseFloat(e.target.value.replace(/ /g,"")) } )}
              required={true}
              thousandSeparator={" "}
              decimalSeparator={"."}
            />
          </Form.Item>

          {dealForwardUpdateFlag && (
            <Form.Item
              className={"detailstatus"}
              colon={false}
              name={`statut`}
              label={`Statut`}
              rules={[
                {
                  required: true,
                  message: "Champ obligatoire!",
                },
              ]}
            >
              <Input
                // defaultValue={deal.quantite}
                // customInput={Input}
                // style={{width: '162px'}}
                //  name="montant"
                // value={this.state.montant}
                //onChange={(e)=>this.setState( {montant:parseFloat(e.target.value.replace(/ /g,"")) } )}
                required={true}
                disabled={true}
              />
            </Form.Item>
          )}
        </Col>
      </Row>
    </Form>
  );
}
