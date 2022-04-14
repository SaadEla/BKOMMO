import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import LayoutContentWrapper from '../../../components/utility/layoutWrapper';
import LayoutContent from '../../../components/utility/layoutContent';
import {Collapse} from 'antd';
import {Input, Select, Form, Row, Col, Modal, Breadcrumb} from 'antd';
import {ContratGrid} from "../../../components/marketData/contrat/ContratGrid";
import {ContratHeader} from "../../../components/marketData/contrat/ContratHeader";
import {
    editOrSaveDetailContratAPI,
    loadContratListAPI,
    removeContratAPI
} from "../../../redux/MarketData/contrat/RestCall";
import {
    ContratDetailLoadingSelector,
    ContratListSelector,
    ContratSelectedRowSelector
} from "../../../redux/MarketData/contrat/Selectors";
import {PopUpDetailContrat} from "../../../components/marketData/contrat/detail/PopUpDetailContrat";
import {useForm} from "antd/es/form/util";
import {showDeleteConfirm} from "../../../components/feedback/modal";
import {ListReferencesSelector} from "../../../redux/references/ContratReferencesSlice";
import {selectingGridRow} from "../../../redux/MarketData/contrat/contratSlice";
import {DateUtil, NumberUtil} from "../../../helpers/Utils";
import {BreadCrumb} from "../../../components/breadCrumb/BreadCrumb";
import PageHeader from "../../../components/utility/pageHeader";

const {Search} = Input;
const {Panel} = Collapse;


function Contrat() {

    /*-----------Form-------------*/
    const [formDetailContrat] = useForm();
    /* -----------dispatch------------ */
    const dispatch = useDispatch();
    /* -----------vars------------ */

    /* -----------Selectors------------ */
    const contratData = useSelector(ContratListSelector);
    const updateFlag = true
    const loadUpdateContrat = useSelector(ContratDetailLoadingSelector)
    const selectedRow = useSelector(ContratSelectedRowSelector);
    /* -----------State------------ */
    const [contratList, setContratList] = useState([]);
    const [showPopUpDetail, setShowPopUpDetail] = useState(false)
    const referencesList = useSelector(ListReferencesSelector);

    /* -----------Effect------------ */
    /**
     * load list contrat from API
     */
    useEffect(() => {
        if (!(contratList && contratList.length > 0)) {
            dispatch(loadContratListAPI());
        }
    }, []);
    useEffect(function () {
        setContratList([...contratData]);
    }, [contratData])


    function actualiser() {
        dispatch(loadContratListAPI());
    }

    function updateOrSaveContrat() {
        formDetailContrat.submit()
    }

    /*function saveButton_clickHandler() {
        dispatch(editOrSaveDetailContratAPI({
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
        var param={};
        param.contratId = selectedRow.contratId;
        param.sousJacentId = selectedRow.sousJacent.sousJacentId
        param.maturity = DateUtil.Format(formDetailContrat.getFieldValue("maturity"),"DD/MM/YYYY");
        param.quantiteUnitaire = selectedRow.quantite;
        param.commission = selectedRow.commission;
        param.code = selectedRow.code;
        param.indexName = selectedRow.indexName;
        param.indexShortName = selectedRow.indexShortName;
        param.maturityRef=selectedRow.maturityRef;
        dispatch(editOrSaveDetailContratAPI({
            ...param
        }))

    }

    function removeSwap() {
        dispatch(removeContratAPI({
            contratId: selectedRow.contratId
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
        const newData = formDetailContrat.getFieldsValue()

        dispatch(selectingGridRow({
            ...selectedRow,
            ...newData,
            sousJacent: findSousJacent(newData.sousJacentId),
            quantiteUnitaire: parseFloat(String(newData.quantiteUnitaire).replace(/ /g, ""))
        }))
    }


    return (
        <LayoutContentWrapper style={{height: '82vh'}}>
            <PageHeader>
                <ContratHeader></ContratHeader>
            </PageHeader>
            <LayoutContent>

                <ContratGrid
                    {
                        ...{
                            handleRowDoubleClick,
                            actualiser,
                            contratList,
                            ajouter,
                            supprimer,
                            selectedRow

                        }
                    }></ContratGrid>

                <PopUpDetailContrat
                    {
                        ...{
                            onChange,
                            onFinish: saveButton_clickHandler,
                            selectedRow,
                            form: formDetailContrat,
                            loadUpdateContrat,
                            updateFlag,
                            updateOrSaveContrat,
                            setShowPopUpDetail,
                            showPopUpDetail,
                            referencesList
                        }
                    }

                ></PopUpDetailContrat>
            </LayoutContent>
        </LayoutContentWrapper>

    );
}

export default Contrat;

