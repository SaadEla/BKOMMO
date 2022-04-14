import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import LayoutContentWrapper from "../../../components/utility/layoutWrapper";
import LayoutContent from "../../../components/utility/layoutContent";
import DataGrid from "../../../components/uielements/swap/gridSwap.js";
import { userSelector } from "../../../redux/auth/authSlice";
import { ListReferencesSelector } from "../../../redux/references/ContratReferencesSlice";
import AdvancedSearch from "../../../components/uielements/swap/AdvancedSearch";
import { DealSwap } from "../../../components/uielements/swap/dealswap/DealSwap";
import {
  auditHistoriqueListLoadingSelector,
  checkedLimitDealSwapSelector,
  dealSwapDealSelector,
  dealSwapDetailSelector,
  dealSwaploadUpdateSelector,
  dealSwaploadValidateSelector,
  dealSwapVisibleSelector,
  loadCheckLimitDealSwapSelector,
  SwapListSelector,
  swapSelectedRowSelector,
  updateFlagDealSwapSelector,
  validationFlagDealSwapSelector,
} from "../../../redux/dealCapture/selectors/selectors";
import {
  loadAuditHistoriqueAPI,
  loadDealSwapAPI,
  loadSwapListAPI,
  editOrSaveDealSwapAPI,
  checkLimitDealSwapAPI,
  deleteSwapAPI,
} from "../../../redux/dealCapture/rest/RestCall";
import { loadReferencesAPI } from "../../../redux/references/ContratReferencesSlice";
import { SwapHeader } from "../../../components/uielements/swap/SwapHeader";
import { BreadCrumb } from "../../../components/breadCrumb/BreadCrumb";
import "./swapStyle";
import CustomDialog, {
  showDeleteConfirm,
} from "../../../components/feedback/modal";
import DealSwapFormFooter from "../../../components/uielements/swap/dealswap/DealSwapFormFooter";
import {
  updateDealSwapFlag,
  loadingUpdateDealSwap,
  updateDealSwapError,
  validateDealSwapSuccess,
  validateDealSwapError,
  loadingValidateDealSwap,
  updateDealSwapSuccess,
} from "../../../redux/dealCapture/swap/DealSwapSlice";
import { prapareSaveDealSwap } from "../../../components/uielements/swap/SwapUtil";
import API_URL from "../../../config/api/API_URL";
import { Divider, Form } from "antd";
import { STATUT_VALIDE_TRADER } from "../Option/option";
import PageHeader from "../../../components/utility/pageHeader";
import UserService from "../../../keycloak/UserService";

