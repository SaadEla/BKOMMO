import React  from 'react';
import {useParams, Redirect} from 'react-router';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Loading from '../Loading/index';
import config from '../../config';
import { registerUser } from '../../redux/auth/authSlice';




const Authorization = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const {user} = useParams();
    

    // if user not "authenticated", redirect them to the app catalogue
    if (user && JSON.parse(user).jwt) {
        if(localStorage.getItem('user')){
            return <Redirect to={"/devise"}/>
        }else{
           dispatch(registerUser(user,history));
        }
    }
    else{
        window.location.assign(config.appCatalogueUrl);
    }
    
    return (
        <Loading title="Redirection en cours ..."/>
    )
}

export default Authorization;




