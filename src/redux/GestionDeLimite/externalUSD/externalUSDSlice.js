import {createSlice} from '@reduxjs/toolkit';
import * as _ from "lodash";

const initialState = {
    loadingExternalUSD: false,
    loadingDeleteExternalUSD: false,
    externalUSDList: [],
    detail: {
        loading: false,
    },
    loadingRemove: false
};
const ExternalUSD = createSlice({
    name: 'ExternalUSD',
    initialState,
    reducers: {
        fetchingExternalUSD: (state, payload) => {
            state.loadingExternalUSD = true
            state.externalUSDList = []
        },
        loadExternalUSD: (state, {payload}) => {
            state.externalUSDList = payload
        },
        fetchingExternalUSDSuccess: (state) => {
            state.loadingExternalUSD = false
        },
        fetchingExternalUSDError: (state) => {
            state.loadingExternalUSD = false
            state.externalUSDList = []
        },
        selectingGridRow: (state, {payload}) => {
            state.selectedRow = payload
        },

        updatingDetailExternalUSD: (state, {payload}) => {
            state.detail.loading = true
        },
        updateDetailExternalUSDSuccess: (state, {payload}) => {
            state.detail.loading = false
           // state.externalUSDList.push(payload)
            /*state.externalUSDList = state.externalUSDList.map(function (item) {
                if (payload.id == item.id) {
                    return payload
                }
                return item;
            })*/
        },
        updateDetailExternalUSDError: (state, {payload}) => {
            state.detail.loading = false
        },
        remove: (state, {payload}) => {
            state.loadingRemove = true
        },
        removeSuccess: (state, {payload}) => {
            state.loadingRemove = false

            _.remove(state.externalUSDList, function (item) {
                return item.id === state.selectedRow.id;
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
    updatingDetailExternalUSD,
    updateDetailExternalUSDSuccess,
    updateDetailExternalUSDError,
    fetchingExternalUSDError,
    selectingGridRow, fetchingExternalUSD, loadExternalUSD,
    fetchingExternalUSDSuccess
} = ExternalUSD.actions;
export default ExternalUSD.reducer;
