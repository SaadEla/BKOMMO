import {
    fetchingGroupes,
    fetchingGroupesError,
    fetchingGroupesSuccess,
    loadGroupes,
    updatingDetailGroupes,
    updateDetailGroupesSuccess,
    updateDetailGroupesError,
} from "../../Administration/groupes/groupesSlice";
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
// save  detail Groupes
export function editOrSaveDetailGroupesAPI(payload = {}) {
    return async dispatch => {
        dispatch(updatingDetailGroupes());
        try {
            urlencodedApiCall(API_URL.GROUPES_SAVE, payload,
                {LOGGED_USER: 1}).then((data) => {
                dispatch(updateDetailGroupesSuccess(data.data));
                successUpdateData(data.data.errorMessage)
            }).catch(() => {
                dispatch(updateDetailGroupesError());
                errorUpdateData()
            });
        } catch (error) {
            dispatch(updateDetailGroupesError());
            console.log(error)
        }
    };
}