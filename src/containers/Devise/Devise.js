import React, { useState, useEffect } from 'react';
import { validateDevise } from '../../redux/auth/authSlice';
import Radio, { RadioGroup } from '../../components/uielements/radio';
import Box from '../../components/utility/box';
import { Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import config from '../../config';
import { userSelector } from '../../redux/auth/authSlice'
import { loadUserColumnsAPI, loadTresoRecapAPI } from '../../redux/tresoReacp/tresoRecapSlice'
import {loadDevisesListAPI, setGroupeDevise} from '../../redux/devise/deviseSlice'
import * as moment from 'moment';



const Devise = () => {

    /*if(!localStorage.getItem('user')){
       window.location.assign(config.appCatalogueUrl)    
    }*/

    const history = useHistory();
    const [devise, setDevise] = useState("E");
    const dispatch = useDispatch();

    const user = useSelector(userSelector);

    const onChangeDevise = e => {
        setDevise(e.target.value)
    };


    const validate = () => {

        dispatch(setGroupeDevise(devise));
        dispatch(loadDevisesListAPI("devise/list?groupeDevise="+devise))
        dispatch(loadUserColumnsAPI("login/userColumns?username=" + user.userName))
        //to change Later with initial Date 
        dispatch(loadTresoRecapAPI("treso/tresorerie?groupeDevise=" + devise + "&dateOp=" + moment().format('DD/MM/YYYY')))

        history.push("/app/recapTreso");
    }








    return (

        <div style={{ width: '50%', height: '100%', margin: 'auto', textAlign: 'center', paddingTop: '10%' }}>
            <Box
                title="Veuillez sélectionner le groupe de devise"
                subtitle=""
            >
                <br></br>
                <RadioGroup onChange={onChangeDevise} value={devise}>
                    <Radio value="E">Groupe devise EUR</Radio>
                    <Radio value="U">Groupe devise USD</Radio>
                </RadioGroup>

                <br></br><br></br><br></br>
                <Button onClick={validate}>Valider</Button>

            </Box>
        </div>
    )
}

export default Devise
