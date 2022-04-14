import React, {useEffect, useState} from "react";
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
import {pnlServiceAPI} from "../../redux/PaiementSoulte/RestCall"
import {ReloadListPaiementSelector} from "../../redux/PaiementSoulte/paiementSoulteSelector";


export default function PaiementSoulteHeader({hidePayedPositionsCB_changeHandler,onChange,form,totalPaiement}) {

    const dispatch = useDispatch()
    const referencesList = useSelector(ListReferencesSelector);
    const reloadListPaiement = useSelector(ReloadListPaiementSelector);
    const [disableTiers, setDisableTiers] = useState(false)


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

    useEffect(function () {
        onFinish({contrepartie:form.getFieldValue('contrepartie')})
    },[reloadListPaiement])


    function onFinish(val) {
        let param = {};
        param.tiersId = val.contrepartie;
        dispatch(pnlServiceAPI(param))
    }




    return <Form
        layout={'inline'}
        form={form}
        name="advanced_search"
        className="ant-deal-future-form"
        onFinish={onFinish}
        onChange={onChange}
    >

        <Form.Item
            colon={false}
            name={`contrepartie`}
            label={'Contre Partie'}

            rules={[{required: !disableTiers,
                message: 'Champ obligatoire!',}]}
        >
            <Select
                disabled={disableTiers}
                showSearch
                filterOption={(input, option) =>
                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
                style={{width: '125px'}}>
                {tiersOption()}
            </Select>
        </Form.Item>
        <Form.Item
            colon={false}
            name="soultePayee"
            valuePropName="checked"
        >
            <Checkbox 
            onChange={hidePayedPositionsCB_changeHandler}
            color='#2181da' checked = {true}> Masquer les soultes payées </Checkbox>

        </Form.Item>
        <Form.Item
            colon={false}
            name="actualiser"
        >
            <Button type={"submit"} icon="refresh"
                    className="btn-header-style"
                    primary={true}
                    look="bare">Actualiser</Button>
        </Form.Item>

        <Form.Item
            colon={false}
            name="totalSuspens"
            label={"TOTAL DES SUSPENS : "}   
        >
           {totalPaiement.hasOwnProperty('USD')
               &&
                  <text color='#008080'> {'(USD) '+NumberUtil.Format(totalPaiement.USD)}</text>  
           }

            {
                totalPaiement.hasOwnProperty('EUR')
                &&
                <text color='#008080'> {'(EUR) '+NumberUtil.Format(totalPaiement.EUR)} </text> 
            }
           
           
        </Form.Item>

    </Form>
}