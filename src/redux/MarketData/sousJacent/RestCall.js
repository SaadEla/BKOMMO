import {
    remove,removeSuccess,removeError,
    fetchingSousJacent,
    fetchingSousJacentError,
    fetchingSousJacentSuccess,
    loadSousJacent,
    updatingDetailSousJacent,
    updateDetailSousJacentSuccess,
    updateDetailSousJacentError,
} from "../../MarketData/sousJacent/sousJacentSlice";
import {getApiCall, urlencodedApiCall} from "../../../helpers/apiCall";
import API_URL from "../../../config/api/API_URL";
import {errorLoadData, errorUpdateData, successUpdateData} from "../../../components/feedback/CustomNotification";
//future list

export function loadSousJacentListAPI(payload = {}) {
    return async dispatch => {
        dispatch(fetchingSousJacent());
        try {
            getApiCall(API_URL.SOUSJACENT_LIST, payload).then((data) => {
                dispatch(loadSousJacent(data));
                dispatch(fetchingSousJacentSuccess());
            }).catch(() => {
                errorLoadData()
                dispatch(fetchingSousJacentError());
            });
        } catch (error) {
            errorLoadData()
            console.log(error)
        }
    };
}
// save  detail sousJacent
export function editOrSaveDetailSousJacentAPI(payload = {}) {
    return async dispatch => {
        dispatch(updatingDetailSousJacent());
        try {
            urlencodedApiCall(API_URL.SOUSJACENT_SAVE, payload,
                {}).then((data) => {
                dispatch(updateDetailSousJacentSuccess(data.data));
                successUpdateData(data.data.errorMessage)
            }).catch(() => {
                dispatch(updateDetailSousJacentError());
                errorUpdateData()
            });
        } catch (error) {
            dispatch(updateDetailSousJacentError());
            console.log(error)
        }
    };
}

// remove sousJacent
export function removeSousJacentAPI(payload = {}) {
    return async dispatch => {
        dispatch(remove());
        try {
            urlencodedApiCall(API_URL.SOUSJACENT_DELETE, payload,
                {}).then((data) => {
                if(!data.data.errorMessage){
                    dispatch(removeSuccess(data.data));
                    successUpdateData(data.data.errorMessage)
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