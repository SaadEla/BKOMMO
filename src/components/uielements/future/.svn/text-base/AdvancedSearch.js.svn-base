import React, {useState} from 'react'
import {Col, Collapse, Divider, Form, Row, Select} from "antd";
import DatePicker from "../DatePick";
import {Button} from "@progress/kendo-react-buttons";
import {
    optionsBroker,
    optionsContrats,
    optionsContrePartie,
    optionsSousjacents,
    optionsStatuts,
    tiersLabelFunction2
} from "./FutureUtil";
import {useDispatch} from "react-redux";
import {DateUtil} from "../../../helpers/Utils";
import {loadFutureListAPI} from "../../../redux/dealCapture/rest/FutureRestCall";

const {Panel} = Collapse;
const {Option} = Select;
const FutureAdvancedSearchModel = {
    sousJacentId: null,
    contrepartieId: null,
    statutId: null,
    minTradeDate: null,
    maxTradeDate: null,
    minMaturity: null,
    maxMaturity: null,
}
export default function AdvancedSearch({callback, references,style}) {

    const dispatch = useDispatch()
    const [futureAdvancedSearch, setFutureAdvancedSearch] = useState(FutureAdvancedSearchModel)

    function handleFutureSearchModel(newValue){
        setFutureAdvancedSearch(
            oldState=>{
                return {...oldState,...newValue}
            }
        )
    }



    function handleSubmit(event) {
        event.preventDefault();
        dispatch(loadFutureListAPI(futureAdvancedSearch))
        console.log("model", futureAdvancedSearch)
    }

    return <card style={{width: '100%', background:'white',...style}} >
                <Row >
                    <Col span={3 / 2}>
                        <Form.Item colon={false} label="Broker">
                        </Form.Item>
                        <Form.Item colon={false} label="Contrat">
                        </Form.Item>
                    </Col>

                    <Col span={5}>

                        <Form.Item>
                            <Select
                                onChange={e=>handleFutureSearchModel({brokerId:e})}
                                allowClear
                                showSearch
                                filterOption={(input, option) =>
                                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                                style={{width: '95%'}}>
                                {optionsBroker(references)}
                            </Select>

                        </Form.Item>
                        <Form.Item>
                            <Select allowClear
                                    showSearch
                                    filterOption={(input, option) =>
                                        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                    }
                                    onChange={e=>handleFutureSearchModel({contratId:e})}
                                    style={{width: '95%'}}>
                                {optionsContrats(references)}
                            </Select>

                        </Form.Item>

                    </Col>

                    <Col span={5/2}>
                        <Form.Item name={"uuuu"} colon={false} label="Trade date du">

                        </Form.Item>
                        <Form.Item colon={false} label="Maturité du">

                        </Form.Item>
                    </Col>

                    <Col span={5}>
                        <Form.Item>
                            <DatePicker
                                width={'90%'}
                                onChangeDate={e=>handleFutureSearchModel({minTradeDate:DateUtil.Format(e.value)})}
                            />
                        </Form.Item>
                        <Form.Item>
                            <DatePicker
                                width={'90%'}
                                onChangeDate={e=>handleFutureSearchModel({maxTradeDate:DateUtil.Format(e.value)})}
                            />
                        </Form.Item>
                    </Col>

                    <Col span={1 / 2}>
                        <Form.Item colon={false} label="au">
                        </Form.Item>
                        <Form.Item colon={false} label="au">
                        </Form.Item>
                    </Col>

                    <Col span={5}>
                        <Form.Item>
                            <DatePicker
                                width={'90%'}
                                onChangeDate={e=>handleFutureSearchModel({minMaturity:DateUtil.Format(e.value)})}
                                 />


                        </Form.Item>
                        <Form.Item>
                            <DatePicker
                                width={'90%'}
                                onChangeDate={e=>handleFutureSearchModel({maxMaturity:DateUtil.Format(e.value)})}
                                 />
                        </Form.Item>
                    </Col>

                    <Col span={1}>
                        <Form.Item colon={false} label="Statut">
                        </Form.Item>
                        <Form.Item colon={false} label="User">
                        </Form.Item>
                    </Col>

                    <Col span={3}>
                        <Form.Item>
                            <Select
                                showSearch
                                filterOption={(input, option) =>
                                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                                onChange={e=>handleFutureSearchModel({statutId:e})}
                                allowClear  style={{width: '100%'}}>
                                {optionsStatuts()}
                            </Select>

                        </Form.Item>
                        <Form.Item>
                            <Select
                                showSearch
                                filterOption={(input, option) =>
                                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                                onChange={e=>handleFutureSearchModel({statutId:e})}
                                allowClear  style={{width: '100%'}}>

                            </Select>

                        </Form.Item>
                    </Col>

                </Row>
        <Divider   orientation="right" plain> <Button onClick={handleSubmit} type="submit" icon="search"
                                                     className="btn-header-style"
                                primary={true}
                                look="bare">Rechercher</Button></Divider>


    </card>

}