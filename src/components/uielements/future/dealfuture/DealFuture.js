import React, {useState} from "react";
import {DealFutureForm} from "./DealFutureForm";
import {
    updateDealFutureEcheancier
} from "../../../../redux/dealCapture/future/DealFutureSlice";
import {useDispatch, useSelector} from "react-redux";
import {getBroker, getContrat, getContrePartie, getSousjacent, getStatut, optionsBroker} from "../FutureUtil";


export function DealFuture({onFinish, references,form}) {

    const dispatch = useDispatch();
     const [echeanceFrom, setEcheanceFrom] = useState();



    function onChangeEcheance(values) {
        dispatch(updateDealFutureEcheancier(prepareEcheance(values)))
        setEcheanceFrom(prepareEcheance(values));
    }

    function prepareEcheance(values) {
        let contrat={
            sousJacent: {
                devise: "",
                unite: {shortName: ""}
            },
        };
        if(values.sousJacentId){
            let newContrat=getContrat(references, values.contratId);
            if(newContrat && newContrat.sousJacent.sousJacentId==values.sousJacentId)
                contrat = newContrat
            contrat = {
                ...contrat,
                sousJacent:{...getSousjacent(references, values.sousJacentId)},
            }
        }else{
          //  contrat=getContrat(references, values.contratId);
        }


        return {
            ...values,
            commission: parseFloat(values.commission && String(values.commission).replace(/ /g, "")),
            quantite: parseFloat(values.quantite && String(values.quantite).replace(/ /g, "")),
            prix: parseFloat(values.prix && String(values.prix).replace(/ /g, "")),
            contrepartie: {...getContrePartie(references, values.tiersId)},
            statut: {...getStatut(values.statutId)},
            contrat:contrat,
            broker: {...getBroker(references, values.tiersId)},
        };
    }

    return <div>
        <DealFutureForm onFinish={onFinish} form={form} onChange={onChangeEcheance}
                        references={references}></DealFutureForm>
    </div>
}