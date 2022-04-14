import {createSlice} from '@reduxjs/toolkit';
import * as _ from "lodash";

const initialState = {
    loadingJoursFeriers: false,
    loadingDeleteJoursFeriers: false,
    joursFeriersList: [],
    detail: {
        loading: false,
    },
    loadingRemove: false
};
const JoursFeriers = createSlice({
    name: 'JoursFeriers',
    initialState,
    reducers: {
        fetchingJoursFeriers: (state, payload) => {
            state.loadingJoursFeriers = true
            state.joursFeriersList = []
        },
        loadJoursFeriers: (state, {payload}) => {
            state.joursFeriersList = payload
        },
        fetchingJoursFeriersSuccess: (state) => {
            state.loadingJoursFeriers = false
        },
        fetchingJoursFeriersError: (state) => {
            state.loadingJoursFeriers = false
            state.joursFeriersList = []
        },
        selectingGridRow: (state, {payload}) => {
            state.selectedRow = payload
        },

        updatingDetailJoursFeriers: (state, {payload}) => {
            state.detail.loading = true
        },
        updateDetailJoursFeriersSuccess: (state, {payload}) => {
            state.detail.loading = false
           // state.joursFeriersList.push(payload)
            /*state.joursFeriersList = state.joursFeriersList.map(function (item) {
                if (payload.id == item.id) {
                    return payload
                }
                return item;
            })*/
        },
        updateDetailJoursFeriersError: (state, {payload}) => {
            state.detail.loading = false
        },
        remove: (state, {payload}) => {
            state.loadingRemove = true
        },
        removeSuccess: (state, {payload}) => {
            state.loadingRemove = false

            _.remove(state.joursFeriersList, function (item) {
                return item.id === state.selectedRow.id;
            });
            state.selectedRow = null
        },
        removeError: (state, {payload}) => {
            state.loadingRemove = false
        },

    }
});
export const {
    remove,removeSuccess,removeError,
    updatingDetailJoursFeriers,
    updateDetailJoursFeriersSuccess,
    updateDetailJoursFeriersError,
    fetchingJoursFeriersError,
    selectingGridRow, fetchingJoursFeriers, loadJoursFeriers,
    fetchingJoursFeriersSuccess
} = JoursFeriers.actions;
export default JoursFeriers.reducer;
