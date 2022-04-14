import {createSlice} from '@reduxjs/toolkit';
import * as _ from "lodash";

const initialState = {
    loadingTiers: false,
    loadingDeleteTiers: false,
    tiersList: [],
    detail: {
        loading: false,
    }
};
const Tiers = createSlice({
    name: 'Tiers',
    initialState,
    reducers: {
        fetchingTiers: (state, payload) => {
            state.loadingTiers = true
            state.tiersList = []
        },
        loadTiers: (state, {payload}) => {
            state.tiersList = payload
        },
        fetchingTiersSuccess: (state) => {
            state.loadingTiers = false
        },
        fetchingTiersError: (state) => {
            state.loadingTiers = false
            state.tiersList = []
        },
        selectingGridRow: (state, {payload}) => {
            state.selectedRow = payload
        },

        updatingDetailTiers: (state, {payload}) => {
            state.detail.loading = true
        },
        updateDetailTiersSuccess: (state, {payload}) => {
            state.detail.loading = false
            console.log(payload)
            state.tiersList = state.tiersList.map(function (item) {
                if (payload.tiersId == item.tiersId) {
                    return payload
                }
                return item;
            })
        },
        updateDetailTiersError: (state, {payload}) => {
            state.detail.loading = false
        },

    }
});
export const {
    updatingDetailTiers,
    updateDetailTiersSuccess,
    updateDetailTiersError,
    fetchingTiersError,
    selectingGridRow, fetchingTiers, loadTiers,
    fetchingTiersSuccess
} = Tiers.actions;
export default Tiers.reducer;
