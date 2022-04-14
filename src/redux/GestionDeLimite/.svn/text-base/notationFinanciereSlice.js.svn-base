import { createSlice } from '@reduxjs/toolkit';
import { getApiCall } from '../../helpers/apiCall'
import Axios from '../../helpers/api';


const initialState = {

  groupeNotationFinanciere: "E",
  loadingNotationFinanciere: false,
  //it's a list inside object !!!
  NotationFinanciereList: {}
};


const NotationFinanciere = createSlice({
  name: 'NotationFinanciere',
  initialState,
  reducers: {

    fetchingNotationFinanciere: (state) => {
      state.loadingNotationFinanciere = true
    },
    loadNotationFinanciere: (state, { payload }) => {
      state.NotationFinanciereList = payload
    },
    fetchingNotationFinanciereSuccess: (state) => {
      state.loadingNotationFinanciere = false
    },
    setGroupeNotationFinanciere: (state, { payload }) => {
      state.groupeNotationFinanciere = payload
    },
  }
});


export const { fetchingNotationFinanciere, loadNotationFinanciere, fetchingTresoRecap, fetchingNotationFinanciereSuccess, setGroupeNotationFinanciere } = NotationFinanciere.actions;

export const groupeNotationFinanciereelector = state => state.NotationFinanciere.groupeNotationFinanciere;
export const NotationFinanciereListSelector = state => state.NotationFinanciere.NotationFinanciereList;

export default NotationFinanciere.reducer;


export function loadNotationFinanciereListAPI(url='', requestOptions={}, history={}) {

  return async dispatch => {
    dispatch(fetchingNotationFinanciere());

    try {
        //Rest api
      const data = [];
      Axios.get('NotationFinanciere/search').then((data) =>{
        dispatch(loadNotationFinanciere(data));
        dispatch(fetchingNotationFinanciereSuccess());
      }).catch(()=>{

      });
    } catch (error) {
      console.log(error)
    }
  };
}
