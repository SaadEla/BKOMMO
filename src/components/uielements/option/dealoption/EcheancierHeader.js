import React from "react";
import {Col, Row} from "antd";
import {
    Button
} from '@progress/kendo-react-buttons'
import {useDispatch, useSelector} from "react-redux";
import {updateDealOption,removeSelectDealOption,addDealOption}
    from '../../../../redux/dealCapture/option/DealOptionSlice';
import {dealExercicePermissionSelector} from "../../../../redux/dealCapture/selectors/OptionSelectors";
import UserService from "../../../../keycloak/UserService";
const EcheancierStyle = {
    Button: {
        borderRadius: '10px',
        color: 'rgba(19,105,180,0.9)'
    }

}

export function EcheancierHeader({updateDealOptionFlag,flagUpdate, exercer,generateEcheancier,add,update,remove,echeance}) {
    const  exercicePermission=useSelector(dealExercicePermissionSelector);

    console.log("exercicePermission",exercicePermission,echeance)
    function echeancierDg_itemClickHandler()
    {
        if(!echeance.echeanceId){
            //exercerButton.enabled=true;
            return true;
        }
        if (exercicePermission==null){
           // exercerButton.enabled=true;
            return true;
        }
        if(exercicePermission.hasOwnProperty(echeance.echeanceId)){
           // exercerButton.enabled=exercicePermission[echeance.echeanceId];
            return exercicePermission[echeance.echeanceId];
        }

    }
    return <Row>
        <Col span={12}>
            <Button

                disabled={updateDealOptionFlag?false:true}
                onClick={generateEcheancier}
                    style={EcheancierStyle.Button}
                    look="bare">
                Générer L'échéancier
            </Button>
            {
                UserService.hasRole("OPTION_EXERCICE") &&
                <Button disabled={echeance?false:true && echeancierDg_itemClickHandler} onClick={exercer} style={EcheancierStyle.Button} look="bare">
                    Exercer
                </Button>
            }

        </Col>
        <Col span={12}>
            <div style={{float: 'right'}}>
                <Button disabled={echeance?!updateDealOptionFlag:true} onClick={update} style={EcheancierStyle.Button} icon="checkmark-circle" look="bare"></Button>
                <Button disabled={updateDealOptionFlag?false:true} onClick={add} style={EcheancierStyle.Button} icon="plus-circle" look="bare"></Button>
                <Button disabled={(echeance?!updateDealOptionFlag:true) } onClick={remove} style={EcheancierStyle.Button} icon="minus-circle" look="bare"></Button>
            </div>

        </Col>
    </Row>
}