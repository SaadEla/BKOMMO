import {createSlice} from "@reduxjs/toolkit";
import Axios from "../../helpers/api";
import API_URL from "../../config/api/API_URL";

const initialState = {
    loadingAdministrationReferences: false,
    listReferences: [],
};

const References = createSlice({
    name: 'AdministrationReferences',
    initialState,
    reducers: {
        fetchingAdministrationReferences: (state) => {
            state.loadingAdministrationReferences = true
        },
        loadAdministrationReferences: (state, {payload}) => {
            state.listReferences = payload
        },
        fetchingAdministrationReferencesSuccess: (state) => {
            state.loadingAdministrationReferences = false
        }
    }
})
//API
export function loadReferencesAPI() {
    return async dispatch => {
        dispatch(fetchingAdministrationReferences());
        try {
            //Rest api
            const data = [];
            Axios.get(API_URL.UTILISATEUR_REF).then((resp) => {
                dispatch(loadAdministrationReferences(resp.data));
                dispatch(fetchingAdministrationReferencesSuccess());
            }).catch(() => {
                
            });
        } catch (error) {
            console.log(error)
        }
    };
}
//Selectors
export const ListReferencesSelector=state => state.references.listReferences
export const {fetchingAdministrationReferencesSuccess, loadAdministrationReferences, fetchingAdministrationReferences} = References.actions;

export default References.reducer;
