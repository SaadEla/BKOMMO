import {createSlice} from '@reduxjs/toolkit';
import * as _ from "lodash";

const initialState = {
    loadingContrat: false,
    loadingDeleteContrat: false,
    contratList: [],
    detail: {
        loading: false,
    },
    loadingRemove: false
};
const Contrat = createSlice({
    name: 'Contrat',
    initialState,
    reducers: {
        fetchingContrat: (state, payload) => {
            state.loadingContrat = true
            state.contratList = []
        },
        loadContrat: (state, {payload}) => {
            state.contratList = payload
        },
        fetchingContratSuccess: (state) => {
            state.loadingContrat = false
        },
        fetchingContratError: (state) => {
            state.loadingContrat = false
            state.contratList = []
        },
        selectingGridRow: (state, {payload}) => {
            state.selectedRow = payload
        },

        updatingDetailContrat: (state, {payload}) => {
            state.detail.loading = true
        },
        updateDetailContratSuccess: (state, {payload}) => {
            state.detail.loading = false
            console.log(payload)
            state.contratList = state.contratList.map(function (item) {
                if (payload.contratId == item.contratId) {
                    return payload
                }
                return item;
            })
        },
        updateDetailContratError: (state, {payload}) => {
            state.detail.loading = false
        },
        remove: (state, {payload}) => {
            state.loadingRemove = true
        },
        removeSuccess: (state, {payload}) => {
            state.loadingRemove = false

            _.remove(state.contratList, function (item) {
                return item.contratId === state.selectedRow.contratId;
            });
            state.selectedRow = null
        },
        removeError: (state, {payload}) => {
            state.loadingRemove = false
        },

    }
});
export const {
    remove,removeSuccess,removeError,
    updatingDetailContrat,
    updateDetailContratSuccess,
    updateDetailContratError,
    fetchingContratError,
    selectingGridRow, fetchingContrat, loadContrat,
    fetchingContratSuccess
} = Contrat.actions;
export default Contrat.reducer;
