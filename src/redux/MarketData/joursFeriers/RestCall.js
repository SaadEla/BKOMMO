import {
    remove,removeSuccess,removeError,
    fetchingJoursFeriers,
    fetchingJoursFeriersError,
    fetchingJoursFeriersSuccess,
    loadJoursFeriers,
    updatingDetailJoursFeriers,
    updateDetailJoursFeriersSuccess,
    updateDetailJoursFeriersError,
} from "../../MarketData/joursFeriers/joursFeriersSlice";
import {getApiCall, urlencodedApiCall} from "../../../helpers/apiCall";
import API_URL from "../../../config/api/API_URL";
import {errorLoadData, errorUpdateData, successUpdateData} from "../../../components/feedback/CustomNotification";
//future list

export function loadJoursFeriersListAPI(payload = {}) {
    return async dispatch => {
        dispatch(fetchingJoursFeriers());
        try {
            getApiCall(API_URL.JOURS_FERIERS_LIST, payload).then((data) => {
                dispatch(loadJoursFeriers(data));
                dispatch(fetchingJoursFeriersSuccess());
            }).catch(() => {
                errorLoadData()
                dispatch(fetchingJoursFeriersError());
            });
        } catch (error) {
            errorLoadData()
            console.log(error)
        }
    };
}
// save  detail joursFeriers
export function editOrSaveDetailJoursFeriersAPI(payload = {}) {
    return async dispatch => {
        dispatch(updatingDetailJoursFeriers());
        try {
            urlencodedApiCall(API_URL.JOURS_FERIERS_SAVE, payload,
                {}).then((data) => {
                dispatch(updateDetailJoursFeriersSuccess(data.data));
                dispatch(loadJoursFeriersListAPI())
                successUpdateData(data.data.errorMessage)
            }).catch(() => {
                dispatch(updateDetailJoursFeriersError());
                errorUpdateData()
            });
        } catch (error) {
            dispatch(updateDetailJoursFeriersError());
            console.log(error)
        }
    };
}

// remove joursFeriers
export function removeJoursFeriersAPI(payload = {}) {
    return async dispatch => {
        dispatch(remove());
        try {
            urlencodedApiCall(API_URL.JOURS_FERIERS_DELETE, payload,
                {}).then((data) => {
                if(!data.data.errorMessage){
                    dispatch(removeSuccess(data.data));
                    successUpdateData(data.data.errorMessage)
                    dispatch(loadJoursFeriersListAPI())
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