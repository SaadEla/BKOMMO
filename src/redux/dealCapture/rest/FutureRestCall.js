import {getApiCall, postApiCall, urlencodedApiCall} from "../../../helpers/apiCall";
import {
    updateDealFutureInList,
    fetchingFutureError,
    fetchingAuditHistorique,
    fetchingAuditHistoriqueSuccess,
    fetchingFuture, fetchingFutureSuccess,
    loadAuditHistorique, loadFuture,
    deletingFuture, deleteFutureError, deleteFutureSuccess,
    selectingSettlementFuture, selectSettlementFutureSuccess, selectSettlementFutureError
} from "../future/futureSlice";
import {
    checkingLimitDealFuture, checkingLimitDealFutureSuccess, checkingLimitDealFutureError,
    fetchingDealFuture, loadDealFuture, fetchingDealFutureSuccess
} from "../future/DealFutureSlice";
import API_URL from "../../../config/api/API_URL";
import {
    errorLoadData,
    errorRemoveData,
    errorUpdateData,
    successUpdateData
} from "../../../components/feedback/CustomNotification";
import {apiResultHandler} from "../../../components/uielements/future/FutureUtil";

//audit historique
export function loadAuditHistoriqueAPI(payload) {
    return async dispatch => {
        dispatch(fetchingAuditHistorique());
        try {
            //Rest api
            const data = [];
            getApiCall(API_URL.FUTURE_AUDIT_HISTORIQUE, {dealId: payload}).then((resp) => {
                dispatch(loadAuditHistorique(resp));
                dispatch(fetchingAuditHistoriqueSuccess());
            }).catch(() => {
                errorLoadData()
                //   dispatch(fetchingAuditHistoriqueError());
            });
        } catch (error) {
            console.log(error)
        }
    };
}

//future list
export function loadFutureListAPI(payload = {}) {
    return async dispatch => {
        dispatch(fetchingFuture(payload));
        try {
            getApiCall(API_URL.FUTURE_SEARCH, payload).then((data) => {
                dispatch(loadFuture(data));
                dispatch(fetchingFutureSuccess());
            }).catch(() => {
                errorLoadData()
                dispatch(fetchingFutureError());
            });
        } catch (error) {
            console.log(error)
        }
    };
}

//future detail
export function loadDealFutureAPI(payload = {}) {
    return async dispatch => {
        dispatch(fetchingDealFuture());
        try {
            getApiCall(API_URL.FUTURE_DETAIL, {dealId: payload, }).then((data) => {
                dispatch(loadDealFuture(data));
                dispatch(fetchingDealFutureSuccess());
            }).catch(() => {
                errorLoadData()
            });
        } catch (error) {
            console.log(error)
        }
    };
}

//save deal future
export function editOrSaveDealFutureAPI(payload = {}, load, success, error) {
    return async dispatch => {
        //dispatch(fetching());
        dispatch(load());
        try {
            urlencodedApiCall(API_URL.FUTURE_SAVE, payload, {}).then((data) => {

                dispatch(success(data.data));
                dispatch(updateDealFutureInList(data.data));
                dispatch(loadFutureListAPI());
                successUpdateData(data.data.errorMessage)
            }).catch(() => {
                dispatch(error());
                errorUpdateData()
            });
        } catch (error) {
            dispatch(error());
            console.log(error)
            errorUpdateData()

        }
    };
}

// check limit deal future

export function checkLimitDealFutureAPI(payload = {}) {
    return async dispatch => {
        dispatch(checkingLimitDealFuture());
        try {
            urlencodedApiCall(API_URL.CHEK_LIMIT_FUTURE, payload, {}).then((resp) => {
                dispatch(checkingLimitDealFutureSuccess(resp.data));
                //    dispatch(success());
            }).catch(() => {
                dispatch(checkingLimitDealFutureError());
                errorUpdateData()
            });
        } catch (error) {
            dispatch(checkingLimitDealFutureError());
            console.log(error)
        }
    };
}

// delete future

export function deleteFutureAPI(payload = {}) {
    return async dispatch => {
        dispatch(deletingFuture());
        try {
            getApiCall(API_URL.DELETE_FUTURE, payload).then((resp) => {
                const removed = apiResultHandler(resp.data, successUpdateData, deleteFutureError)
                if (removed)
                    dispatch(deleteFutureSuccess(resp.data));
                dispatch(loadFutureListAPI());
            }).catch(() => {
                dispatch(deleteFutureError());
                errorRemoveData()
            });
        } catch (error) {
            dispatch(deleteFutureError());
            errorRemoveData();
            console.log(error)
        }
    };
}
// SELECTION future

export function selectionSettlementFutureAPI(payload = {}) {
    return async dispatch => {
        dispatch(selectingSettlementFuture());
        try {
            getApiCall(API_URL.SELECTION_SETTLEMENT_FUTURE, payload).then((resp) => {
                dispatch(selectSettlementFutureSuccess(resp));
            }).catch(() => {
                dispatch(selectSettlementFutureError());
                errorLoadData()
            });
        } catch (error) {
            dispatch(selectSettlementFutureError());
            errorLoadData();
            console.log(error)
        }
    };
}
