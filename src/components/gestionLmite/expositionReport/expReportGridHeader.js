import React from "react";
import {Checkbox, Col, Form, Row, Spin} from "antd";
import {Button} from "@progress/kendo-react-buttons";
import Search from "antd/es/input/Search";
import {useDispatch, useSelector} from "react-redux";
import {loadingRemoveSelector} from "../../../redux/GestionDeLimite/expReport/Selectors";
import {DateUtil} from "../../../helpers/Utils";
import DatePicker from "../../uielements/DatePick";
import RadioBox, {RadioGroup} from "../../uielements/radio";
import {loadExpReportListAPI} from "../../../redux/GestionDeLimite/expReport/RestCall";


export function ExpReportGridHeader({csvExport,showAdvancedSearch,advancedSearch,ajouter,supprimer,quickSearch,quickSearch_changeHandler,actualiser,selectedRow}) {
    const [form] = Form.useForm();
    const dispatch = useDispatch()
    const loadingRemove = useSelector(loadingRemoveSelector)

    function onFinish(values) {
        var param = {};
        param.datePosition =DateUtil.Format(values.datePosition);
        param.calculPosition = values.calculPosition;
        dispatch(loadExpReportListAPI(param))
        //expositionService.send(param);
        //console.log((values))
    }
    return <Row style={{width: '100%'}}>
        <Col span={18}>
            <Form
                layout={'inline'}
                form={form}
                name="advanced_search"
                className="ant-deal-future-form"
                onFinish={onFinish}
               // onValuesChange={onChangeEcheance}
            >
                        <Form.Item
                            colon={false}
                            name={`datePosition`}
                            label={`Date`}

                        >
                            <DatePicker
                                width={'100%'}
                                //  onChangeDate={e=>handleForwardSearchModel({maxTradeDate:DateUtil.Format(e.value)})}
                            />

                        </Form.Item>
                        <Form.Item
                            colon={false}
                            name={`calculPosition`}
                            label={`Calculer la position`}
                            valuePropName="checked"
                        >
                            <Checkbox>  </Checkbox>

                        </Form.Item>
                <Form.Item >
                    <Button
                        type={"submit"}
                        icon="refresh"
                        className="btn-header-style"
                            primary={true}
                            look="bare">Actualiser</Button>
                </Form.Item>
                <Form.Item >
                    <Button onClick={e=>{e.preventDefault();csvExport()}} icon="csv"
                            className="btn-header-style"
                            primary={true}
                            look="bare">Exporter</Button>
                </Form.Item>
            </Form>

        </Col>



    </Row>
}