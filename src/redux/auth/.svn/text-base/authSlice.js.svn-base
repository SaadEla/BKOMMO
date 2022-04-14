import { createSlice } from '@reduxjs/toolkit';
import config from '../../config';


//let user = JSON.parse(localStorage.getItem('user'));
let user = 
{ 
"id" : 1,
"userName" : "admin",
"firstName" : "firstName",
"lastName" : "lastName",
"email" : "mail",
"active" : true,
"jwt" : "ADBC1245",
"listApp" : [{"appName":"TRESO DEVISE","appEnabled":true,"url":""},
              {"appName":"TRESO MAD","appEnabled":false,"url":""},
              {"appName":"CFP","appEnabled":false,"url":""}]
}

const initialState = {registering : false, user : user ? user : {} };


const authSlice = createSlice({
  name: 'authentication',
  initialState,
  reducers: {
    logout: state => {
      state.user = {}
    },
    register: state => {
      state.registering = true
    },
    registerSuccess: (state, { payload }) => {
      state.registering = false
      state.user = payload
    },
    registerFailure: state => {
      state.registering = false
    }
  },
});

export const { logout, register, registerSuccess, registerFailure } = authSlice.actions;
export const userSelector = state => state.authentication.user;
//export const deviseSelector = state => state.authentication.devise;

export default authSlice.reducer;


export function registerUser(user,history) {

  return async dispatch => {
    dispatch(register());
    try {
      
        dispatch(registerSuccess(JSON.parse(user)));

        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('user',user);
        history.push("/devise");
      
    } catch (error) {
      //dispatch(registerFailure());
      //window.location.assign(config.appCatalogueUrl);         
    }
  };
}
