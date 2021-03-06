import {
    remove,removeSuccess,removeError,
    fetchingContrat,
    fetchingContratError,
    fetchingContratSuccess,
    loadContrat,
    updatingDetailContrat,
    updateDetailContratSuccess,
    updateDetailContratError,
} from "../../MarketData/contrat/contratSlice";
import {getApiCall, urlencodedApiCall} from "../../../helpers/apiCall";
import API_URL from "../../../config/api/API_URL";
import {errorLoadData, errorUpdateData, successUpdateData} from "../../../components/feedback/CustomNotification";
//future list

export function loadContratListAPI(payload = {}) {
    return async dispatch => {
        dispatch(fetchingContrat());
        try {
            getApiCall(API_URL.CONTRAT_LIST, payload).then((data) => {
                dispatch(loadContrat(data));
                dispatch(fetchingContratSuccess());
            }).catch(() => {
                errorLoadData()
                dispatch(fetchingContratError());
            });
        } catch (error) {
            errorLoadData()
            console.log(error)
        }
    };
}
// save  detail contrat
export function editOrSaveDetailContratAPI(payload = {}) {
    return async dispatch => {
        dispatch(updatingDetailContrat());
        try {
            urlencodedApiCall(API_URL.CONTRAT_SAVE, payload,
                {}).then((data) => {
                dispatch(updateDetailContratSuccess(data.data));
                dispatch(loadContratListAPI())
                console.log("data.errorMessage",data.data.errorMessage)
                successUpdateData(data.data.errorMessage)
            }).catch(() => {
                dispatch(updateDetailContratError());
                errorUpdateData()
            });
        } catch (error) {
            dispatch(updateDetailContratError());
            console.log(error)
        }
    };
}

// remove contrat
export function removeContratAPI(payload = {}) {
    return async dispatch => {
        dispatch(remove());
        try {
            urlencodedApiCall(API_URL.CONTRAT_DELETE, payload,
                {}).then((data) => {
                if(!data.data.errorMessage){
                    dispatch(removeSuccess(data.data));
                    dispatch(loadContratListAPI())
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