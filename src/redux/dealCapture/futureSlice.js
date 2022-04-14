import { createSlice } from '@reduxjs/toolkit';
import { getApiCall } from '../../helpers/apiCall'
import Axios from '../../helpers/api';


const initialState = {

  groupeFuture: "E",
  loadingFuture: false,
  //it's a list inside object !!!
  FutureList: {}
};


const Future = createSlice({
  name: 'Future',
  initialState,
  reducers: {

    fetchingFuture: (state) => {
      state.loadingFuture = true
    },
    loadFuture: (state, { payload }) => {
      state.FutureList = payload
    },
    fetchingFutureSuccess: (state) => {
      state.loadingFuture = false
    },
    setGroupeFuture: (state, { payload }) => {
      state.groupeFuture = payload
    },
  }
});


export const { fetchingFuture, loadFuture, fetchingTresoRecap, fetchingFutureSuccess, setGroupeFuture } = Future.actions;

export const groupeFutureelector = state => state.Future.groupeFuture;
export const futureListSelector = state => state.Future.FutureList;

export default Future.reducer;


export function loadFutureListAPI(url='', requestOptions={}, history={}) {

  return async dispatch => {
    dispatch(fetchingFuture());

    try {
        //Rest api
      const data = [];
      Axios.get('future/search').then((data) =>{
        dispatch(loadFuture(data));
        dispatch(fetchingFutureSuccess());
      }).catch(()=>{

      });
    } catch (error) {
      console.log(error)
    }
  };
}
