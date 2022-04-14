import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import LayoutContentWrapper from '../../../components/utility/layoutWrapper';
import LayoutContent from '../../../components/utility/layoutContent';
import {Collapse} from 'antd';
import {Input} from 'antd';
import {ExternalUSDGrid} from "../../../components/gestionLmite/externalUSD/externalUSDGrid";
import {ExternalUSDGridHeader} from "../../../components/gestionLmite/externalUSD/externalUSDGridHeader";
import {
    editOrSaveDetailExternalUSDAPI,
    loadExternalUSDListAPI,
    removeExternalUSDAPI
} from "../../../redux/GestionDeLimite/externalUSD/RestCall";
import {
    ExternalUSDDetailLoadingSelector,
    ExternalUSDListSelector,
    ExternalUSDSelectedRowSelector
} from "../../../redux/GestionDeLimite/externalUSD/Selectors";
import {useForm} from "antd/es/form/util";
import {showDeleteConfirm} from "../../../components/feedback/modal";
import {ListReferencesSelector} from "../../../redux/references/ContratReferencesSlice";
import {selectingGridRow} from "../../../redux/GestionDeLimite/externalUSD/externalUSDSlice";
import {DateUtil, NumberUtil} from "../../../helpers/Utils";
import {ExternalUSDHeader} from "../../../components/gestionLmite/externalUSD/externalUSDHeader";

const {Search} = Input;
const {Panel} = Collapse;


function ExternalUSD() {

    /*-----------Form-------------*/
    const [formDetailExternalUSD] = useForm();
    /* -----------dispatch------------ */
    const dispatch = useDispatch();
    /* -----------vars------------ */

    /* -----------Selectors------------ */
    const externalUSDData = useSelector(ExternalUSDListSelector);
    const updateFlag = true
    const loadUpdateExternalUSD = useSelector(ExternalUSDDetailLoadingSelector)
    const selectedRow = useSelector(ExternalUSDSelectedRowSelector);
    /* -----------State------------ */
    const [externalUSDList, setExternalUSDList] = useState([]);
    const [showPopUpDetail, setShowPopUpDetail] = useState(false)
    const referencesList = useSelector(ListReferencesSelector);

    /* -----------Effect------------ */
    /**
     * load list externalUSD from API
     */
   /* useEffect(() => {
        if (!(externalUSDList && externalUSDList.length > 0)) {
            dispatch(loadExternalUSDListAPI());
        }
    }, []);*/
    useEffect(function () {
        setExternalUSDList([...externalUSDData]);
    }, [externalUSDData])


    function actualiser() {
        dispatch(loadExternalUSDListAPI());
    }

    function updateOrSaveExternalUSD() {
        formDetailExternalUSD.submit()
    }

    /*function saveButton_clickHandler() {
        dispatch(editOrSaveDetailExternalUSDAPI({
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
        dispatch(editOrSaveDetailExternalUSDAPI(param))
    }

    function removeSwap() {
        let param = {};
        param.id = selectedRow.id;
        param.jour = DateUtil.Format(selectedRow.jour,"DD/MM/YYYY");

      //  joursFeries.removeItemAt(joursFeries.getItemIndex(dg.selectedItem));
      //  delete_JourFeries_service.send(param);
        dispatch(removeExternalUSDAPI(param))
    }

    function supprimer() {
        showDeleteConfirm(removeSwap)
    }

    function findSousJacent(sousJacentId) {
        if (referencesList && referencesList.sousjacents)
            return referencesList.sousjacents.find(d => sousJacentId == d.sousJacentId);
    }

    function onChange(data) {
        const newData = formDetailExternalUSD.getFieldsValue()

        dispatch(selectingGridRow({
            ...selectedRow,
            ...newData,
            // sousJacent: findSousJacent(newData.sousJacentId),
            //  quantiteUnitaire: parseFloat(String(newData.quantiteUnitaire).replace(/ /g, ""))
        }))
    }


    return (
        <LayoutContentWrapper style={{height: '82vh'}}>

            <ExternalUSDHeader></ExternalUSDHeader>
            <LayoutContent>
                <ExternalUSDGrid

                    {
                        ...{
                            handleRowDoubleClick,
                            actualiser,
                            ExternalUSDList:externalUSDList,
                            ajouter,
                            supprimer,
                            selectedRow

                        }
                    }></ExternalUSDGrid>
            </LayoutContent>
        </LayoutContentWrapper>

    );
}

export default ExternalUSD;

