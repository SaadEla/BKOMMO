import { createSlice } from '@reduxjs/toolkit';
import { getApiCall } from '../../helpers/apiCall'
import Axios from '../../helpers/api';


const initialState = {

  groupeImportPrix: "E",
  loadingImportPrix: false,
  //it's a list inside object !!!
  ImportPrixList: {}
};


const ImportPrix = createSlice({
  name: 'ImportPrix',
  initialState,
  reducers: {
    fetchingImportPrix: (state) => {
      state.loadingImportPrix = true
    },
    fetchingImportPrixSuccess: (state, { payload }) => {
      state.loadingImportPrix = false
      state.ImportPrixList = payload

    },
    fetchingImportPrixError: (state, { payload }) => {
      state.loadingImportPrix = false
    },
  }
});

export const importPrixListSelector =state => state.importPrix.ImportPrixList
export const importPrixListLoadingSelector =state => state.importPrix.loadingImportPrix


export const {fetchingImportPrix,fetchingImportPrixSuccess,fetchingImportPrixError} = ImportPrix.actions;
export default ImportPrix.reducer;



