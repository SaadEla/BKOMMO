import {Checkbox, Col, Divider, Form, Modal, Row, Select, Spin} from "antd";
import DatePicker from "../DatePick";
import {Button} from "@progress/kendo-react-buttons";
import AvisGrid from "../gridAvisSet";
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {optionsContrePartie, tiersLabelFunction2} from "./SwapUtil";
import {selectionSettlementSwapAPI} from "../../../redux/dealCapture/rest/RestCall";
import {
    loadingSelectSettlementSwapSelector,
    selectionSettlementSwapSelector
} from "../../../redux/dealCapture/selectors/selectors";
import "./AvisSttlementSwap.scss";

import {DateUtil} from "../../../helpers/Utils";

const {Option} = Select;

export function AvisSettlementSwap({references}) {
    const dispatch = useDispatch();
    const [form] = Form.useForm();

    const [settlementDataGrid, setSettlementDataGrid] = useState([])
    const selectionSettlement = useSelector(selectionSettlementSwapSelector);
    const loadingSelectSettlementSwap = useSelector(loadingSelectSettlementSwapSelector);

    const [contrepartieId, setContrepartieId] = useState();
    const [hideGenerated, setHideGenerated] = useState(true);

    useEffect(function () {
        setSettlementDataGrid(selectionSettlement);
        filterChangeHandler(hideGenerated);
    }, [selectionSettlement])

    function sensLabelFunction(item) {
        var s = "";
        if (item.sens == 1) s = "BMCE paie Fixe";
        if (item.sens == -1) s = "BMCE paie  Variable";
        return s;
    }

    function prepareSettlement(item) {

        return {
            tradeDateLabel: DateUtil.Format(item.tradeDate),
            maturityDateLabel: DateUtil.Format(item.maturityDate),
            echeanceDebutLabel: DateUtil.Format(item.echeanceDebut),
            echeanceFinLabel: DateUtil.Format(item.echeanceFin),
            sensLabel: sensLabelFunction(item),
            ...item
        }
    }

    function optionsDevisesTraitees() {
        if (references && references.devisesTraitees)
            return references.devisesTraitees.map(d => <Select.Option value={d.deviseId}
                                                                      key={d.deviseId}>{d.shortName}</Select.Option>);
    }

    function onContrePartiechange(value) {
        setContrepartieId(value)
        dispatch(selectionSettlementSwapAPI({contrepartieId: value}))
    }

    function filterChangeHandler(value) {
        setSettlementDataGrid(selectionSettlement.filter(echeancesFilterFunction(hideGenerated)))
    }


    function echeancesFilterFunction(hide) {

        return (item) =>{
            if (hide &&  (item.avisSettlementGenerated))
                return false;
            if (form.getFieldValue("devise") && (form.getFieldValue("devise") != item.devise.deviseId))
                return false;
            var d = DateUtil.parseDate(item.echeanceFin, "YYYYMMDD");
            var d1 = DateUtil.parseDate(form.getFieldValue("debut"));
            var d2 = DateUtil.parseDate(form.getFieldValue("fin"));
            if (!((d1 == null || d.getTime() >= d1.getTime()) && (d2 == null || d.getTime() <= d2.getTime())))
                return false;

            return true;
        }

    }

    function onFormFinish(values) {
        console.log("valuesss", values);
    }

    function hideGeneratedChange(e) {
        setHideGenerated(e);
        setSettlementDataGrid(selectionSettlement.filter(echeancesFilterFunction(e)))
    }

    function linkbutton1_clickHandler(event)
    {
        if(form.getFieldValue("contrepartie")!=null){
           onContrePartiechange(contrepartieId)
        }

    }
    return <>
        <Form
            onFinish={onFormFinish}
            className={"avis-settlement-form"}
            layout={'inline'}
            form={form}
            initialValues={{layout: 'inline'}}
        >

            <Form.Item
                labelCol={{span: 9}}
                style={{width: '22%'}} colon={false}
                name={"contrepartie"}
                label="Contrepartie">
                <Select
                    style={{width: '145px'}}
                    onChange={value => onContrePartiechange(value)}
                    showSearch
                    filterOption={(input, option) =>
                        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                >
                    {optionsContrePartie(references)}
                </Select>
            </Form.Item>
            <Form.Item labelCol={{span: 12}}
                       style={{width: '10%'}}
                       colon={false}
                       name={"devise"}
                       label="Devise">
                <Select
                    onChange={value => filterChangeHandler(value)}
                >
                    {optionsDevisesTraitees()}
                </Select>
            </Form.Item>
            <Form.Item
                labelCol={{span: 6}}
                style={{width: '20%'}}
                colon={false}
                name={"debut"}
                label="Debut">
                <DatePicker
                    onChange={value => filterChangeHandler(value)}
                    width={'100%'} style={{zIndex: 100000}}
                    />
            </Form.Item>
            <Form.Item
                labelCol={{span: 5}}
                style={{width: '20%'}} colon={false}
                name={"fin"}
                label="Fin">
                <DatePicker
                    onChange={value => filterChangeHandler(value)}
                    width={'100%'} />
            </Form.Item>
            <Form.Item
                labelCol={{span: 5}}
                style={{width: '20%'}} colon={false}
                name={"hideGenerated"}
            >
                <Checkbox checked={hideGenerated}
                    onChange={e => hideGeneratedChange(e.target.checked)}
                > Masquer les avis générés </Checkbox>
            </Form.Item>
            <Button
                onClick={linkbutton1_clickHandler}
                stype={"submit"} icon="refresh" style={{color: 'rgba(19,105,180,0.9)'}}
                    primary={true} look="bare"></Button>


        </Form>

        <Spin spinning={loadingSelectSettlementSwap} size="large">
            <AvisGrid contrepartieId={contrepartieId}  data={settlementDataGrid.map(prepareSettlement)}></AvisGrid>
        </Spin>
    </>

}