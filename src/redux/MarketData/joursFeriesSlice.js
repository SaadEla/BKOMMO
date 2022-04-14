import { createSlice } from '@reduxjs/toolkit';
import { getApiCall } from '../../helpers/apiCall'
import Axios from '../../helpers/api';


const initialState = {

  groupeJoursFeries: "E",
  loadingJoursFeries: false,
  //it's a list inside object !!!
  JoursFeriesList: {}
};


const JoursFeries = createSlice({
  name: 'JoursFeries',
  initialState,
  reducers: {

    fetchingJoursFeries: (state) => {
      state.loadingJoursFeries = true
    },
    loadJoursFeries: (state, { payload }) => {
      state.JoursFeriesList = payload
    },
    fetchingJoursFeriesSuccess: (state) => {
      state.loadingJoursFeries = false
    },
    setGroupeJoursFeries: (state, { payload }) => {
      state.groupeJoursFeries = payload
    },
  }
});


export const { fetchingJoursFeries, loadJoursFeries, fetchingTresoRecap, fetchingJoursFeriesSuccess, setGroupeJoursFeries } = JoursFeries.actions;

export const groupeJoursFerieselector = state => state.JoursFeries.groupeJoursFeries;
export const JoursFeriesListSelector = state => state.JoursFeries.JoursFeriesList;

export default JoursFeries.reducer;


export function loadJoursFeriesListAPI(url='', requestOptions={}, history={}) {

  return async dispatch => {
    dispatch(fetchingJoursFeries());

    try {
        //Rest api
      const data = [];
      Axios.get('JoursFeries/search').then((data) =>{
        dispatch(loadJoursFeries(data));
        dispatch(fetchingJoursFeriesSuccess());
      }).catch(()=>{

      });
    } catch (error) {
      console.log(error)
    }
  };
}
