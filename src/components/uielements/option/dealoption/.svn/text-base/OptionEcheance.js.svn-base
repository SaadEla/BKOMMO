import React, {useEffect, useState} from "react";
import {Button, Col, Form, Input, Row, Select} from "antd";
import {optionsContrePartie} from "../OptionUtil";
import DatePicker from "../../DatePick";

import NumberFormat from "react-number-format";
import {DateUtil} from "../../../../helpers/Utils";
import {useDispatch} from "react-redux";
import {addDealOption, updateDealOption} from "../../../../redux/dealCapture/option/DealOptionSlice";
import * as moment from "moment";

export function OptionEcheance({updatePrix, add, update, echeance, flagUpdate = true, hideModal}) {
    const [form] = Form.useForm();
    const dispatch = useDispatch();

    useEffect(function () {
        if (flagUpdate) {
            form.setFieldsValue({
                quantite: echeance.quantite,
                debut: DateUtil.ToJsDate(echeance.debut, "DD/MM/YYYY"),
                fin: DateUtil.ToJsDate(echeance.fin, "DD/MM/YYYY")
            })
        } else {
            initializeForm();
        }

    }, [flagUpdate, echeance]);

    const onFinish = values => {
        if (flagUpdate)
            update(prepareEcheanceUpdateData(values))
        else{
            add(prepareEcheanceUpdateData(values))
            initializeForm();
        }
        hideModal()
    };

    function add(values) {
        dispatch(addDealOption(values))

    }
    function update(values) {
        dispatch(updateDealOption(values))
    }

    function prepareEcheanceUpdateData(values) {
        if(values.quantite)
        return {
            debut: DateUtil.Format(values.debut),
            fin: DateUtil.Format(values.fin),
            quantite: parseFloat(values.quantite.replace(/ /g,""))};
        else return {
            debut: DateUtil.Format(values.debut),
                fin: DateUtil.Format(values.fin),
            exerce:true,
            prixEcheance: parseFloat(values.prixEcheance.replace(/ /g,""))};
    }


    function initializeForm() {
        form.resetFields()
    }

    return (<Form
        form={form}
        name="advanced_search"
        className="ant-advanced-search-form"
        onFinish={onFinish}
    >
        <Row gutter={24}>
            <Col span={24} key={"debutPeriode"}>
                <Form.Item
                    rules={[{required: true}]}
                    name="debut"
                    label={`Début de période`}
                >
                    <DatePicker
                        name="debut"
                        //  onChangeDate={d => setDebutPeriode(d.value)}
                        //  name={`debutPeriode`}
                        // defaultValue={DateUtil.ToJsDate(echeance.debut, "DD/MM/YYYY")}
                        //  value={debutPeriode}
                        width={'100%'}></DatePicker>
                </Form.Item>
            </Col>
            <Col span={24} key={"finPeriode"}>
                <Form.Item
                    rules={[{required: true}]}
                    name="fin"
                    label={`Fin de période`}
                >
                    <DatePicker
                        name="fin"
                      //  onChangeDate={d => setFinPeriode(d.value)}
                        // value={finPeriode}
                        width={'100%'}></DatePicker>
                </Form.Item>
            </Col>
            <Col span={24} key={"quantite"}>
                {
                  function () {
                      if(updatePrix)
                          return  <Form.Item
                              name="prixEcheance"
                              rules={[{required: true,message: 'Champ obligatoire!',}]}
                              label={`Prix`}

                          >
                              <NumberFormat
                                  //    value={quantite}
                                  customInput={Input}
                                  // style={{width: '162px'}}
                                  name="prixEcheance"
                                  // value={this.state.montant}
                                  //  onChange={(e) => setQuantite(parseFloat(e.target.value.replace(/ /g, "")))}
                                  required={true}
                                  thousandSeparator={" "}
                                  decimalSeparator={"."}/>
                          </Form.Item>;
                      return  <Form.Item
                          name="quantite"
                          rules={[{required: true}]}
                          label={`Quantite`}

                      >
                          <NumberFormat
                              //    value={quantite}
                              customInput={Input}
                              // style={{width: '162px'}}
                              name="quantite"
                              // value={this.state.montant}
                              //  onChange={(e) => setQuantite(parseFloat(e.target.value.replace(/ /g, "")))}
                              required={true}
                              thousandSeparator={" "}
                              decimalSeparator={"."}/>
                      </Form.Item>;
                  }()

                }

            </Col>
        </Row>

        <Row>
            <Col span={24} style={{textAlign: 'right'}}>
                <Button
                    onClick={event => {
                        hideModal();
                    }}
                    style={{margin: '0 8px'}}
                    htmlType="submit">
                    Annuler
                </Button>
                <Button
                    //  onClick={modifyList}
                    style={{margin: '0 8px'}}
                    type="primary" htmlType="submit">
                    OK
                </Button>
            </Col>
        </Row>
    </Form>)
}