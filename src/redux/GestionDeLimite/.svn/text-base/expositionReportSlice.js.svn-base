import { createSlice } from '@reduxjs/toolkit';
import { getApiCall } from '../../helpers/apiCall'
import Axios from '../../helpers/api';


const initialState = {

  groupeExpositionReport: "E",
  loadingExpositionReport: false,
  //it's a list inside object !!!
  ExpositionReportList: {}
};


const ExpositionReport = createSlice({
  name: 'ExpositionReport',
  initialState,
  reducers: {

    fetchingExpositionReport: (state) => {
      state.loadingExpositionReport = true
    },
    loadExpositionReport: (state, { payload }) => {
      state.ExpositionReportList = payload
    },
    fetchingExpositionReportSuccess: (state) => {
      state.loadingExpositionReport = false
    },
    setGroupeExpositionReport: (state, { payload }) => {
      state.groupeExpositionReport = payload
    },
  }
});


export const { fetchingExpositionReport, loadExpositionReport, fetchingTresoRecap, fetchingExpositionReportSuccess, setGroupeExpositionReport } = ExpositionReport.actions;

export const groupeExpositionReportelector = state => state.ExpositionReport.groupeExpositionReport;
export const ExpositionReportListSelector = state => state.ExpositionReport.ExpositionReportList;

export default ExpositionReport.reducer;


export function loadExpositionReportListAPI(url='', requestOptions={}, history={}) {

  return async dispatch => {
    dispatch(fetchingExpositionReport());

    try {
        //Rest api
      const data = [];
      Axios.get('ExpositionReport/search').then((data) =>{
        dispatch(loadExpositionReport(data));
        dispatch(fetchingExpositionReportSuccess());
      }).catch(()=>{

      });
    } catch (error) {
      console.log(error)
    }
  };
}
