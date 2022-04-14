import {
    loadDetailLimitSetup,loadDetailLimitSetupSuccess,loadDetailLimitSetupError,
    remove,removeSuccess,removeError,
    fetchingLimitSetup,
    fetchingLimitSetupError,
    fetchingLimitSetupSuccess,
    loadLimitSetup,
    updatingDetailLimitSetup,
    updateDetailLimitSetupSuccess,
    updateDetailLimitSetupError,
} from "../../GestionDeLimite/limitSetup/limitSetupSlice";
import {getApiCall, urlencodedApiCall} from "../../../helpers/apiCall";
import API_URL from "../../../config/api/API_URL";
import {errorLoadData, errorUpdateData, successUpdateData} from "../../../components/feedback/CustomNotification";

// list
export function loadLimitSetupListAPI(payload = {}) {
    return async dispatch => {
        dispatch(fetchingLimitSetup());
        try {
            getApiCall(API_URL.LIMIT_SETUP_LIST, payload).then((data) => {
                dispatch(loadLimitSetup(data));
                dispatch(fetchingLimitSetupSuccess());
            }).catch(() => {
                errorLoadData()
                dispatch(fetchingLimitSetupError());
            });
        } catch (error) {
            errorLoadData()
            console.log(error)
        }
    };
}

// detail
export function loadLimitSetupDetailAPI(payload = {}) {
    return async dispatch => {
        dispatch(loadDetailLimitSetup());
        try {
            getApiCall(API_URL.LIMIT_SETUP_DETAIL, payload).then((data) => {
                dispatch(loadDetailLimitSetupSuccess(data));
            }).catch(() => {
                errorLoadData()
                dispatch(loadDetailLimitSetupError());
            });
        } catch (error) {
            errorLoadData()
            dispatch(loadDetailLimitSetupError());
            console.log(error)
        }
    };
}
// save  detail limitSetup
export function editOrSaveDetailLimitSetupAPI(payload = {}) {
    return async dispatch => {
        dispatch(updatingDetailLimitSetup());
        try {
            urlencodedApiCall(API_URL.LIMIT_SETUP_SAVE, payload,
                {}).then((data) => {
                dispatch(updateDetailLimitSetupSuccess(data.data));
                dispatch(loadLimitSetupListAPI())
                successUpdateData(data.data.errorMessage)
            }).catch(() => {
                dispatch(updateDetailLimitSetupError());
                errorUpdateData()
            });
        } catch (error) {
            dispatch(updateDetailLimitSetupError());
            console.log(error)
        }
    };
}

// remove limitSetup
export function removeLimitSetupAPI(payload = {}) {
    return async dispatch => {
        dispatch(remove());
        try {
            urlencodedApiCall(API_URL.LIMIT_SETUP_DELETE, payload,
                {}).then((data) => {
                if(!data.data.errorMessage){
                    dispatch(removeSuccess(data.data));
                    dispatch(loadLimitSetupListAPI())
                    successUpdateData(data.data.errorMessage)
                }else {
                    dispatch(removeError());
                    successUpdateData(data.data.errorMessage)
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