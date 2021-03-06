import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import LayoutContentWrapper from '../../../components/utility/layoutWrapper';
import LayoutContent from '../../../components/utility/layoutContent';
import DataGrid from '../../../components/uielements/future/gridFuture.js';
import {userSelector} from '../../../redux/auth/authSlice'
import {ListReferencesSelector} from "../../../redux/references/ContratReferencesSlice";
import AdvancedSearch from "../../../components/uielements/future/AdvancedSearch";
import {DealFuture} from "../../../components/uielements/future/dealfuture/DealFuture";
import {
    auditHistoriqueListLoadingSelector,
    checkedLimitDealFutureSelector,
    dealFutureDealSelector,
    dealFutureDetailSelector,
    dealFutureloadUpdateSelector,
    dealFutureloadValidateSelector,
    dealFutureVisibleSelector,
    loadCheckLimitDealFutureSelector,
    FutureListSelector,
    futureSelectedRowSelector,
    dealFutureReferencesSelector, updateFlagDealFutureSelector, validationFlagDealFutureSelector
} from "../../../redux/dealCapture/selectors/FutureSelectors";
import {
    loadAuditHistoriqueAPI,
    loadDealFutureAPI,
    loadFutureListAPI,
    editOrSaveDealFutureAPI,
    checkLimitDealFutureAPI,
    deleteFutureAPI
} from "../../../redux/dealCapture/rest/FutureRestCall";
import {loadReferencesAPI} from "../../../redux/references/ContratReferencesSlice";
import {FutureHeader} from "../../../components/uielements/future/FutureHeader";
import {BreadCrumb} from "../../../components/breadCrumb/BreadCrumb";
import './futureStyle'
import CustomDialog, {showDeleteConfirm} from '../../../components/feedback/modal'
import DealFutureFormFooter from "../../../components/uielements/future/dealfuture/DealFutureFormFooter";
import {
    updateDealFutureFlag,
    loadingUpdateDealFuture,
    updateDealFutureError,
    validateDealFutureSuccess,
    validateDealFutureError,
    loadingValidateDealFuture,
    updateDealFutureSuccess
} from "../../../redux/dealCapture/future/DealFutureSlice"
import {prapareSaveDealFuture} from "../../../components/uielements/future/FutureUtil";
import API_URL from "../../../config/api/API_URL";
import {Divider, Form} from "antd";
import {STATUT_VALIDE_TRADER} from "../Option/option";
import {
    updateFlagDealSwapSelector,
    validationFlagDealSwapSelector
} from "../../../redux/dealCapture/selectors/selectors";
import PageHeader from "../../../components/utility/pageHeader";
import UserService from "../../../keycloak/UserService";

