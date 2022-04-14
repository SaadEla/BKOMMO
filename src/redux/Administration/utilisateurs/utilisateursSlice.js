import { createSlice } from '@reduxjs/toolkit';
import * as _ from "lodash";


const initialState = {
  loadingUtilisateurs: false,
  loadingDeleteUtilisateurs: false,
  utilisateursList: [],
  detail: {
      loading: false,
  }
};


const Utilisateurs = createSlice({
  name: 'Utilisateurs',
  initialState,
  reducers: {
    fetchingUtilisateurs: (state, payload) => {
        state.loadingUtilisateurs = true
        state.utilisateursList = []
    },
    loadUtilisateurs: (state, {payload}) => {
        state.utilisateursList = payload
    },
    fetchingUtilisateursSuccess: (state) => {
        state.loadingUtilisateurs = false
    },
    fetchingUtilisateursError: (state) => {
        state.loadingUtilisateurs = false
        state.utilisateursList = []
    },
    selectingGridRow: (state, {payload}) => {
        state.selectedRow = payload
    },

    updatingDetailUtilisateurs: (state, {payload}) => {
        state.detail.loading = true
    },
    updateDetailUtilisateursSuccess: (state, {payload}) => {
        state.detail.loading = false

       
    },
    updateDetailUtilisateursError: (state, {payload}) => {
        state.detail.loading = false
    },

  }
});


export const {
  updatingDetailUtilisateurs,
  updateDetailUtilisateursSuccess,
  updateDetailUtilisateursError,
  fetchingUtilisateursError,
  selectingGridRow, fetchingUtilisateurs, loadUtilisateurs,
  fetchingUtilisateursSuccess
} = Utilisateurs.actions;
export default Utilisateurs.reducer;

