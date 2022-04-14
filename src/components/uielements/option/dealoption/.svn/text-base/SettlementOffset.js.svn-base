import React from "react";
import {Button, Col, Form, Input, Row, Tag} from "antd";
import NumberFormat from "react-number-format";
import {ClockCircleOutlined} from "@ant-design/icons";

export function SettlementOffset({form,onFinish}) {


    return <Form
        form={form}
        name="advanced_search"
        className="ant-deal-option-form"
        onFinish={onFinish}
    > <Row>
        <Col span={24}>
            <Form.Item

                colon={false}
                name={`settlementDateOffset`}
                label={'Settlement date offset'}
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
                    required={true}
                    thousandSeparator={" "}
                    decimalSeparator={"."}/>

            </Form.Item>
        </Col>

        <Col span={24}>
            <Tag style={{
                float: 'right',
                margin: 0
            }} icon={<ClockCircleOutlined/>} color="default">
                Nombre de jours ouvrables après la date d'échéance
            </Tag>
        </Col>
    </Row>

    </Form>
}