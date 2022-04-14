import React, {useEffect} from "react";
import {Checkbox, Col, Row, Select} from "antd";
import {Form, Input, Button} from 'antd';
import {optionsContrePartie, optionsFrequence, optionsSousjacents, optionsStatuts} from "../SwapUtil";
import DatePicker from "../../DatePick";
import RadioBox, {RadioGroup} from "../../radio";
import NumberFormat from 'react-number-format';
import './DealSwapForm.scss'
import {useSelector} from "react-redux";
import {
    dealSwapDealSelector,
    dealSwapSuffixMontantGlobalSelector, dealSwapSuffixPrixSelector
} from "../../../../redux/dealCapture/selectors/selectors";


let suffixMontantGlobal = ""
let suffixPrix = ""

function CustomInputPrix(props) {
    return <Input {...props} suffix={suffixPrix}></Input>
}

function CustomInputMontantGlobal(props) {
    return <Input {...props} suffix={suffixMontantGlobal}></Input>
}

export function DealSwapForm({form,onChange, references}) {

    const deal = useSelector(dealSwapDealSelector);
    suffixMontantGlobal = useSelector(dealSwapSuffixMontantGlobalSelector);
    suffixPrix = useSelector(dealSwapSuffixPrixSelector);

    useEffect(function () {
            form.setFieldsValue({
                tiersId: deal.contrepartie.tiersId,
                statutId: deal.statut.libelle,
                sousJacentId: deal.sousJacent.sousJacentId,
                tradeDate: deal.tradeDate,
                valueDate: deal.valueDate,
                maturityDate: deal.maturityDate,
                quantite: deal.quantite,
                prixFixe: deal.prixFixe,
                montantGlobal: calculMontantGlobal(),
                frequence: deal.frequence,
                sens: deal.sens,
            })

    }, [deal])


    const onFinish = values => {
        console.log('Received values of form: ', values);
    };
    const onChangeEcheance = values => {
        console.log("changessssssss", values)
        onChange(form.getFieldValue())
    };

    function calculMontantGlobal() {
        return deal.prixFixe * deal.quantite * deal.sousJacent.coefPrix;
    }


    return (<Form
            form={form}
            name="advanced_search"
            className="ant-deal-swap-form"
            onFinish={onFinish}
            onValuesChange={onChangeEcheance}
        >
            <Row gutter={24}>
                <Col span={13} key={"contrepartie"} >
                    <Form.Item
                        className={'form-left-part'}
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
                        <Select allowClear
                                showSearch
                                filterOption={(input, option) =>
                                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                            // defaultValue={deal.contrepartie.tiersId}
                                onChange={e => console.log(e)}
                                style={{maxWidth: '100%'}}
                        >
                            {optionsContrePartie(references)}
                        </Select>
                    </Form.Item>
                </Col>
                <Col span={11} key={`quantite`}>
                    <Form.Item

                        colon={false}
                        name={`quantite`}
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
                            required={true}
                            thousandSeparator={" "}
                            decimalSeparator={"."}/>
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={24}>
                <Col span={13} key={`sousJacent`}>
                    <Form.Item
                        className={'form-left-part'}
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
                            // defaultValue={deal.sousJacent.sousJacentId}
                            //onChange={e=>handleSwapSearchModel({sousJacentId:e})}
                            allowClear
                            // style={{width: '120px'}}
                        >
                            {optionsSousjacents(references)}
                        </Select>
                    </Form.Item>
                </Col>
                <Col span={11} key={`prix`}>
                    <Form.Item

                        colon={false}
                        name={`prixFixe`}
                        label={`Prix`}
                        rules={[
                            {
                                required: true,
                                message: 'Champ obligatoire!',
                            },
                        ]}
                    >
                        <NumberFormat
                            customInput={CustomInputPrix}
                            // style={{width: '162px'}}
                            //  name="montant"
                            //defaultValue={deal.prixFixe}
                            //onChange={(e)=>this.setState( {montant:parseFloat(e.target.value.replace(/ /g,"")) } )}
                            required={true}
                            thousandSeparator={" "}
                            decimalSeparator={"."}/>
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={24}>
                <Col span={13} key={`tradeDate`}>
                    <Form.Item
                        className={'form-left-part'}
                        colon={false}
                        name={`tradeDate`}
                        label={`Trade date`}
                        rules={[
                            {
                                required: true,
                                message: 'Champ obligatoire!',
                            },
                        ]}
                    >
                        <DatePicker
                            // defaultValue={DateUtil.ToJsDate(deal.tradeDate)}
                            width={'100%'}></DatePicker>
                    </Form.Item>
                </Col>
                <Col span={11} key={`montantGlobal`}>
                    <Form.Item

                        className={"newcalcule"}
                        colon={false}
                        name={`montantGlobal`}
                        label={`Montant global`}
                    >
                        <NumberFormat

                            //defaultValue={calculMontantGlobal()}
                            customInput={CustomInputMontantGlobal}
                            // style={{width: '162px'}}
                            //  name="montant"
                            // value={this.state.montant}
                            //onChange={(e)=>this.setState( {montant:parseFloat(e.target.value.replace(/ /g,"")) } )}
                            disabled={true}
                            thousandSeparator={" "}
                            decimalSeparator={"."}/>
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={24}>
                <Col span={13} key={`valueDate`}>
                    <Form.Item
                        className={'form-left-part'}
                        colon={false}
                        name={`valueDate`}
                        label={`Value date`}
                        rules={[
                            {
                                required: true,
                                message: 'Champ obligatoire!',
                            },
                        ]}
                    >
                        <DatePicker
                            //defaultValue={DateUtil.ToJsDate(deal.valueDate)}
                            width={'100%'}></DatePicker>
                    </Form.Item>
                </Col>
                <Col span={11} key={`frequence`}>
                    <Form.Item

                        colon={false}
                        name={`frequence`}
                        label={`Fréquence`}
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
                            //onChange={e=>handleSwapSearchModel({statutId:e})}
                            allowClear
                            //  defaultValue={deal.frequence}
                            //  style={{width: '150px'}}
                        >
                            {optionsFrequence()}
                        </Select>
                    </Form.Item>
                </Col>
            </Row>

            <Row gutter={24}>
                <Col span={13} key={`maturityDate`}>
                    <Form.Item
                        className={'form-left-part'}
                        colon={false}
                        name={`maturityDate`}
                        label={`Maturity date`}
                        rules={[
                            {
                                required: true,
                                message: 'Champ obligatoire!',
                            },
                        ]}
                    >
                        <DatePicker
                            // defaultValue={DateUtil.ToJsDate(deal.maturityDate)}
                            width={'100%'}></DatePicker>
                    </Form.Item>
                </Col>
                <Col span={11} key={`BMCEPaie`}>
                    <Form.Item
                        colon={false}
                        name={`sens`}
                        label={`BMCE paie`}
                        rules={[
                            {
                                required: true,
                                message: 'Champ obligatoire!',
                            },
                        ]}
                    >
                        <RadioGroup
                            //  defaultValue={deal.sens}
                        >
                            <RadioBox value={1}>Fixe</RadioBox>
                            <RadioBox value={-1}>Variable</RadioBox>
                        </RadioGroup>

                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={24}>
                <Col span={13}></Col>
                {
                    deal.dealId &&
                    <Col span={11} key={`statut`}>
                        <Form.Item
                            className={"detailstatus"}
                            colon={false}
                            name={`statutId`}
                            label={`Statut`}
                        >
                            <Input disabled={true}></Input>
                        </Form.Item>
                    </Col>
                }

            </Row>
        </Form>
    )
}
