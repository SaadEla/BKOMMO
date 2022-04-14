import {
    fetchingPaiementSoulte,
    fetchingPaiementSoulteError,
    fetchingPaiementSoulteSuccess,
    loadPaiementSoulte,
    updatingDetailPaiementSoulte,
    updateDetailPaiementSoulteSuccess,
    updateDetailPaiementSoulteError,
    deletingPaiement,
    deletePaiementError,
    deletePaiementSuccess,
} from "./paiementSoulteSlice";
import {getApiCall, urlencodedApiCall} from "../../helpers/apiCall";
import API_URL from "../../config/api/API_URL";
import {errorLoadData, errorUpdateData, successUpdateData} from "../../components/feedback/CustomNotification";
import { apiResultHandler } from "../../components/uielements/swap/SwapUtil";
//future list

export function loadPaiementSoulteListAPI(payload = {}) {
    return async dispatch => {

        dispatch(fetchingPaiementSoulte());
        try {
            getApiCall(API_URL.PAIEMENTSOULTE_LIST, payload).then((data) => {
               
                dispatch(loadPaiementSoulte(data));
                dispatch(fetchingPaiementSoulteSuccess());
            }).catch(() => {
                errorLoadData()
                dispatch(fetchingPaiementSoulteError());
            });
        } catch (error) {
            errorLoadData()
            console.log(error)
        }
    };
}
// save  detail PaiementSoulte
export function editOrSaveDetailPaiementSoulteAPI(payload = {}) {
    return async dispatch => {
        dispatch(updatingDetailPaiementSoulte());
        try {
            urlencodedApiCall(API_URL.PAIEMENTSOULTE_ADD, payload,
                {}).then((data) => {
                dispatch(updateDetailPaiementSoulteSuccess(data.data));
                successUpdateData(data.data && data.data.errorMessage)
            }).catch(() => {
                dispatch(updateDetailPaiementSoulteError());
                errorUpdateData()
            });
        } catch (error) {
            dispatch(updateDetailPaiementSoulteError());
            console.log(error)
        }
    };
}

// delete detail PaiementSoulte
export function deletePaiementSoulteAPI(payload = {}) {
    return async dispatch => {
        dispatch(deletingPaiement());
        try {
            urlencodedApiCall(API_URL.PAIEMENTSOULTE_DELETE, payload,{LOGGED_USER: 1}).then((data) => {
                const removed = apiResultHandler(data.data, successUpdateData, deletePaiementError)
                if (removed){
                    dispatch(deletePaiementSuccess(data.data));
                    dispatch(loadPaiementSoulteListAPI(payload = {}))
                }

            }).catch(() => {
                dispatch(deletePaiementError());
            });
        } catch (error) {
            dispatch(updateDetailPaiementSoulteError());
            console.log(error)
        }
    };
}

// pnlService positions
export function pnlServiceAPI(payload = {}) {
    return async dispatch => {
        dispatch(fetchingPaiementSoulte());
        try {
            getApiCall(API_URL.PAIEMENTSOULTE_POSITION, payload,
                {LOGGED_USER: 1}).then((data) => {
                dispatch(loadPaiementSoulte(data.detailPositions));
                dispatch(fetchingPaiementSoulteSuccess(data.data));
               // successUpdateData(data.data && data.data.errorMessage)
            }).catch(() => {
                dispatch(fetchingPaiementSoulteError());
                errorUpdateData()
            });
        } catch (error) {
            dispatch(fetchingPaiementSoulteError());
            console.log(error)
        }
    };
}