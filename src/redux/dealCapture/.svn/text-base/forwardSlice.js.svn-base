import { createSlice } from '@reduxjs/toolkit';
import { getApiCall } from '../../helpers/apiCall'
import Axios from '../../helpers/api';


const initialState = {

  groupeForward: "E",
  loadingForward: false,
  //it's a list inside object !!!
  ForwardList: {}
};


const Forward = createSlice({
  name: 'Forward',
  initialState,
  reducers: {

    fetchingForward: (state) => {
      state.loadingForward = true
    },
    loadForward: (state, { payload }) => {
      state.ForwardList = payload
    },
    fetchingForwardSuccess: (state) => {
      state.loadingForward = false
    },
    setGroupeForward: (state, { payload }) => {
      state.groupeForward = payload
    },
  }
});


export const { fetchingForward, loadForward, fetchingTresoRecap, fetchingForwardSuccess, setGroupeForward } = Forward.actions;

export const groupeForwardelector = state => state.Forward.groupeForward;
export const forwardListSelector = state => state.Forward.ForwardList;

export default Forward.reducer;


export function loadForwardListAPI(url='', requestOptions={}, history={}) {

  return async dispatch => {
    dispatch(fetchingForward());

    try {
        //Rest api
      const data = [];
      Axios.get('forward/search').then((data) =>{
        dispatch(loadForward(data));
        dispatch(fetchingForwardSuccess());
      }).catch(()=>{

      });
    } catch (error) {
      console.log(error)
    }
  };
}
