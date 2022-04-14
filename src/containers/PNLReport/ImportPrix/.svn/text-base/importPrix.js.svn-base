import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import LayoutContentWrapper from '../../../components/utility/layoutWrapper';
import LayoutContent from '../../../components/utility/layoutContent';
import PageHeader from '../../../components/utility/pageHeader';
import DataGrid from '../../../components/uielements/grid.js';
import DatePicker from '../../../components/uielements/DatePick';
import * as moment from 'moment';
import {userSelector} from '../../../redux/auth/authSlice'
import {
    Button,
    ButtonGroup,
    SplitButton,
    SplitButtonItem,
    ToolbarSpacer,
    DropDownButton,
    DropDownButtonItem,
    Toolbar,
    ToolbarItem,
    ToolbarSeparator
} from '@progress/kendo-react-buttons'
import {Collapse, message, Spin, Upload} from 'antd';
import {Input, Select, Form, Row, Col, Modal, Breadcrumb} from 'antd';
import {HomeOutlined, UserOutlined} from '@ant-design/icons';
import {Grid, GridToolbar} from "@progress/kendo-react-grid";
import PnlReportHeader from "../../../components/pnlReport/PnlReportHeader";
import {GridColumn as Column} from "@progress/kendo-react-grid/dist/npm/GridColumn";
import {DateUtil, NumberUtil} from "../../../helpers/Utils";
import {BreadCrumb} from "../../../components/breadCrumb/BreadCrumb";
import {loadIportPrixListAPI} from "../../../redux/PNLReport/PNLRest";
import {loadExternalUSD} from "../../../redux/GestionDeLimite/externalUSD/externalUSDSlice";
import API_URL from "../../../config/api/API_URL";
import qs from "qs";
import {importPrixListLoadingSelector, importPrixListSelector} from "../../../redux/PNLReport/importPrixSlice";
import {orderBy} from "@progress/kendo-data-query";
//const [dateJournee, setDateJournee] = useState(moment().format('DD/MM/YYYY'));
const {Search} = Input;
const {Panel} = Collapse;


function ImportPrix() {

    const dispatch = useDispatch();

    /* -----------Selectors------------ */
    const prixImportList = useSelector(importPrixListSelector)
    const prixImportListLoading = useSelector(importPrixListLoadingSelector)


    /* -----------State------------ */
    const [sort, setSort] = useState([]);
    const [skip, setSkip] = useState(0);
    const [take, setTake] = useState(20);
    const [priceDate, setPriceDate] = useState(null)
    const [loadingUpload, setLoadingUpload] = useState(false);

    const [prixList, setPrixList] = useState([]);

    useEffect(function () {
        if (prixImportList && prixImportList.length > 0)
            setPrixList(prixImportList)
    }, [prixImportList])

    function prepareDataGrid(dataGrid) {
        return orderBy(dataGrid, sort).slice(skip, skip + take)
    }
    function search() {
        let param = {};
        if (priceDate)
            param.priceDate = DateUtil.Format(priceDate);
        dispatch(loadIportPrixListAPI(param))
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
            .concat(API_URL.PNL_IMPORT_PRIX_UPLOAD)
            .concat("?")
            .concat(qs.stringify(getHeadData(file)))
    }

    function getHeadData(data) {
        return {
            fileExtension: "." + data.name.substring(data.name.indexOf(".") + 1),
            fileName: data.name,
            priceDate: priceDate && DateUtil.Format(priceDate),
        }
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
                message.success("Fichier du " + data.msgSucess + " chargé avec succès ");
            }

        },
        onError(e) {
            setLoadingUpload(false)
            message.error("Attention, une erreur est survenue lors de l'upload du fichier!");
        },
        onProgress() {
            setLoadingUpload(true)
        }
        //onChange: onChange,
        //  onRemove: onRemove,
        //  transformFile: transformFile,
        //  data: getExtraData,
        //   beforeUpload: beforeUpload,
    };

    function pageChange(event) {
        setTake(event.page.take);
        setSkip(event.page.skip);
    }
    return (
        <LayoutContentWrapper style={{height: '82vh'}}>
            <PageHeader>
                <BreadCrumb elementRoot={"PNL REPORT"} element1={"Import prix"}></BreadCrumb>
            </PageHeader>
            <LayoutContent>
                <Spin spinning={prixImportListLoading} size={'large'}>
                    <Grid
                        sortable
                        sort={sort}
                        onSortChange={(e) => {
                            setSort(e.sort);
                        }}
                        style={{height: '67vh', width: '104%', marginLeft: '-2%'}}
                        resizable
                        reorderable
                        data={[...prepareDataGrid(prixList)]}
                        skip={skip}
                        take={take}
                        onPageChange={pageChange}
                        total={prixList.length}
                        pageable={true}

                    >
                        <GridToolbar>
                            <Row>
                                < Col span={7}>
                                    <div>
                                        <Form.Item colon={false} label="Price Date">
                                            <DatePicker
                                                onChange={(e) => setPriceDate(e.target.value)}
                                                width={"70%"}/>
                                        </Form.Item>
                                    </div>
                                </Col>

                                <Col span={17}>
                                    <div style={{float: "right"}}>

                                        <Spin spinning={loadingUpload}>
                                            <Upload  {...props} showUploadList={false}>
                                                <Button
                                                    onClick={e => e.preventDefault()}
                                                    icon="upload"
                                                    className="btn-header-style"
                                                    primary={true}
                                                    look="bare">Importer</Button>
                                            </Upload>
                                        </Spin>

                                    </div>
                                    <div style={{float: "right"}}>
                                        <Button
                                            className="btn-header-style"
                                            onClick={search}
                                            icon="refresh"
                                            primary={true} look="bare">Actualiser</Button>
                                    </div>
                                </Col>
                            </Row>
                        </GridToolbar>
                        <Column className="centerAlign" field="priceDate" title="Price date"/>
                        <Column field="code" title="RIC"/>
                        <Column className="centerRight" format="{0:n2}" field="value" title="Value"/>

                    </Grid>
                </Spin>
            </LayoutContent>
        </LayoutContentWrapper>

    );
}

export default ImportPrix;

