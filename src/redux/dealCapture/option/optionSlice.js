import {createSlice} from '@reduxjs/toolkit';
import * as _ from "lodash";

const initialState = {
    loadingOption: false,
    loadingDeleteOption: false,
    loadingSelectSettlementOption: false,
    auditHistoriqueModalVisible: false,
    loadingAuditHistorique: false,
    OptionList: [],
    auditHistorique: [],
    selectionSettlementOption: [],
};
const Option = createSlice({
    name: 'Option',
    initialState,
    reducers: {
        fetchingOption: (state, payload) => {
            state.loadingOption = true
            state.advancedSearch = payload
        },
        loadOption: (state, {payload}) => {
            state.OptionList = payload
        },
        fetchingOptionSuccess: (state) => {
            state.loadingOption = false
        },
        fetchingOptionError: (state) => {
            state.loadingOption = false
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

        setGroupeOption: (state, {payload}) => {
            state.groupeOption = payload
        },
        selectingGridRow: (state, {payload}) => {
            state.selectedRow = payload
        },
        fetchingSettlement: (state, payload) => {
            state.loadingOption = true
            state.advancedSearch = payload
        },
        loadSettlement: (state, {payload}) => {
            state.OptionList = payload
        },
        fetchingSettlementSuccess: (state) => {
            state.loadingOption = false
        },
        deletingOption: (state, {payload}) => {
            state.loadingDeleteOption = true;
        },
        deleteOptionSuccess: (state, {payload}) => {
            state.loadingDeleteOption = false
            _.remove(state.OptionList, function (item) {
                return item.dealId === state.selectedRow.dealId;
            });
            state.selectedRow = null
        },
        deleteOptionError: (state, {payload}) => {
            state.loadingDeleteOption = false;
        },
        selectingSettlementOption: (state, {payload}) => {
            state.loadingSelectSettlementOption = true;
        },
        selectSettlementOptionSuccess: (state, {payload}) => {
            state.loadingSelectSettlementOption = false
            state.selectionSettlementOption = payload

        },
        selectSettlementOptionError: (state, {payload}) => {
            state.loadingSelectSettlementOption = false;
        },
        updateDealOptionInList: (state, {payload}) => {
            state.OptionList = state.OptionList.map(function (item) {
                if (payload.dealId === item.dealId ) {
                    return payload
                }
                return item;
            })
        },
    }
});
export const {
    updateDealOptionInList,
    selectingSettlementOption, selectSettlementOptionSuccess, selectSettlementOptionError,
    deletingOption, deleteOptionError, deleteOptionSuccess, fetchingOptionError, fetchingAuditHistorique, loadAuditHistorique, fetchingAuditHistoriqueSuccess, selectingGridRow, fetchingOption, loadOption, fetchingTresoRecap, fetchingOptionSuccess, setGroupeOption
} = Option.actions;
export default Option.reducer;
