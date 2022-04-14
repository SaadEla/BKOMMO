import {
    remove,removeSuccess,removeError,
    fetchingExternalUSD,
    fetchingExternalUSDError,
    fetchingExternalUSDSuccess,
    loadExternalUSD,
    updatingDetailExternalUSD,
    updateDetailExternalUSDSuccess,
    updateDetailExternalUSDError,
} from "../../GestionDeLimite/externalUSD/externalUSDSlice";
import {getApiCall, urlencodedApiCall} from "../../../helpers/apiCall";
import API_URL from "../../../config/api/API_URL";
import {errorLoadData, errorUpdateData, successUpdateData} from "../../../components/feedback/CustomNotification";
//future list

export function loadExternalUSDListAPI(payload = {}) {
    return async dispatch => {
        dispatch(fetchingExternalUSD());
        try {
            getApiCall(API_URL.LIMIT_EXTERNALUSED_LIST, payload).then((data) => {
                dispatch(loadExternalUSD(data));
                dispatch(fetchingExternalUSDSuccess(data));
            }).catch(() => {
                errorLoadData()
                dispatch(fetchingExternalUSDError());
            });
        } catch (error) {
            errorLoadData()
            console.log(error)
        }
    };
}
// save  detail externalUSD
export function editOrSaveDetailExternalUSDAPI(payload = {}) {
    return async dispatch => {
        dispatch(updatingDetailExternalUSD());
        try {
            urlencodedApiCall(API_URL.JOURS_FERIERS_SAVE, payload,
                {}).then((data) => {
                dispatch(updateDetailExternalUSDSuccess(data.data));
                dispatch(loadExternalUSDListAPI())
                successUpdateData(data.data.errorMessage)
            }).catch(() => {
                dispatch(updateDetailExternalUSDError());
                errorUpdateData()
            });
        } catch (error) {
            dispatch(updateDetailExternalUSDError());
            console.log(error)
        }
    };
}

// remove externalUSD
export function removeExternalUSDAPI(payload = {}) {
    return async dispatch => {
        dispatch(remove());
        try {
            urlencodedApiCall(API_URL.JOURS_FERIERS_DELETE, payload,
                {}).then((data) => {
                if(!data.data.errorMessage){
                    dispatch(removeSuccess(data.data));
                    successUpdateData(data.data.errorMessage)
                    dispatch(loadExternalUSDListAPI())
                }else {
                    dispatch(removeError());
                    successUpdateData(data.data.errorMessage)
                  //  errorUpdateData()
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