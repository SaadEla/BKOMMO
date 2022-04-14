import { createSlice } from '@reduxjs/toolkit';
import { getApiCall } from '../../helpers/apiCall'
import Axios from '../../helpers/api';


const initialState = {
  groupeLimitSetup: "E",
  loadingLimitSetup: false,
  //it's a list inside object !!!
  LimitSetupList: {}
};


const LimitSetup = createSlice({
  name: 'LimitSetup',
  initialState,
  reducers: {
    fetchingLimitSetup: (state) => {
      state.loadingLimitSetup = true
    },
    loadLimitSetup: (state, { payload }) => {
      state.LimitSetupList = payload
    },
    fetchingLimitSetupSuccess: (state) => {
      state.loadingLimitSetup = false
    },
    setGroupeLimitSetup: (state, { payload }) => {
      state.groupeLimitSetup = payload
    },
  }
});


export const { fetchingLimitSetup, loadLimitSetup, fetchingTresoRecap, fetchingLimitSetupSuccess, setGroupeLimitSetup } = LimitSetup.actions;

export const groupeLimitSetupelector = state => state.LimitSetup.groupeLimitSetup;
export const LimitSetupListSelector = state => state.LimitSetup.LimitSetupList;

export default LimitSetup.reducer;


export function loadLimitSetupListAPI(url='', requestOptions={}, history={}) {

  return async dispatch => {
    dispatch(fetchingLimitSetup());

    try {
        //Rest api
      const data = [];
      Axios.get('NotationFinanciere/search').then((data) =>{
        dispatch(loadLimitSetup(data));
        dispatch(fetchingLimitSetupSuccess());
      }).catch(()=>{

      });
    } catch (error) {
      console.log(error)
    }
  };
}
