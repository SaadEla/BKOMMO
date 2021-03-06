import {
    addOrSaveNotation,addOrSaveNotationSuccess,addOrSaveNotationError,
    addParam, addParamSuccess, addParamError,
    loadNotationFinanciereRef, loadNotationFinanciereRefSuccess, loadNotationFinanciereRefError,
    loadDetailNotationFinanciere, loadDetailNotationFinanciereSuccess, loadDetailNotationFinanciereError,
    remove, removeSuccess, removeError,
    fetchingNotationFinanciere,
    fetchingNotationFinanciereError,
    fetchingNotationFinanciereSuccess,
    loadNotationFinanciere
} from "../../GestionDeLimite/notationFinanciere/notationFinanciereSlice";
import {getApiCall, urlencodedApiCall} from "../../../helpers/apiCall";
import API_URL from "../../../config/api/API_URL";
import {errorLoadData, errorUpdateData, successUpdateData} from "../../../components/feedback/CustomNotification";

// list
export function loadNotationFinanciereListAPI(payload = {}) {
    return async dispatch => {
        dispatch(fetchingNotationFinanciere());
        try {
            getApiCall(API_URL.NOTATION_FINANCIERE_LIST, payload).then((data) => {
                dispatch(loadNotationFinanciere(data));
                dispatch(fetchingNotationFinanciereSuccess());
            }).catch(() => {
                errorLoadData()
                dispatch(fetchingNotationFinanciereError());
            });
        } catch (error) {
            errorLoadData()
            console.log(error)
        }
    };
}

//notation references
export function loadNotationFinanciereReferencesAPI(payload = {}) {
    return async dispatch => {
        dispatch(loadNotationFinanciereRef());
        try {
            getApiCall(API_URL.NOTATION_FINANCIERE_REFERENCES, payload).then((data) => {
                dispatch(loadNotationFinanciereRefSuccess(data));
            }).catch(() => {
                errorLoadData()
                dispatch(loadNotationFinanciereRefError());
            });
        } catch (error) {
            dispatch(loadNotationFinanciereRefError())
            errorLoadData()
            console.log(error)
        }
    };
}

// detail
export function loadNotationFinanciereDetailAPI(payload = {}) {
    return async dispatch => {
        dispatch(loadDetailNotationFinanciere());
        try {
            getApiCall(API_URL.NOTATION_FINANCIERE_DETAIL, payload).then((data) => {
                dispatch(loadDetailNotationFinanciereSuccess(data));
            }).catch(() => {
                errorLoadData()
                dispatch(loadDetailNotationFinanciereError());
            });
        } catch (error) {
            errorLoadData()
            dispatch(loadDetailNotationFinanciereError());
            console.log(error)
        }
    };
}

// save  detail notationFinanciere
export function editOrSaveDetailNotationFinanciereAPI(payload = {}) {
    return async dispatch => {
        dispatch(addOrSaveNotation());
        try {
            urlencodedApiCall(API_URL.NOTATION_FINANCIERE_SAVE, payload,
                {}).then((data) => {
                dispatch(addOrSaveNotationSuccess(data.data));
                dispatch(loadNotationFinanciereListAPI())
                successUpdateData(data.data.errorMessage)
            }).catch(() => {
                dispatch(addOrSaveNotationError());
                errorUpdateData()
            });
        } catch (error) {
            dispatch(addOrSaveNotationError());
            console.log(error)
        }
    };
}

// SAVE PARAM
export function editOrSavePramNotationFinanciereAPI(payload = {}) {
    return async dispatch => {
        dispatch(addParam());
        try {
            urlencodedApiCall(API_URL.NOTATION_FINANCIERE_PARAM_SAVE, payload,
                {}).then((data) => {
                if (data.data.errorMessage) {
                    dispatch(addParamError(data.data.errorMessage));
                    errorUpdateData(data.data.errorMessage)
                } else {
                    dispatch(addParamSuccess(data.data));
                    dispatch(loadNotationFinanciereReferencesAPI())
                    successUpdateData()
                }


            }).catch(() => {
                dispatch(addParamError());
                errorUpdateData()
            });
        } catch (error) {
            dispatch(addParamError());
            console.log(error)
        }
    };
}




// remove notationFinanciere
export function removeNotationFinanciereAPI(payload = {}) {
    return async dispatch => {
        dispatch(remove());
        try {
            urlencodedApiCall(API_URL.NOTATION_FINANCIERE_DELETE, payload,
                {}).then((data) => {
                if (!data.data.errorMessage) {
                    dispatch(removeSuccess(data.data));
                    dispatch(loadNotationFinanciereListAPI())
                    successUpdateData(data.data.errorMessage)
                } else {
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