import {createSlice} from '@reduxjs/toolkit';
import * as _ from "lodash";

const initialState = {
    loadingSousJacent: false,
    loadingDeleteSousJacent: false,
    sousJacentList: [],
    detail: {
        loading: false,
    },
    loadingRemove: false
};
const SousJacent = createSlice({
    name: 'SousJacent',
    initialState,
    reducers: {
        fetchingSousJacent: (state, payload) => {
            state.loadingSousJacent = true
            state.sousJacentList = []
        },
        loadSousJacent: (state, {payload}) => {
            state.sousJacentList = payload
        },
        fetchingSousJacentSuccess: (state) => {
            state.loadingSousJacent = false
        },
        fetchingSousJacentError: (state) => {
            state.loadingSousJacent = false
            state.sousJacentList = []
        },
        selectingGridRow: (state, {payload}) => {
            state.selectedRow = payload
        },

        updatingDetailSousJacent: (state, {payload}) => {
            state.detail.loading = true
        },
        updateDetailSousJacentSuccess: (state, {payload}) => {
            state.detail.loading = false
            console.log(payload)
            state.sousJacentList = state.sousJacentList.map(function (item) {
                if (payload.sousJacentId == item.sousJacentId) {
                    return payload
                }
                return item;
            })
        },
        updateDetailSousJacentError: (state, {payload}) => {
            state.detail.loading = false
        },
        remove: (state, {payload}) => {
            state.loadingRemove = true
        },
        removeSuccess: (state, {payload}) => {
            state.loadingRemove = false

            _.remove(state.sousJacentList, function (item) {
                return item.sousJacentId === state.selectedRow.sousJacentId;
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
    updatingDetailSousJacent,
    updateDetailSousJacentSuccess,
    updateDetailSousJacentError,
    fetchingSousJacentError,
    selectingGridRow, fetchingSousJacent, loadSousJacent,
    fetchingSousJacentSuccess
} = SousJacent.actions;
export default SousJacent.reducer;
