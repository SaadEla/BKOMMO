import React, {useEffect, useState} from "react";
import {Checkbox, Col, Divider, Form, Input, Radio, Row, Select} from "antd";
import GridDetail from "./GridDetail";
import RadioBox from "../../../uielements/radio";

export default function DetailLimitSetup({detail, referencesList, selectedRow, onFinish, onChange, form}) {

    useEffect(function () {
        console.log("detaildetail", detail)
       // if (detail) {
            form.setFieldsValue({
                tiersId: detail.tiers && detail.tiers.tiersId,
                ...detail,
            })
       // } else
            //form.resetFields()
    }, [detail])

    function optionsContrePartie() {
        if (referencesList && referencesList.counterparties)
            return referencesList.counterparties
                .map(d => <Select.Option value={d.tiersId}
                                         key={d.tiersId}>{tiersLabelFunction(d)}</Select.Option>);
    }

    function tiersLabelFunction(item) {
        if (item == null) return "";
        if (item.tiersId == null) return item.shortName
        else return item.shortName + " - " + item.name;
    }


    return <>
        <Form
            form={form}
            name="advanced_search"
            className="ant-detail-limitSetup-form"
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
                            onChange={onChange}
                            showSearch
                            filterOption={(input, option) =>
                                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }
                            // defaultValue={deal.limitSetup.limitSetupId}
                            allowClear

                            style={{width: '250px'}}
                        >

                            {optionsContrePartie()}
                        </Select>
                    </Form.Item>


                    <Form.Item
                        colon={false}
                        name={`type`}
                        label={`Type de limit`}
                        rules={[
                            {
                                required: true,
                                message: 'Champ obligatoire!',
                            },
                        ]}
                    >
                        <Radio.Group
                            //onChange={e => onRadioBrokercontrepartieChange(e.target.value)}
                            // value={typeTiers}
                        >
                            <RadioBox value="F">Fixe</RadioBox>
                            <RadioBox value="R">Revolving</RadioBox>
                        </Radio.Group>
                    </Form.Item>
                </Col>
            </Row>
        </Form>
        <GridDetail limitDetails={detail.limitDetails}></GridDetail>

    </>

}