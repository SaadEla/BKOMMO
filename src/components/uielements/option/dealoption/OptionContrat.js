import React, { useEffect, useState } from "react";
import { Col, Form, Input, Radio, Row, Select } from "antd";
import {
  getStatut,
  getTypeExercice,
  optionsBroker,
  optionsContrats,
  optionsContrePartie,
  optionsFrequence,
  optionsModePaiements,
  optionsSousjacents,
  optionsStatuts,
  optionsStrategieType,
  optionsStrategieTypes,
  optionsTypeExercice,
} from "../OptionUtil";
import NumberFormat from "react-number-format";
import DatePicker from "../../DatePick";
import RadioBox, { RadioGroup } from "../../radio";
import { updateDealForwardEcheancier } from "../../../../redux/dealCapture/forward/DealForwardSlice";
import { useDispatch, useSelector } from "react-redux";
import { dealOptionUpdateFlagSelector } from "../../../../redux/dealCapture/selectors/OptionSelectors";
import Option from "../../../../containers/DealCapture/Option/option";

export const TYPETIERS_Broker = "B";
export const NATURE_OPTION_FUTURE = "F";

export function isTYPETIERS_Broker(item) {
  return item == TYPETIERS_Broker;
}

const Item = Form.Item;

function isNatureOptionFuture(item) {
  return item == NATURE_OPTION_FUTURE;
}

const OPTION_DEAL = "O";

