import React, {useEffect, useState} from "react";
import {Button, Col, Form, Input, Row, Select} from "antd";

import NumberFormat from "react-number-format";
import {useDispatch, useSelector} from "react-redux";
import "./NotationFinanciereEcheance.scss"
import {NotationFinanciereSelectedRowNotationSelector} from "../../../../redux/GestionDeLimite/notationFinanciere/Selectors";
import {editOrSavePramNotationFinanciereAPI} from "../../../../redux/GestionDeLimite/notationFinanciere/RestCall";

export function NotationFinanciereEcheance({form, add, update, echeance, flagUpdate = true, hideModal}) {

    const dispatch = useDispatch();
    const selectedID = useSelector(NotationFinanciereSelectedRowNotationSelector);

    useEffect(function () {
        if (selectedID)
            form.setFieldsValue({
                ...selectedID
            })
        else
            form.resetFields()
    }, [selectedID])

    const onFinish = values => {
        let param = {};
        if(selectedID && selectedID.id)
        param.id = selectedID.id;
        param.libelle = form.getFieldValue('libelle');
        param.poids = parseFloat(String(form.getFieldValue('poids')).replace(/ /g, ""));
        dispatch(editOrSavePramNotationFinanciereAPI(param))
    };


    return (<Form
        form={form}
        name="advanced_search"
        className="ant-notation-financiere-echeance-form"
        onFinish={onFinish}
    >
        <Row gutter={24}>
            <Col span={24} key={"libelle"}>
                <Form.Item
                    rules={[
                        {
                            required: true,
                            message: 'Champ obligatoire!',
                        },
                    ]}
                    name="libelle"
                    label={`Libelle Notation`}
                >
                    <Input
                        //    value={quantite}
                        //  customInput={Input}
                        // style={{width: '162px'}}
                        // value={this.state.montant}
                        //  onChange={(e) => setQuantite(parseFloat(e.target.value.replace(/ /g, "")))}
                        //required={true}
                        // thousandSeparator={" "}
                        // decimalSeparator={"."}
                    />
                </Form.Item>
            </Col>
            <Col span={24} key={"poids"}>
                <Form.Item
                    rules={[
                        {
                            required: true,
                            message: 'Champ obligatoire!',
                        },
                    ]}
                    name="poids"
                    label={`Pondération% (Consommation de limite)`}
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