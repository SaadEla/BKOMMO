import {createSlice} from '@reduxjs/toolkit';
import * as _ from "lodash";
import {compareEcheance} from "../../../components/uielements/swap/SwapUtil";

const initialState = {
    loadingNotationFinanciere: false,
    loadingDeleteNotationFinanciere: false,
    notationFinanciereList: [],
    notationFinanciereRef: [],
    loadingNotationFinanciereRef:false,
    detail: {
        loading: false
    },
    loadingRemove: false
};
const NotationFinanciere = createSlice({
    name: 'NotationFinanciere',
    initialState,
    reducers: {
        fetchingNotationFinanciere: (state, payload) => {
            state.loadingNotationFinanciere = true
            state.notationFinanciereList = []
        },
        loadNotationFinanciere: (state, {payload}) => {
            state.notationFinanciereList = payload
        },
        fetchingNotationFinanciereSuccess: (state) => {
            state.loadingNotationFinanciere = false
        },
        fetchingNotationFinanciereError: (state) => {
            state.loadingNotationFinanciere = false
            state.notationFinanciereList = []
        },
        selectingGridRow: (state, {payload}) => {
            console.log("payloadpayloadpayload",payload)
            state.selectedRow = payload
            state.detail = initialState.detail
        },
        selectingGridNotationRow: (state, {payload}) => {
            state.selectedRowNotation = payload
        },
        updateDetail: (state, {payload}) => {
          //  state.detail.tiers = payload.tiers
          //  state.detail.type = payload.type
        },

        updatingDetailNotationFinanciere: (state, {payload}) => {
            state.detail.loading = true
        },

        updateDetailNotationFinanciereSuccess: (state, {payload}) => {
            state.detail.loading = false
            console.log(payload)
            state.notationFinanciereList = state.notationFinanciereList.map(function (item) {
                if (payload.notationFinanciereId == item.notationFinanciereId) {
                    return payload
                }
                return item;
            })
        },
        updateDetailNotationFinanciereError: (state, {payload}) => {
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


        loadDetailNotationFinanciere: (state, {payload}) => {
            state.detail = {}
            state.detail.loading = true
        },
        loadDetailNotationFinanciereSuccess: (state, {payload}) => {
            state.detail = payload
            state.detail.loading = false
        },
        loadDetailNotationFinanciereError: (state) => {
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
            console.log(payload)
            //state.detail.limitDetails.push(payload)
        },

        loadNotationFinanciereRef: (state, {payload}) => {
            state.loadingNotationFinanciereRef = true
        },
        loadNotationFinanciereRefSuccess: (state, {payload}) => {
            state.loadingNotationFinanciereRef = false
            state.notationFinanciereRef = payload
        },
        loadNotationFinanciereRefError: (state) => {
            state.loadingNotationFinanciereRef = false
            state.notationFinanciereRef = []
        },
        addParam: (state, {payload}) => {
            state.loadingAddParam = true
        },
        addParamSuccess: (state, {payload}) => {
            state.loadingAddParam = false
            state.newParam=payload
        },
        addParamError: (state, {payload}) => {
            state.loadingAddParam = false
        },
        addOrSaveNotation: (state, {payload}) => {
            state.loadingAddParam = false
        },
        addOrSaveNotationSuccess: (state, {payload}) => {
            state.loadingAddParam = false
        },
        addOrSaveNotationError: (state, {payload}) => {
            state.loadingAddParam = false
        },
    }
});
export const {
    addOrSaveNotation,addOrSaveNotationSuccess,addOrSaveNotationError,
    addParam,addParamSuccess,addParamError,
    selectingGridNotationRow,
    loadNotationFinanciereRef,loadNotationFinanciereRefSuccess,loadNotationFinanciereRefError,
    updateDetail,
    removeEcheance, addEcheance,
    loadDetailNotationFinanciere, loadDetailNotationFinanciereSuccess, loadDetailNotationFinanciereError,
    remove, removeSuccess, removeError,
    updatingDetailNotationFinanciere,
    updateDetailNotationFinanciereSuccess,
    updateDetailNotationFinanciereError,
    fetchingNotationFinanciereError,
    selectingGridRow, fetchingNotationFinanciere, loadNotationFinanciere,
    fetchingNotationFinanciereSuccess
} = NotationFinanciere.actions;
export default NotationFinanciere.reducer;
