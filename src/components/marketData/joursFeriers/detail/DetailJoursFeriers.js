import React, {useEffect, useState} from "react";
import {Checkbox, Col, Divider, Form, Input, Row, Select} from "antd";
import NumberFormat from "react-number-format";
import {optionsFrequence} from "../../../uielements/option/OptionUtil";
import {FREQUENCE_LIST} from "../../../../config/DATA/FrequenceList";
import DatePicker from "../../../uielements/DatePick";
import {DateUtil} from "../../../../helpers/Utils";

export function DetailJoursFeriers({referencesList, selectedRow, onFinish, onChange, form}) {


   useEffect(function () {
        if (selectedRow) {
            form.setFieldsValue({
              //  sousJacentId: selectedRow.sousJacent.sousJacentId,
                ...selectedRow,
            })
        } else
            form.resetFields()
    }, [selectedRow])

    function optionsMarkets() {
        if (referencesList && referencesList.markets)
            return referencesList.markets.map(d => <Select.Option value={d.marketId} key={d.marketId}>{d.shortName }</Select.Option>);
    }


    function maturityDateInput_changeHandler(event) {
        kondorReference();
    }

    function kondorReference() {
        if (selectedRow)
            if (!selectedRow.joursFeriersId && (form.getFieldValue('sousJacentId'))) {
                /* futureShortNameInput.text = sousJacentCombo.selectedItem.futureShortName;
                futureNameInput.text = sousJacentCombo.selectedItem.futureName; */

                if ((form.getFieldValue('maturityDate')) && (form.getFieldValue('maturityDate'))) {
                    var d = DateUtil.parseDate(form.getFieldValue('maturityDate'));
                    var y = String(d.getFullYear()).substr(2);
                    var maturiteRef = DateUtil.months[d.month] + y;
                    form.setFieldsValue({
                        maturityRef: maturiteRef,
                        indexShortName: selectedRow.sousJacent.indexShortName + maturiteRef,
                        indexName: selectedRow.sousJacent.indexName + maturiteRef,
                    })
                    /*   Input.text = ;
                       indexShortNameInput.text = sousJacentCombo.selectedItem.indexShortName+maturiteRef;
                       indexNameInput.text = sousJacentCombo.selectedItem.indexName+maturiteRef;*/
                }
            }
    }

    function sousJacentCombo_changeHandler(event) {
        kondorReference();
    }

    return <Form
        form={form}
        name="advanced_search"
        className="ant-detail-joursFeriers-form"
        onFinish={onFinish}
        //onValuesChange={onChange}
        onChange={onChange}
    >
        <Row gutter={[12, 0]}>
            <Col span={24}>
                <Form.Item
                    colon={false}
                    name={`marketId`}
                    label={`Market`}
                    rules={[
                        {
                            required: true,
                            message: 'Champ obligatoire!',
                        },
                    ]}
                >
                    <Select
                        // defaultValue={deal.joursFeriers.joursFeriersId}
                        onChange={sousJacentCombo_changeHandler}
                        allowClear
                        // style={{width: '120px'}}
                    >

                        { optionsMarkets()}
                    </Select>
                </Form.Item>
                <Form.Item
                    colon={false}
                    name={`jour`}
                    label={`Date`}
                    rules={[
                        {
                            required: true,
                            message: 'Champ obligatoire!',
                        },
                    ]}
                >
                   <DatePicker
                       width={"100%"}
                       ></DatePicker>
                </Form.Item>
                <Form.Item
                    colon={false}
                    name={`commentaire`}
                    label={`Commentaire`}

                    rules={[
                        {
                            required: true,
                            message: 'Champ obligatoire!',
                        },
                    ]}
                >
                   <Input/>
                </Form.Item>
                <Form.Item
                    colon={false}
                    name={`recurrent`}
                    label={`Réccurent`}
                    valuePropName="checked"
                >
                  <Checkbox />
                </Form.Item>
            </Col>
        </Row>
    </Form>
}