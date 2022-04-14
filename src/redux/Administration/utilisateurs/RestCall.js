import {
    fetchingUtilisateurs,
    fetchingUtilisateursError,
    fetchingUtilisateursSuccess,
    loadUtilisateurs,
    updatingDetailUtilisateurs,
    updateDetailUtilisateursSuccess,
    updateDetailUtilisateursError,
} from "../../Administration/utilisateurs/utilisateursSlice";
import {
    fetchingReference,
    loadReference,
    fetchingReferenceSuccess,
    fetchingReferenceError
} from "../../Administration/utilisateurs/ReferenceSlice";
import {getApiCall, urlencodedApiCall} from "../../../helpers/apiCall";
import API_URL from "../../../config/api/API_URL";
import {errorLoadData, errorUpdateData, successUpdateData} from "../../../components/feedback/CustomNotification";
//future list

export function loadUtilisateursListAPI(payload = {}) {
    return async dispatch => {

        dispatch(fetchingUtilisateurs());
        try {
            getApiCall(API_URL.UTILISATEUR_LIST, payload).then((data) => {
                dispatch(loadUtilisateurs(data));
                dispatch(fetchingUtilisateursSuccess());
            }).catch(() => {
                errorLoadData()
                dispatch(fetchingUtilisateursError());
            });
        } catch (error) {
            errorLoadData()
            console.log(error)
        }
    };
}

export function loadUtilisateursReferenceAPI(payload = {}) {
    return async dispatch => {

        dispatch(fetchingReference());
        try {
            getApiCall(API_URL.UTILISATEUR_REF, payload).then((data) => {
                dispatch(loadReference(data));
                dispatch(fetchingReferenceSuccess());
            }).catch(() => {
                errorLoadData()
                dispatch(fetchingReferenceError());
            });
        } catch (error) {
            errorLoadData()
            console.log(error)
        }
    };
}

// save  detail Utilisateurs
export function editOrSaveDetailUtilisateursAPI(payload = {},load, success, error) {
    return async dispatch => {
        dispatch(updatingDetailUtilisateurs());
        try {
            urlencodedApiCall(API_URL.UTILISATEUR_SAVE, payload,
                {}).then((data) => {
                dispatch(updateDetailUtilisateursSuccess(data.data));
                dispatch(loadUtilisateursListAPI())
                successUpdateData(data.data.errorMessage)
            }).catch(() => {
                dispatch(updateDetailUtilisateursError());
                errorUpdateData()
            });
        } catch (error) {
            dispatch(updateDetailUtilisateursError());
            console.log(error)
        }
    };
}