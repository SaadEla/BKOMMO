import {
  getApiCall,
  postApiCall,
  urlencodedApiCall,
} from "../../../helpers/apiCall";
import {
  fetchingOptionError,
  fetchingAuditHistorique,
  fetchingAuditHistoriqueSuccess,
  fetchingOption,
  fetchingOptionSuccess,
  loadAuditHistorique,
  loadOption,
  deletingOption,
  deleteOptionError,
  deleteOptionSuccess,
  selectingSettlementOption,
  selectSettlementOptionSuccess,
  selectSettlementOptionError,
} from "../option/optionSlice";
import {
  startGenerateEcheancier,
  generateEcheancierSuccess,
  startGenerateEcheancierError,
  checkingLimitDealOption,
  checkingLimitDealOptionSuccess,
  checkingLimitDealOptionError,
  fetchingDealOption,
  loadDealOption,
  fetchingDealOptionSuccess,
} from "../option/DealOptionSlice";
import API_URL from "../../../config/api/API_URL";
import {
  errorLoadData,
  errorRemoveData,
  errorUpdateData,
  successUpdateData,
} from "../../../components/feedback/CustomNotification";
import { apiResultHandler } from "../../../components/uielements/option/OptionUtil";
import { updateDealOptionInList } from "./../option/optionSlice";
//audit historique
export function loadAuditHistoriqueAPI(payload) {
  return async (dispatch) => {
    dispatch(fetchingAuditHistorique());
    try {
      //Rest api
      const data = [];
      getApiCall(API_URL.OPTION_AUDIT_HISTORIQUE, { dealId: payload })
        .then((resp) => {
          dispatch(loadAuditHistorique(resp));
          dispatch(fetchingAuditHistoriqueSuccess());
        })
        .catch(() => {
          errorLoadData();
          //   dispatch(fetchingAuditHistoriqueError());
        });
    } catch (error) {
      console.log(error);
    }
  };
}

//option list
export function loadOptionListAPI(payload = {}) {
  return async (dispatch) => {
    dispatch(fetchingOption(payload));
    try {
      getApiCall(API_URL.OPTION_SEARCH, payload)
        .then((data) => {
          dispatch(loadOption(data));
          dispatch(fetchingOptionSuccess());
        })
        .catch(() => {
          errorLoadData();
          dispatch(fetchingOptionError());
        });
    } catch (error) {
      console.log(error);
    }
  };
}

//option detail
export function loadDealOptionAPI(payload) {
  return async (dispatch) => {
    dispatch(fetchingDealOption());
    try {
      getApiCall(API_URL.OPTION_DETAIL, { dealId: payload })
        .then((data) => {
          dispatch(loadDealOption(data));
          dispatch(fetchingDealOptionSuccess());
        })
        .catch(() => {
          errorLoadData();
        });
    } catch (error) {
      console.log(error);
    }
  };
}
//option generate_echeancier
export function generateEcheancierOptionAPI(payload) {
  return async (dispatch) => {
    dispatch(startGenerateEcheancier());
    try {
      urlencodedApiCall(API_URL.GENERATE_ECHEANCIER_OPTION, payload)
        .then((data) => {
          dispatch(generateEcheancierSuccess(data.data));
        })
        .catch(() => {
          dispatch(startGenerateEcheancierError());
          errorLoadData();
        });
    } catch (error) {
      dispatch(startGenerateEcheancierError());
      console.log(error);
    }
  };
}

//save deal option
export function editOrSaveDealOptionAPI(
  payload = {},
  fetching,
  load,
  success,
  error
) {
  return async (dispatch) => {
    dispatch(fetching());
    try {
      urlencodedApiCall(API_URL.OPTION_SAVE, payload, {})
        .then((data) => {
          dispatch(load(data));
          dispatch(updateDealOptionInList(data.data));
          dispatch(success());
          successUpdateData(data.data.errorMessage);
          dispatch(loadOptionListAPI((payload = {})));
        })
        .catch(() => {
          //dispatch(error());
          errorUpdateData();
        });
    } catch (error) {
      //dispatch(error());
      console.log(error);
    }
  };
}

// check limit deal option

export function checkLimitDealOptionAPI(payload = {}) {
  return async (dispatch) => {
    dispatch(checkingLimitDealOption());
    try {
      urlencodedApiCall(API_URL.CHEK_LIMIT_OPTION, payload, {})
        .then((resp) => {
          dispatch(checkingLimitDealOptionSuccess(resp.data));
          //    dispatch(success());
        })
        .catch(() => {
          dispatch(checkingLimitDealOptionError());
          errorUpdateData();
        });
    } catch (error) {
      dispatch(checkingLimitDealOptionError());
      console.log(error);
    }
  };
}

// delete option

export function deleteOptionAPI(payload = {}) {
  return async (dispatch) => {
    dispatch(deletingOption());
    try {
      getApiCall(API_URL.DELETE_OPTION, payload)
        .then((resp) => {
          const removed = apiResultHandler(
            resp.data,
            successUpdateData,
            deleteOptionError
          );
          if (removed) {
            dispatch(deleteOptionSuccess(resp.data));
            dispatch(loadOptionListAPI((payload = {})));
          }
        })
        .catch(() => {
          dispatch(deleteOptionError());
          errorRemoveData();
        });
    } catch (error) {
      dispatch(deleteOptionError());
      errorRemoveData();
      console.log(error);
    }
  };
}
// SELECTION option

export function selectionSettlementOptionAPI(payload = {}) {
  return async (dispatch) => {
    dispatch(selectingSettlementOption());
    try {
      getApiCall(API_URL.SELECTION_SETTLEMENT_OPTION, payload)
        .then((resp) => {
          dispatch(selectSettlementOptionSuccess(resp));
        })
        .catch(() => {
          dispatch(selectSettlementOptionError());
          errorLoadData();
        });
    } catch (error) {
      dispatch(selectSettlementOptionError());
      errorLoadData();
      console.log(error);
    }
  };
}
