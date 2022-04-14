import React, {useEffect, useState} from "react";
import {Checkbox, Col, Divider, Form, Input, Row, Select} from "antd";
import NumberFormat from "react-number-format";
import {optionsFrequence} from "../../../uielements/option/OptionUtil";
import {FREQUENCE_LIST} from "../../../../config/DATA/FrequenceList";
import DatePicker from "../../../uielements/DatePick";
import {DateUtil} from "../../../../helpers/Utils";

export function DetailFees({referencesList, selectedRow, onFinish, onChange, form}) {

   useEffect(function () {
        if (selectedRow) {
            form.setFieldsValue({
                sousJacentId: selectedRow.sousJacent.sousJacentId,
                ...selectedRow,

            })
        } else
            form.resetFields()
    }, [selectedRow])

    function optionsSousJacent() {
        if (referencesList && referencesList.sousjacents)
            return referencesList.sousjacents.map(d => <Select.Option value={d.sousJacentId}
                                                                 key={d.sousJacentId}>{d.shortName }</Select.Option>);
    }


    function maturityDateInput_changeHandler(event) {
        kondorReference();
    }

    function kondorReference() {
        if (selectedRow)
            if (!selectedRow.feesId && (form.getFieldValue('sousJacentId'))) {
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
        className="ant-detail-fees-form"
        onFinish={onFinish}
        //onValuesChange={onChange}
        onChange={onChange}
    >
        <Row gutter={[12, 0]}>
            <Col span={24}>
                <Form.Item
                    colon={false}
                    name={`sousJacentId`}
                    label={`Sous-jacent`}
                    rules={[
                        {
                            required: true,
                            message: 'Champ obligatoire!',
                        },
                    ]}
                >
                    <Select
                        showSearch
                        filterOption={(input, option) =>
                            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                        // defaultValue={deal.fees.feesId}
                        onChange={sousJacentCombo_changeHandler}
                        allowClear
                        // style={{width: '120px'}}
                    >

                        { optionsSousJacent()}
                    </Select>
                </Form.Item>


                <Form.Item
                    colon={false}
                    name={`maturity`}
                    label={`Maturité (En Nbr jours)`}

                    rules={[
                        {
                            required: true,
                            message: 'Champ obligatoire!',
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

                        thousandSeparator={" "}
                        decimalSeparator={"."}/>


                </Form.Item>
                <Form.Item
                    colon={false}
                    name={`fee`}
                    label={`Fees`}

                    rules={[
                        {
                            required: true,
                            message: 'Champ obligatoire!',
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

                        thousandSeparator={" "}
                        decimalSeparator={"."}/>


                </Form.Item>



            </Col>

        </Row>
    </Form>
}