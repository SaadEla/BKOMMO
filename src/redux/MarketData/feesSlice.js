import { createSlice } from '@reduxjs/toolkit';
import { getApiCall } from '../../helpers/apiCall'
import Axios from '../../helpers/api';


const initialState = {

  groupeFees: "E",
  loadingFees: false,
  //it's a list inside object !!!
  FeesList: {}
};


const Fees = createSlice({
  name: 'Fees',
  initialState,
  reducers: {

    fetchingFees: (state) => {
      state.loadingFees = true
    },
    loadFees: (state, { payload }) => {
      state.FeesList = payload
    },
    fetchingFeesSuccess: (state) => {
      state.loadingFees = false
    },
    setGroupeFees: (state, { payload }) => {
      state.groupeFees = payload
    },
  }
});


export const { fetchingFees, loadFees, fetchingTresoRecap, fetchingFeesSuccess, setGroupeFees } = Fees.actions;

export const groupeFeeselector = state => state.Fees.groupeFees;
export const FeesListSelector = state => state.Fees.FeesList;

export default Fees.reducer;


export function loadFeesListAPI(url='', requestOptions={}, history={}) {

  return async dispatch => {
    dispatch(fetchingFees());

    try {
        //Rest api
      const data = [];
      Axios.get('limitSetup/search').then((data) =>{
        dispatch(loadFees(data));
        dispatch(fetchingFeesSuccess());
      }).catch(()=>{

      });
    } catch (error) {
      console.log(error)
    }
  };
}
