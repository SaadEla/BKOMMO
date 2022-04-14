import {createSlice} from '@reduxjs/toolkit';
import {getApiCall} from '../../helpers/apiCall'
import Axios from '../../helpers/api';


const initialState = {

    groupeEtatPNL: "E",
    loadingEtatPNL: false,
    //it's a list inside object !!!
    etatPNLRes: {}
};


const EtatPNL = createSlice({
    name: 'EtatPNL',
    initialState,
    reducers: {
        fetchingEtatPNL: (state) => {
            state.loadingEtatPNL = true
        },
        fetchingEtatPNLSuccess: (state, {payload}) => {
            state.loadingEtatPNL = false
            state.etatPNLRes = payload
        },
        fetchingEtatPNLError: (state, {payload}) => {
            state.loadingEtatPNL = false
            state.etatPNLRes = payload
        },
        setGroupeEtatPNL: (state, {payload}) => {
            state.groupeEtatPNL = payload
        },
    }
});


export const {
  fetchingEtatPNL,fetchingEtatPNLSuccess,fetchingEtatPNLError
} = EtatPNL.actions;

export default EtatPNL.reducer;
