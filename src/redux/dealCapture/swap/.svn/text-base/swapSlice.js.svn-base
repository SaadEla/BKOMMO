import {createSlice} from '@reduxjs/toolkit';
import * as _ from "lodash";
import {compareEcheance} from "../../../components/uielements/swap/SwapUtil";

const initialState = {
    echeanceIds:"",
    loadingSwap: false,
    loadingDeleteSwap: false,
    loadingSelectSettlementSwap: false,
    auditHistoriqueModalVisible: false,
    loadingAuditHistorique: false,
    SwapList: [],
    auditHistorique: [],
    selectionSettlementSwap: [],
};
const Swap = createSlice({
    name: 'Swap',
    initialState,
    reducers: {
        fetchingSwap: (state, payload) => {
            state.loadingSwap = true
            state.advancedSearch = payload
        },
        loadSwap: (state, {payload}) => {
            state.SwapList = payload
        },
        fetchingSwapSuccess: (state) => {
            state.loadingSwap = false
        },
        fetchingSwapError: (state) => {
            state.loadingSwap = false
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
        },

        setGroupeSwap: (state, {payload}) => {
            state.groupeSwap = payload
        },
        selectingGridRow: (state, {payload}) => {
            state.selectedRow = payload
        },
        fetchingSettlement: (state, payload) => {
            state.loadingSwap = true
            state.advancedSearch = payload
        },
        loadSettlement: (state, {payload}) => {
            state.SwapList = payload
        },
        fetchingSettlementSuccess: (state) => {
            state.loadingSwap = false
        },
        deletingSwap: (state, {payload}) => {
            state.loadingDeleteSwap = true;
        },
        deleteSwapSuccess: (state, {payload}) => {
            state.loadingDeleteSwap = false
            _.remove(state.SwapList, function (item) {
                return item.dealId === state.selectedRow.dealId;
            });
            state.selectedRow = null
        },
        deleteSwapError: (state, {payload}) => {
            state.loadingDeleteSwap = false;
        },
        selectingSettlementSwap: (state, {payload}) => {
            state.loadingSelectSettlementSwap = true;
        },
        selectSettlementSwapSuccess: (state, {payload}) => {
            state.loadingSelectSettlementSwap = false
            state.selectionSettlementSwap = payload

        },
        selectSettlementSwapError: (state, {payload}) => {
            state.loadingSelectSettlementSwap = false;
        },

        selectionEcheanceIds: (state, {payload}) => {
            state.echeanceIds = payload;
        },
        updateDealSwapInList: (state, {payload}) => {
            state.SwapList = state.SwapList.map(function (item) {
                if (payload.dealId === item.dealId  ) {
                    return payload
                }
                return item;
            })
        },
    }
});
export const {
    updateDealSwapInList,
    selectionEcheanceIds,
    selectingSettlementSwap, selectSettlementSwapSuccess, selectSettlementSwapError,
    deletingSwap, deleteSwapError, deleteSwapSuccess, fetchingSwapError, fetchingAuditHistorique, loadAuditHistorique, fetchingAuditHistoriqueSuccess, selectingGridRow, fetchingSwap, loadSwap, fetchingTresoRecap, fetchingSwapSuccess, setGroupeSwap
} = Swap.actions;
export default Swap.reducer;
