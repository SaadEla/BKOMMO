import React, {useEffect, useState} from "react";
import {Checkbox, Col, Divider, Form, Input, Row, Select} from "antd";
import NumberFormat from "react-number-format";
import {optionsFrequence} from "../../../uielements/option/OptionUtil";
import {FREQUENCE_LIST} from "../../../../config/DATA/FrequenceList";

export function DetailSousJacent({referencesList, selectedRow, onFinish, onChange, form}) {

    const [showCents, setShowCents] = useState(false);
    const [checkCents, setCheckCents] = useState(false);
    useEffect(function () {
        if (selectedRow) {
            form.setFieldsValue({
                marketId: selectedRow.market.marketId,
                deviseId: selectedRow.devise.shortName,
                uniteId: selectedRow.unite.uniteId,
                ...selectedRow,

            })
            setCheckCents(selectedRow.coefPrix == 1)
            //  setShowCents(selectedRow.);
            setShowCents('USD' == selectedRow.devise.shortName)
        } else
            form.resetFields()
    }, [selectedRow])

    function optionsMarkets() {
        if (referencesList && referencesList.markets)
            return referencesList.markets.map(d => <Select.Option value={d.marketId}
                                                                  key={d.marketId}>{d.shortName}</Select.Option>);
    }

    function optionsDevises() {
        if (referencesList && referencesList.devises)
            return referencesList.devises.map(d => <Select.Option value={d.shortName}
                                                                  key={d.shortName}>{d.shortName}</Select.Option>);
    }

    function optionsUnites() {
        if (referencesList && referencesList.unites)
            return referencesList.unites.map(d => <Select.Option value={d.uniteId}
                                                                 key={d.uniteId}>{d.shortName + " - " + d.name}</Select.Option>);
    }

    function onDeviseChange(e) {
        setShowCents('USD' == e)
    }

    function onChangeCents() {
        //  setCheckCents(!checkCents)
        /*  form.setFieldsValue({
              coefPrix:checkCents?1:0
          })*/
    }

    function nameInput_focusOutHandler(event) {
        if (!(selectedRow && selectedRow.sousJacentId)) {
            form.setFieldsValue(
                {
                    futureShortName: form.getFieldValue('shortName'),
                    futureName: form.getFieldValue('name'),
                    indexShortName: form.getFieldValue('shortName'),
                    indexName: form.getFieldValue('name'),
                }
            )
        }
    }

    return <Form
        form={form}
        name="advanced_search"
        className="ant-detail-sousJacent-form"
        onFinish={onFinish}
        //onValuesChange={onChange}
        onChange={onChange}
    >
        <Row gutter={[12, 0]}>
            <Col span={24}>
                <Form.Item
                    colon={false}
                    name={`name`}
                    label={`Sous-jacent`}
                    rules={[
                        {
                            required: true,
                            message: 'Champ obligatoire!',
                        },
                    ]}
                >
                    <Input
                        onBlur={nameInput_focusOutHandler}
                    ></Input>

                </Form.Item>
                <Form.Item
                    colon={false}
                    name={`shortName`}
                    label={`Sous-jacent (Short name)`}
                    rules={[
                        {
                            required: true,
                            message: 'Champ obligatoire!',
                        },
                    ]}
                >
                    <Input
                        onBlur={nameInput_focusOutHandler}
                    ></Input>

                </Form.Item>
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
                        showSearch
                        filterOption={(input, option) =>
                            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                        // defaultValue={deal.sousJacent.sousJacentId}
                        //onChange={e=>handleOptionSearchModel({sousJacentId:e})}
                        allowClear
                        // style={{width: '120px'}}
                    >
                        {optionsMarkets()}

                    </Select>

                </Form.Item>

                <Form.Item
                    rules={[
                        {
                            required: true,
                            message: 'Champ obligatoire!',
                        },
                    ]}
                    colon={false} label="Devise" style={{marginBottom: 0}}>
                    <Form.Item
                        rules={[
                            {
                                required: true,
                                message: 'Champ obligatoire!',
                            },
                        ]}
                        name={"deviseId"}
                        style={{display: 'inline-block', width: 'calc(60% - 12px)'}}
                    >
                        <Select
                            showSearch
                            filterOption={(input, option) =>
                                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }
                            // defaultValue={deal.sousJacent.sousJacentId}
                            onChange={e => onDeviseChange(e)}
                            allowClear
                            // style={{width: '120px'}}
                        >

                            {optionsDevises()}

                        </Select>
                    </Form.Item>
                    <span
                        style={{display: 'inline-block', width: '24px', lineHeight: '32px', textAlign: 'center'}}
                    >

                  </span>


                    {
                        showCents &&
                        <Form.Item

                            name={"cents"} style={{display: 'inline-block', width: 'calc(40% - 12px)'}}>
                            <Checkbox
                                onChange={onChangeCents}
                                checked={checkCents}>Cents</Checkbox>
                        </Form.Item>
                    }


                </Form.Item>
                <Form.Item

                    colon={false}
                    name={`uniteId`}
                    label={`Unite de mesure`}

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
                        // defaultValue={deal.sousJacent.sousJacentId}
                        //onChange={e=>handleOptionSearchModel({sousJacentId:e})}
                        allowClear
                        // style={{width: '120px'}}
                    >
                        {optionsUnites()}
                    </Select>

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
                        style={{display: 'inline-block', width: 'calc(70% - 12px)'}}>
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