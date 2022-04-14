import {createSlice} from '@reduxjs/toolkit';
import * as _ from "lodash";
import {compareEcheance} from "../../../components/uielements/swap/SwapUtil";

const initialState = {
    loadingLimitSetup: false,
    loadingDeleteLimitSetup: false,
    limitSetupList: [],
    detail: {
        loading: false,
        limitDetails: []
    },
    loadingRemove: false
};
const LimitSetup = createSlice({
    name: 'LimitSetup',
    initialState,
    reducers: {
        fetchingLimitSetup: (state, payload) => {
            state.loadingLimitSetup = true
            state.limitSetupList = []
        },
        loadLimitSetup: (state, {payload}) => {
            state.limitSetupList = payload
        },
        fetchingLimitSetupSuccess: (state) => {
            state.loadingLimitSetup = false
        },
        fetchingLimitSetupError: (state) => {
            state.loadingLimitSetup = false
            state.limitSetupList = []
        },
        selectingGridRow: (state, {payload}) => {
            state.selectedRow = payload
            state.detail = initialState.detail
        },
        initDetail: (state, {payload}) => {
           // state.selectedRow = payload
            state.detail = initialState.detail
        },
        updateDetail: (state, {payload}) => {
            console.log(payload.tiersId )
            state.detail.tiers ={tiersId :payload.tiersId }
            state.detail.type = payload.type
        },

        updatingDetailLimitSetup: (state, {payload}) => {
            state.detail.loading = true
        },

        updateDetailLimitSetupSuccess: (state, {payload}) => {
            state.detail.loading = false
            console.log(payload)
            state.limitSetupList = state.limitSetupList.map(function (item) {
                if (payload.limitSetupId == item.limitSetupId) {
                    return payload
                }
                return item;
            })
        },
        updateDetailLimitSetupError: (state, {payload}) => {
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


        loadDetailLimitSetup: (state, {payload}) => {
            state.detail = {}
            state.detail.loading = true
        },
        loadDetailLimitSetupSuccess: (state, {payload}) => {
            state.detail = payload
            state.detail.loading = false
        },
        loadDetailLimitSetupError: (state) => {
            state.detail = {}
            state.detail.loading = false
        },

        removeEcheance: (state, {payload}) => {
            _.remove(state.detail.limitDetails, function (item) {
                return compareEcheance(item, payload);
            });
            state.selectedDealSwap = null
        },
        addEcheance: (state, {payload}) => {
            state.detail.limitDetails.push(payload)
        },

    }
});
export const {
    initDetail,
    updateDetail,
    removeEcheance, addEcheance,
    loadDetailLimitSetup, loadDetailLimitSetupSuccess, loadDetailLimitSetupError,
    remove, removeSuccess, removeError,
    updatingDetailLimitSetup,
    updateDetailLimitSetupSuccess,
    updateDetailLimitSetupError,
    fetchingLimitSetupError,
    selectingGridRow, fetchingLimitSetup, loadLimitSetup,
    fetchingLimitSetupSuccess
} = LimitSetup.actions;
export default LimitSetup.reducer;