export function OptionContrat({
  deal,
  form,
  natureOprion,
  typeTiers,
  references,
  CustomInputMontantGlobal,
  CustomInputPrix,
}) {
  const brokersList = optionsBroker(references);
  const contrepartiesList = optionsContrePartie(references);
  const [strategieList, setStrategieList] = useState([]);
  const updateFlagOption = useSelector(dealOptionUpdateFlagSelector);
  const dispatch = useDispatch();

  useEffect(
    function () {
      setStrategieList(
        references.strategieTypes.filter(strategieTypeFilterFunction)
      );
    },
    [deal]
  );
  /* function strategieTypeFilterFunction(item) {
        if (item.id == null)
            return true;
        if ((item.deal1Type == FORWARD_DEAL) && (item.deal1Sens == deal.sens))
            return true;
        if ((item.deal1Type == FORWARD_DEAL) && (item.deal1Sens == deal.sens))
            return true;
        if ((item.deal2Type == FORWARD_DEAL) && (item.deal2Sens == deal.sens))
            return true;

        return false;
    }*/
  function strategieTypeFilterFunction(item) {
    if (item.id == null) return true;
    if (
      item.deal1Type == OPTION_DEAL &&
      item.deal1Sens == deal.sens &&
      item.deal1TypeOption == deal.typeOption
    )
      return true;

    if (
      item.deal2Type == OPTION_DEAL &&
      item.deal2Sens == deal.sens &&
      item.deal2TypeOption == deal.typeOption
    )
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
  }
  return (
    <>
      <Row gutter={[50, 0]}>
        <Col span={13}>
          {!isTYPETIERS_Broker(typeTiers) ? (
            <Item
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
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
                }
                // defaultValue={deal.contrepartie.tiersId}
                onChange={(e) => console.log(e)}
                style={{ maxWidth: "100%" }}
              >
                {isTYPETIERS_Broker(typeTiers)
                  ? brokersList
                  : contrepartiesList}
              </Select>
            </Item>
          ) : (
            <Item
              className={"form-left-part"}
              colon={false}
              name={`tiersId`}
              label={"Broker"}
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
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
                }
                // defaultValue={deal.contrepartie.tiersId}
                onChange={(e) => console.log(e)}
                style={{ maxWidth: "100%" }}
              >
                {brokersList}
              </Select>
            </Item>
          )}
          {!isNatureOptionFuture(natureOprion) ? (
            <Item
              className={"form-left-part"}
              colon={false}
              name={`sousJacentId`}
              label={`Sous-jacent`}
              /*rules={[
                {
                  required: true,
                  message: "Champ obligatoire!",
                },
              ]}*/
            >
              <Select
                showSearch
                filterOption={(input, option) =>
                  option?.children[0]
                    .toLowerCase()
                    .indexOf(input.toLowerCase()) >= 0
                }
                // defaultValue={deal.sousJacent.sousJacentId}
                //onChange={e=>handleOptionSearchModel({sousJacentId:e})}
                allowClear
                // style={{width: '120px'}}
              >
                {optionsSousjacents(references)}
              </Select>
            </Item>
          ) : (
            <Item
              className={"form-left-part"}
              colon={false}
              name={`contratId`}
              label={`Contrat`}
              /*rules={[
                {
                  required: true,
                  message: "Champ obligatoire!",
                },
              ]}*/
            >
              <Select
                showSearch
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
                }
                // defaultValue={deal.sousJacent.sousJacentId}
                //onChange={e=>handleOptionSearchModel({sousJacentId:e})}
                allowClear
                // style={{width: '120px'}}
              >
                {optionsContrats(references)}
              </Select>
            </Item>
          )}

          <Item
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
              disabled={!updateFlagOption}
              onChange={sensRadioGroupChangeHandler}
              //  defaultValue={deal.sens}
            >
              <RadioBox value={1}>Achat</RadioBox>
              <RadioBox value={-1}>Vente</RadioBox>
            </RadioGroup>
          </Item>

          <Item
            className={"form-left-part"}
            colon={false}
            name={`typeOption`}
            label={`Type`}
            rules={[
              {
                required: true,
                message: "Champ obligatoire!",
              },
            ]}
          >
            <RadioGroup
              disabled={!updateFlagOption}
              //  defaultValue={deal.sens}
            >
              <RadioBox value={"C"}>Call</RadioBox>
              <RadioBox value={"P"}>Put</RadioBox>
            </RadioGroup>
          </Item>

          <Item
            className={"form-left-part"}
            colon={false}
            name={`strategieTypeId`}
            label={`Stratégie`}
            rules={[
              {
                required: true,
                message: "Champ obligatoire!",
              },
            ]}
          >
            <Select
              showSearch
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
              // defaultValue={deal.sousJacent.sousJacentId}
              //onChange={e=>handleOptionSearchModel({sousJacentId:e})}
              allowClear
              // style={{width: '120px'}}
            >
              <Select.Option key={0} value={0}>
                ---
              </Select.Option>
              {optionsStrategieType(strategieList)}
            </Select>
          </Item>

          <Item
            className={"form-left-part"}
            colon={false}
            name={`typeExercice`}
            label={`Type Excercice`}
            rules={[
              {
                required: true,
                message: "Champ obligatoire!",
              },
            ]}
          >
            <Select
              showSearch
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
              // defaultValue={deal.sousJacent.sousJacentId}
              //onChange={e=>handleOptionSearchModel({sousJacentId:e})}
              allowClear
              // style={{width: '120px'}}
            >
              {optionsTypeExercice(references)}
            </Select>
          </Item>

          {getTypeExercice(form.getFieldValue("typeExercice")).frequence && (
            <Item
              className={"form-left-part"}
              colon={false}
              name={`frequence`}
              label={`Fréquence`}
              rules={[
                {
                  required: true,
                  message: "Champ obligatoire!",
                },
              ]}
            >
              <Select
                showSearch
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
                }
                // defaultValue={deal.sousJacent.sousJacentId}
                //onChange={e=>handleOptionSearchModel({sousJacentId:e})}
                allowClear
                // style={{width: '120px'}}
              >
                {optionsFrequence(references)}
              </Select>
            </Item>
          )}

          <Item
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
              // defaultValue={DateUtil.ToJsDate(deal.tradeDate)}
              width={"100%"}
            ></DatePicker>
          </Item>

          <Item
            className={"form-left-part"}
            colon={false}
            name={`valueDate`}
            label={`Value date`}
            rules={[
              {
                required: true,
                message: "Champ obligatoire!",
              },
            ]}
          >
            <DatePicker
              //defaultValue={DateUtil.ToJsDate(deal.valueDate)}
              width={"100%"}
            ></DatePicker>
          </Item>

          <Item
            className={"form-left-part"}
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
              // defaultValue={DateUtil.ToJsDate(deal.maturityDate)}
              width={"100%"}
            ></DatePicker>
          </Item>

          {deal.dealId && (
            <Item
              className={"form-left-part detailstatus"}
              colon={false}
              name={`statutId`}
              label={`Statut`}
            >
              <Input disabled={true}></Input>
            </Item>
          )}
        </Col>
        <Col span={11}>
          <Item
            colon={false}
            name={`quantite`}
            label={
              isNatureOptionFuture(natureOprion)
                ? `Nombre de contrats`
                : "Quantité"
            }
            rules={[
              {
                required: true,
                message: "Champ obligatoire!",
              },
            ]}
          >
            <NumberFormat
              // defaultValue={deal.quantite}
              customInput={Input}
              // style={{width: '162px'}}
              //  name="montant"
              // value={this.state.montant}
              //onChange={(e)=>this.setState( {montant:parseFloat(e.target.value.replace(/ /g,"")) } )}
              required={true}
              thousandSeparator={" "}
              decimalSeparator={"."}
            />
          </Item>
          {isNatureOptionFuture(natureOprion) && (
            <Item
              colon={false}
              name={`quantiteGlobal`}
              label={`Quanitite globale`}
              rules={[
                {
                  required: true,
                  message: "Champ obligatoire!",
                },
              ]}
            >
              <NumberFormat
                // defaultValue={deal.quantite}
                customInput={Input}
                // style={{width: '162px'}}
                //  name="montant"
                // value={this.state.montant}
                //onChange={(e)=>this.setState( {montant:parseFloat(e.target.value.replace(/ /g,"")) } )}
                required={true}
                thousandSeparator={" "}
                decimalSeparator={"."}
              />
            </Item>
          )}

          <Item
            colon={false}
            name={`prixSousJacent`}
            label={`Prix Sous-jacent`}
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
            />
          </Item>

          <Item
            colon={false}
            name={`strike`}
            label={`Strike`}
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
            />
          </Item>

          <Item
            colon={false}
            name={`prixOption`}
            label={`Prix option`}
            rules={[
              {
                required: true,
                message: "Champ obligatoire!",
              },
            ]}
          >
            <NumberFormat
              customInput={CustomInputPrix}
              // style={{width: '162px'}}
              //  name="montant"
              //defaultValue={deal.prixFixe}
              //onChange={(e)=>this.setState( {montant:parseFloat(e.target.value.replace(/ /g,"")) } )}
              required={true}
              thousandSeparator={" "}
              decimalSeparator={"."}
            />
          </Item>

          <Item
            className={"newcalcule"}
            colon={false}
            name={`commission`}
            label={`Commission unitaire`}
          >
            <NumberFormat
              defaultValue={0}
              //disabled={true}
              customInput={CustomInputMontantGlobal}
              // style={{width: '162px'}}
              //  name="montant"
              //defaultValue={deal.prixFixe}
              //onChange={(e)=>this.setState( {montant:parseFloat(e.target.value.replace(/ /g,"")) } )}
              thousandSeparator={" "}
              decimalSeparator={"."}
            />
          </Item>

          <Item
            className={"newcalcule"}
            colon={false}
            name={`commissionGlobal`}
            label={`Commission global`}
          >
            <NumberFormat
              disabled={true}
              customInput={CustomInputMontantGlobal}
              // style={{width: '162px'}}
              //  name="montant"
              //defaultValue={deal.prixFixe}
              //onChange={(e)=>this.setState( {montant:parseFloat(e.target.value.replace(/ /g,"")) } )}
              thousandSeparator={" "}
              decimalSeparator={"."}
            />
          </Item>

          <Item
            className={"newcalcule"}
            colon={false}
            name={`primeBrute`}
            label={`Prime brut`}
          >
            <NumberFormat
              disabled={true}
              customInput={CustomInputMontantGlobal}
              // style={{width: '162px'}}
              //  name="montant"
              //defaultValue={deal.prixFixe}
              //onChange={(e)=>this.setState( {montant:parseFloat(e.target.value.replace(/ /g,"")) } )}

              thousandSeparator={" "}
              decimalSeparator={"."}
            />
          </Item>

          <Item
            className={"newcalcule"}
            colon={false}
            labelAlign={"right"}
            name={`primeNette`}
            label={`Prime Nette`}
          >
            <NumberFormat
              disabled={true}
              customInput={CustomInputMontantGlobal}
              // style={{width: '162px'}}
              //  name="montant"
              //defaultValue={deal.prixFixe}
              //onChange={(e)=>this.setState( {montant:parseFloat(e.target.value.replace(/ /g,"")) } )}

              thousandSeparator={" "}
              decimalSeparator={"."}
            />
          </Item>

          <Item
            labelAlign={"left"}
            colon={false}
            name={`modePaiementId`}
            label={`Mode Paiement Prime`}
            // rules={[
            //     {
            //         required: true,
            //         message: 'Champ obligatoire!',
            //     },
            // ]}
          >
            <Select
              showSearch
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
              // defaultValue={deal.sousJacent.sousJacentId}
              //onChange={e=>handleOptionSearchModel({sousJacentId:e})}
              allowClear
              // style={{width: '120px'}}
            >
              <Select.Option key={0} value={null}>
                ---
              </Select.Option>

              {optionsModePaiements(references)}
            </Select>
          </Item>

          <Item
            colon={false}
            name={`typeDenouement`}
            label={`Dénouemeent`}
            rules={[
              {
                required: true,
                message: "Champ obligatoire!",
              },
            ]}
          >
            <RadioGroup
              disabled={!updateFlagOption}
              //  defaultValue={deal.sens}
            >
              <RadioBox value={"C"}>Cash</RadioBox>
              <RadioBox value={"P"}>Physique</RadioBox>
            </RadioGroup>
          </Item>
        </Col>
      </Row>
    </>
  );
}
