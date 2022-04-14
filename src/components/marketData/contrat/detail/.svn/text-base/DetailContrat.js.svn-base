import React, {useEffect, useState} from "react";
import {Checkbox, Col, Divider, Form, Input, Row, Select} from "antd";
import NumberFormat from "react-number-format";
import {optionsFrequence} from "../../../uielements/option/OptionUtil";
import {FREQUENCE_LIST} from "../../../../config/DATA/FrequenceList";
import DatePicker from "../../../uielements/DatePick";
import {DateUtil} from "../../../../helpers/Utils";

export function DetailContrat({referencesList, selectedRow, onFinish, onChange, form}) {

    useEffect(function () {
        if (selectedRow) {
            form.setFieldsValue({
                futureShortName: selectedRow.sousJacent && selectedRow.sousJacent.futureShortName,
                futureName: selectedRow.sousJacent && selectedRow.sousJacent.futureName,
                sousJacentId: selectedRow.sousJacent && selectedRow.sousJacent.sousJacentId,
                ...selectedRow,
                maturity: typeof selectedRow.maturity == "string" ? DateUtil.parseDate(selectedRow.maturity, "DD/MM/YYYY") : selectedRow.maturity
            })
        } else
            form.resetFields()
    }, [selectedRow])

    function optionsSousJacent() {
        if (referencesList && referencesList.sousjacents)
            return referencesList.sousjacents.map(d => <Select.Option value={d.sousJacentId}
                                                                      key={d.sousJacentId}>{d.shortName}</Select.Option>);
    }


    function maturityDateInput_changeHandler(event) {
        kondorReference();
    }

    function kondorReference() {
        if (selectedRow)
            if (!selectedRow.contratId && (form.getFieldValue('sousJacentId'))) {
                /* futureShortNameInput.text = sousJacentCombo.selectedItem.futureShortName;
                futureNameInput.text = sousJacentCombo.selectedItem.futureName; */

                if ((form.getFieldValue('maturity'))) {
                    var d = DateUtil.parseDate(form.getFieldValue('maturity'));
                    var y = String(d.getFullYear()).substr(2);
                    var maturiteRef = DateUtil.months[d.getMonth()] + y;
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
        className="ant-detail-contrat-form"
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
                        // defaultValue={deal.contrat.contratId}
                        onChange={sousJacentCombo_changeHandler}
                        allowClear
                        // style={{width: '120px'}}
                    >

                        {optionsSousJacent()}
                    </Select>
                </Form.Item>

                <Form.Item
                    colon={false}
                    name={`code`}
                    label={`RIC`}
                    rules={[
                        {
                            required: true,
                            message: 'Champ obligatoire!',
                        },
                    ]}
                >
                    <Input></Input>

                </Form.Item>
                <Form.Item
                    colon={false}
                    name={`maturity`}
                    label={`Maturity date`}
                    rules={[
                        {
                            required: true,
                            message: 'Champ obligatoire!',
                        },
                    ]}
                >
                    <DatePicker
                        width={'100%'}
                        onBlur={maturityDateInput_changeHandler}
                    >

                    </DatePicker>

                </Form.Item>
                <Form.Item
                    colon={false}
                    name={`quantiteUnitaire`}
                    label={`Quantité`}
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
                    name={`commissionForward`}
                    label={`Commission BMCE(Forward)`}

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

                <Divider
                    style={{
                        "fontSize": "14px",
                        "color": "rgba(19,105,180,0.9)",
                        "fontWeight": "initial"
                    }}
                    orientation="left">Kondor Références</Divider>
                <Form.Item

                    colon={false} label="Future" style={{marginBottom: 0}}>
                    <Form.Item

                        name={"futureShortName"}
                        style={{display: 'inline-block', width: 'calc(30% - 12px)'}}
                    >
                        <Input
                            onKeyDown={(e) => e.keyCode == 13 ? form.submit() : ''}
                        ></Input>
                    </Form.Item>
                    <span
                        style={{display: 'inline-block', width: '24px', lineHeight: '32px', textAlign: 'center'}}
                    >
                    -
                  </span>
                    <Form.Item

                        name={"futureName"}
                        style={{display: 'inline-block', width: 'calc(40% - 12px)'}}>
                        <Input

                            onKeyDown={(e) => e.keyCode == 13 ? form.submit() : ''}
                        ></Input>
                    </Form.Item>

                    <span
                        style={{display: 'inline-block', width: '24px', lineHeight: '32px', textAlign: 'center'}}
                    >
                    -
                  </span>
                    <Form.Item

                        name={"maturityRef"}
                        style={{display: 'inline-block', width: 'calc(25% - 12px)'}}>
                        <Input

                            onKeyDown={(e) => e.keyCode == 13 ? form.submit() : ''}
                        ></Input>
                    </Form.Item>
                </Form.Item>
                <Form.Item colon={false} label="Basket Index" style={{marginBottom: 0}}>
                    <Form.Item


                        name={"indexShortName"}
                        style={{display: 'inline-block', width: 'calc(30% - 12px)'}}
                    >
                        <Input
                            onKeyDown={(e) => e.keyCode == 13 ? form.submit() : ''}
                        ></Input>
                    </Form.Item>
                    <span
                        style={{display: 'inline-block', width: '24px', lineHeight: '32px', textAlign: 'center'}}
                    >
        -
      </span>
                    <Form.Item

                        name={"indexName"}
                        style={{display: 'inline-block', width: 'calc(70% - 12px)'}}>
                        <Input
                            onKeyDown={(e) => e.keyCode == 13 ? form.submit() : ''}
                        ></Input>
                    </Form.Item>


                </Form.Item>


            </Col>

        </Row>
    </Form>
}