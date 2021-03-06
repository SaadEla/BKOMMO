import {Checkbox, Col, Form, Modal, Row, Select, Spin} from "antd";
import DatePicker from "../DatePick";
import RadioBox from "../radio";
import {Button} from "@progress/kendo-react-buttons";
import AvisGrid from "../gridAvisSet";
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {optionsContrePartie, tiersLabelFunction2} from "./FutureUtil";
import {selectionSettlementFutureAPI} from "../../../redux/dealCapture/rest/FutureRestCall";
import {
    loadingSelectSettlementFutureSelector,
    selectionSettlementFutureSelector
} from "../../../redux/dealCapture/selectors/FutureSelectors";

const {Option} = Select;

export function AvisSettlementFuture({references}) {
    const dispatch = useDispatch();
    const [settlementDataGrid, setSettlementDataGrid] = useState([])
    const selectionSettlement = useSelector(selectionSettlementFutureSelector);
    const loadingSelectSettlementFuture = useSelector(loadingSelectSettlementFutureSelector);

    const [contrepartieId, setContrepartieId] = useState();

    useEffect(function () {
        setSettlementDataGrid(selectionSettlement)
    }, [selectionSettlement])

    function optionsDevisesTraitees() {
        if (references && references.devisesTraitees)
            return references.devisesTraitees.map(d => <Select.Option value={d.deviseId}
                                                                      key={d.deviseId}>{d.shortName}</Select.Option>);
    }

    function onContrePartiechange(value) {
        setContrepartieId(value)
        dispatch(selectionSettlementFutureAPI({contrepartieId: value}))
    }

    return <>
        <Row style={{display: 'flex', marginLeft: '-1%', marginRight: '-3%', height: '48px'}}>
            <Col span={5}>
                <Form.Item colon={false} label="Contrepartie">
                    <Select
                        onChange={value => onContrePartiechange(value)}
                        allowClear
                        showSearch
                        filterOption={(input, option) =>
                            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                        style={{width: '100px'}}>
                        {optionsContrePartie(references)}
                    </Select>
                </Form.Item>
            </Col>

            <Col span={3}>
                <Form.Item colon={false} label="Devise">
                    <Select
                        showSearch
                        filterOption={(input, option) =>
                            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                        style={{width: '50px'}}>
                        {optionsDevisesTraitees()}
                    </Select>
                </Form.Item>
            </Col>

            <Col span={5.5}>
                <Form.Item colon={false} label="Debut">
                    <DatePicker style={{zIndex: 100000}} width='170px' defaultValue={new Date}/>
                </Form.Item>
            </Col>
            <Col span={5.5}>
                <Form.Item colon={false} label="Fin">
                    <DatePicker width='170px' defaultValue={new Date}/>
                </Form.Item>
            </Col>
            <Col span={5}>
                <Checkbox> Masquer les avis g??n??r??s </Checkbox>
                &nbsp;
                <Button icon="refresh" style={{borderRadius: '10px', color: '#2181da'}}
                        primary={true} look="bare"></Button>
            </Col>
        </Row>
        <Spin spinning={loadingSelectSettlementFuture} size="large">
            <AvisGrid data={settlementDataGrid}></AvisGrid>
        </Spin>
    </>

}