import React, {useEffect, useState} from "react";
import {Checkbox, Col, Row, Select} from "antd";
import {Form, Input, Button} from 'antd';
import {
    getContrat,
    getSousjacent, optionsBroker, optionsContrat,
    optionsContrats,
    optionsContrePartie,
    optionsFrequence,
    optionsSousjacents,
    optionsStatuts
} from "../FutureUtil";
import DatePicker from "../../DatePick";
import RadioBox, {RadioGroup} from "../../radio";
import NumberFormat from 'react-number-format';
import './DealFutureForm.scss'
import {useDispatch, useSelector} from "react-redux";
import {
    dealFutureDealSelector,
    dealFutureSuffixMontantGlobalSelector, dealFutureSuffixPrixSelector, dealFutureUpdateFlagSelector
} from "../../../../redux/dealCapture/selectors/FutureSelectors";
import {DateUtil} from "../../../../helpers/Utils";
import {updateDealFutureEcheancier} from "../../../../redux/dealCapture/future/DealFutureSlice";


let suffixMontantGlobal = ""
let suffixPrix = ""

function CustomInputPrix(props) {
    return <Input {...props} suffix={suffixPrix}></Input>
}

function CustomInputMontantGlobal(props) {
    return <Input {...props} suffix={suffixMontantGlobal}></Input>
}

