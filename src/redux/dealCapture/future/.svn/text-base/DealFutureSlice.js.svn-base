import {createSlice} from "@reduxjs/toolkit";
import * as _ from 'lodash'
import {
    compareEcheance,
    genereEcheancier,
    prapareSaveDealFuture
} from "../../../components/uielements/future/FutureUtil";
import {DateUtil} from "../../../helpers/Utils";

const initialState = {
    loadingDealFuture: false,
    dealFutureVisible: false,
    updateDealFutureFlag: false,
    loadupdateDealFuture: false,
    loadValidateDealFuture: false,
    loadCheckLimitDealFuture: false,
    checkedLimitDealFuture: null,

    dealFutureData: {
        updateFlag: true,
        validationFlag: true,
        deal: {
            tradeDate:null,
            prix:null,
            commission:null,
            broker:{
            },
            quantite: null,
            prixFixe: null,
            echeances: [],
            contrepartie: {},
            contrat:{
                sousJacent: {
                    devise: "",
                    unite: {shortName: ""}
                },
            },
            statut: {}
        }
    }
};

const DealFuture = createSlice({
    name: 'DealFuture',
    initialState,
    reducers: {
        fetchingDealFuture: (state, payload) => {
            state.dealFutureData.deal.echeances = []
            state.selectedDealFuture = null
            state.loadingDealFuture = true
            state.dealFutureVisible = false
        },
        loadDealFuture: (state, {payload}) => {
            if(payload.deal)
            state.dealFutureData = {
                ...payload, deal: {
                    ...payload.deal,
                    tradeDate: DateUtil.ToJsDate(payload.deal.tradeDate),
                    valueDate: DateUtil.ToJsDate(payload.deal.valueDate),
                    maturityDate: DateUtil.ToJsDate(payload.deal.maturityDate),
                }
            }
            else state.dealFutureData = {
                ...payload
            }
        },
        fetchingDealFutureSuccess: (state) => {
            state.loadingDealFuture = false
            state.dealFutureVisible = true
        },
        selectingDealFuture: (state, {payload}) => {
            state.selectedDealFuture = payload
        },
        removeSelectDealFuture: (state) => {
            _.remove(state.dealFutureData.deal.echeances, function (item) {
                return compareEcheance(item, state.selectedDealFuture);
            });
            state.selectedDealFuture = null
        },
        addDealFuture: (state, {payload}) => {
            state.dealFutureData.deal.echeances.push(payload)
        },
        updateDealFuture: (state, {payload}) => {
            state.dealFutureData.deal.echeances = state.dealFutureData.deal.echeances.map(item => {
                if (compareEcheance(item, state.selectedDealFuture))
                    return {
                        ...item, ...payload
                    }
                return item;
            })
            state.selectedDealFuture = payload
        },
        genereDealFutureEcheancier: (state, {payload}) => {

            state.dealFutureData.deal.echeances = genereEcheancier(state.dealFutureData.deal);

        },
        updateDealFutureEcheancier: (state, {payload}) => {
            console.log("payload", payload)
            state.dealFutureData.deal = {
                ...state.dealFutureData.deal,
                ...payload
            }
        },
        updateDealFutureFlag: (state, {payload}) => {
            if (payload == false) {
                state.updateDealFutureFlag = false;
                state.dealFutureData = initialState.dealFutureData
            } else state.updateDealFutureFlag = true;
        },
        loadingUpdateDealFuture: (state, {payload}) => {
            state.loadupdateDealFuture = true;
        },
        updateDealFutureSuccess: (state, {payload}) => {
            state.loadupdateDealFuture = false;
            state.dealFutureData.deal = {
                ...state.dealFutureData.deal,
                dealId:payload.dealId
            }
        },
        updateDealFutureError: (state, {payload}) => {
            state.loadupdateDealFuture = false;
        },
        loadingValidateDealFuture: (state, {payload}) => {
            state.loadValidateDealFuture = true;
        },
        validateDealFutureSuccess: (state, {payload}) => {
            state.loadValidateDealFuture = false;
        },
        validateDealFutureError: (state, {payload}) => {
            state.loadValidateDealFuture = false;
        },
        checkingLimitDealFuture: (state, {payload}) => {
            state.loadCheckLimitDealFuture = true;
            state.checkedLimitDealFuture = null;
        },
        checkingLimitDealFutureSuccess: (state, {payload}) => {
            state.loadCheckLimitDealFuture = false
            state.checkedLimitDealFuture = payload;
        },
        checkingLimitDealFutureError: (state, {payload}) => {
            state.loadCheckLimitDealFuture = false;
            state.checkedLimitDealFuture = null;
        }
    },
});

export const {
    checkingLimitDealFuture, checkingLimitDealFutureSuccess, checkingLimitDealFutureError,
    validateDealFutureError, validateDealFutureSuccess, loadingValidateDealFuture, loadingUpdateDealFuture, updateDealFutureSuccess, updateDealFutureError, saveOrUpdateDealFuture, updateDealFutureFlag, updateDealFutureEcheancier, genereDealFutureEcheancier, updateDealFuture, removeSelectDealFuture, addDealFuture, selectingDealFuture, fetchingDealFuture, loadDealFuture, fetchingDealFutureSuccess
} = DealFuture.actions;
export default DealFuture.reducer;
