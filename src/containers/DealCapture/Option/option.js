import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import LayoutContentWrapper from "../../../components/utility/layoutWrapper";
import LayoutContent from "../../../components/utility/layoutContent";
import DataGrid from "../../../components/uielements/option/gridOption.js";
import { userSelector } from "../../../redux/auth/authSlice";
import { ListReferencesSelector } from "../../../redux/references/ContratReferencesSlice";
import AdvancedSearch from "../../../components/uielements/option/AdvancedSearch";
import { DealOption } from "../../../components/uielements/option/dealoption/DealOption";
import {
  auditHistoriqueListLoadingSelector,
  checkedLimitDealOptionSelector,
  dealOptionDealSelector,
  dealOptionDetailSelector,
  dealOptionloadUpdateSelector,
  dealOptionloadValidateSelector,
  dealOptionReferencesSelector,
  dealOptionVisibleSelector,
  loadCheckLimitDealOptionSelector,
  OptionListSelector,
  optionSelectedRowSelector,
  updateFlagDealOptionSelector,
  validationFlagDealOptionSelector,
} from "../../../redux/dealCapture/selectors/OptionSelectors";
import {
  loadAuditHistoriqueAPI,
  loadDealOptionAPI,
  loadOptionListAPI,
  editOrSaveDealOptionAPI,
  checkLimitDealOptionAPI,
  deleteOptionAPI,
} from "../../../redux/dealCapture/rest/OptionRestCall";
import { loadReferencesAPI } from "../../../redux/references/ContratReferencesSlice";
import { OptionHeader } from "../../../components/uielements/option/OptionHeader";
import { BreadCrumb } from "../../../components/breadCrumb/BreadCrumb";
import "./optionStyle";
import CustomDialog, {
  showDeleteConfirm,
} from "../../../components/feedback/modal";
import DealOptionFormFooter from "../../../components/uielements/option/dealoption/DealOptionFormFooter";
import {
  updateDealOptionFlag,
  loadingUpdateDealOption,
  updateDealOptionError,
  validateDealOptionSuccess,
  validateDealOptionError,
  loadingValidateDealOption,
  updateDealOptionSuccess,
} from "../../../redux/dealCapture/option/DealOptionSlice";
import { prapareSaveDealOption } from "../../../components/uielements/option/OptionUtil";
import API_URL from "../../../config/api/API_URL";
import { Divider, Form } from "antd";
import { dealFutureReferencesSelector } from "../../../redux/dealCapture/selectors/FutureSelectors";
import {
  updateFlagDealSwapSelector,
  validationFlagDealSwapSelector,
} from "../../../redux/dealCapture/selectors/selectors";
import PageHeader from "../../../components/utility/pageHeader";
import UserService from "../../../keycloak/UserService";

export const STATUT_VALIDE_TRADER = 2;

