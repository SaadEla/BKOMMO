import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import LayoutContentWrapper from '../../../components/utility/layoutWrapper';
import LayoutContent from '../../../components/utility/layoutContent';
import {Collapse} from 'antd';
import {Input, Select, Form, Row, Col, Modal, Breadcrumb} from 'antd';
import {FeesGrid} from "../../../components/marketData/fees/FeesGrid";
import {FeesHeader} from "../../../components/marketData/fees/FeesHeader";
import {
    editOrSaveDetailFeesAPI,
    loadFeesListAPI,
    removeFeesAPI
} from "../../../redux/MarketData/fees/RestCall";
import {
    FeesDetailLoadingSelector,
    FeesListSelector,
    FeesSelectedRowSelector
} from "../../../redux/MarketData/fees/Selectors";
import {PopUpDetailFees} from "../../../components/marketData/fees/detail/PopUpDetailFees";
import {useForm} from "antd/es/form/util";
import {showDeleteConfirm} from "../../../components/feedback/modal";
import {ListReferencesSelector} from "../../../redux/references/ContratReferencesSlice";
import {selectingGridRow} from "../../../redux/MarketData/fees/feesSlice";
import {NumberUtil} from "../../../helpers/Utils";
import {editOrSaveDealOptionAPI} from "../../../redux/dealCapture/rest/OptionRestCall";

const {Search} = Input;
const {Panel} = Collapse;


function Fees() {

    /*-----------Form-------------*/
    const [formDetailFees] = useForm();
    /* -----------dispatch------------ */
    const dispatch = useDispatch();
    /* -----------vars------------ */

    /* -----------Selectors------------ */
    const feesData = useSelector(FeesListSelector);
    const updateFlag = true
    const loadUpdateFees = useSelector(FeesDetailLoadingSelector)
    const selectedRow = useSelector(FeesSelectedRowSelector);
    /* -----------State------------ */
    const [feesList, setFeesList] = useState([]);
    const [showPopUpDetail, setShowPopUpDetail] = useState(false)
    const referencesList = useSelector(ListReferencesSelector);

    /* -----------Effect------------ */
    /**
     * load list fees from API
     */
    useEffect(() => {
        if (!(feesList && feesList.length > 0)) {
            dispatch(loadFeesListAPI());
        }
    }, []);
    useEffect(function () {
        setFeesList([...feesData]);
    }, [feesData])


    function actualiser() {
        dispatch(loadFeesListAPI());
    }

    function updateOrSaveFees() {
        formDetailFees.submit()
    }

    /*function saveButton_clickHandler() {
        dispatch(editOrSaveDetailFeesAPI({
        ...selectedRow
         }))
    }*/

    function handleRowDoubleClick() {

        setShowPopUpDetail(true)
    }


    function ajouter() {
        dispatch(selectingGridRow(null))
        setShowPopUpDetail(true)
    }

    function saveButton_clickHandler(event) {
        var param = {};
        if (selectedRow.id)
            param.id = selectedRow.id;
        param.sousJacentId = selectedRow.sousJacent.sousJacentId;
        param.maturity = selectedRow.maturity;
        param.fee = selectedRow.fee;
        dispatch(editOrSaveDetailFeesAPI(param))
    }

    function removeSwap() {
        dispatch(removeFeesAPI({
            id: selectedRow.id
        }))
    }

    function supprimer() {
        showDeleteConfirm(removeSwap)
    }

    function findSousJacent(sousJacentId) {
        if (referencesList && referencesList.sousjacents)
            return referencesList.sousjacents.find(d => sousJacentId == d.sousJacentId);
    }

    function onChange(data) {
        const newData = formDetailFees.getFieldsValue()

        dispatch(selectingGridRow({
            ...selectedRow,
            ...newData,
            sousJacent: findSousJacent(newData.sousJacentId),
            //  quantiteUnitaire: parseFloat(String(newData.quantiteUnitaire).replace(/ /g, ""))
        }))
    }


    return (
        <LayoutContentWrapper style={{height: '82vh'}}>
            <FeesHeader></FeesHeader>
            <LayoutContent>

                <FeesGrid
                    {
                        ...{
                            handleRowDoubleClick,
                            actualiser,
                            feesList,
                            ajouter,
                            supprimer,
                            selectedRow

                        }
                    }></FeesGrid>

                <PopUpDetailFees
                    {
                        ...{
                            onChange,
                            onFinish: saveButton_clickHandler,
                            selectedRow,
                            form: formDetailFees,
                            loadUpdateFees,
                            updateFlag,
                            updateOrSaveFees,
                            setShowPopUpDetail,
                            showPopUpDetail,
                            referencesList
                        }
                    }

                ></PopUpDetailFees>
            </LayoutContent>
        </LayoutContentWrapper>

    );
}

export default Fees;

