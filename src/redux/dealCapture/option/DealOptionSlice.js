import {createSlice} from "@reduxjs/toolkit";
import * as _ from 'lodash'
import {
    checkExerce,
    compareEcheance,
    genereEcheancier,
    prapareSaveDealOption
} from "../../../components/uielements/option/OptionUtil";
import {DateUtil} from "../../../helpers/Utils";

const initialState = {
    loadGenerateEcheancier: false,
    echeancierOption: null,
    loadingDealOption: false,
    dealOptionVisible: false,
    updateDealOptionFlag: false,
    loadupdateDealOption: false,
    loadValidateDealOption: false,
    loadCheckLimitDealOption: false,
    checkedLimitDealOption: null,

    dealOptionData: {
        updateFlag: true,
        validationFlag: true,
        deal: {
            prixSousJacent: null,
            strike: null,
            prixOption: null,
            commissionGlobal: null,
            prix: null,
            montantGlobalNet: null,
            montantGlobalBrut: null,
            commission: null,
            sens: 1,
            natureOption: 'F',
            strategieLeg: {
                strategie: {
                    strategieType: {}
                }
            },
            broker: {},
            contrat: {
                sousJacent: {
                    devise: "",
                    unite: {shortName: ""}
                },
            },
            quantite: null,
            prixFixe: null,
            echeances: [],
            tiers: {},
            sousJacent: {
                devise: "",
                unite: {shortName: ""}
            },

            statut: {}
        }
    }
};

const DealOption = createSlice({
    name: 'DealOption',
    initialState,
    reducers: {
        fetchingDealOption: (state, payload) => {
            state.dealOptionData.deal.echeances = []
            state.selectedDealOption = null
            state.loadingDealOption = true
            state.dealOptionVisible = false
        },
        loadDealOption: (state, {payload}) => {
            if (payload.deal)
                state.dealOptionData = {
                    ...payload, deal: {
                        ...payload.deal,
                        tradeDate: DateUtil.ToJsDate(payload.deal.tradeDate),
                        valueDate: DateUtil.ToJsDate(payload.deal.valueDate),
                        maturityDate: DateUtil.ToJsDate(payload.deal.maturityDate),
                    }
                }
            else state.dealOptionData = {
                ...initialState.dealOptionData,
                ...payload,
            }

        },
        fetchingDealOptionSuccess: (state) => {
            state.loadingDealOption = false
            state.dealOptionVisible = true
        },
        selectingDealOption: (state, {payload}) => {
            state.selectedDealOption = payload
        },
        removeSelectDealOption: (state) => {
            _.remove(state.dealOptionData.deal.echeances, function (item) {
                return compareEcheance(item, state.selectedDealOption);
            });
            state.selectedDealOption = null
        },
        addDealOption: (state, {payload}) => {
            state.dealOptionData.deal.echeances.push(payload)
        },
        updateDealOption: (state, {payload}) => {
            state.dealOptionData.deal.echeances = state.dealOptionData.deal.echeances.map(item => {
                if (compareEcheance(item, state.selectedDealOption) && checkExerce(state.dealOptionData.deal,payload))
                    return {
                        ...item, ...payload
                    }
                return item;
            })
            state.selectedDealOption = payload
        },
        genereDealOptionEcheancier: (state, {payload}) => {

            state.dealOptionData.deal.echeances = genereEcheancier(state.dealOptionData.deal);

        },
        updateDealOptionEcheancier: (state, {payload}) => {
            console.log("payload", payload)
            state.dealOptionData.deal = {
                ...state.dealOptionData.deal,
                ...payload
            }
        },
        updateDealOptionFlag: (state, {payload}) => {
            if (payload == false) {
                state.updateDealOptionFlag = false;
                state.dealOptionData.deal = initialState.dealOptionData.deal
            } else state.updateDealOptionFlag = true;
        },
        loadingUpdateDealOption: (state, {payload}) => {
            state.loadupdateDealOption = true;
        },
        updateDealOptionSuccess: (state, {payload}) => {
            state.loadupdateDealOption = false;
        },
        updateDealOptionError: (state, {payload}) => {
            state.loadupdateDealOption = false;
        },
        loadingValidateDealOption: (state, {payload}) => {
            state.loadValidateDealOption = true;
        },
        validateDealOptionSuccess: (state, {payload}) => {
            state.loadValidateDealOption = false;
        },
        validateDealOptionError: (state, {payload}) => {
            state.loadValidateDealOption = false;
        },
        checkingLimitDealOption: (state, {payload}) => {
            state.loadCheckLimitDealOption = true;
            state.checkedLimitDealOption = null;
        },
        checkingLimitDealOptionSuccess: (state, {payload}) => {
            state.loadCheckLimitDealOption = false
            state.checkedLimitDealOption = payload;
        },
        checkingLimitDealOptionError: (state, {payload}) => {
            state.loadCheckLimitDealOption = false;
            state.checkedLimitDealOption = null;
        },
        startGenerateEcheancier: (state, {payload}) => {
            state.loadGenerateEcheancier = true;
            state.dealOptionData.deal.echeances = [];
        },
        generateEcheancierSuccess: (state, {payload}) => {
            state.loadGenerateEcheancier = false;
            state.dealOptionData.deal.echeances = payload;
        },
        startGenerateEcheancierError: (state, {payload}) => {
            state.loadGenerateEcheancier = false;
            state.echeancierOption = null;
        }
    },
});

export const {
    startGenerateEcheancier,generateEcheancierSuccess,startGenerateEcheancierError,
    checkingLimitDealOption, checkingLimitDealOptionSuccess, checkingLimitDealOptionError,
    validateDealOptionError, validateDealOptionSuccess, loadingValidateDealOption, loadingUpdateDealOption, updateDealOptionSuccess, updateDealOptionError, saveOrUpdateDealOption, updateDealOptionFlag, updateDealOptionEcheancier, genereDealOptionEcheancier, updateDealOption, removeSelectDealOption, addDealOption, selectingDealOption, fetchingDealOption, loadDealOption, fetchingDealOptionSuccess
} = DealOption.actions;
export default DealOption.reducer;
