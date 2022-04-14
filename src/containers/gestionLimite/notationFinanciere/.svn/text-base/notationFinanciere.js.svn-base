import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import LayoutContentWrapper from '../../../components/utility/layoutWrapper';
import LayoutContent from '../../../components/utility/layoutContent';
import {Collapse} from 'antd';
import {Input, Select, Form, Row, Col, Modal, Breadcrumb} from 'antd';
import {NotationFinanciereGrid} from "../../../components/gestionLmite/notationFinanciere/NotationFinanciereGrid";
import {NotationFinanciereHeader} from "../../../components/gestionLmite/notationFinanciere/NotationFinanciereHeader";
import {
     loadNotationFinanciereDetailAPI,
    loadNotationFinanciereListAPI, loadNotationFinanciereReferencesAPI,
    removeNotationFinanciereAPI
} from "../../../redux/GestionDeLimite/notationFinanciere/RestCall";
import {
    detailSelector,
    NotationFinanciereDetailLoadingSelector,
    NotationFinanciereListSelector,
    NotationFinanciereSelectedRowSelector,
    loadingDetailSelector,
    NotationFinanciereRefSelector,
    NotationFinanciereRefLoadingSelector
} from "../../../redux/GestionDeLimite/notationFinanciere/Selectors";
import {PopUpDetailNotationFinanciere} from "../../../components/gestionLmite/notationFinanciere/detail/PopUpDetailNotationFinanciere";
import {useForm} from "antd/es/form/util";
import {showDeleteConfirm} from "../../../components/feedback/modal";
import {ListReferencesSelector} from "../../../redux/references/ContratReferencesSlice";
import {
    selectingGridNotationRow,
    selectingGridRow,
    updateDetail
} from "../../../redux/GestionDeLimite/notationFinanciere/notationFinanciereSlice";
import {NumberUtil} from "../../../helpers/Utils";
import {editOrSaveDealOptionAPI} from "../../../redux/dealCapture/rest/OptionRestCall";
import {PopUpNewNotationFinanciere} from "../../../components/gestionLmite/notationFinanciere/detail/PopUpNewNotationFinanciere";

const {Search} = Input;
const {Panel} = Collapse;


function NotationFinanciere() {

    /*-----------Form-------------*/
    const [formDetailNotationFinanciere] = useForm();
    /* -----------dispatch------------ */
    const dispatch = useDispatch();
    /* -----------vars------------ */

    /* -----------Selectors------------ */
    const notationFinanciereData = useSelector(NotationFinanciereListSelector);
    const updateFlag = true
    const loadUpdateNotationFinanciere = useSelector(NotationFinanciereDetailLoadingSelector)
    const selectedRow = useSelector(NotationFinanciereSelectedRowSelector);
    /* -----------State------------ */
    const [notationFinanciereList, setNotationFinanciereList] = useState([]);
    const [showPopUpDetail, setShowPopUpDetail] = useState(false)
    const referencesList = useSelector(ListReferencesSelector);

    const detail = useSelector(detailSelector)
    const loadingDetail = useSelector(loadingDetailSelector);
    const [showPopUpNewNotation, setShowPopUpNewNotation] = useState(false)

    const notationFinanciereRef = useSelector(NotationFinanciereRefSelector)
    const notationFinanciereRefloading = useSelector(NotationFinanciereRefLoadingSelector)
    const [rowDoubleClick,setRowDoubleClick] = useState(false)
    /* -----------Effect------------ */
    /**
     * load list notationFinanciere from API
     */
    useEffect(() => {
        if (!(notationFinanciereList && notationFinanciereList.length > 0)) {
            dispatch(loadNotationFinanciereListAPI());
            dispatch(loadNotationFinanciereReferencesAPI())
        }
    }, []);
    useEffect(() => {
        if (detail.id) {
            if(rowDoubleClick)
            setShowPopUpNewNotation(true)
        }
    }, [detail])

    useEffect(function () {
        setNotationFinanciereList([...notationFinanciereData]);
    }, [notationFinanciereData])


    function ajouterNotation(){
        dispatch(selectingGridRow(null))
        setShowPopUpNewNotation(true)
    }
    function actualiser() {
        dispatch(loadNotationFinanciereListAPI());
    }

    function updateOrSaveNotationFinanciere() {
        formDetailNotationFinanciere.submit()
    }

    /*function saveButton_clickHandler() {
        dispatch(editOrSaveDetailNotationFinanciereAPI({
        ...selectedRow
         }))
    }*/

    function handleRowDoubleClick() {
        setRowDoubleClick(true)
        dispatch(loadNotationFinanciereDetailAPI({
            id: selectedRow.id
        }))
    }


    function ajouter() {

        setShowPopUpDetail(true)
    }

    function saveButton_clickHandler(event) {
        /*   var param = {};
        if (selectedRow.id)
            param.id = selectedRow.id;
        param.sousJacentId = selectedRow.sousJacent.sousJacentId;
        param.maturity = selectedRow.maturity;
        param.fee = selectedRow.fee;
        dispatch(editOrSaveDetailNotationFinanciereAPI(param))*/
    }

    function removeSwap() {
        dispatch(removeNotationFinanciereAPI({
            id: selectedRow.id
        }))
    }

    function supprimer() {
        showDeleteConfirm(removeSwap)
    }


    function onChange(data) {
        const newData = formDetailNotationFinanciere.getFieldsValue();
        dispatch(updateDetail({
            ...detail,
            ...newData,
            tiers: {tiersId: newData.tiersId},
        }))
    }


    return (
        <LayoutContentWrapper style={{height: '82vh'}}>
            <NotationFinanciereHeader></NotationFinanciereHeader>
            <LayoutContent>

                <NotationFinanciereGrid
                    {
                        ...{
                            notationFinanciereRefloading,
                            notationFinanciereRef,
                            ajouterNotation,
                            handleRowDoubleClick,
                            actualiser,
                            notationFinanciereList,
                            ajouter,
                            supprimer,
                            selectedRow,
                            loadingDetail

                        }
                    }></NotationFinanciereGrid>

                <PopUpDetailNotationFinanciere
                    {
                        ...{
                            notationFinanciereRefloading,
                            notationFinanciereRef,
                            detail,
                            onChange,
                            onFinish: saveButton_clickHandler,
                            selectedRow,
                            form: formDetailNotationFinanciere,
                            loadUpdateNotationFinanciere,
                            updateFlag,
                            updateOrSaveNotationFinanciere,
                            setShowPopUpDetail,
                            showPopUpDetail,
                            referencesList
                        }
                    }

                ></PopUpDetailNotationFinanciere>
                <PopUpNewNotationFinanciere
                    detail={detail}
                    notationFinanciereRefloading={notationFinanciereRefloading}
                notationFinanciereRef={notationFinanciereRef}
                    showPopUp={showPopUpNewNotation}
                    setShowPopUp={setShowPopUpNewNotation}
                >

                </PopUpNewNotationFinanciere>
            </LayoutContent>
        </LayoutContentWrapper>

    );
}

export default NotationFinanciere;

