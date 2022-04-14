import React, {useState} from "react";
import {Checkbox, Col, Form, Radio, Row, Select} from "antd";
import RadioBox from "../uielements/radio";
import DatePicker from "../uielements/DatePick";
import {Button} from "@progress/kendo-react-buttons";
import {useDispatch, useSelector} from "react-redux";
import {ListReferencesSelector} from "../../redux/references/ContratReferencesSlice";
import {useForm} from "antd/es/form/util";
import {errorUpdateData} from "../feedback/CustomNotification";
import {openNotificationWithIcon} from "../feedback/notification";
import {DateUtil} from "../../helpers/Utils";
import {loadPnlListAPI} from "../../redux/PNLReport/PNLRest";


export default function PnlReportHeader({exporter,form,onChange}) {

    const dispatch = useDispatch()
    const referencesList = useSelector(ListReferencesSelector);
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



    function onFinish(val) {
        let param = {};
        if (val.client == "C")
            param.tiersId = val.contrepartie;
        param.datePosition = DateUtil.Format(val.date);
        dispatch(loadPnlListAPI(param))
        //pnlService.send(param);
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
            rules={[{required: true,
                message: 'Champ obligatoire!',}]}
            colon={false}
            name={`client`}
        >
            <Radio.Group onChange={() => setDisableTiers(form.getFieldValue("client") == "G")}>
                <RadioBox value={'C'}> Pnl par client </RadioBox>
                <RadioBox value={'G'}> Pnl global </RadioBox>
            </Radio.Group>
        </Form.Item>

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
            rules={[{required: true,
                message: 'Champ obligatoire!',}]}
            colon={false}
            name={`date`}
            label={'Date'}
        >
            <DatePicker width={125}/>

        </Form.Item>
        <Form.Item
            colon={false}
            name="soultePayee"
            valuePropName="checked"
        >
            <Checkbox color='#2181da'> Afficher les soultes payées </Checkbox>

        </Form.Item>
        <Form.Item
            colon={false}
            name="soultePayee"
        >
            <Button type={"submit"} icon="refresh"
                    className="btn-header-style"
                    primary={true}
                    look="bare">Actualiser</Button>
            <Button icon="csv"
                    onClick={e => {e.preventDefault() ; exporter(e)}}
                    className="btn-header-style" primary={true}
                    look="bare">Exporter</Button>
        </Form.Item>

    </Form>
}