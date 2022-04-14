import React, {useEffect} from "react";
import {Col, Form, Input, Row} from "antd";

export function DetailTiers({selectedRow, onFinish,onChangeEcheance,form}) {

    useEffect(function () {
        form.setFieldsValue({
            ...selectedRow
        })
    }, [selectedRow])

    return <Form
        form={form}
        name="advanced_search"
        className="ant-detail-tiers-form"
        onFinish={onFinish}
        onValuesChange={onChangeEcheance}
    >
        <Row gutter={[12, 0]}>
            <Col span={24}>
                <Form.Item
                    className={"detaildata"}
                    colon={false}
                    name={`name`}
                    label={`Contrepartie (name)`}

                >
                    <Input disabled={true} ></Input>

                </Form.Item>
                <Form.Item
                    className={"detaildata"}
                    colon={false}
                    name={`shortName`}
                    label={`Contrepartie (Short name)`}

                >
                    <Input disabled={true} ></Input>

                </Form.Item>
                <Form.Item
                    className={"detaildata"}
                    colon={false}
                    name={`type`}
                    label={`Type`}

                >
                    <Input disabled={true} ></Input>

                </Form.Item>
                <Form.Item
                    colon={false}
                    name={`futureFolder`}
                    label={`Folder Short name(Future)`}

                    rules={[
                        {
                            required: true,
                            message: 'Champ obligatoire!',
                        },
                    ]}
                >
                    <Input
                        onKeyDown={(e)=> e.keyCode == 13 ? form.submit(): ''}
                    ></Input>

                </Form.Item>
            </Col>
            <Col span={12}>

            </Col>
        </Row>
    </Form>
}