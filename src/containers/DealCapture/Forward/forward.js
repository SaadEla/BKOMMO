import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import LayoutContentWrapper from "../../../components/utility/layoutWrapper";
import LayoutContent from "../../../components/utility/layoutContent";
import DataGrid from "../../../components/uielements/forward/gridForward.js";
import { userSelector } from "../../../redux/auth/authSlice";
import { ListReferencesSelector } from "../../../redux/references/ContratReferencesSlice";
import AdvancedSearch from "../../../components/uielements/forward/AdvancedSearch";
import { DealForward } from "../../../components/uielements/forward/dealforward/DealForward";
import {
  auditHistoriqueListLoadingSelector,
  checkedLimitDealForwardSelector,
  dealForwardDealSelector,
  dealForwardDetailSelector,
  dealForwardloadUpdateSelector,
  dealForwardloadValidateSelector,
  dealForwardVisibleSelector,
  loadCheckLimitDealForwardSelector,
  ForwardListSelector,
  forwardSelectedRowSelector,
  updateFlagDealForwardSelector,
  validationFlagDealForwardSelector,
  loadCheckPositionSelector,
  showtitleDenouementSelector,
} from "../../../redux/dealCapture/selectors/ForwardSelectors";
import {
  loadAuditHistoriqueAPI,
  loadDealForwardAPI,
  loadForwardListAPI,
  editOrSaveDealForwardAPI,
  checkLimitDealForwardAPI,
  deleteForwardAPI,
} from "../../../redux/dealCapture/rest/ForwardRestCall";
import { loadReferencesAPI } from "../../../redux/references/ContratReferencesSlice";
import { ForwardHeader } from "../../../components/uielements/forward/ForwardHeader";
import { BreadCrumb } from "../../../components/breadCrumb/BreadCrumb";
import "./forwardStyle";
import CustomDialog, {
  showDeleteConfirm,
} from "../../../components/feedback/modal";
import DealForwardFormFooter from "../../../components/uielements/forward/dealforward/DealForwardFormFooter";
import {
  updateDealForwardFlag,
  loadingUpdateDealForward,
  updateDealForwardError,
  validateDealForwardSuccess,
  validateDealForwardError,
  loadingValidateDealForward,
  updateDealForwardSuccess,
  clearDealForward,
} from "../../../redux/dealCapture/forward/DealForwardSlice";
import { prapareSaveDealForward } from "../../../components/uielements/forward/ForwardUtil";
import API_URL from "../../../config/api/API_URL";
import { Divider, Form } from "antd";
import { dealForwardReferencesSelector } from "../../../redux/dealCapture/selectors/ForwardSelectors";
import { process } from "@progress/kendo-data-query";
import { dealFutureReferencesSelector } from "../../../redux/dealCapture/selectors/FutureSelectors";
import { editOrSaveDealOptionAPI } from "../../../redux/dealCapture/rest/OptionRestCall";
import {
  loadingValidateDealOption,
  validateDealOptionError,
  validateDealOptionSuccess,
} from "../../../redux/dealCapture/option/DealOptionSlice";
import { STATUT_VALIDE_TRADER } from "../Option/option";
import {
  updateFlagDealSwapSelector,
  validationFlagDealSwapSelector,
} from "../../../redux/dealCapture/selectors/selectors";
import PageHeader from "../../../components/utility/pageHeader";
import UserService from "../../../keycloak/UserService";

