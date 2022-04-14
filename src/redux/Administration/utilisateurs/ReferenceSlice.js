import { createSlice } from '@reduxjs/toolkit';
import * as _ from "lodash";


const initialState = {
  referenceList:[],
  loadingReference : false
};


const Reference = createSlice({
  name: 'Reference',
  initialState,
  reducers: {
  
    fetchingReference: (state, payload) => {
        state.loadingReference = true
        state.referenceList = []
    },
    loadReference: (state, {payload}) => {
        state.referenceList = payload
    },
    fetchingReferenceSuccess: (state) => {
        state.loadingReference = false
    },
    fetchingReferenceError: (state) => {
        state.loadingReference = false
        state.referenceList = []
    },

  }
});


export const {
  fetchingReference,loadReference,fetchingReferenceSuccess,fetchingReferenceError
} = Reference.actions;
export default Reference.reducer;

