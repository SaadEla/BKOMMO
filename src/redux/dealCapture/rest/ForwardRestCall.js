import {
  getApiCall,
  postApiCall,
  urlencodedApiCall,
} from "../../../helpers/apiCall";
import {
  updateDealForwardInList,
  fetchingForwardError,
  fetchingAuditHistorique,
  fetchingAuditHistoriqueSuccess,
  fetchingForward,
  fetchingForwardSuccess,
  loadAuditHistorique,
  loadForward,
  deletingForward,
  deleteForwardError,
  deleteForwardSuccess,
  selectingSettlementForward,
  selectSettlementForwardSuccess,
  selectSettlementForwardError,
} from "../forward/forwardSlice";
import {
  checkDealMaturity,
  checkDealMaturityError,
  checkDealMaturitySuccess,
  checkCommission,
  checkCommissionSuccess,
  checkCommissionError,
  checkSoulteError,
  checkSoulteSuccess,
  checkSoulte,
  checkPosition,
  checkPositionSuccess,
  checkPositionError,
  checkingLimitDealForward,
  checkingLimitDealForwardSuccess,
  checkingLimitDealForwardError,
  fetchingDealForward,
  loadDealForward,
  fetchingDealForwardSuccess,
} from "../forward/DealForwardSlice";
import API_URL from "../../../config/api/API_URL";
import {
  errorLoadData,
  errorRemoveData,
  errorUpdateData,
  successUpdateData,
} from "../../../components/feedback/CustomNotification";
import { apiResultHandler } from "../../../components/uielements/forward/ForwardUtil";
import UserService from "../../../keycloak/UserService";

