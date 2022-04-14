import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import LayoutContentWrapper from '../../../components/utility/layoutWrapper';
import LayoutContent from '../../../components/utility/layoutContent';
import {Collapse} from 'antd';
import {Input, Select, Form, Row, Col, Modal, Breadcrumb} from 'antd';
import {JoursFeriersGrid} from "../../../components/marketData/joursFeriers/JoursFeriersGrid";
import {JoursFeriersHeader} from "../../../components/marketData/joursFeriers/JoursFeriersHeader";
import {
    editOrSaveDetailJoursFeriersAPI,
    loadJoursFeriersListAPI,
    removeJoursFeriersAPI
} from "../../../redux/MarketData/joursFeriers/RestCall";
import {
    JoursFeriersDetailLoadingSelector,
    JoursFeriersListSelector,
    JoursFeriersSelectedRowSelector
} from "../../../redux/MarketData/joursFeriers/Selectors";
import {PopUpDetailJoursFeriers} from "../../../components/marketData/joursFeriers/detail/PopUpDetailJoursFeriers";
import {useForm} from "antd/es/form/util";
import {showDeleteConfirm} from "../../../components/feedback/modal";
import {ListReferencesSelector} from "../../../redux/references/ContratReferencesSlice";
import {selectingGridRow} from "../../../redux/MarketData/joursFeriers/joursFeriersSlice";
import {DateUtil, NumberUtil} from "../../../helpers/Utils";

const {Search} = Input;
const {Panel} = Collapse;


function JoursFeriers() {

    /*-----------Form-------------*/
    const [formDetailJoursFeriers] = useForm();
    /* -----------dispatch------------ */
    const dispatch = useDispatch();
    /* -----------vars------------ */

    /* -----------Selectors------------ */
    const joursFeriersData = useSelector(JoursFeriersListSelector);
    const updateFlag = true
    const loadUpdateJoursFeriers = useSelector(JoursFeriersDetailLoadingSelector)
    const selectedRow = useSelector(JoursFeriersSelectedRowSelector);
    /* -----------State------------ */
    const [joursFeriersList, setJoursFeriersList] = useState([]);
    const [showPopUpDetail, setShowPopUpDetail] = useState(false)
    const referencesList = useSelector(ListReferencesSelector);

    /* -----------Effect------------ */
    /**
     * load list joursFeriers from API
     */
    useEffect(() => {
        if (!(joursFeriersList && joursFeriersList.length > 0)) {
            dispatch(loadJoursFeriersListAPI());
        }
    }, []);
    useEffect(function () {
        setJoursFeriersList([...joursFeriersData]);
    }, [joursFeriersData])


    function actualiser() {
        dispatch(loadJoursFeriersListAPI());
    }

    function updateOrSaveJoursFeriers() {
        formDetailJoursFeriers.submit()
    }

    /*function saveButton_clickHandler() {
        dispatch(editOrSaveDetailJoursFeriersAPI({
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
        dispatch(editOrSaveDetailJoursFeriersAPI(param))
    }

    function removeSwap() {
        let param = {};
        param.id = selectedRow.id;
        param.jour = DateUtil.Format(selectedRow.jour,"DD/MM/YYYY");

      //  joursFeries.removeItemAt(joursFeries.getItemIndex(dg.selectedItem));
      //  delete_JourFeries_service.send(param);
        dispatch(removeJoursFeriersAPI(param))
    }

    function supprimer() {
        showDeleteConfirm(removeSwap)
    }

    function findSousJacent(sousJacentId) {
        if (referencesList && referencesList.sousjacents)
            return referencesList.sousjacents.find(d => sousJacentId == d.sousJacentId);
    }

    function onChange(data) {
        const newData = formDetailJoursFeriers.getFieldsValue()

        dispatch(selectingGridRow({
            ...selectedRow,
            ...newData,
            // sousJacent: findSousJacent(newData.sousJacentId),
            //  quantiteUnitaire: parseFloat(String(newData.quantiteUnitaire).replace(/ /g, ""))
        }))
    }


    return (
        <LayoutContentWrapper style={{height: '82vh'}}>
            <JoursFeriersHeader></JoursFeriersHeader>
            <LayoutContent>

                <JoursFeriersGrid
                    {
                        ...{
                            handleRowDoubleClick,
                            actualiser,
                            joursFeriersList,
                            ajouter,
                            supprimer,
                            selectedRow

                        }
                    }></JoursFeriersGrid>

                <PopUpDetailJoursFeriers
                    {
                        ...{
                            onChange,
                            onFinish: saveButton_clickHandler,
                            selectedRow,
                            form: formDetailJoursFeriers,
                            loadUpdateJoursFeriers,
                            updateFlag,
                            updateOrSaveJoursFeriers,
                            setShowPopUpDetail,
                            showPopUpDetail,
                            referencesList
                        }
                    }

                ></PopUpDetailJoursFeriers>
            </LayoutContent>
        </LayoutContentWrapper>

    );
}

export default JoursFeriers;

