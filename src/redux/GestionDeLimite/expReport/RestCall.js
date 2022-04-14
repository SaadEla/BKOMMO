import {
    remove,removeSuccess,removeError,
    fetchingExpReport,
    fetchingExpReportError,
    fetchingExpReportSuccess,
    loadExpReport,
    updatingDetailExpReport,
    updateDetailExpReportSuccess,
    updateDetailExpReportError,
} from "../../GestionDeLimite/expReport/expReportSlice";
import {getApiCall, urlencodedApiCall} from "../../../helpers/apiCall";
import API_URL from "../../../config/api/API_URL";
import {errorLoadData, errorUpdateData, successUpdateData} from "../../../components/feedback/CustomNotification";
//future list

export function loadExpReportListAPI(payload = {}) {
    return async dispatch => {
        dispatch(fetchingExpReport());
        try {
            getApiCall(API_URL.LIMITE_LIST, payload).then((data) => {
                dispatch(loadExpReport(data));
                dispatch(fetchingExpReportSuccess(data));
            }).catch(() => {
                errorLoadData()
                dispatch(fetchingExpReportError());
            });
        } catch (error) {
            errorLoadData()
            console.log(error)
        }
    };
}
// save  detail expReport
export function editOrSaveDetailExpReportAPI(payload = {}) {
    return async dispatch => {
        dispatch(updatingDetailExpReport());
        try {
            urlencodedApiCall(API_URL.JOURS_FERIERS_SAVE, payload,
                {}).then((data) => {
                dispatch(updateDetailExpReportSuccess(data.data));
                dispatch(loadExpReportListAPI())
                successUpdateData(data.data.errorMessage)
            }).catch(() => {
                dispatch(updateDetailExpReportError());
                errorUpdateData()
            });
        } catch (error) {
            dispatch(updateDetailExpReportError());
            console.log(error)
        }
    };
}

// remove expReport
export function removeExpReportAPI(payload = {}) {
    return async dispatch => {
        dispatch(remove());
        try {
            urlencodedApiCall(API_URL.JOURS_FERIERS_DELETE, payload,
                {}).then((data) => {
                if(!data.data.errorMessage){
                    dispatch(removeSuccess(data.data));
                    successUpdateData(data.data.errorMessage)
                    dispatch(loadExpReportListAPI())
                }else {
                    dispatch(removeError());
                    errorUpdateData()
                }

            }).catch(() => {
                dispatch(removeError());
                errorUpdateData()
            });
        } catch (error) {
            dispatch(removeError());
            console.log(error)
        }
    };
}