//audit historique
export function loadAuditHistoriqueAPI(payload) {
  return async (dispatch) => {
    dispatch(fetchingAuditHistorique());
    try {
      //Rest api
      const data = [];
      getApiCall(API_URL.FORWARD_AUDIT_HISTORIQUE, { dealId: payload })
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

//forward list
export function loadForwardListAPI(payload = {}) {
  return async (dispatch) => {
    dispatch(fetchingForward(payload));
    try {
      getApiCall(API_URL.FORWARD_SEARCH, payload)
        .then((data) => {
          dispatch(loadForward(data));
          dispatch(fetchingForwardSuccess());
        })
        .catch(() => {
          errorLoadData();
          dispatch(fetchingForwardError());
        });
    } catch (error) {
      console.log(error);
    }
  };
}

//forward detail
export function loadDealForwardAPI(payload) {
  return async (dispatch) => {
    dispatch(fetchingDealForward());
    try {
      getApiCall(API_URL.FORWARD_DETAIL, {
        dealId: payload,
        LOGGED_USER: UserService.getUserId(),
      })
        .then((data) => {
          dispatch(loadDealForward(data));
          dispatch(fetchingDealForwardSuccess());
        })
        .catch(() => {
          errorLoadData();
        });
    } catch (error) {
      console.log(error);
    }
  };
}
//forward ref
export function loadRefForwardAPI(payload = {}) {
  return async (dispatch) => {
    dispatch(fetchingDealForward());
    try {
      getApiCall(API_URL.FORWARD_DETAIL, {
        dealId: payload,
        LOGGED_USER: UserService.getUserId(),
      })
        .then((data) => {
          dispatch(loadDealForward(data));
          dispatch(fetchingDealForwardSuccess());
        })
        .catch(() => {
          errorLoadData();
        });
    } catch (error) {
      console.log(error);
    }
  };
}

//save deal forward
export function editOrSaveDealForwardAPI(
  payload = {},
  fetching,
  success,
  error
) {
  return async (dispatch) => {
    dispatch(fetching());
    try {
      urlencodedApiCall(API_URL.FORWARD_SAVE, payload, {
        LOGGED_USER: UserService.getUserId(),
      })
        .then((data) => {
          // dispatch(load(data));
          dispatch(updateDealForwardInList(data.data));
          dispatch(success());
          dispatch(loadForwardListAPI());

          successUpdateData(data.data.errorMessage);
        })
        .catch(() => {
          dispatch(error());
          errorUpdateData();
        });
    } catch (error) {
      dispatch(error());
      console.log(error);
    }
  };
}

// check limit deal forward

export function checkLimitDealForwardAPI(payload = {}) {
  return async (dispatch) => {
    dispatch(checkingLimitDealForward());
    try {
      urlencodedApiCall(API_URL.CHEK_LIMIT_FORWARD, payload, {
        LOGGED_USER: UserService.getUserId(),
      })
        .then((resp) => {
          dispatch(checkingLimitDealForwardSuccess(resp.data));
          //    dispatch(success());
        })
        .catch(() => {
          dispatch(checkingLimitDealForwardError());
          errorUpdateData();
        });
    } catch (error) {
      dispatch(checkingLimitDealForwardError());
      console.log(error);
    }
  };
}

// delete forward

export function deleteForwardAPI(payload = {}) {
  return async (dispatch) => {
    dispatch(deletingForward());
    try {
      getApiCall(API_URL.DELETE_FORWARD, payload)
        .then((resp) => {
          const removed = apiResultHandler(
            resp.data,
            successUpdateData,
            deleteForwardError
          );
          if (removed) dispatch(deleteForwardSuccess(resp.data));
          dispatch(loadForwardListAPI());
        })
        .catch(() => {
          dispatch(deleteForwardError());
          errorRemoveData();
        });
    } catch (error) {
      dispatch(deleteForwardError());
      errorRemoveData();
      console.log(error);
    }
  };
}
// SELECTION forward

export function selectionSettlementForwardAPI(payload = {}) {
  return async (dispatch) => {
    dispatch(selectingSettlementForward());
    try {
      getApiCall(API_URL.SELECTION_SETTLEMENT_FORWARD, payload)
        .then((resp) => {
          dispatch(selectSettlementForwardSuccess(resp));
        })
        .catch(() => {
          dispatch(selectSettlementForwardError());
          errorLoadData();
        });
    } catch (error) {
      dispatch(selectSettlementForwardError());
      errorLoadData();
      console.log(error);
    }
  };
}

// position forward

export function positionForwardAPI(payload = {}, checkPosition_callback) {
  return async (dispatch) => {
    dispatch(checkPosition());
    try {
      getApiCall(API_URL.POSITION_FORWARD, payload)
        .then((resp) => {
          dispatch(checkPositionSuccess(resp));
          checkPosition_callback(resp);
        })
        .catch(() => {
          dispatch(checkPositionError());
          errorLoadData();
        });
    } catch (error) {
      dispatch(checkPositionError());
      errorLoadData();
      console.log(error);
    }
  };
}
// soulte forward
export function soulteForwardAPI(payload = {}) {
  return async (dispatch) => {
    dispatch(checkSoulte());
    try {
      urlencodedApiCall(API_URL.SOULTE_FORWARD, payload, {
        LOGGED_USER: UserService.getUserId(),
      })
        .then((resp) => {
          dispatch(checkSoulteSuccess(resp.data));
          //    dispatch(success());
        })
        .catch(() => {
          dispatch(checkSoulteError());
          errorUpdateData();
        });
    } catch (error) {
      dispatch(checkSoulteError());
      console.log(error);
    }
  };
}
// comissoin
export function commissionForwardAPI(payload = {}) {
  return async (dispatch) => {
    dispatch(checkCommission());
    try {
      getApiCall(API_URL.COMMISSION_FORWARD, payload, {
        LOGGED_USER: UserService.getUserId(),
      })
        .then((resp) => {
          dispatch(checkCommissionSuccess(resp));
          //    dispatch(success());
        })
        .catch(() => {
          dispatch(checkCommissionError());
          errorUpdateData();
        });
    } catch (error) {
      dispatch(checkCommissionError());
      console.log(error);
    }
  };
}
// deal maturity
export function dealMaturityForwardAPI(payload = {}, selectCommission) {
  return async (dispatch) => {
    dispatch(checkDealMaturity());
    try {
      urlencodedApiCall(API_URL.DEALMATURITY_FORWARD, payload, {
        LOGGED_USER: UserService.getUserId(),
      })
        .then((resp) => {
          dispatch(checkDealMaturitySuccess(resp.data));
          selectCommission(resp.data);
          //    dispatch(success());
        })
        .catch(() => {
          dispatch(checkDealMaturityError());
          errorUpdateData();
        });
    } catch (error) {
      dispatch(checkDealMaturityError());
      console.log(error);
    }
  };
}
