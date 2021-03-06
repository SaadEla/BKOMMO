import { createSlice } from "@reduxjs/toolkit";
import * as _ from "lodash";
import {
  compareEcheance,
  genereEcheancier,
  prapareSaveDealForward,
} from "../../../components/uielements/forward/ForwardUtil";
import { DateUtil } from "../../../helpers/Utils";
import { openNotificationWithIcon } from "../../../components/feedback/notification";

const initialState = {
  loadCheckPosition: false,
  loadingDealForward: false,
  dealForwardVisible: false,
  updateDealForwardFlag: false,
  loadupdateDealForward: false,
  loadValidateDealForward: false,
  loadCheckLimitDealForward: false,
  checkedLimitDealForward: null,
  dealForwardData: {
    updateFlag: true,
    validationFlag: true,
    deal: {
      sens: 1,
      prix: null,
      montantGlobalNet: null,
      montantGlobalBrut: null,
      commission: null,
      broker: {},
      contrat: {
        sousJacent: {
          devise: "",
          unite: { shortName: "" },
        },
      },
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

const DealForward = createSlice({
  name: "DealForward",
  initialState,
  reducers: {
    fetchingDealForward: (state, payload) => {
      state.dealForwardData.deal.echeances = [];
      state.selectedDealForward = null;
      state.loadingDealForward = true;
      state.dealForwardVisible = false;
    },
    loadDealForward: (state, { payload }) => {
      if (payload.deal) {
        state.dealForwardData = {
          ...payload,
          deal: {
            ...payload.deal,
            tradeDate: DateUtil.ToJsDate(payload.deal.tradeDate),
            valueDate: DateUtil.ToJsDate(payload.deal.valueDate),
            maturityDate: DateUtil.ToJsDate(payload.deal.maturityDate),
          },
        };
      } else
        state.dealForwardData = {
          ...state.dealForwardData,
          ...payload,
        };
    },
    clearDealForward: (state) => {
      state.dealForwardData = initialState.dealForwardData;
    },
    fetchingDealForwardSuccess: (state) => {
      state.loadingDealForward = false;
      state.dealForwardVisible = true;
    },
    selectingDealForward: (state, { payload }) => {
      state.selectedDealForward = payload;
    },
    removeSelectDealForward: (state) => {
      _.remove(state.dealForwardData.deal.echeances, function (item) {
        return compareEcheance(item, state.selectedDealForward);
      });
      state.selectedDealForward = null;
    },
    addDealForward: (state, { payload }) => {
      state.dealForwardData.deal.echeances.push(payload);
    },
    updateDealForward: (state, { payload }) => {
      state.dealForwardData.deal.echeances =
        state.dealForwardData.deal.echeances.map((item) => {
          if (compareEcheance(item, state.selectedDealForward))
            return {
              ...item,
              ...payload,
            };
          return item;
        });
      state.selectedDealForward = payload;
    },
    genereDealForwardEcheancier: (state, { payload }) => {
      state.dealForwardData.deal.echeances = genereEcheancier(
        state.dealForwardData.deal
      );
    },
    updateDealForwardEcheancier: (state, { payload }) => {
      console.log("payload", payload);
      state.dealForwardData.deal = {
        ...state.dealForwardData.deal,
        ...payload,
      };
    },
    updateDealForwardFlag: (state, { payload }) => {
      if (payload == false) {
        state.updateDealForwardFlag = false;
        state.dealForwardData.deal = initialState.dealForwardData.deal;
      } else state.updateDealForwardFlag = true;
    },
    loadingUpdateDealForward: (state, { payload }) => {
      state.loadupdateDealForward = true;
    },
    updateDealForwardSuccess: (state, { payload }) => {
      state.loadupdateDealForward = false;
    },
    updateDealForwardError: (state, { payload }) => {
      state.loadupdateDealForward = false;
    },
    loadingValidateDealForward: (state, { payload }) => {
      state.loadValidateDealForward = true;
    },
    validateDealForwardSuccess: (state, { payload }) => {
      state.loadValidateDealForward = false;
    },
    validateDealForwardError: (state, { payload }) => {
      state.loadValidateDealForward = false;
    },
    checkingLimitDealForward: (state, { payload }) => {
      state.loadCheckLimitDealForward = true;
      state.checkedLimitDealForward = null;
    },
    checkingLimitDealForwardSuccess: (state, { payload }) => {
      state.loadCheckLimitDealForward = false;
      state.checkedLimitDealForward = payload;
    },
    checkingLimitDealForwardError: (state, { payload }) => {
      state.loadCheckLimitDealForward = false;
      state.checkedLimitDealForward = null;
    },
    checkPosition: (state, { payload }) => {
      state.loadCheckPosition = true;
      state.dealForwardData.deal.soultes = [];
      state.position = null;
    },
    checkPositionSuccess: (state, { payload }) => {
      state.loadCheckPosition = false;
      state.position = payload;
    },
    checkPositionError: (state, { payload }) => {
      state.loadCheckPosition = false;
      state.dealForwardData.deal.soultes = [];
      state.position = null;
    },
    checkSoulte: (state, { payload }) => {
      state.loadCheckSoulte = true;
      state.dealForwardData.deal.soultes = [];
    },
    checkSoulteSuccess: (state, { payload }) => {
      state.loadCheckSoulte = false;
      state.dealForwardData.deal.soultes = payload;
    },
    checkSoulteError: (state, { payload }) => {
      state.dealForwardData.deal.soultes = [];
      state.loadCheckSoulte = false;
    },
    checkCommission: (state, { payload }) => {
      state.loadCheckCommission = true;
      state.dealForwardData.deal.soultes = [];
    },
    checkCommissionSuccess: (state, { payload }) => {
      state.loadCheckCommission = false;
      console.log("payloadpayload", payload);
      if (payload.errorMessage) {
        openNotificationWithIcon("error", payload.errorMessage);
        //CommonFunctions.msgbox_error(payload.errorMessage);
      } else {
        state.dealForwardData.deal.commission = payload.fee;
      }
      //  state.dealForwardData.deal.commission = payload;
    },
    checkCommissionError: (state, { payload }) => {
      state.dealForwardData.deal.soultes = [];
      state.loadCheckCommission = false;
    },
    checkDealMaturity: (state, { payload }) => {
      state.loadCheckCommission = true;
      state.dealForwardData.deal.soultes = [];
    },
    checkDealMaturitySuccess: (state, { payload }) => {
      state.loadCheckCommission = false;
      state.dealForwardData.deal.maturityDate = DateUtil.ToJsDate(
        payload,
        "DD/MM/YYYY"
      );
    },
    checkDealMaturityError: (state, { payload }) => {
      state.dealForwardData.deal.soultes = [];
      state.loadCheckCommission = false;
    },
  },
});

export const {
  checkDealMaturity,
  checkDealMaturityError,
  checkDealMaturitySuccess,
  checkCommission,
  checkCommissionSuccess,
  checkCommissionError,
  checkSoulteError,
  checkSoulteSuccess,
  checkSoulte,
  checkPosition,
  checkPositionSuccess,
  checkPositionError,
  checkingLimitDealForward,
  checkingLimitDealForwardSuccess,
  checkingLimitDealForwardError,
  validateDealForwardError,
  validateDealForwardSuccess,
  loadingValidateDealForward,
  loadingUpdateDealForward,
  updateDealForwardSuccess,
  updateDealForwardError,
  saveOrUpdateDealForward,
  updateDealForwardFlag,
  updateDealForwardEcheancier,
  genereDealForwardEcheancier,
  updateDealForward,
  removeSelectDealForward,
  addDealForward,
  selectingDealForward,
  fetchingDealForward,
  loadDealForward,
  fetchingDealForwardSuccess,
  clearDealForward,
} = DealForward.actions;
export default DealForward.reducer;
