import {createSlice} from "@reduxjs/toolkit";
import Axios from "../../helpers/api";
import {fetchingAuditHistorique, fetchingAuditHistoriqueSuccess, loadAuditHistorique} from "../dealCapture/swap/swapSlice";
import API_URL from "../../config/api/API_URL";

const initialState = {
    loadingContratReferences: false,
    listReferences: [],
};

const References = createSlice({
    name: 'ContratReferences',
    initialState,
    reducers: {
        fetchingContratReferences: (state) => {
            state.loadingContratReferences = true
        },
        loadContratReferences: (state, {payload}) => {
            state.listReferences = payload
        },
        fetchingContratReferencesSuccess: (state) => {
            state.loadingContratReferences = false
        }
    }
})
//API
export function loadReferencesAPI() {
    return async dispatch => {
        dispatch(fetchingContratReferences());
        try {
            //Rest api
            const data = [];
            Axios.get(API_URL.CONTRAT_REFERENCES).then((resp) => {
                dispatch(loadContratReferences(resp.data));
                dispatch(fetchingContratReferencesSuccess());
            }).catch(() => {

            });
        } catch (error) {
            console.log(error)
        }
    };
}
//Selectors
export const ListReferencesSelector=state => state.references.listReferences
export const {fetchingContratReferencesSuccess, loadContratReferences, fetchingContratReferences} = References.actions;

export default References.reducer;