export function DealFutureForm({onFinish,onChange, references,form}) {

    const deal = useSelector(dealFutureDealSelector);
    suffixMontantGlobal = useSelector(dealFutureSuffixMontantGlobalSelector);
    suffixPrix = useSelector(dealFutureSuffixPrixSelector);
    const dealFutureUpdateFlag = useSelector(dealFutureUpdateFlagSelector);
    const [contratList, setContratList] = useState([])

    console.log("suffixPrix",suffixMontantGlobal,suffixPrix)
    useEffect(function () {
        const sousJacent = getSousjacent(references, deal.contrat && deal.contrat.sousJacent.sousJacentId) ;
        form.setFieldsValue({
            statut: deal.statut.libelle,
            tiersId: deal.broker.tiersId,
            contratId: deal.contrat.contratId,
          //  statutId: deal.statut.statcontratutId,
            sousJacentId: sousJacent && sousJacent.sousJacentId,
            tradeDate: deal.tradeDate,
            valueDate: deal.valueDate,
            maturityDate: deal.maturityDate,
            maturity: deal.contrat.maturity,
            quantite: deal.quantite,
            prix: deal.prix,
            montantGlobal: calculMontantGlobal(),
            commissionGlobal: calculcommissionGlobal(),
            commission: deal.commission,
            frequence: deal.frequence,
            sens: deal.sens,
            devise: sousJacent && sousJacent.devise.shortName + ((sousJacent.coefPrix == 1) ? "" : " - Cents"),
            market: sousJacent && sousJacent.market.shortName,
            unite: sousJacent && sousJacent.unite.shortName + "-" + sousJacent.unite.name,
            futureFolder:deal.broker.futureFolder?deal.broker.futureFolder:deal.folder//deal.folder//((deal && deal.folder)?deal.folder:deal.broker.futureFolder)
        })
        setContratList(references.contrats.filter(contratFilterFunnction(sousJacent && sousJacent.sousJacentId)))

    }, [deal])


    function calculcommissionGlobal() {

        if ((deal.commission) && (deal.quantite)) {
            let quantite = parseFloat(deal.quantite);
            let commission = parseFloat(deal.commission);
            let commissionGlobal = quantite * commission;
            return commissionGlobal;
        }

        return null;
    }


    const onChangeEcheance = values => {
        console.log("changessssssss", values)
        onChange(form.getFieldValue())
    };

    function calculMontantGlobal() {
        const contrat = getContrat(references, deal.contrat.contratId)
        if ((deal.prix) && (deal.quantite) && (deal.contrat.contratId != null)) {
            let prix = parseFloat(deal.prix);
            let quantite = parseFloat(deal.quantite);
            let quantiteUnitaire = parseFloat(deal.contrat.quantiteUnitaire);
            let coefPrix = contrat.sousJacent.coefPrix || 0;
            let mntGlobal = prix * quantite * quantiteUnitaire * coefPrix;
            return mntGlobal;
        }
        return null;

    }

    function handleSousJacentchange(sj) {
       // dispatch(updateDealFutureEcheancier({contrat: {sousJacent:{devise: {},market:{},unite:{}}}}))
        //form.setFieldsValue({contratId: null})
        setContratList(contratList.filter(contratFilterFunnction(sj)));
    }

    function contratFilterFunnction(selected) {
        return item => prepareContratFilterFunnction(item, selected);
    }

    function prepareContratFilterFunnction(item, selectedSousJacent) {
        let date = null;
        if (deal.tradeDate) {
            date = DateUtil.ToJsDate(deal.tradeDate);
        }
        let maturity = null;
        if ((item.maturity != null) && (item.maturity != "")) {
            maturity = DateUtil.ToJsDate(item.maturity);
        }

        if ((date != null) && (maturity != null) && (date.getTime() > maturity.getTime()))
            return false;

        if (!selectedSousJacent) return true;
        if (item.hasOwnProperty("contratId") && (item.contratId != null)) {
            return (item.sousJacent.sousJacentId == selectedSousJacent);
        }
        return true;
    }

    return (<Form
            form={form}
            name="advanced_search"
            className="ant-deal-future-form"
            onFinish={onFinish}
            onValuesChange={onChangeEcheance}
        >
            <Row gutter={[12, 0]}>
                <Col span={12}>
                    <Form.Item
                        colon={false}
                        name={`sens`}
                        label={`Sens`}
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
                            <RadioBox value={1}>Achat</RadioBox>
                            <RadioBox value={-1}>Vente</RadioBox>
                        </RadioGroup>

                    </Form.Item>
                    <Form.Item
                        colon={false}
                        name={`tiersId`}
                        label={`Broker`}
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
                                filterOption={(input, option) =>
                                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                            // defaultValue={deal.contrepartie.tiersId}
                                onChange={e => console.log(e)}
                                style={{maxWidth: '100%'}}
                        >
                            {optionsBroker(references)}
                        </Select>
                    </Form.Item>
                    {

                        form.getFieldValue("futureFolder") &&
                                    <Form.Item
                                        colon={false}
                                        name={`futureFolder`}
                                        label={`Folder`}
                                        className={"detaildata"}
                                    >
                                        <Input
                                            // defaultValue={deal.quantite}
                                            // customInput={Input}
                                            // style={{width: '162px'}}
                                            //  name="montant"
                                            // value={this.state.montant}
                                            //onChange={(e)=>this.setState( {montant:parseFloat(e.target.value.replace(/ /g,"")) } )}
                                            required={true}
                                            disabled={true}

                                        />
                                    </Form.Item>

                    }


                    <Form.Item
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
                            onChange={sj => handleSousJacentchange(sj)}
                            // defaultValue={deal.sousJacent.sousJacentId}
                            //onChange={e=>handleFutureSearchModel({sousJacentId:e})}
                            allowClear
                            // style={{width: '120px'}}
                        >
                            {optionsSousjacents(references)}
                        </Select>
                    </Form.Item>

                    <Form.Item

                        colon={false}
                        name={`contratId`}
                        label={`Contrat`}
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
                            disabled={form.getFieldValue("sousJacentId")?false:true}
                            //onChange={e=>handleFutureSearchModel({statutId:e})}
                            allowClear
                            //  defaultValue={deal.frequence}
                            //  style={{width: '150px'}}
                        >
                            {optionsContrat(contratList)}
                        </Select>
                    </Form.Item>

                    {
                        deal.contrat.contratId &&
                        (<>  <Row>
                            <Col span={12}>
                                <Form.Item
                                    className={"detaildata"}
                                    colon={false}
                                    name={`market`}
                                    label={`Marché`}
                                    rules={[
                                        {
                                            required: false,
                                            message: 'Champ obligatoire!',
                                        },
                                    ]}
                                >
                                    <Input disabled={true}></Input>


                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    className={"detaildata labelDevise"}
                                    colon={false}
                                    name={`devise`}
                                    label={`Devise`}
                                    rules={[
                                        {
                                            required: false,
                                            message: 'Champ obligatoire!',
                                        },
                                    ]}
                                >

                                    <Input disabled={true}></Input>
                                </Form.Item>
                            </Col>
                        </Row>
                        <Form.Item
                            className={"detaildata"}
                        colon={false}
                        name={`maturity`}
                        label={`Maturité`}
                        rules={[
                        {
                            required: false,
                            message: 'Champ obligatoire!',
                        },
                    ]}
                        >
                        <Input disabled={true}></Input>

                        </Form.Item>

                        <Form.Item
                            className={"detaildata"}
                        colon={false}
                        name={`unite`}
                        label={`Quantité unitaire`}
                        rules={[
                        {
                            required: false,
                            message: 'Champ obligatoire!',
                        },
                    ]}
                        >
                        <Input value={"USD"} disabled={true}></Input>

                        </Form.Item></>
                        )
                    }





                </Col>

                <Col span={12}>
                    <Form.Item
                        colon={false}
                        name={`quantite`}
                        label={`Nombre de contrats`}
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
                    <Form.Item
                        colon={false}
                        name={`prix`}
                        label={`Prix unitaire`}
                        rules={[
                            {
                                required: true,
                                message: 'Champ obligatoire!',
                            },
                        ]}
                    >
                        <NumberFormat
                            // defaultValue={deal.quantite}
                            customInput={CustomInputPrix}
                            // style={{width: '162px'}}
                            //  name="montant"
                            // value={this.state.montant}
                            //onChange={(e)=>this.setState( {montant:parseFloat(e.target.value.replace(/ /g,"")) } )}
                            required={true}
                            thousandSeparator={" "}
                            decimalSeparator={"."}/>
                    </Form.Item>
                    <Form.Item
                        colon={false}
                        name={`montantGlobal`}
                        label={`Montant global`}
                        className={"newcalcule"}
                    >
                        <NumberFormat

                            disabled={true}
                            // defaultValue={deal.quantite}
                            customInput={CustomInputMontantGlobal}
                            // style={{width: '162px'}}
                            //  name="montant"
                            // value={this.state.montant}
                            //onChange={(e)=>this.setState( {montant:parseFloat(e.target.value.replace(/ /g,"")) } )}
                            required={true}
                            thousandSeparator={" "}
                            decimalSeparator={"."}/>
                    </Form.Item>

                    <Form.Item
                        colon={false}
                        name={`commission`}
                        label={`Commission unitaire`}
                        rules={[
                            {
                                required: true,
                                message: 'Champ obligatoire!',
                            },
                        ]}
                    >
                        <NumberFormat
                            // defaultValue={deal.quantite}
                            customInput={CustomInputMontantGlobal}
                            // style={{width: '162px'}}
                            //  name="montant"
                            // value={this.state.montant}
                            //onChange={(e)=>this.setState( {montant:parseFloat(e.target.value.replace(/ /g,"")) } )}
                            required={true}
                            thousandSeparator={" "}
                            decimalSeparator={"."}/>
                    </Form.Item>

                    <Form.Item
                        colon={false}
                        name={`commissionGlobal`}
                        label={`Commission globale`}
                        className={"newcalcule"}

                    >
                        <NumberFormat
                            disabled={true}
                            // defaultValue={deal.quantite}
                            customInput={CustomInputMontantGlobal}
                            // style={{width: '162px'}}
                            //  name="montant"
                            // value={this.state.montant}
                            //onChange={(e)=>this.setState( {montant:parseFloat(e.target.value.replace(/ /g,"")) } )}
                            required={true}
                            thousandSeparator={" "}
                            decimalSeparator={"."}/>
                    </Form.Item>

                    {
                        dealFutureUpdateFlag &&
                        <Form.Item
                            className={"detailstatus"}
                            colon={false}
                            name={`statut`}
                            label={`Statut`}
                        >
                            <Input
                                // defaultValue={deal.quantite}
                                // customInput={Input}
                                // style={{width: '162px'}}
                                //  name="montant"
                                // value={this.state.montant}
                                //onChange={(e)=>this.setState( {montant:parseFloat(e.target.value.replace(/ /g,"")) } )}
                                required={true}
                                disabled={true}

                            />
                        </Form.Item>
                    }

                </Col>
            </Row>
        </Form>
    )
}
