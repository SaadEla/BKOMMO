import {
    remove,removeSuccess,removeError,
    fetchingFees,
    fetchingFeesError,
    fetchingFeesSuccess,
    loadFees,
    updatingDetailFees,
    updateDetailFeesSuccess,
    updateDetailFeesError,
} from "../../MarketData/fees/feesSlice";
import {getApiCall, urlencodedApiCall} from "../../../helpers/apiCall";
import API_URL from "../../../config/api/API_URL";
import {errorLoadData, errorUpdateData, successUpdateData} from "../../../components/feedback/CustomNotification";
//future list

export function loadFeesListAPI(payload = {}) {
    return async dispatch => {
        dispatch(fetchingFees());
        try {
            getApiCall(API_URL.FEES_LIST, payload).then((data) => {
                dispatch(loadFees(data));
                dispatch(fetchingFeesSuccess());
            }).catch(() => {
                errorLoadData()
                dispatch(fetchingFeesError());
            });
        } catch (error) {
            errorLoadData()
            console.log(error)
        }
    };
}
// save  detail fees
export function editOrSaveDetailFeesAPI(payload = {}) {
    return async dispatch => {
        dispatch(updatingDetailFees());
        try {
            urlencodedApiCall(API_URL.FEES_SAVE, payload, {}
                ).then((data) => {
                dispatch(updateDetailFeesSuccess(data.data));
                dispatch(loadFeesListAPI())
                successUpdateData(data.data.errorMessage)
            }).catch(() => {
                dispatch(updateDetailFeesError());
                errorUpdateData()
            });
        } catch (error) {
            dispatch(updateDetailFeesError());
            console.log(error)
        }
    };
}

// remove fees
export function removeFeesAPI(payload = {}) {
    return async dispatch => {
        dispatch(remove());
        try {
            urlencodedApiCall(API_URL.FEES_DELETE, payload,
                {}).then((data) => {
                if(!data.data.errorMessage){
                    dispatch(removeSuccess(data.data));
                    dispatch(loadFeesListAPI())
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