function Swap() {
  const dispatch = useDispatch();
  const [dealForm] = Form.useForm();
  /* -----------Selectors------------ */
  const user = useSelector(userSelector);
  const swapList = useSelector(SwapListSelector);
  const selectedRow = useSelector(swapSelectedRowSelector);
  const referencesList = useSelector(ListReferencesSelector);
  const dealSwapData = useSelector(dealSwapDetailSelector);
  const dealSwapModalVisible = useSelector(dealSwapVisibleSelector);
  const auditHistoriqueLoading = useSelector(
    auditHistoriqueListLoadingSelector
  );
  const auditHistoriqueModalVisible = useSelector(
    auditHistoriqueListLoadingSelector
  );
  const loadUpdateDealSwap = useSelector(dealSwaploadUpdateSelector);
  const loadValidateDealSwap = useSelector(dealSwaploadValidateSelector);
  const loadCheckLimitDealSwap = useSelector(loadCheckLimitDealSwapSelector);
  const checkedLimitDealSwap = useSelector(checkedLimitDealSwapSelector);
  /* -----------State------------ */
  //const [updateDealSwapFlag,setUpdateDealSwapFlag] = useState(false);
  const [targetKeys, setTargetKeys] = useState();
  const [modalVisible, setModalVisibles] = useState(false);
  const [avisVisible, setAvisVisibles] = useState(false);
  const [dealSwapVisible, setDealSwapVisible] = useState(false);
  const [rowDoubleClick, setRowDoubleClick] = useState(false);
  const [auditTrailClick, setAuditTrailClick] = useState(false);
  const [checkLimitClick, setCheckLimitClick] = useState(false);
  const [showAdvancedSearch, setShowAdvancedSearch] = useState(false);
  const [gridHeight, setGridHeight] = useState("570px");
  const [swapCheckLimitModalVisible, setSwapCheckLimitModalVisible] =
    useState(false);
  const validationFlag = useSelector(validationFlagDealSwapSelector);
  const updateFlag = useSelector(updateFlagDealSwapSelector);
  let _export;
  /**
   * load API
   */
  useEffect(() => {
    setTimeout(function () {
      if (!(swapList && swapList.length > 0)) {
        dispatch(loadSwapListAPI());
      }
    });
  }, []);

  useEffect(
    function () {
      if (dealSwapModalVisible && rowDoubleClick) setDealSwapVisible(true);
    },
    [dealSwapModalVisible]
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
      setFiltredswapList(swapList);
    },
    [swapList]
  );

  useEffect(
    function () {
      if (checkedLimitDealSwap && checkLimitClick)
        setSwapCheckLimitModalVisible(true);
    },
    [checkedLimitDealSwap]
  );

  function actualiser() {
    dispatch(loadSwapListAPI());
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
  const [filtredSwapList, setFiltredswapList] = useState(swapList);

  function dealsFilterFunction(item) {
    if (!quickSearch || quickSearch == "") return true;
    const target = quickSearch.toUpperCase();
    return (
      item.contrepartie.name.toUpperCase().indexOf(target) != -1 ||
      item.contrepartie.shortName.toUpperCase().indexOf(target) != -1 ||
      item.sousJacent.name.toUpperCase().indexOf(target) != -1 ||
      item.sousJacent.shortName.toUpperCase().indexOf(target) != -1 ||
      item.updateUser.nom.toUpperCase().indexOf(target) != -1 ||
      item.updateUser.prenom.toUpperCase().indexOf(target) != -1
    );
  }

  function quickSearch_changeHandler(event) {
    // if (event && event.target) {
    setQuickSearch(event);
    setFiltredswapList(swapList.filter(dealsFilterFunction));
    //   }
  }

  function handleAuditTrail() {
    dispatch(loadAuditHistoriqueAPI(selectedRow.dealId));
    setAuditTrailClick(true);
  }

  function handleRowDoubleClick(row) {
    dispatch(updateDealSwapFlag(true));
    setRowDoubleClick(true);
    dispatch(loadDealSwapAPI(selectedRow.dealId));
  }

  function setExportCsv(_exp) {
    _export = _exp;
  }

  function exportCsv() {
    _export.save();
  }

  //afficher popup pour ajouter un nouveau deal swap
  function addNewDealSwap() {
    dispatch(updateDealSwapFlag(false));
    setDealSwapVisible(true);
  }

  function advancedSearch() {
    setShowAdvancedSearch(!showAdvancedSearch);
  }

  function onOkRemoveSwap() {
    dispatch(deleteSwapAPI({ dealId: selectedRow.dealId }));
  }

  function removeSwap() {
    showDeleteConfirm(onOkRemoveSwap);
  }

  const deal = useSelector(dealSwapDealSelector);

  function updateOrSaveDealSwap() {
    dealForm.submit();
    let dataToSend = prapareSaveDealSwap(false, deal);
    if (dataToSend)
      dispatch(
        editOrSaveDealSwapAPI(
          dataToSend,
          loadingUpdateDealSwap,
          updateDealSwapSuccess,
          updateDealSwapError
        )
      );
  }

  function checkLimiteDealSwap() {
    dealForm.submit();
    let dataToSend = prapareSaveDealSwap(false, deal);
    if (dataToSend) dispatch(checkLimitDealSwapAPI(dataToSend));
    setCheckLimitClick(true);
  }

  function validerDealSwap() {
    dealForm.submit();
    let dataToSend = prapareSaveDealSwap(true, deal);
    if (dataToSend)
      dispatch(
        editOrSaveDealSwapAPI(
          dataToSend,
          loadingValidateDealSwap,
          validateDealSwapSuccess,
          validateDealSwapError
        )
      );
  }

  function annulerDealSwap() {
    setDealSwapVisible(false);
  }

  function openticketConfirmation() {
    window.open(
      API_URL.SERVER_BASE_URL.concat(API_URL.CONFIRMATION_SWAP)
        .concat("?dealId=")
        .concat(selectedRow.dealId),
      "_blank",
      "height=700,width=650,modal=yes,alwaysRaised=yes"
    );
  }

  function canActivateTicketConfirmation() {
    if (deal.statut && deal.statut.statutId >= STATUT_VALIDE_TRADER) {
      return UserService.hasRole("SWAP_CONFIRMATION");
      //CommonFunctions.hasRole("OPTION_CONFIRMATION");
    }
    return false;
  }

  function annulerAvisSettelement() {}

  return (
    <LayoutContentWrapper style={{ height: "82vh" }}>
      <PageHeader>
        <BreadCrumb style={{ width: "27%", marginBottom: "10px" }}></BreadCrumb>
      </PageHeader>
      <LayoutContent>
        <DataGrid
          selectedRow={selectedRow}
          heightGrid={gridHeight}
          setExportCsv={setExportCsv}
          handleRowDoubleClick={(row) => handleRowDoubleClick(row)}
          data={filtredSwapList}
        >
          <SwapHeader
            {...{
              removeSwap,
              showAdvancedSearch,
              advancedSearch,
              auditHistoriqueLoading,
              quickSearch_changeHandler,
              referencesList,
              exportCsv,
              setAvisVisible,
              actualiser,
              avisVisible,
              addNewDealSwap,
              selectedRow,
              handleAuditTrail,
              modalVisible,
              setModalVisible,
            }}
          ></SwapHeader>
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
        className={"deal-swap"}
        title={"DEAL SWAP"}
        visible={dealSwapVisible}
        onOk={() => setDealSwapVisible(false)}
        onCancel={() => setDealSwapVisible(false)}
        centered
        footer={DealSwapFormFooter(
          validationFlag,
          updateFlag,
          canActivateTicketConfirmation,
          openticketConfirmation,
          loadCheckLimitDealSwap,
          loadValidateDealSwap,
          loadUpdateDealSwap,
          updateOrSaveDealSwap,
          checkLimiteDealSwap,
          validerDealSwap,
          annulerDealSwap
        )}
        width="70%"
      >
        <DealSwap
          form={dealForm}
          checkedLimitDealSwap={checkedLimitDealSwap}
          setSwapCheckLimitModalVisible={setSwapCheckLimitModalVisible}
          swapCheckLimitModalVisible={swapCheckLimitModalVisible}
          dealSwapData={dealSwapData}
          references={referencesList}
        ></DealSwap>
      </CustomDialog>
    </LayoutContentWrapper>
  );
}

export default Swap;
