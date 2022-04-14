import {createSlice} from '@reduxjs/toolkit';
import {getApiCall, urlencodedApiCall} from '../../../helpers/apiCall'
import Axios from '../../../helpers/api';
import API_URL from "../../../config/api/API_URL";
import {errorLoadData, errorUpdateData, successUpdateData} from "../../../components/feedback/CustomNotification";


const initialState = {

    loadingGroupes: false,
    groupesList: [],
    detail: {
        loading: true
    }

};

//reducer
const Groupes = createSlice({
    name: 'Groupes',
    initialState,
    reducers: {

        fetchingGroupes: (state, payload) => {
            state.loadingGroupes = true
            state.groupesList = []
        },
        loadGroupes: (state, {payload}) => {
            state.groupesList = payload
        },
        fetchingGroupesSuccess: (state) => {
            state.loadingGroupes = false
        },
        fetchingGroupesError: (state, {payload}) => {
            state.loadingGroupes = false
            state.groupesList = []
        },
        updatingDetailGroupes: (state, {payload}) => {
            state.detail.loading = true
        },
        updateDetailGroupesSuccess: (state, {payload}) => {
            state.detail.loading = false
        },
        updateDetailGroupesError: (state, {payload}) => {
            state.detail.loading = false
        },
    }
});


export const {
    fetchingGroupes, loadGroupes, fetchingGroupesSuccess, fetchingGroupesError, updatingDetailGroupes, updateDetailGroupesError, updateDetailGroupesSuccess
} = Groupes.actions;

export default Groupes.reducer;


//selectors
export const GroupesListSelector = state => state.Groupes.groupesList;
export const GroupesListLoadingSelector = state => state.Groupes.loadingGroupes;
export const GroupesSelectedRowSelector = state => state.Groupes.selectedRow;

export const GroupesDetailLoadingSelector = state => state.Groupes.detail.loading

//rest call

export function loadGroupesListAPI(payload = {}) {
    return async dispatch => {

        dispatch(fetchingGroupes());
        try {
            getApiCall(API_URL.GROUPES_LIST, payload).then((data) => {
                dispatch(loadGroupes(data));
                dispatch(fetchingGroupesSuccess());
            }).catch(() => {
                errorLoadData()
                dispatch(fetchingGroupesError());
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