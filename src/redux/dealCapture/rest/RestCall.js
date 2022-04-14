import {getApiCall, postApiCall, urlencodedApiCall} from "../../../helpers/apiCall";
import {
    fetchingSwapError,
    fetchingAuditHistorique,
    fetchingAuditHistoriqueSuccess,
    fetchingSwap, fetchingSwapSuccess,
    loadAuditHistorique, loadSwap,
    deletingSwap, deleteSwapError, deleteSwapSuccess,
    selectingSettlementSwap, selectSettlementSwapSuccess, selectSettlementSwapError
} from "../swap/swapSlice";
import {
    checkingLimitDealSwap, checkingLimitDealSwapSuccess, checkingLimitDealSwapError,
    fetchingDealSwap, loadDealSwap, fetchingDealSwapSuccess
} from "../swap/DealSwapSlice";
import API_URL from "../../../config/api/API_URL";
import {
    errorLoadData,
    errorRemoveData,
    errorUpdateData,
    successUpdateData
} from "../../../components/feedback/CustomNotification";
import {apiResultHandler} from "../../../components/uielements/swap/SwapUtil";
import {updateDealSwapInList} from './../swap/swapSlice'

//audit historique
export function loadAuditHistoriqueAPI(payload) {
    return async dispatch => {
        dispatch(fetchingAuditHistorique());
        try {
            //Rest api
            const data = [];
            getApiCall(API_URL.SWAP_AUDIT_HISTORIQUE, {dealId: payload}).then((resp) => {
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

//swap list
export function loadSwapListAPI(payload = {}) {
    return async dispatch => {
        dispatch(fetchingSwap(payload));
        try {
            getApiCall(API_URL.SWAP_SEARCH, payload).then((data) => {
                dispatch(loadSwap(data));
                dispatch(fetchingSwapSuccess());
            }).catch(() => {
                errorLoadData()
                dispatch(fetchingSwapError());
            });
        } catch (error) {
            console.log(error)
        }
    };
}

//swap detail
export function loadDealSwapAPI(payload = {}) {
    return async dispatch => {
        dispatch(fetchingDealSwap());
        try {
            getApiCall(API_URL.SWAP_DETAIL, {dealId: payload, }).then((data) => {
                dispatch(loadDealSwap(data));
                dispatch(fetchingDealSwapSuccess());
            }).catch(() => {
                errorLoadData()
            });
        } catch (error) {
            console.log(error)
        }
    };
}

//save deal swap
export function editOrSaveDealSwapAPI(payload = {}, fetching, load, success, error) {
    return async dispatch => {
        dispatch(fetching());
        try {
            urlencodedApiCall(API_URL.SWAP_SAVE, payload, {}).then((data) => {
                dispatch(load(data));
                dispatch(success());
                dispatch(updateDealSwapInList(data.data));
                dispatch(loadSwapListAPI());
                successUpdateData(data.data.errorMessage)
            }).catch(() => {
                dispatch(error());
                errorUpdateData()
            });
        } catch (error) {
            dispatch(error());
            console.log(error)
        }
    };
}

// check limit deal swap

export function checkLimitDealSwapAPI(payload = {}) {
    return async dispatch => {
        dispatch(checkingLimitDealSwap());
        try {
            urlencodedApiCall(API_URL.CHEK_LIMIT_SWAP, payload, {}).then((resp) => {
                dispatch(checkingLimitDealSwapSuccess(resp.data));

                //    dispatch(success());
            }).catch(() => {
                dispatch(checkingLimitDealSwapError());
                errorUpdateData()
            });
        } catch (error) {
            dispatch(checkingLimitDealSwapError());
            console.log(error)
        }
    };
}

// delete swap

export function deleteSwapAPI(payload = {}) {
    return async dispatch => {
        dispatch(deletingSwap());
        try {
            getApiCall(API_URL.DELETE_SWAP, payload).then((resp) => {
                const removed = apiResultHandler(resp.data, successUpdateData, deleteSwapError)
                if (removed)
                    dispatch(deleteSwapSuccess(resp.data));
                dispatch(loadSwapListAPI());
            }).catch(() => {
                dispatch(deleteSwapError());
                errorRemoveData()
            });
        } catch (error) {
            dispatch(deleteSwapError());
            errorRemoveData();
            console.log(error)
        }
    };
}

// SELECTION swap

export function selectionSettlementSwapAPI(payload = {}) {
    return async dispatch => {
        dispatch(selectingSettlementSwap());
        try {
            getApiCall(API_URL.SELECTION_SETTLEMENT_SWAP, payload).then((resp) => {
                dispatch(selectSettlementSwapSuccess(resp));
            }).catch(() => {
                dispatch(selectSettlementSwapError());
                errorLoadData()
            });
        } catch (error) {
            dispatch(selectSettlementSwapError());
            errorLoadData();
            console.log(error)
        }
    };
}