function Option() {
  const dispatch = useDispatch();
  const [dealForm] = Form.useForm();
  /* -----------Selectors------------ */
  const user = useSelector(userSelector);
  const optionList = useSelector(OptionListSelector);
  const selectedRow = useSelector(optionSelectedRowSelector);
  const referencesList = useSelector(ListReferencesSelector);
  const referencesDealList = useSelector(dealOptionReferencesSelector);
  const dealOptionData = useSelector(dealOptionDetailSelector);
  const dealOptionModalVisible = useSelector(dealOptionVisibleSelector);
  const auditHistoriqueLoading = useSelector(
    auditHistoriqueListLoadingSelector
  );
  const auditHistoriqueModalVisible = useSelector(
    auditHistoriqueListLoadingSelector
  );
  const loadUpdateDealOption = useSelector(dealOptionloadUpdateSelector);
  const loadValidateDealOption = useSelector(dealOptionloadValidateSelector);
  const loadCheckLimitDealOption = useSelector(
    loadCheckLimitDealOptionSelector
  );
  const checkedLimitDealOption = useSelector(checkedLimitDealOptionSelector);
  const validationFlag = useSelector(validationFlagDealOptionSelector);
  const updateFlag = useSelector(updateFlagDealOptionSelector);

  /* -----------State------------ */
  //const [updateDealOptionFlag,setUpdateDealOptionFlag] = useState(false);
  const [targetKeys, setTargetKeys] = useState();
  const [modalVisible, setModalVisibles] = useState(false);
  const [avisVisible, setAvisVisibles] = useState(false);
  const [dealOptionVisible, setDealOptionVisible] = useState(false);
  const [rowDoubleClick, setRowDoubleClick] = useState(false);
  const [auditTrailClick, setAuditTrailClick] = useState(false);
  const [checkLimitClick, setCheckLimitClick] = useState(false);
  const [showAdvancedSearch, setShowAdvancedSearch] = useState(false);
  const [gridHeight, setGridHeight] = useState("570px");
  const [optionCheckLimitModalVisible, setOptionCheckLimitModalVisible] =
    useState(false);

  let validateDeal;
  let _export;
  /**
   * load API
   */
  useEffect(() => {
    setTimeout(function () {
      if (!(optionList && optionList.length > 0)) {
        dispatch(loadOptionListAPI());
        dispatch(loadReferencesAPI());
      }
    });
  }, []);

  useEffect(
    function () {
      if (dealOptionModalVisible && rowDoubleClick) setDealOptionVisible(true);
    },
    [dealOptionModalVisible]
  );

  useEffect(
    function () {
      if (auditHistoriqueModalVisible && auditTrailClick) setModalVisible(true);
    },
    [auditHistoriqueModalVisible]
  );
  /**
   * update flitred list
   */
  useEffect(
    function () {
      setFiltredoptionList(optionList);
    },
    [optionList]
  );

  useEffect(
    function () {
      if (checkedLimitDealOption && checkLimitClick)
        setOptionCheckLimitModalVisible(true);
    },
    [checkedLimitDealOption]
  );

  function actualiser() {
    dispatch(loadOptionListAPI());
  }

  function setModalVisible(modalVisible) {
    setModalVisibles(modalVisible);
  }

  function setAvisVisible(avisVisible) {
    setAvisVisibles(avisVisible);
  }

  function callback(key) {
    if (key == 1) {
      setGridHeight("450px");
    } else {
      setGridHeight("590px");
    }
  }

  const [quickSearch, setQuickSearch] = useState("");
  const [filtredOptionList, setFiltredoptionList] = useState(optionList);

  function dealsFilterFunction(item) {
    if (quickSearch == "") return true;
    var target = quickSearch.toUpperCase();
    var sj =
      item.natureOption == "F" ? item.contrat.sousJacent : item.sousJacent;
    return (
      item.tiers.name.toUpperCase().indexOf(target) != -1 ||
      item.tiers.shortName.toUpperCase().indexOf(target) != -1 ||
      sj.name.toUpperCase().indexOf(target) != -1 ||
      sj.shortName.toUpperCase().indexOf(target) != -1 ||
      item.updateUser.nom.toUpperCase().indexOf(target) != -1 ||
      item.updateUser.prenom.toUpperCase().indexOf(target) != -1
    );
  }

  function quickSearch_changeHandler(event) {
    // if (event && event.target) {
    setQuickSearch(event);
    setFiltredoptionList(optionList.filter(dealsFilterFunction));
    //    }
  }

  function handleAuditTrail() {
    dispatch(loadAuditHistoriqueAPI(selectedRow.dealId));
    setAuditTrailClick(true);
  }

  function handleRowDoubleClick(row) {
    dispatch(updateDealOptionFlag(true));
    setRowDoubleClick(true);
    dispatch(loadDealOptionAPI(selectedRow.dealId));
  }

  function setExportCsv(_exp) {
    _export = _exp;
  }

  function exportCsv() {
    _export.save();
  }

  //afficher popup pour ajouter un nouveau deal option
  function addNewDealOption() {
    //dispatch(updateDealOptionFlag(false))
    dispatch(updateDealOptionFlag(true));
    setRowDoubleClick(true);
    dispatch(loadDealOptionAPI());
    //setDealOptionVisible(true);
  }

  function advancedSearch() {
    setShowAdvancedSearch(!showAdvancedSearch);
  }

  function onOkRemoveOption() {
    dispatch(deleteOptionAPI({ dealId: selectedRow.dealId }));
  }

  function removeOption() {
    showDeleteConfirm(onOkRemoveOption);
  }

  const deal = useSelector(dealOptionDealSelector);

  function onFinishFormDeal() {
    console.log("onFinishFormDeal");
    if (validateDeal) {
      let dataToSend = prapareSaveDealOption(validateDeal, deal);
      if (dataToSend)
        dispatch(
          editOrSaveDealOptionAPI(
            dataToSend,
            loadingValidateDealOption,
            validateDealOptionSuccess,
            validateDealOptionError
          )
        );
    } else {
      let dataToSend = prapareSaveDealOption(false, deal);
      if (dataToSend)
        dispatch(
          editOrSaveDealOptionAPI(
            dataToSend,
            loadingUpdateDealOption,
            updateDealOptionSuccess,
            updateDealOptionError
          )
        );
    }
  }

  function updateOrSaveDealOption() {
    validateDeal = false;
    dealForm.submit();
  }

  function validerDealOption() {
    console.log("validerDealOption");
    validateDeal = true;
    dealForm.submit();
  }

  function checkLimiteDealOption() {
    dealForm.submit();
    let dataToSend = prapareSaveDealOption(false, deal);
    if (dataToSend) dispatch(checkLimitDealOptionAPI(dataToSend));
    setCheckLimitClick(true);
  }

  function annulerDealOption() {
    setDealOptionVisible(false);
  }

  function openticketConfirmation() {
    window.open(
      API_URL.SERVER_BASE_URL.concat(API_URL.CONFIRMATION_OPTION)
        .concat("?dealId=")
        .concat(selectedRow.dealId),
      "_blank",
      "height=700,width=650,modal=yes,alwaysRaised=yes"
    );
  }

  function canActivateTicketConfirmation() {
    if (deal.statut && deal.statut.statutId >= STATUT_VALIDE_TRADER) {
      return UserService.hasRole("OPTION_CONFIRMATION");
      //CommonFunctions.hasRole("OPTION_CONFIRMATION");
    }
    return false;
  }

  function confirmationValidation_clickHandler() {
    let param = {};
    param.dealId = selectedRow.dealId;
    param.validation = true;
    param.validationOnly = true;
    dispatch(
      editOrSaveDealOptionAPI(
        param,
        loadingValidateDealOption,
        validateDealOptionSuccess,
        validateDealOptionError
      )
    );
  }

  return (
    <LayoutContentWrapper style={{ height: "82vh" }}>
      <PageHeader>
        <BreadCrumb
          element1={"Option"}
          style={{ width: "27%", marginBottom: "10px" }}
        ></BreadCrumb>
      </PageHeader>
      <LayoutContent>
        <DataGrid
          selectedRow={selectedRow}
          heightGrid={gridHeight}
          setExportCsv={setExportCsv}
          handleRowDoubleClick={(row) => handleRowDoubleClick(row)}
          data={filtredOptionList}
        >
          <OptionHeader
            {...{
              confirmationValidation_clickHandler,
              removeOption,
              showAdvancedSearch,
              advancedSearch,
              auditHistoriqueLoading,
              quickSearch_changeHandler,
              referencesList,
              exportCsv,
              setAvisVisible,
              actualiser,
              avisVisible,
              addNewDealOption,
              selectedRow,
              handleAuditTrail,
              modalVisible,
              setModalVisible,
            }}
          ></OptionHeader>
          {
            <AdvancedSearch
              style={{ display: showAdvancedSearch ? "" : "none" }}
              callback={callback}
              references={referencesList}
            ></AdvancedSearch>
          }
        </DataGrid>
      </LayoutContent>
      <CustomDialog
        className={"deal-option"}
        title={"DEAL OPTION"}
        visible={dealOptionVisible}
        onOk={() => setDealOptionVisible(false)}
        onCancel={() => setDealOptionVisible(false)}
        centered
        footer={DealOptionFormFooter(
          validationFlag,
          updateFlag,
          canActivateTicketConfirmation,
          openticketConfirmation,
          loadCheckLimitDealOption,
          loadValidateDealOption,
          loadUpdateDealOption,
          updateOrSaveDealOption,
          checkLimiteDealOption,
          validerDealOption,
          annulerDealOption
        )}
        width="70%"
      >
        <DealOption
          onFinish={onFinishFormDeal}
          form={dealForm}
          checkedLimitDealOption={checkedLimitDealOption}
          setOptionCheckLimitModalVisible={setOptionCheckLimitModalVisible}
          optionCheckLimitModalVisible={optionCheckLimitModalVisible}
          dealOptionData={dealOptionData}
          references={referencesDealList}
        ></DealOption>
      </CustomDialog>
    </LayoutContentWrapper>
  );
}

export default Option;
