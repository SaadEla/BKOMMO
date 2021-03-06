import React, {useEffect, useState} from "react";
import {Checkbox, Col, Form, Row, Spin, Upload} from "antd";
import {Button} from "@progress/kendo-react-buttons";
import Search from "antd/es/input/Search";
import {useDispatch, useSelector} from "react-redux";
import {loadingRemoveSelector} from "../../../redux/GestionDeLimite/externalUSD/Selectors";
import {DateUtil} from "../../../helpers/Utils";
import DatePicker from "../../uielements/DatePick";
import RadioBox, {RadioGroup} from "../../uielements/radio";
import {loadExternalUSDListAPI} from "../../../redux/GestionDeLimite/externalUSD/RestCall";
import {loadExternalUSD} from "../../../redux/GestionDeLimite/externalUSD/externalUSDSlice";
import API_URL from "../../../config/api/API_URL";
import qs from "qs";
import {message} from 'antd';
import UserService from "../../../keycloak/UserService";

export function ExternalUSDGridHeader({csvExport, showAdvancedSearch, advancedSearch, ajouter, supprimer, quickSearch, quickSearch_changeHandler, actualiser, selectedRow}) {
    const [form] = Form.useForm();
    const dispatch = useDispatch()
    const loadingRemove = useSelector(loadingRemoveSelector)

    const [loadingUpload,setLoadingUpload]= useState(false);
    useEffect(function () {
        dispatch(loadExternalUSDListAPI())
    }, [])

    function onFinish(values) {
        var param = {};
        param.datePosition = DateUtil.Format(values.datePosition);

        dispatch(loadExternalUSDListAPI(param))
    }

    function getHeadData(data) {
        return {
            fileExtension: "." + data.name.substring(data.name.indexOf(".") + 1),
            fileName: data.name,
            priceDate: form.getFieldValue("datePosition") && DateUtil.Format(form.getFieldValue("datePosition")),
        }
    }

    function getData(data) {
        console.log("datadata", data)
        return {
            Filename: data.name,
            Filedata: data,
            Upload: 'Submit Query'
        }
    }

    function getAction(file) {
        return API_URL.SERVER_BASE_URL
            .concat(API_URL.LIMIT_EXTERNALUSED_UPLOAD)
            .concat("?")
            .concat(qs.stringify(getHeadData(file)))
    }

    function customRequest(req) {
        fetch(req.action, {
            method: 'POST',
            credentials: 'include',
            headers: {
                Accept: '*/*',
                'Content-Type': 'multipart/form-data'
            },
            body: getData(req.file)
        })
            .then(response => response.json())
            .then(data => data.data)
            .then(data =>
                console.log(data)
            )
            .catch(error => {
                console.log('Error fetching profile ' + error)

            })
    }

    const props = {
        beforeUpload: (f) => {
            console.log("b", f)
        },
        //customRequest : customRequest,
        data: getData,
        // fileList: value,
        action: getAction,
        accept: 'xls',
        onSuccess(data) {
            setLoadingUpload(false)
            if (data.msgError)
                message.error(data.msgError);
            else {
              //  result.values
                dispatch(loadExternalUSD(data.values))
                message.success("Fichier du " + data.msgSucess + " charg?? avec succ??s ");
            }

        },
        onError(e){
            setLoadingUpload(false)
            message.error("Attention, une erreur est survenue lors de l'upload du fichier!");
        },
        onProgress(){
            setLoadingUpload(true)
        }
        //onChange: onChange,
        //  onRemove: onRemove,
        //  transformFile: transformFile,
        //  data: getExtraData,
        //   beforeUpload: beforeUpload,
    };

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
                <Form.Item>
                    <Button
                        type={"submit"}
                        icon="refresh" style={{borderRadius: '10px', color: 'rgba(19,105,180,0.9)'}}
                        primary={true}
                        look="bare">Actualiser</Button>
                </Form.Item>
                {
                    UserService.hasRole("EXTERNAL_USED_UPDATE") &&
                    <Form.Item>
                        <Spin spinning={loadingUpload}>
                            <Upload  {...props} showUploadList={false}>
                                <Button
                                    onClick={e => e.preventDefault()}
                                    icon="upload"
                                    style={{borderRadius: '10px', color: 'rgba(19,105,180,0.9)'}}
                                    primary={true}
                                    look="bare">Importer</Button>
                            </Upload>
                        </Spin>

                    </Form.Item>
                }

            </Form>

        </Col>
        {
            /*
             <Col span={6}>
            <div style={{float: 'right'}}>
                <Search
                    style={{width: '100%'}} placeholder="Quick search text"
                    onSearch={value => quickSearch_changeHandler(value)}
                    onChange={value => quickSearch_changeHandler(value.target.value)}
                    //onKeyPress={value => quickSearch_changeHandler(value)}
                    //onKeyUp={value => quickSearch_changeHandler(value)}
                    //onKeyDown={value => quickSearch_changeHandler(value)}
                />
            </div>


        </Col>
             */
        }


    </Row>
}