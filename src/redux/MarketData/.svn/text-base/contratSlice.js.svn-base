import { createSlice } from '@reduxjs/toolkit';
import { getApiCall } from '../../helpers/apiCall'
import Axios from '../../helpers/api';


const initialState = {

  groupeContrat: "E",
  loadingContrat: false,
  //it's a list inside object !!!
  ContratList: {}
};


const Contrat = createSlice({
  name: 'Contrat',
  initialState,
  reducers: {

    fetchingContrat: (state) => {
      state.loadingContrat = true
    },
    loadContrat: (state, { payload }) => {
      state.ContratList = payload
    },
    fetchingContratSuccess: (state) => {
      state.loadingContrat = false
    },
    setGroupeContrat: (state, { payload }) => {
      state.groupeContrat = payload
    },
  }
});


export const { fetchingContrat, loadContrat, fetchingTresoRecap, fetchingContratSuccess, setGroupeContrat } = Contrat.actions;

export const groupeContratelector = state => state.Contrat.groupeContrat;
export const ContratListSelector = state => state.Contrat.ContratList;

export default Contrat.reducer;


export function loadContratListAPI(url='', requestOptions={}, history={}) {

  return async dispatch => {
    dispatch(fetchingContrat());

    try {
        //Rest api
      const data = [];
      Axios.get('Contrat/search').then((data) =>{
        dispatch(loadContrat(data));
        dispatch(fetchingContratSuccess());
      }).catch(()=>{

      });
    } catch (error) {
      console.log(error)
    }
  };
}