function Forward() {
  const dispatch = useDispatch();
  const [dealForm] = Form.useForm();
  /* -----------Selectors------------ */

  const user = useSelector(userSelector);
  const forwardList = useSelector(ForwardListSelector);
  const selectedRow = useSelector(forwardSelectedRowSelector);
  const referencesList = useSelector(ListReferencesSelector);
  const referencesDealList = useSelector(dealForwardReferencesSelector);

  const dealForwardData = useSelector(dealForwardDetailSelector);
  const dealForwardModalVisible = useSelector(dealForwardVisibleSelector);
  const auditHistoriqueLoading = useSelector(
    auditHistoriqueListLoadingSelector
  );
  const auditHistoriqueModalVisible = useSelector(
    auditHistoriqueListLoadingSelector
  );
  const loadUpdateDealForward = useSelector(dealForwardloadUpdateSelector);
  const loadValidateDealForward = useSelector(dealForwardloadValidateSelector);
  const loadCheckLimitDealForward = useSelector(
    loadCheckLimitDealForwardSelector
  );
  const checkedLimitDealForward = useSelector(checkedLimitDealForwardSelector);
  const validationFlag = useSelector(validationFlagDealForwardSelector);
  const updateFlag = useSelector(updateFlagDealForwardSelector);

  /* -----------State------------ */
  //const [updateDealForwardFlag,setUpdateDealForwardFlag] = useState(false);
  const [targetKeys, setTargetKeys] = useState();
  const [modalVisible, setModalVisibles] = useState(false);
  const [avisVisible, setAvisVisibles] = useState(false);
  const [dealForwardVisible, setDealForwardVisible] = useState(false);
  const [rowDoubleClick, setRowDoubleClick] = useState(false);
  const [auditTrailClick, setAuditTrailClick] = useState(false);
  const [checkLimitClick, setCheckLimitClick] = useState(false);
  const [showAdvancedSearch, setShowAdvancedSearch] = useState(false);
  const [gridHeight, setGridHeight] = useState("570px");
  const [forwardCheckLimitModalVisible, setForwardCheckLimitModalVisible] =
    useState(false);
  const loadCheckPosition = useSelector(loadCheckPositionSelector);

  let validerDeal;
  let _export;
  /**
   * load API
   */
  useEffect(() => {
    setTimeout(function () {
      if (!(forwardList && forwardList.length > 0)) {
        dispatch(loadForwardListAPI());
        dispatch(loadReferencesAPI());
      }
    });
  }, []);

  useEffect(
    function () {
      if (dealForwardModalVisible && rowDoubleClick)
        setDealForwardVisible(true);
    },
    [dealForwardModalVisible]
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
      setFiltredforwardList(forwardList);
    },
    [forwardList]
  );

  useEffect(
    function () {
      if (checkedLimitDealForward && checkLimitClick)
        setForwardCheckLimitModalVisible(true);
    },
    [checkedLimitDealForward]
  );

  function actualiser() {
    dispatch(loadForwardListAPI());
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
  const [filtredForwardList, setFiltredforwardList] = useState(forwardList);

  function dealsFilterFunction(item) {
    if (!quickSearch) return true;
    var target = quickSearch.toUpperCase();
    return (
      (item.contrepartie.name &&
        item.contrepartie.name.toUpperCase().indexOf(target) != -1) ||
      (item.contrepartie.shortName &&
        item.contrepartie.shortName.toUpperCase().indexOf(target) != -1) ||
      (item.contrat.label &&
        item.contrat.label.toUpperCase().indexOf(target) != -1) ||
      (item.updateUser.nom &&
        item.updateUser.nom.toUpperCase().indexOf(target) != -1) ||
      (item.updateUser.prenom &&
        item.updateUser.prenom.toUpperCase().indexOf(target) != -1)
    );
  }

  function quickSearch_changeHandler(event) {
    //  if (event && event.target) {
    setQuickSearch(event);
    //  setFiltredforwardList(onFilter());
    setFiltredforwardList(forwardList.filter(dealsFilterFunction));
    //    }
  }

  function handleAuditTrail() {
    dispatch(loadAuditHistoriqueAPI(selectedRow.dealId));
    setAuditTrailClick(true);
  }

  function handleRowDoubleClick(row) {
    dispatch(updateDealForwardFlag(true));
    setRowDoubleClick(true);
    dispatch(loadDealForwardAPI(selectedRow.dealId));
  }

  function setExportCsv(_exp) {
    _export = _exp;
  }

  function exportCsv() {
    _export.save();
  }

  //afficher popup pour ajouter un nouveau deal forward
  function addNewDealForward() {
    dispatch(updateDealForwardFlag(false));
    // setDealForwardVisible(true);
    setRowDoubleClick(true);
    dispatch(loadDealForwardAPI());
  }

  function advancedSearch() {
    setShowAdvancedSearch(!showAdvancedSearch);
  }

  function onOkRemoveForward() {
    dispatch(deleteForwardAPI({ dealId: selectedRow.dealId }));
  }

  function removeForward() {
    showDeleteConfirm(onOkRemoveForward);
  }

  const deal = useSelector(dealForwardDealSelector);

  function updateOrSaveDealForward() {
    validerDeal = false;
    dealForm.submit();
    /*   let dataToSend = prapareSaveDealForward(false, deal)
        if (dataToSend)
            dispatch(editOrSaveDealForwardAPI(dataToSend, loadingUpdateDealForward, updateDealForwardSuccess, updateDealForwardError))
   */
  }
  function onFinishFormDeal() {
    if (validerDeal) {
      let dataToSend = prapareSaveDealForward(true, deal);
      if (dataToSend)
        dispatch(
          editOrSaveDealForwardAPI(
            dataToSend,
            loadingValidateDealForward,
            validateDealForwardSuccess,
            validateDealForwardError
          )
        );
    } else {
      let dataToSend = prapareSaveDealForward(false, deal);
      if (dataToSend)
        dispatch(
          editOrSaveDealForwardAPI(
            dataToSend,
            loadingUpdateDealForward,
            updateDealForwardSuccess,
            updateDealForwardError
          )
        );
    }
  }
  function validerDealForward() {
    validerDeal = true;
    dealForm.submit();
  }
  function checkLimiteDealForward() {
    dealForm.submit();
    let dataToSend = prapareSaveDealForward(false, deal);
    if (dataToSend) dispatch(checkLimitDealForwardAPI(dataToSend));
    setCheckLimitClick(true);
  }

  function annulerDealForward() {
    setDealForwardVisible(false);
  }

  function openticketConfirmation() {
    window.open(
      API_URL.SERVER_BASE_URL.concat(API_URL.CONFIRMATION_FORWARD)
        .concat("?dealId=")
        .concat(selectedRow.dealId),
      "_blank",
      "height=700,width=650,modal=yes,alwaysRaised=yes"
    );
  }

  function confirmationValidation_clickHandler() {
    let param = {};
    param.dealId = selectedRow.dealId;
    param.validation = true;
    param.validationOnly = true;
    dispatch(
      editOrSaveDealForwardAPI(
        param,
        loadingValidateDealForward,
        validateDealForwardSuccess,
        validateDealForwardError
      )
    );

    //  dispatch(editOrSaveDealOptionAPI(param, loadingValidateDealOption, validateDealOptionSuccess, validateDealOptionError))
  }

  function canActivateTicketConfirmation() {
    if (deal.statut && deal.statut.statutId >= STATUT_VALIDE_TRADER) {
      return UserService.hasRole("FORWARD_CONFIRMATION");
      //CommonFunctions.hasRole("OPTION_CONFIRMATION");
    }
    return false;
  }
  function avisSettlementButton_clickHandler(event) {
    window.open(
      API_URL.SERVER_BASE_URL.concat(API_URL.AVISSETTLEMENT_FORWARD)
        .concat("?dealId=")
        .concat(selectedRow.dealId),
      "_blank",
      "height=700,width=650,modal=yes,alwaysRaised=yes"
    );
  }

  return (
    <LayoutContentWrapper style={{ height: "82vh" }}>
      <PageHeader>
        <BreadCrumb
          element1={"FORWARD"}
          style={{ width: "27%", marginBottom: "10px" }}
        ></BreadCrumb>
      </PageHeader>
      <LayoutContent>
        <DataGrid
          selectedRow={selectedRow}
          heightGrid={gridHeight}
          setExportCsv={setExportCsv}
          handleRowDoubleClick={(row) => handleRowDoubleClick(row)}
          data={filtredForwardList}
        >
          <ForwardHeader
            {...{
              confirmationValidation_clickHandler,
              removeForward,
              showAdvancedSearch,
              advancedSearch,
              auditHistoriqueLoading,
              quickSearch_changeHandler,
              referencesList,
              exportCsv,
              setAvisVisible,
              actualiser,
              avisVisible,
              addNewDealForward,
              selectedRow,
              handleAuditTrail,
              modalVisible,
              setModalVisible,
            }}
          ></ForwardHeader>
          {
            <AdvancedSearch
              style={{ display: showAdvancedSearch ? "" : "none" }}
              callback={callback}
              references={referencesList}
            ></AdvancedSearch>
          }
        </DataGrid>
      </LayoutContent>
      {dealForwardVisible ? (
        <CustomDialog
          className={"deal-forward"}
          title={"DEAL FORWARD - ".concat(
            deal.soultes && deal.soultes.length > 0
              ? "D??nouement"
              : loadCheckPosition
              ? "Calcul D??nouement ..."
              : "Initiation"
          )}
          visible={dealForwardVisible}
          onOk={() => setDealForwardVisible(false)}
          onCancel={() => {
            setDealForwardVisible(false);
            dispatch(clearDealForward({}));
          }}
          centered
          footer={DealForwardFormFooter(
            loadCheckPosition,
            avisSettlementButton_clickHandler,
            deal.soultes,
            validationFlag,
            updateFlag,
            canActivateTicketConfirmation,
            openticketConfirmation,
            loadCheckLimitDealForward,
            loadValidateDealForward,
            loadUpdateDealForward,
            updateOrSaveDealForward,
            checkLimiteDealForward,
            validerDealForward,
            annulerDealForward
          )}
          width="70%"
        >
          <DealForward
            onFinish={onFinishFormDeal}
            form={dealForm}
            checkedLimitDealForward={checkedLimitDealForward}
            setForwardCheckLimitModalVisible={setForwardCheckLimitModalVisible}
            forwardCheckLimitModalVisible={forwardCheckLimitModalVisible}
            dealForwardData={dealForwardData}
            references={
              referencesDealList ? referencesDealList : referencesList
            }
          ></DealForward>
        </CustomDialog>
      ) : null}
    </LayoutContentWrapper>
  );
}

export default Forward;
