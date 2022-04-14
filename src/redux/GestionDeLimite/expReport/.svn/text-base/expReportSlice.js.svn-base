import {createSlice} from '@reduxjs/toolkit';
import * as _ from "lodash";

const initialState = {
    loadingExpReport: false,
    loadingDeleteExpReport: false,
    expReportList: [],
    detail: {
        loading: false,
    },
    loadingRemove: false
};
const ExpReport = createSlice({
    name: 'ExpReport',
    initialState,
    reducers: {
        fetchingExpReport: (state, payload) => {
            state.loadingExpReport = true
            state.expReportList = []
        },
        loadExpReport: (state, {payload}) => {
            state.expReportList = payload
        },
        fetchingExpReportSuccess: (state) => {
            state.loadingExpReport = false
        },
        fetchingExpReportError: (state) => {
            state.loadingExpReport = false
            state.expReportList = []
        },
        selectingGridRow: (state, {payload}) => {
            state.selectedRow = payload
        },

        updatingDetailExpReport: (state, {payload}) => {
            state.detail.loading = true
        },
        updateDetailExpReportSuccess: (state, {payload}) => {
            state.detail.loading = false
           // state.expReportList.push(payload)
            /*state.expReportList = state.expReportList.map(function (item) {
                if (payload.id == item.id) {
                    return payload
                }
                return item;
            })*/
        },
        updateDetailExpReportError: (state, {payload}) => {
            state.detail.loading = false
        },
        remove: (state, {payload}) => {
            state.loadingRemove = true
        },
        removeSuccess: (state, {payload}) => {
            state.loadingRemove = false

            _.remove(state.expReportList, function (item) {
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
    updatingDetailExpReport,
    updateDetailExpReportSuccess,
    updateDetailExpReportError,
    fetchingExpReportError,
    selectingGridRow, fetchingExpReport, loadExpReport,
    fetchingExpReportSuccess
} = ExpReport.actions;
export default ExpReport.reducer;
