import {createSlice} from '@reduxjs/toolkit';
import * as _ from "lodash";

const initialState = {
    loadingFees: false,
    loadingDeleteFees: false,
    feesList: [],
    detail: {
        loading: false,
    },
    loadingRemove: false
};
const Fees = createSlice({
    name: 'Fees',
    initialState,
    reducers: {
        fetchingFees: (state, payload) => {
            state.loadingFees = true
            state.feesList = []
        },
        loadFees: (state, {payload}) => {
            state.feesList = payload
        },
        fetchingFeesSuccess: (state) => {
            state.loadingFees = false
        },
        fetchingFeesError: (state) => {
            state.loadingFees = false
            state.feesList = []
        },
        selectingGridRow: (state, {payload}) => {
            state.selectedRow = payload
        },

        updatingDetailFees: (state, {payload}) => {
            state.detail.loading = true
        },
        updateDetailFeesSuccess: (state, {payload}) => {
            state.detail.loading = false
            console.log(payload)
            state.feesList = state.feesList.map(function (item) {
                if (payload.feesId == item.feesId) {
                    return payload
                }
                return item;
            })
        },
        updateDetailFeesError: (state, {payload}) => {
            state.detail.loading = false
        },
        remove: (state, {payload}) => {
            state.loadingRemove = true
        },
        removeSuccess: (state, {payload}) => {
            state.loadingRemove = false
            state.selectedRow = null
        },
        removeError: (state, {payload}) => {
            state.loadingRemove = false
        },

    }
});
export const {
    remove,removeSuccess,removeError,
    updatingDetailFees,
    updateDetailFeesSuccess,
    updateDetailFeesError,
    fetchingFeesError,
    selectingGridRow, fetchingFees, loadFees,
    fetchingFeesSuccess
} = Fees.actions;
export default Fees.reducer;
