import { createSlice } from "@reduxjs/toolkit";
import * as _ from "lodash";
import { compareEcheance } from "../../../components/uielements/forward/ForwardUtil";

const initialState = {
  loadingForward: false,
  loadingDeleteForward: false,
  loadingSelectSettlementForward: false,
  auditHistoriqueModalVisible: false,
  loadingAuditHistorique: false,
  ForwardList: [],
  auditHistorique: [],
  selectionSettlementForward: [],
};
const Forward = createSlice({
  name: "Forward",
  initialState,
  reducers: {
    fetchingForward: (state, payload) => {
      state.loadingForward = true;
      state.advancedSearch = payload;
    },
    loadForward: (state, { payload }) => {
      state.ForwardList = payload;
    },
    fetchingForwardSuccess: (state) => {
      state.loadingForward = false;
    },
    fetchingForwardError: (state) => {
      state.loadingForward = false;
    },
    loadAuditHistorique: (state, { payload }) => {
      state.auditHistorique = payload;
    },
    fetchingAuditHistoriqueSuccess: (state) => {
      state.loadingAuditHistorique = false;
      state.auditHistoriqueModalVisible = true;
    },
    fetchingAuditHistoriqueError: (state) => {
      state.loadingAuditHistorique = false;
      state.auditHistoriqueModalVisible = false;
    },
    fetchingAuditHistorique: (state) => {
      state.loadingAuditHistorique = true;
      state.auditHistoriqueModalVisible = false;
    },

    setGroupeForward: (state, { payload }) => {
      state.groupeForward = payload;
    },
    selectingGridRow: (state, { payload }) => {
      state.selectedRow = payload;
    },
    fetchingSettlement: (state, payload) => {
      state.loadingForward = true;
      state.advancedSearch = payload;
    },
    loadSettlement: (state, { payload }) => {
      state.ForwardList = payload;
    },
    fetchingSettlementSuccess: (state) => {
      state.loadingForward = false;
    },
    deletingForward: (state, { payload }) => {
      state.loadingDeleteForward = true;
    },
    deleteForwardSuccess: (state, { payload }) => {
      state.loadingDeleteForward = false;
      _.remove(state.ForwardList, function (item) {
        return item.dealId === state.selectedRow.dealId;
      });
      state.selectedRow = null;
    },
    deleteForwardError: (state, { payload }) => {
      state.loadingDeleteForward = false;
    },
    selectingSettlementForward: (state, { payload }) => {
      state.loadingSelectSettlementForward = true;
    },
    selectSettlementForwardSuccess: (state, { payload }) => {
      state.loadingSelectSettlementForward = false;
      state.selectionSettlementForward = payload;
    },
    selectSettlementForwardError: (state, { payload }) => {
      state.loadingSelectSettlementForward = false;
    },
    updateDealForwardInList: (state, { payload }) => {
      state.ForwardList = state.ForwardList.map(function (item) {
        if (payload.dealId === item.dealId) {
          return payload;
        }
        return item;
      });
    },
  },
});
export const {
  updateDealForwardInList,
  selectingSettlementForward,
  selectSettlementForwardSuccess,
  selectSettlementForwardError,
  deletingForward,
  deleteForwardError,
  deleteForwardSuccess,
  fetchingForwardError,
  fetchingAuditHistorique,
  loadAuditHistorique,
  fetchingAuditHistoriqueSuccess,
  selectingGridRow,
  fetchingForward,
  loadForward,
  fetchingTresoRecap,
  fetchingForwardSuccess,
  setGroupeForward,
} = Forward.actions;
export default Forward.reducer;
