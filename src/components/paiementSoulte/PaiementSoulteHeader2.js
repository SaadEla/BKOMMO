import React, {useState, useEffect} from "react";
import {Checkbox, Col, Form, Radio, Row, Select} from "antd";
import RadioBox from "../uielements/radio";
import DatePicker from "../uielements/DatePick";
import {Button} from "@progress/kendo-react-buttons";
import {useDispatch, useSelector} from "react-redux";
import {ListReferencesSelector} from "../../redux/references/ContratReferencesSlice";
import {useForm} from "antd/es/form/util";
import {errorUpdateData} from "../feedback/CustomNotification";
import {openNotificationWithIcon} from "../feedback/notification";
import {DateUtil, NumberUtil} from "../../helpers/Utils";
import {loadPnlListAPI} from "../../redux/PNLReport/PNLRest";
import { PaiementSoulteSelectedRowSelector } from "../../redux/PaiementSoulte/paiementSoulteSelector";
import { PaiementDetailSelectedRowSelector } from "../../redux/PaiementSoulte/paiementSoulteSelector";


export default function PaiementSoulteHeader2({form,onChange,pnl,totalPaiement,suspens,setShowPopUpDetail,removeOption}) {

    const dispatch = useDispatch()
    const referencesList = useSelector(ListReferencesSelector);
    const [disableTiers, setDisableTiers] = useState(false)

    const selectedItem = useSelector(PaiementSoulteSelectedRowSelector)
    const selectedItem1 = useSelector(PaiementDetailSelectedRowSelector)

    useEffect(function(){
        console.log(selectedItem)
    }, [selectedItem])

    useEffect(function(){
        console.log(selectedItem1)
    }, [selectedItem1])

    function tiersLabelFunction(item) {
        if (item == null) return "";
        if (item.tiersId == null) return "";
        return item.shortName + " - " + item.name;
    }

    function tiersOption() {

        if (referencesList && referencesList.counterparties)
            return referencesList.counterparties.map(function (item) {

                return <Select.Option key={item.tiersId} value={item.tiersId}>{tiersLabelFunction(item)}</Select.Option>
            })
        else return []
    }



    function onFinish(val) {
        let param = {};
        param.tiersId = val.contrepartie;
        param.datePosition = DateUtil.Format(val.date);
        dispatch(loadPnlListAPI(param))
    }


    function ajouter() {
        setShowPopUpDetail(true)
    }


    return <Form
        layout={'inline'}
        form={form}
        name="advanced_search"
        className="ant-deal-future-form"
        //onFinish={onFinish}
        onChange={onChange}
    >

        <Form.Item
            colon={false}
            name="ajouterPaiement"
        >
            <Button type={"submit"} icon="add"
                    className="btn-header-style"
                    primary={true}
                    disabled={!selectedItem}
                    onClick={ajouter}
                    look="bare">Ajouter Paiement</Button>
        </Form.Item>

        <Form.Item
            colon={false}
            name="annulerPaiement"
        >
            <Button type={"submit"} icon="close"
                    className="btn-header-style"
                    primary={true}
                    onClick={removeOption}
                    disabled={!selectedItem1}
                    look="bare">Annuler Paiement</Button>
        </Form.Item>

        <Form.Item
            colon={false}
            name="pnl"
            label = "PnL : "
        >
            <text> {pnl} </text>
        </Form.Item>

        <Form.Item
            colon={false}
            name="totalPaiement"
            label = "Total payé : "
        >
            <text> {totalPaiement} </text>
        </Form.Item>
        <Form.Item
            colon={false}
            name="suspens"
            label = "Suspens : "
        >
            <text> {NumberUtil.Format(suspens)} </text>
        </Form.Item>
    </Form>
}