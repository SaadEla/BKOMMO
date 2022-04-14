import {createSlice} from '@reduxjs/toolkit';
import * as _ from "lodash";

const initialState = {
    loadingFuture: false,
    loadingDeleteFuture: false,
    loadingSelectSettlementFuture: false,
    auditHistoriqueModalVisible: false,
    loadingAuditHistorique: false,
    FutureList: [],
    auditHistorique: [],
    selectionSettlementFuture: [],
};
const Future = createSlice({
    name: 'Future',
    initialState,
    reducers: {
        fetchingFuture: (state, payload) => {
            state.loadingFuture = true
            state.advancedSearch = payload
        },
        loadFuture: (state, {payload}) => {
            state.FutureList = payload
        },
        fetchingFutureSuccess: (state) => {
            state.loadingFuture = false
        },
        fetchingFutureError: (state) => {
            state.loadingFuture = false
        },
        loadAuditHistorique: (state, {payload}) => {
            state.auditHistorique = payload
        },
        fetchingAuditHistoriqueSuccess: (state) => {
            state.loadingAuditHistorique = false
            state.auditHistoriqueModalVisible = true
        },
        fetchingAuditHistoriqueError: (state) => {
            state.loadingAuditHistorique = false
            state.auditHistoriqueModalVisible = false
        },
        fetchingAuditHistorique: (state) => {
            state.loadingAuditHistorique = true
            state.auditHistoriqueModalVisible = false
            state.auditHistorique = []
        },

        setGroupeFuture: (state, {payload}) => {
            state.groupeFuture = payload
        },
        selectingGridRow: (state, {payload}) => {
            state.selectedRow = payload
        },
        fetchingSettlement: (state, payload) => {
            state.loadingFuture = true
            state.advancedSearch = payload
        },
        loadSettlement: (state, {payload}) => {
            state.FutureList = payload
        },
        fetchingSettlementSuccess: (state) => {
            state.loadingFuture = false
        },
        deletingFuture: (state, {payload}) => {
            state.loadingDeleteFuture = true;
        },
        deleteFutureSuccess: (state, {payload}) => {
            state.loadingDeleteFuture = false
            _.remove(state.FutureList, function (item) {
                return item.dealId === state.selectedRow.dealId;
            });
            state.selectedRow = null
        },
        deleteFutureError: (state, {payload}) => {
            state.loadingDeleteFuture = false;
        },
        selectingSettlementFuture: (state, {payload}) => {
            state.loadingSelectSettlementFuture = true;
        },
        selectSettlementFutureSuccess: (state, {payload}) => {
            state.loadingSelectSettlementFuture = false
            state.selectionSettlementFuture = payload

        },
        selectSettlementFutureError: (state, {payload}) => {
            state.loadingSelectSettlementFuture = false;
        },

        updateDealFutureInList: (state, {payload}) => {
            state.FutureList = state.FutureList.map(function (item) {
                if (payload.dealId === item.dealId ) {
                    return payload
                }
                return item;
            })
        },
    }
});
export const {
    updateDealFutureInList,
    selectingSettlementFuture, selectSettlementFutureSuccess, selectSettlementFutureError,
    deletingFuture, deleteFutureError, deleteFutureSuccess, fetchingFutureError, fetchingAuditHistorique, loadAuditHistorique, fetchingAuditHistoriqueSuccess, selectingGridRow, fetchingFuture, loadFuture, fetchingTresoRecap, fetchingFutureSuccess, setGroupeFuture
} = Future.actions;
export default Future.reducer;
