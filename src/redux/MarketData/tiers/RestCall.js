import {
    fetchingTiers,
    fetchingTiersError,
    fetchingTiersSuccess,
    loadTiers,
    updatingDetailTiers,
    updateDetailTiersSuccess,
    updateDetailTiersError,
} from "../../MarketData/tiers/tiersSlice";
import {getApiCall, urlencodedApiCall} from "../../../helpers/apiCall";
import API_URL from "../../../config/api/API_URL";
import {errorLoadData, errorUpdateData, successUpdateData} from "../../../components/feedback/CustomNotification";
//future list

export function loadTiersListAPI(payload = {}) {
    return async dispatch => {

        dispatch(fetchingTiers());
        try {
            getApiCall(API_URL.TIERS_LIST, payload).then((data) => {
                dispatch(loadTiers(data));
                dispatch(fetchingTiersSuccess());
            }).catch(() => {
                errorLoadData()
                dispatch(fetchingTiersError());
            });
        } catch (error) {
            errorLoadData()
            console.log(error)
        }
    };
}
// save  detail tiers
export function editOrSaveDetailTiersAPI(payload = {}) {
    return async dispatch => {
        dispatch(updatingDetailTiers());
        try {
            urlencodedApiCall(API_URL.TIERS_SAVE, payload,
                {}).then((data) => {
                dispatch(updateDetailTiersSuccess(data.data));
                successUpdateData(data.data.errorMessage)
            }).catch(() => {
                dispatch(updateDetailTiersError());
                errorUpdateData()
            });
        } catch (error) {
            dispatch(updateDetailTiersError());
            console.log(error)
        }
    };
}