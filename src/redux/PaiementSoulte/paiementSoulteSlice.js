import { createSlice } from '@reduxjs/toolkit';
import * as _ from "lodash";


const initialState = {

  reloadListPaiement:0,
  loadingPaiementSoulte: false,
  //it's a list inside object !!!
  PaiementSoulteList: [],
  loadingDeletePaiement: false,

  detail: {
    loading : false,
  }
};


const PaiementSoulte = createSlice({
  name: 'PaiementSoulte',
  initialState,
  reducers: {

    fetchingPaiementSoulte: (state) => {
      state.loadingPaiementSoulte = true
      state.PaiementSoulteList = []
    },
    loadPaiementSoulte: (state, { payload }) => {
      state.PaiementSoulteList = payload
    },
    fetchingPaiementSoulteSuccess: (state) => {
      state.loadingPaiementSoulte = false
    },
    fetchingPaiementSoulteError: (state) => {
      state.loadingPaiementSoulte = false
      state.PaiementSoulteList = []
    },
    selectingGridRow: (state, {payload}) => {
      state.selectedRow = payload
    },
    updatingDetailPaiementSoulte: (state, {payload}) => {
      state.detail.loading = true
    },
    deletingPaiement: (state, {payload}) => {
      state.loadingDeletePaiement = true;
    },
    deletePaiementSuccess: (state, {payload}) => {
      state.selectedRow.paiements = state.selectedRow.paiements.filter(
          item=>{
            return item.id !=state.selectedRowDetail.id
          }
      )
      state.selectedRowDetail = null
      state.loadingDeletePaiement = false
      state.reloadListPaiement++
     // console.log("state.selectedRow",payload)
    },
    deletePaiementError: (state, {payload}) => {
      state.loadingDeletePaiement = false;
    },
    updateDetailPaiementSoulteSuccess: (state, {payload}) => {
      state.selectedRow.paiements.push(payload)
      state.detail.loading = false
      state.reloadListPaiement++
    },

    updateDetailPaiementSoulteError: (state, {payload}) => {
      state.detail.loading = false
    },
    selectingGrid2Row: (state, {payload}) => {
      state.selectedRowDetail = payload
    },
  }
});


export const {
  fetchingPaiementSoulte,
  loadPaiementSoulte,
  fetchingTresoRecap,
  fetchingPaiementSoulteSuccess,
  fetchingPaiementSoulteError ,
  selectingGridRow, updatingDetailPaiementSoulte,
  updateDetailPaiementSoulteSuccess,
  deletingPaiement, deletePaiementSuccess, deletePaiementError,
  updateDetailPaiementSoulteError,selectingGrid2Row,
} = PaiementSoulte.actions;


export default PaiementSoulte.reducer;

