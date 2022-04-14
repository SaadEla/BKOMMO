import React, {useEffect, useState} from "react";
import {Button, Col, Form, Input, Row, Select} from "antd";
import DatePicker from "../../../uielements/DatePick";

import NumberFormat from "react-number-format";
import {DateUtil, NumberUtil} from "../../../../helpers/Utils";
import {useDispatch} from "react-redux";
import {addEcheance} from "../../../../redux/GestionDeLimite/limitSetup/limitSetupSlice";

export function LimitSetupEcheance({form, add, update, echeance, flagUpdate = true, hideModal}) {

    const dispatch = useDispatch();


    const onFinish = values => {
        dispatch(addEcheance({
            ...values,
            fin: DateUtil.Format(values.fin),
            debut: DateUtil.Format(values.debut),

        }))
        form.resetFields()
    };


    return (<Form
        form={form}
        name="advanced_search"
        className="ant-advanced-search-form"
        onFinish={onFinish}
    >
        <Row gutter={24}>
            <Col span={24} key={"debutPeriode"}>
                <Form.Item
                    rules={[
                        {
                            required: true,
                            message: 'Champ obligatoire!',
                        },
                    ]}
                    name="debut"
                    label={`Date début`}
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
                    rules={[
                        {
                            required: true,
                            message: 'Champ obligatoire!',
                        },
                    ]}
                    name="fin"
                    label={`Echéance`}
                >
                    <DatePicker
                        name="fin"
                        //  onChangeDate={d => setFinPeriode(d.value)}
                        // value={finPeriode}
                        width={'100%'}></DatePicker>
                </Form.Item>
            </Col>
            <Col span={24} key={"quantite"}>
                <Form.Item
                    name="montant"
                    rules={[
                        {
                            required: true,
                            message: 'Champ obligatoire!',
                        },
                    ]}
                    label={`Limit(en MAD)`}

                >
                    <NumberFormat
                        //    value={quantite}
                        customInput={Input}
                        // style={{width: '162px'}}
                        // value={this.state.montant}
                        //  onChange={(e) => setQuantite(parseFloat(e.target.value.replace(/ /g, "")))}
                        required={true}
                        thousandSeparator={" "}
                        decimalSeparator={"."}/>
                </Form.Item>
            </Col>
        </Row>

    </Form>)
}