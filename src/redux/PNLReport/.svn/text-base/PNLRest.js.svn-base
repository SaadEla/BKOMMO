import {
    fetchingEtatPNL,fetchingEtatPNLSuccess,fetchingEtatPNLError
} from "./etatPNLSlice";
import {
    fetchingImportPrix,fetchingImportPrixSuccess,fetchingImportPrixError
} from "./importPrixSlice";
import {getApiCall} from "../../helpers/apiCall";
import API_URL from "../../config/api/API_URL";
import {errorLoadData} from "../../components/feedback/CustomNotification";

export function loadPnlListAPI(payload = {}) {
    return async dispatch => {
        dispatch(fetchingEtatPNL());
        try {
            getApiCall(API_URL.PNL_SEARCH, payload).then((data) => {
                dispatch(fetchingEtatPNLSuccess(data));
            }).catch(() => {
                errorLoadData()
                dispatch(fetchingEtatPNLError());
            });
        } catch (error) {
            dispatch(fetchingEtatPNLError());
            errorLoadData()
        }
    };
}
export function loadIportPrixListAPI(payload = {}) {
    return async dispatch => {
        dispatch(fetchingImportPrix());
        try {
            getApiCall(API_URL.PNL_IMPORT_PRIX_SEARCH, payload).then((data) => {
                dispatch(fetchingImportPrixSuccess(data));
            }).catch(() => {
                errorLoadData()
                dispatch(fetchingImportPrixError());
            });
        } catch (error) {
            dispatch(fetchingImportPrixError());
            errorLoadData()
        }
    };
}