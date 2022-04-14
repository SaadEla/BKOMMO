import React, {useEffect} from "react";
import {Col, Form, Radio, Row, Select} from "antd";
import RadioBox from "../../../uielements/radio";
import DatePicker from "../../../uielements/DatePick";
import {DateUtil} from "../../../../helpers/Utils";

export default function AjouterNotationFinanciere({
                                                      notationFinanciereRef,
                                                      detail,
                                                      onChange,
                                                      referencesList,
                                                      onFinish,
                                                      selectedRow,
                                                      form
                                                  }) {
    /*
       dateEffet: "01/01/2018"
    id: 21
    loading: false
    notation:
    id: 41
    libelle: "B-"
    poids: 150
    __proto__: Object
    tiers: {contact: null, tiersId: 34785, name: "COMMERZBANK", futureFolder: null, shortName: "COMERZBANK", …}
    __proto__: Object
    ﻿
    ​
        */
    useEffect(function () {

        console.log(detail)
        if (detail && detail.notation)
            form.setFieldsValue({
                notationId: detail.notation.id,
                tiersId: detail.tiers.tiersId,
                dateEffet: detail.dateEffet && DateUtil.parseDate(detail.dateEffet, "DD/MM/YYYY")
            })
        else
            form.resetFields()

    }, [detail])

    function tiersLabelFunction(item) {
        if (item == null) return "";
        if (item.tiersId == null) return item.shortName
        else return item.shortName + " - " + item.name;
    }

    function tiersOprions() {
        if (notationFinanciereRef && notationFinanciereRef.counterparties) {
            return notationFinanciereRef.counterparties.map(item => {
                return (
                    <Select.Option value={item.tiersId} key={item.tiersId}>
                        {tiersLabelFunction(item)}
                    </Select.Option>
                )
            })
        }
    }

    function notationsOprions() {
        if (notationFinanciereRef && notationFinanciereRef.notations) {
            return notationFinanciereRef.notations.map(item => {
                return (
                    <Select.Option value={item.id} key={item.id}>
                        {item.libelle}
                    </Select.Option>
                )
            })
        }
    }

    return (
        <Form
            form={form}
            name="advanced_search"
            className="ant-detail-notationFinanciere-form"
            onFinish={onFinish}
            //onValuesChange={onChange}
            onChange={onChange}
        >
            <Row gutter={[12, 0]}>
                <Col span={24}>
                    <Form.Item
                        colon={false}
                        name={`tiersId`}
                        label={`Contrepartie`}
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
                            // defaultValue={deal.notationFinanciere.notationFinanciereId}
                            allowClear

                            style={{width: '100%'}}
                        >

                            {
                                tiersOprions()
                            }

                        </Select>
                    </Form.Item>


                    <Form.Item
                        colon={false}
                        name={`dateEffet`}
                        label={`Date Effet`}
                        rules={[
                            {
                                required: true,
                                message: 'Champ obligatoire!',
                            },
                        ]}
                    >
                        <DatePicker
                            width={'100%'}
                            //  onChangeDate={e=>handleForwardSearchModel({maxTradeDate:DateUtil.Format(e.value)})}
                        />
                    </Form.Item>

                    <Form.Item
                        colon={false}
                        name={`notationId`}
                        label={`Notation`}
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
                            // defaultValue={deal.notationFinanciere.notationFinanciereId}
                            allowClear

                            style={{width: '100%'}}
                        >

                            {
                                notationsOprions()
                            }
                        </Select>
                    </Form.Item>
                </Col>
            </Row>
        </Form>
    )
}