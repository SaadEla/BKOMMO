import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import LayoutContentWrapper from '../../../components/utility/layoutWrapper';
import LayoutContent from '../../../components/utility/layoutContent';
import {Collapse} from 'antd';
import {Input, Select, Form, Row, Col, Modal, Breadcrumb} from 'antd';
import {SousJacentGrid} from "../../../components/marketData/sousJacent/SousJacentGrid";
import {SousJacentHeader} from "../../../components/marketData/sousJacent/SousJacentHeader";
import {
    editOrSaveDetailSousJacentAPI,
    loadSousJacentListAPI,
    removeSousJacentAPI
} from "../../../redux/MarketData/sousJacent/RestCall";
import {
    SousJacentDetailLoadingSelector,
    SousJacentListSelector,
    SousJacentSelectedRowSelector
} from "../../../redux/MarketData/sousJacent/Selectors";
import {PopUpDetailSousJacent} from "../../../components/marketData/sousJacent/detail/PopUpDetailSousJacent";
import {useForm} from "antd/es/form/util";
import {showDeleteConfirm} from "../../../components/feedback/modal";
import {ListReferencesSelector} from "../../../redux/references/ContratReferencesSlice";
import {selectingGridRow} from "../../../redux/MarketData/sousJacent/sousJacentSlice";
import {NumberUtil} from "../../../helpers/Utils";
import PageHeader from "../../../components/utility/pageHeader";
import {BreadCrumb} from "../../../components/breadCrumb/BreadCrumb";

const {Search} = Input;
const {Panel} = Collapse;


function SousJacent() {

    /*-----------Form-------------*/
    const [formDetailSousJacent] = useForm();
    /* -----------dispatch------------ */
    const dispatch = useDispatch();
    /* -----------vars------------ */

    /* -----------Selectors------------ */
    const sousJacentData = useSelector(SousJacentListSelector);
    const updateFlag = true
    const loadUpdateSousJacent = useSelector(SousJacentDetailLoadingSelector)
    const selectedRow = useSelector(SousJacentSelectedRowSelector);
    /* -----------State------------ */
    const [sousJacentList, setSousJacentList] = useState([]);
    const [showPopUpDetail, setShowPopUpDetail] = useState(false)
    const referencesList = useSelector(ListReferencesSelector);

    /* -----------Effect------------ */
    /**
     * load list sousJacent from API
     */
    useEffect(() => {
        if (!(sousJacentList && sousJacentList.length > 0)) {
            dispatch(loadSousJacentListAPI());
        }
    }, []);
    useEffect(function () {
        setSousJacentList([...sousJacentData]);
    }, [sousJacentData])


    function actualiser() {
        dispatch(loadSousJacentListAPI());
    }

    function updateOrSaveSousJacent() {
        formDetailSousJacent.submit()
    }

    /*function saveButton_clickHandler() {
        dispatch(editOrSaveDetailSousJacentAPI({
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
        /* let flagValidation=true;
         marketCombo.errorString = "";
         deviseCombo.errorString = "";
         uniteCombo.errorString = "";
         indexNameInput.errorString = "";
         futureNameInput.errorString = "";*/
        if (selectedRow.market.marketId == null) {
            //  selectedRow.marketCombo.errorString="Champ obligatoire!";
            // flagValidation = false;
        }
        if (selectedRow.devise.deviseId == null) {
            //  selectedRow.deviseCombo.errorString="Champ obligatoire!";
            //flagValidation = false;
        }
        if (selectedRow.unite.uniteId == null) {
            //selectedRow.uniteCombo.errorString="Champ obligatoire!";
            //flagValidation = false;
        }

        /*  var refFlag:Boolean=false;
          if((futureShortNameInput.text!=null)&&(futureShortNameInput.text!="")
              &&(futureNameInput.text!=null)&&(futureNameInput.text!="")){
              refFlag=true;
          }*/
        /*if((selectedRow.indexShortName!=null)&&(selectedRow.indexShortName!="")
            &&(indexNameInput.text!=null)&&(indexNameInput.text!="")){
            refFlag=true;
        }*/
        /*   if(refFlag==false){
               futureNameInput.errorString = "Future ou Basket index est obligatiore!";
               futureShortNameInput.errorString = "Future ou Basket index est obligatiore!";
               indexNameInput.errorString = "Future ou Basket index est obligatiore!";
               indexShortNameInput.errorString = "Future ou Basket index est obligatiore!";
               flagValidation = false;
           }*/

        /* var validationResult:Array = Validator.validateAll(validators);
         if(validationResult.length>0){
             flagValidation=false;
         }*/

        // if(flagValidation){
        let param = {};
        param.sousJacentId = selectedRow.sousJacentId;
        param.name = selectedRow.name;
        param.shortName = selectedRow.shortName;
        param.marketId = selectedRow.market.marketId;
        param.deviseId = selectedRow.devise.deviseId;
        param.cents = selectedRow.cents;
        param.uniteId = selectedRow.unite.uniteId;
        param.futureName = selectedRow.futureName;
        param.futureShortName = selectedRow.futureShortName;
        param.indexName = selectedRow.indexName;
        param.indexShortName = selectedRow.indexShortName;
        param.quantiteUnitaire = NumberUtil.Parse(selectedRow.quantiteUnitaire);
        //save_service.send(param);
        dispatch(editOrSaveDetailSousJacentAPI({
            ...param
        }))
        /*  }else{
              CommonFunctions.msgbox_error("Veuillez corriger les erreurs de saisie.")
          }*/

    }

    function removeSwap() {
            dispatch(removeSousJacentAPI({
                sousJacentId:selectedRow.sousJacentId
            }))
    }

    function supprimer() {
        showDeleteConfirm(removeSwap)
    }

    function onChange(data) {
        const newData = formDetailSousJacent.getFieldsValue()

        dispatch(selectingGridRow({
            ...selectedRow,
            ...newData,
            market: {marketId: newData.marketId},
            devise: {shortName: newData.deviseId},
            unite: {uniteId: newData.uniteId},
            quantiteUnitaire: parseFloat(String(newData.quantiteUnitaire).replace(/ /g, ""))
        }))
    }



    return (
        <LayoutContentWrapper style={{height: '82vh'}}>
            <PageHeader>
                <SousJacentHeader></SousJacentHeader>

            </PageHeader>
            <LayoutContent>

                <SousJacentGrid

                    {
                        ...{
                            handleRowDoubleClick,
                            actualiser,
                            sousJacentList,
                            ajouter,
                            supprimer,
                            selectedRow

                        }
                    }></SousJacentGrid>

                <PopUpDetailSousJacent
                    {
                        ...{
                            onChange,
                            onFinish: saveButton_clickHandler,
                            selectedRow,
                            form: formDetailSousJacent,
                            loadUpdateSousJacent,
                            updateFlag,
                            updateOrSaveSousJacent,
                            setShowPopUpDetail,
                            showPopUpDetail,
                            referencesList
                        }
                    }

                ></PopUpDetailSousJacent>
            </LayoutContent>
        </LayoutContentWrapper>

    );
}

export default SousJacent;

