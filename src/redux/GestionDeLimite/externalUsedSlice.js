import { createSlice } from '@reduxjs/toolkit';
import { getApiCall } from '../../helpers/apiCall'
import Axios from '../../helpers/api';


const initialState = {

  groupeExternalUsed: "E",
  loadingExternalUsed: false,
  //it's a list inside object !!!
  ExternalUsedList: {}
};


const ExternalUsed = createSlice({
  name: 'ExternalUsed',
  initialState,
  reducers: {

    fetchingExternalUsed: (state) => {
      state.loadingExternalUsed = true
    },
    loadExternalUsed: (state, { payload }) => {
      state.ExternalUsedList = payload
    },
    fetchingExternalUsedSuccess: (state) => {
      state.loadingExternalUsed = false
    },
    setGroupeExternalUsed: (state, { payload }) => {
      state.groupeExternalUsed = payload
    },
  }
});


export const { fetchingExternalUsed, loadExternalUsed, fetchingTresoRecap, fetchingExternalUsedSuccess, setGroupeExternalUsed } = ExternalUsed.actions;

export const groupeExternalUsedelector = state => state.ExternalUsed.groupeExternalUsed;
export const ExternalUsedListSelector = state => state.ExternalUsed.ExternalUsedList;

export default ExternalUsed.reducer;


export function loadExternalUsedListAPI(url='', requestOptions={}, history={}) {

  return async dispatch => {
    dispatch(fetchingExternalUsed());

    try {
        //Rest api
      const data = [];
      Axios.get('ExternalUsed/search').then((data) =>{
        dispatch(loadExternalUsed(data));
        dispatch(fetchingExternalUsedSuccess());
      }).catch(()=>{

      });
    } catch (error) {
      console.log(error)
    }
  };
}
