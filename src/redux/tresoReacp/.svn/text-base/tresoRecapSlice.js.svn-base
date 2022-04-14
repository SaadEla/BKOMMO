import { createSlice } from '@reduxjs/toolkit';
import config from '../../config';
import {getApiCall, postApiCall} from '../../helpers/apiCall'
import * as moment from 'moment';
import {standardUserColumns}  from './initialState'


const initialState = { 

  dateJournee: moment().format('DD/MM/YYYY'), 
  loadingUserColumns: false, 
  loadingTresoRecap: false,
  tresoRecapList: { treso :[] }, 
  Columns: {allColumns:[], userColumns: standardUserColumns, user: {}} 

  };


const tresoRecap = createSlice({
  name: 'tresoRecap',
  initialState,
  reducers: {
    fetchingUserColumns: (state) => {
      state.loadingUserColumns = true
    },
    fetchingUserColumnsSuccess: (state) => {
      state.loadingUserColumns = false
    },
    laodUserColumns: (state, { payload }) => {
      state.Columns = payload
    },
    loadTresoRecap: (state, { payload }) => {
      state.tresoRecapList = payload
    },
    fetchingTresoRecap: (state) => {
      state.loadingTresoRecap = true
    },
    fetchingTresoRecapSuccess: (state) => {
      state.loadingTresoRecap = false
    }
  }
});



export const { fetchingUserColumns, fetchingUserColumnsSuccess,fetchingTresoRecap, fetchingTresoRecapSuccess, laodUserColumns, loadTresoRecap } = tresoRecap.actions;

export const tresoRecapSelector = state => state.tresoRecap.tresoRecapList.treso;
export const tresoRecapLoadingSelector = state => state.tresoRecap.loadingTresoRecap;
export const allColumnSelector = state => state.tresoRecap.Columns.allColumns;
export const userColumnSelector = state => state.tresoRecap.Columns.userColumns;
export const userColumnsLoadingSelector = state => state.tresoRecap.loadingUserColumns;



export default tresoRecap.reducer;



export function loadUserColumnsAPI(url, requestOptions, history) {

  return async dispatch => {
    dispatch(fetchingUserColumns());

    try {
      const data = await getApiCall(url);

        dispatch(laodUserColumns(data));
        dispatch(fetchingUserColumnsSuccess());

    } catch (error) {
      console.log(error)
    }
  };
}


export function loadTresoRecapAPI(url, requestOptions, history) {

  return async dispatch => {
    dispatch(fetchingTresoRecap());

    try {
      const data = await getApiCall(url);
      dispatch(loadTresoRecap(data));
      dispatch(fetchingTresoRecapSuccess());
    
    } catch (error) {
      console.log(error)
      //openNotificationWithIcon('error',error.toString(),'');             
    }
  };
}


export function saveUserInstrumentsAPI(url, requestOptions, history) {
/*
  return async dispatch => {

    try {
      const data = await postApiCall(url, requestOptions);

      //dispatch(loadTresoRecap(data));
    
    } catch (error) {
      console.log(error)
      //openNotificationWithIcon('error',error.toString(),'');             
    }
  };*/
}