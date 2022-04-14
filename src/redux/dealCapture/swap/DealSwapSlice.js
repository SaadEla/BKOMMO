import { createSlice } from "@reduxjs/toolkit";
import * as _ from "lodash";
import {
  compareEcheance,
  genereEcheancier,
  prapareSaveDealSwap,
} from "../../../components/uielements/swap/SwapUtil";
import { DateUtil } from "../../../helpers/Utils";

const initialState = {
  loadingDealSwap: false,
  dealSwapVisible: false,
  updateDealSwapFlag: false,
  loadupdateDealSwap: false,
  loadValidateDealSwap: false,
  loadCheckLimitDealSwap: false,
  checkedLimitDealSwap: null,
  dealSwapData: {
    updateFlag: true,
    validationFlag: true,
    deal: {
      quantite: null,
      prixFixe: null,
      echeances: [],
      contrepartie: {},
      sousJacent: {
        devise: "",
        unite: { shortName: "" },
      },

      statut: {},
    },
  },
};

const DealSwap = createSlice({
  name: "DealSwap",
  initialState,
  reducers: {
    fetchingDealSwap: (state, payload) => {
      state.dealSwapData.deal.echeances = [];
      state.selectedDealSwap = null;
      state.loadingDealSwap = true;
      state.dealSwapVisible = false;
    },
    loadDealSwap: (state, { payload }) => {
      state.dealSwapData = {
        ...payload,
        deal: {
          ...payload.deal,
          tradeDate: DateUtil.ToJsDate(payload.deal.tradeDate),
          valueDate: DateUtil.ToJsDate(payload.deal.valueDate),
          maturityDate: DateUtil.ToJsDate(payload.deal.maturityDate),
        },
      };
    },
    fetchingDealSwapSuccess: (state) => {
      state.loadingDealSwap = false;
      state.dealSwapVisible = true;
    },
    selectingDealSwap: (state, { payload }) => {
      state.selectedDealSwap = payload;
    },
    removeSelectDealSwap: (state) => {
      _.remove(state.dealSwapData.deal.echeances, function (item) {
        return compareEcheance(item, state.selectedDealSwap);
      });
      state.selectedDealSwap = null;
    },
    addDealSwap: (state, { payload }) => {
      state.dealSwapData.deal.echeances.push(payload);
    },
    updateDealSwap: (state, { payload }) => {
      state.dealSwapData.deal.echeances = state.dealSwapData.deal.echeances.map(
        (item) => {
          if (compareEcheance(item, state.selectedDealSwap)) {
            console.log("updateDealSwap Slice payload", payload);
            console.log("updateDealSwap Slice item", item);
            return {
              ...item,
              ...payload,
            };
          }

          return item;
        }
      );
      state.selectedDealSwap = payload;
    },
    genereDealSwapEcheancier: (state, { payload }) => {
      state.dealSwapData.deal.echeances = genereEcheancier(
        state.dealSwapData.deal
      );
    },
    updateDealSwapEcheancier: (state, { payload }) => {
      console.log("payload", payload);
      state.dealSwapData.deal = {
        ...state.dealSwapData.deal,
        ...payload,
      };
    },
    updateDealSwapFlag: (state, { payload }) => {
      if (payload == false) {
        state.updateDealSwapFlag = false;
        state.dealSwapData.deal = initialState.dealSwapData.deal;
      } else state.updateDealSwapFlag = true;
    },
    loadingUpdateDealSwap: (state, { payload }) => {
      state.loadupdateDealSwap = true;
    },
    updateDealSwapSuccess: (state, { payload }) => {
      state.loadupdateDealSwap = false;
    },
    updateDealSwapError: (state, { payload }) => {
      state.loadupdateDealSwap = false;
    },
    loadingValidateDealSwap: (state, { payload }) => {
      state.loadValidateDealSwap = true;
    },
    validateDealSwapSuccess: (state, { payload }) => {
      state.loadValidateDealSwap = false;
    },
    validateDealSwapError: (state, { payload }) => {
      state.loadValidateDealSwap = false;
    },
    checkingLimitDealSwap: (state, { payload }) => {
      state.loadCheckLimitDealSwap = true;
      state.checkedLimitDealSwap = null;
    },
    checkingLimitDealSwapSuccess: (state, { payload }) => {
      state.loadCheckLimitDealSwap = false;
      state.checkedLimitDealSwap = payload;
    },
    checkingLimitDealSwapError: (state, { payload }) => {
      state.loadCheckLimitDealSwap = false;
      state.checkedLimitDealSwap = null;
    },
  },
});

export const {
  checkingLimitDealSwap,
  checkingLimitDealSwapSuccess,
  checkingLimitDealSwapError,
  validateDealSwapError,
  validateDealSwapSuccess,
  loadingValidateDealSwap,
  loadingUpdateDealSwap,
  updateDealSwapSuccess,
  updateDealSwapError,
  saveOrUpdateDealSwap,
  updateDealSwapFlag,
  updateDealSwapEcheancier,
  genereDealSwapEcheancier,
  updateDealSwap,
  removeSelectDealSwap,
  addDealSwap,
  selectingDealSwap,
  fetchingDealSwap,
  loadDealSwap,
  fetchingDealSwapSuccess,
} = DealSwap.actions;
export default DealSwap.reducer;