function Future() {

    const dispatch = useDispatch();
    const [dealForm] = Form.useForm();
    /* -----------Selectors------------ */
    const user = useSelector(userSelector);
    const futureList = useSelector(FutureListSelector);
    const selectedRow = useSelector(futureSelectedRowSelector);
    const referencesList = useSelector(ListReferencesSelector);
    const referencesDealList = useSelector(dealFutureReferencesSelector);
    const dealFutureData = useSelector(dealFutureDetailSelector);
    const dealFutureModalVisible = useSelector(dealFutureVisibleSelector);
    const auditHistoriqueLoading = useSelector(auditHistoriqueListLoadingSelector);
    const auditHistoriqueModalVisible = useSelector(auditHistoriqueListLoadingSelector);
    const loadUpdateDealFuture = useSelector(dealFutureloadUpdateSelector);
    const loadValidateDealFuture = useSelector(dealFutureloadValidateSelector);
    const loadCheckLimitDealFuture = useSelector(loadCheckLimitDealFutureSelector);
    const checkedLimitDealFuture = useSelector(checkedLimitDealFutureSelector);

    const validationFlag = useSelector(validationFlagDealFutureSelector);
    const updateFlag = useSelector(updateFlagDealFutureSelector);

    /* -----------State------------ */
    //const [updateDealFutureFlag,setUpdateDealFutureFlag] = useState(false);
    const [targetKeys, setTargetKeys] = useState()
    const [modalVisible, setModalVisibles] = useState(false);
    const [avisVisible, setAvisVisibles] = useState(false);
    const [dealFutureVisible, setDealFutureVisible] = useState(false);
    const [rowDoubleClick, setRowDoubleClick] = useState(false);
    const [auditTrailClick, setAuditTrailClick] = useState(false);
    const [checkLimitClick, setCheckLimitClick] = useState(false);
    const [showAdvancedSearch, setShowAdvancedSearch] = useState(false)
    const [gridHeight, setGridHeight] = useState('570px');
    const [futureCheckLimitModalVisible, setFutureCheckLimitModalVisible] = useState(false)

    let validerDeal;
    let _export;
    /**
     * load API
     */
    useEffect(() => {
        setTimeout(function () {
            if (!(futureList && futureList.length > 0)) {
                dispatch(loadFutureListAPI());
                dispatch(loadReferencesAPI());
            }
        })

    }, []);

    useEffect(function () {
        if (dealFutureModalVisible && rowDoubleClick)
            setDealFutureVisible(true)
    }, [dealFutureModalVisible])

    useEffect(function () {
        if (auditHistoriqueModalVisible && auditTrailClick)
            setModalVisible(true)
    }, [auditHistoriqueModalVisible])
    /**
     * update flitred list
     */
    useEffect(function () {
        setFiltredfutureList(futureList);
    }, [futureList])

    useEffect(function () {
        if (checkedLimitDealFuture && checkLimitClick)
            setFutureCheckLimitModalVisible(true)
    }, [checkedLimitDealFuture])

    function actualiser() {
        dispatch(loadFutureListAPI());
    }

    function setModalVisible(modalVisible) {
        setModalVisibles(modalVisible);
    }

    function setAvisVisible(avisVisible) {
        setAvisVisibles(avisVisible);
    }

    function callback(key) {
        if (key == 1) {
            setGridHeight('450px')
        } else {
            setGridHeight('590px')
        }
    }

    const [quickSearch, setQuickSearch] = useState("");
    const [filtredFutureList, setFiltredfutureList] = useState(futureList);
     function dealsFilterFunction(item){
        if(quickSearch=="") return true;
        var target = quickSearch.toUpperCase();
        return (item.broker.name.toUpperCase().indexOf(target)!=-1)
            ||(item.broker.shortName.toUpperCase().indexOf(target)!=-1)
            ||(item.contrat.label.toUpperCase().indexOf(target)!=-1)
            ||(item.updateUser.nom.toUpperCase().indexOf(target)!=-1)
            ||(item.updateUser.prenom.toUpperCase().indexOf(target)!=-1);
    }


    function quickSearch_changeHandler(event) {
            setQuickSearch(event);
            setFiltredfutureList(futureList.filter(dealsFilterFunction))
    }

    function handleAuditTrail() {
        dispatch(loadAuditHistoriqueAPI(selectedRow.dealId));
        setAuditTrailClick(true)
    }

    function handleRowDoubleClick(row) {
        dispatch(updateDealFutureFlag(true));
        setRowDoubleClick(true);
        dispatch(loadDealFutureAPI(selectedRow.dealId))
    }

    function setExportCsv(_exp) {
        _export = _exp;
    }

    function exportCsv() {
        _export.save();
    }

    //afficher popup pour ajouter un nouveau deal future
    function addNewDealFuture() {
        dispatch(updateDealFutureFlag(false))
        setDealFutureVisible(true);
    }

    function advancedSearch() {
        setShowAdvancedSearch(!showAdvancedSearch)
    }

    function onOkRemoveFuture() {
        dispatch(deleteFutureAPI({dealId: selectedRow.dealId}))
    }

    function removeFuture() {
        showDeleteConfirm(onOkRemoveFuture)
    }

    const deal = useSelector(dealFutureDealSelector);

    function onFinishDealForm() {
        if (validerDeal) {
            let dataToSend = prapareSaveDealFuture(true, deal)
            if (dataToSend)
                dispatch(editOrSaveDealFutureAPI(dataToSend, loadingValidateDealFuture, validateDealFutureSuccess, validateDealFutureError))

        } else {
            let dataToSend = prapareSaveDealFuture(validerDeal, deal)
            if (dataToSend)
                dispatch(editOrSaveDealFutureAPI(dataToSend, loadingUpdateDealFuture, updateDealFutureSuccess, updateDealFutureError))

        }

    }

    function updateOrSaveDealFuture() {
        validerDeal = false;
        dealForm.submit();
    }

    function validerDealFuture() {
        validerDeal = true;
        dealForm.submit();
        /* let dataToSend = prapareSaveDealFuture(true, deal)
         if (dataToSend)
             dispatch(editOrSaveDealFutureAPI(dataToSend, loadingValidateDealFuture, validateDealFutureSuccess, validateDealFutureError))
    */
    }

    function checkLimiteDealFuture() {
        let dataToSend = prapareSaveDealFuture(false, deal)
        if (dataToSend)
            dispatch(checkLimitDealFutureAPI(dataToSend))
        setCheckLimitClick(true);
    }


    function annulerDealFuture() {
        setDealFutureVisible(false);
    }

    function openticketConfirmation() {
        window.open(API_URL.SERVER_BASE_URL.concat(API_URL.CONFIRMATION_FUTURE).concat('?dealId=').concat(selectedRow.dealId), "_blank", "height=700,width=650,modal=yes,alwaysRaised=yes")
    }

    function canActivateTicketConfirmation() {
        if (deal.statut && deal.statut.statutId >= STATUT_VALIDE_TRADER) {
            return true;
            //CommonFunctions.hasRole("OPTION_CONFIRMATION");
        }
        return false;
    }

    return (
        <LayoutContentWrapper style={{height: '82vh'}}>
            <PageHeader>
                <BreadCrumb  element1={'FUTURE'} style={{width:'27%',marginBottom: '10px'}}></BreadCrumb>
            </PageHeader>
            <LayoutContent>
                <DataGrid selectedRow={selectedRow} heightGrid={gridHeight} setExportCsv={setExportCsv}
                          handleRowDoubleClick={row => handleRowDoubleClick(row)}
                          data={filtredFutureList}>

                    <FutureHeader {...{
                        removeFuture,
                        showAdvancedSearch,
                        advancedSearch,
                        auditHistoriqueLoading,
                        quickSearch_changeHandler,
                        referencesList, exportCsv,
                        setAvisVisible,
                        actualiser,
                        avisVisible,
                        addNewDealFuture,
                        selectedRow,
                        handleAuditTrail,
                        modalVisible,
                        setModalVisible
                    }} ></FutureHeader>
                    {

                        <AdvancedSearch style={{display: showAdvancedSearch ? '' : 'none'}} callback={callback}
                                        references={referencesList}></AdvancedSearch>
                    }

                </DataGrid>
            </LayoutContent>
            <CustomDialog
                className={"deal-future"}
                title={"DEAL FUTURE"}
                visible={dealFutureVisible}
                onOk={() => setDealFutureVisible(false)}
                onCancel={() => setDealFutureVisible(false)}
                centered
                footer={DealFutureFormFooter(validationFlag,updateFlag,canActivateTicketConfirmation,
                    openticketConfirmation,
                    loadCheckLimitDealFuture,
                    loadValidateDealFuture,
                    loadUpdateDealFuture,
                    updateOrSaveDealFuture,
                    checkLimiteDealFuture,
                    validerDealFuture,
                    annulerDealFuture)}
                width='70%'

            >
                <DealFuture onFinish={onFinishDealForm} form={dealForm} dealRefs={referencesDealList}
                            checkedLimitDealFuture={checkedLimitDealFuture}
                            setFutureCheckLimitModalVisible={setFutureCheckLimitModalVisible}
                            futureCheckLimitModalVisible={futureCheckLimitModalVisible} dealFutureData={dealFutureData}
                            references={referencesList}></DealFuture>
            </CustomDialog>
        </LayoutContentWrapper>
    );
}

export default (Future);

