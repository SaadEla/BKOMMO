import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import LayoutContentWrapper from '../../../components/utility/layoutWrapper';
import LayoutContent from '../../../components/utility/layoutContent';
import {Collapse} from 'antd';
import {Input} from 'antd';
import {ExpReportGrid} from "../../../components/gestionLmite/expositionReport/expReportGrid";
import {ExpReportGridHeader} from "../../../components/gestionLmite/expositionReport/expReportGridHeader";
import {
    editOrSaveDetailExpReportAPI,
    loadExpReportListAPI,
    removeExpReportAPI
} from "../../../redux/GestionDeLimite/expReport/RestCall";
import {
    ExpReportDetailLoadingSelector,
    ExpReportListSelector,
    ExpReportSelectedRowSelector
} from "../../../redux/GestionDeLimite/expReport/Selectors";
import {useForm} from "antd/es/form/util";
import {showDeleteConfirm} from "../../../components/feedback/modal";
import {ListReferencesSelector} from "../../../redux/references/ContratReferencesSlice";
import {selectingGridRow} from "../../../redux/GestionDeLimite/expReport/expReportSlice";
import {DateUtil, NumberUtil} from "../../../helpers/Utils";
import {ExpReportHeader} from "../../../components/gestionLmite/expositionReport/expReportHeader";

const {Search} = Input;
const {Panel} = Collapse;


function ExpReport() {

    /*-----------Form-------------*/
    const [formDetailExpReport] = useForm();
    /* -----------dispatch------------ */
    const dispatch = useDispatch();
    /* -----------vars------------ */

    /* -----------Selectors------------ */
    const expReportData = useSelector(ExpReportListSelector);
    const updateFlag = true
    const loadUpdateExpReport = useSelector(ExpReportDetailLoadingSelector)
    const selectedRow = useSelector(ExpReportSelectedRowSelector);
    /* -----------State------------ */
    const [expReportList, setExpReportList] = useState([]);
    const [showPopUpDetail, setShowPopUpDetail] = useState(false)
    const referencesList = useSelector(ListReferencesSelector);

    /* -----------Effect------------ */
    /**
     * load list expReport from API
     */
   /* useEffect(() => {
        if (!(expReportList && expReportList.length > 0)) {
            dispatch(loadExpReportListAPI());
        }
    }, []);*/
    useEffect(function () {
        setExpReportList([...expReportData]);
    }, [expReportData])


    function actualiser() {
        dispatch(loadExpReportListAPI());
    }

    function updateOrSaveExpReport() {
        formDetailExpReport.submit()
    }

    /*function saveButton_clickHandler() {
        dispatch(editOrSaveDetailExpReportAPI({
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
        param.marketId = selectedRow.marketId;
        param.jour = DateUtil.Format(selectedRow.jour,"DD/MM/YYYY");
        param.commentaire = selectedRow.commentaire;
        param.recurrent = selectedRow.recurrent;
        dispatch(editOrSaveDetailExpReportAPI(param))
    }

    function removeSwap() {
        let param = {};
        param.id = selectedRow.id;
        param.jour = DateUtil.Format(selectedRow.jour,"DD/MM/YYYY");

      //  joursFeries.removeItemAt(joursFeries.getItemIndex(dg.selectedItem));
      //  delete_JourFeries_service.send(param);
        dispatch(removeExpReportAPI(param))
    }

    function supprimer() {
        showDeleteConfirm(removeSwap)
    }

    function findSousJacent(sousJacentId) {
        if (referencesList && referencesList.sousjacents)
            return referencesList.sousjacents.find(d => sousJacentId == d.sousJacentId);
    }

    function onChange(data) {
        const newData = formDetailExpReport.getFieldsValue()

        dispatch(selectingGridRow({
            ...selectedRow,
            ...newData,
            // sousJacent: findSousJacent(newData.sousJacentId),
            //  quantiteUnitaire: parseFloat(String(newData.quantiteUnitaire).replace(/ /g, ""))
        }))
    }


    return (
        <LayoutContentWrapper style={{height: '82vh'}}>

            <ExpReportHeader></ExpReportHeader>
            <LayoutContent>
                <ExpReportGrid

                    {
                        ...{
                            handleRowDoubleClick,
                            actualiser,
                            ExpReportList:expReportList,
                            ajouter,
                            supprimer,
                            selectedRow

                        }
                    }></ExpReportGrid>
            </LayoutContent>
        </LayoutContentWrapper>

    );
}

export default ExpReport;

