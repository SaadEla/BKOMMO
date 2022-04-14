import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import LayoutContentWrapper from '../../../components/utility/layoutWrapper';
import LayoutContent from '../../../components/utility/layoutContent';
import {Collapse} from 'antd';
import {Input, Select, Form, Row, Col, Modal, Breadcrumb} from 'antd';
import {LimitSetupGrid} from "../../../components/gestionLmite/limitSetup/LimitSetupGrid";
import {LimitSetupHeader} from "../../../components/gestionLmite/limitSetup/LimitSetupHeader";
import {
    editOrSaveDetailLimitSetupAPI, loadLimitSetupDetailAPI,
    loadLimitSetupListAPI,
    removeLimitSetupAPI
} from "../../../redux/GestionDeLimite/limitSetup/RestCall";
import {
    detailSelector,
    LimitSetupDetailLoadingSelector,
    LimitSetupListSelector,
    LimitSetupSelectedRowSelector, loadingDetailSelector
} from "../../../redux/GestionDeLimite/limitSetup/Selectors";
import {PopUpDetailLimitSetup} from "../../../components/gestionLmite/limitSetup/detail/PopUpDetailLimitSetup";
import {useForm} from "antd/es/form/util";
import {showDeleteConfirm} from "../../../components/feedback/modal";
import {ListReferencesSelector} from "../../../redux/references/ContratReferencesSlice";
import {initDetail,updateDetail} from "../../../redux/GestionDeLimite/limitSetup/limitSetupSlice";

const {Search} = Input;
const {Panel} = Collapse;


function LimitSetup() {

    /*-----------Form-------------*/
    const [formDetailLimitSetup] = useForm();
    /* -----------dispatch------------ */
    const dispatch = useDispatch();
    /* -----------vars------------ */

    /* -----------Selectors------------ */
    const limitSetupData = useSelector(LimitSetupListSelector);
    const updateFlag = true
    const loadUpdateLimitSetup = useSelector(LimitSetupDetailLoadingSelector)
    const selectedRow = useSelector(LimitSetupSelectedRowSelector);
    /* -----------State------------ */
    const [limitSetupList, setLimitSetupList] = useState([]);
    const [showPopUpDetail, setShowPopUpDetail] = useState(false)
    const referencesList = useSelector(ListReferencesSelector);

    const detail = useSelector(detailSelector)
    const loadingDetail = useSelector(loadingDetailSelector)
    const [rowDoubleClick,setRowDoubleClick] = useState(false)
    /* -----------Effect------------ */
    /**
     * load list limitSetup from API
     */
    useEffect(() => {
        if (!(limitSetupList && limitSetupList.length > 0)) {
            dispatch(loadLimitSetupListAPI());
        }
    }, []);
    useEffect(() => {
        if (detail.id) {
            if(rowDoubleClick)
            setShowPopUpDetail(true)
        }
    }, [detail])
    useEffect(function () {
        setLimitSetupList([...limitSetupData]);
    }, [limitSetupData])


    function actualiser() {
        dispatch(loadLimitSetupListAPI());
    }

    function updateOrSaveLimitSetup() {
        formDetailLimitSetup.submit()
    }

    /*function saveButton_clickHandler() {
        dispatch(editOrSaveDetailLimitSetupAPI({
        ...selectedRow
         }))
    }*/

    function handleRowDoubleClick() {
        setRowDoubleClick(true)
        dispatch(loadLimitSetupDetailAPI({
            id: selectedRow.id
        }))
        //  setShowPopUpDetail(true)
    }

    function ajouter() {
        formDetailLimitSetup.resetFields()
        dispatch(initDetail(null))
        setShowPopUpDetail(true)
    }

    function saveButton_clickHandler(event) {
        console.log("nnnnnnnnnnnn",formDetailLimitSetup.getFieldsValue())
        /*   var param = {};
        if (selectedRow.id)
            param.id = selectedRow.id;
        param.sousJacentId = selectedRow.sousJacent.sousJacentId;
        param.maturity = selectedRow.maturity;
        param.fee = selectedRow.fee;
        dispatch(editOrSaveDetailLimitSetupAPI(param))*/
    }

    function removeSwap() {
        dispatch(removeLimitSetupAPI({
            id: selectedRow.id
        }))
    }

    function supprimer() {
        showDeleteConfirm(removeSwap)
    }


    function onChange(data) {
        const newData = formDetailLimitSetup.getFieldsValue();
        dispatch(updateDetail({
            ...newData
        }))
    }


    return (
        <LayoutContentWrapper style={{height: '82vh'}}>
            <LimitSetupHeader></LimitSetupHeader>
            <LayoutContent>

                <LimitSetupGrid
                    {
                        ...{
                            handleRowDoubleClick,
                            actualiser,
                            limitSetupList,
                            ajouter,
                            supprimer,
                            selectedRow,
                            loadingDetail

                        }
                    }></LimitSetupGrid>

                <PopUpDetailLimitSetup
                    {
                        ...{
                            detail,
                            onChange,
                            onFinish: saveButton_clickHandler,
                            selectedRow,
                            form: formDetailLimitSetup,
                            loadUpdateLimitSetup,
                            updateFlag,
                            updateOrSaveLimitSetup,
                            setShowPopUpDetail,
                            showPopUpDetail,
                            referencesList
                        }
                    }

                ></PopUpDetailLimitSetup>
            </LayoutContent>
        </LayoutContentWrapper>

    );
}

export default LimitSetup;

