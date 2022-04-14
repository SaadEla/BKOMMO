import {DateUtil, NumberUtil} from "../../../helpers/Utils";
import React from "react";
import {Select} from "antd";
import {STATUS_LIST} from "../../../config/DATA/StatusList";
import {FREQUENCE_LIST} from "../../../config/DATA/FrequenceList";
import {openNotificationWithIcon} from "../../feedback/notification";
import * as moment from 'moment';

export function tiersLabelFunction(item) {
    return item.contrepartie.shortName + " - " + item.contrepartie.name;
}

export function montantGlobalLabelFunction(item) {
    return parseFloat((Number(item.prixFixe) * Number(item.quantite)).toString());
}

export function sensLabelFunction(item) {
    var s = "";
    if (item.sens == 1) s = "Fixe";
    if (item.sens == -1) s = "Variable";
    return s;
}

export function sousJacentLabelFunction(item) {
    return item.sousJacent.shortName + " - " + item.sousJacent.name;
}

export function mappingListSwap(dataList, dataGrid = []) {
    if (dataList)
        for (let i = 0; i < dataList.length; i++) {
            const newData = dataList[i];
            dataGrid.push({
                contrepartieLabel: tiersLabelFunction(newData),
                sousJacentLabel: sousJacentLabelFunction(newData),
                sensLabel: sensLabelFunction(newData),
                montantGlobalLabel: montantGlobalLabelFunction(newData),
                usernameLabel: newData.updateUser ? newData.updateUser.nom + " " + newData.updateUser.prenom : newData.creationUser.nom + " " + newData.creationUser.prenom,
                maturityDateLabel: DateUtil.parseDate(newData.maturityDate),
                valueDateLabel: DateUtil.parseDate(newData.valueDate),
                tradeDateLabel: DateUtil.parseDate(newData.tradeDate),
                ...newData
            })
        }
    return dataGrid;
}

export function tiersLabelFunction2(item) {
    if (item == null) return "";
    if (item.tiersId == null) return "";
    return item.shortName + " - " + item.name;
}

export function optionsContrePartie(references) {
    if (references && references.counterparties)
        return references.counterparties.map(d => <Select.Option value={d.tiersId}
                                                                 key={d.tiersId}>{tiersLabelFunction2(d)}</Select.Option>);
}

export function getContrePartie(references, id) {
    if (references && references.counterparties)
        return references.counterparties.find(item => item.tiersId == id);
}

export function optionsSousjacents(references) {
    if (references && references.sousjacents)
        return references.sousjacents.map(d => <Select.Option value={d.sousJacentId}
                                                              key={d.sousJacentId}>{d.shortName}</Select.Option>);
}

export function getSousjacent(references, id) {
    if (references && references.sousjacents)
        return references.sousjacents.find(item => item.sousJacentId == id);
}

export function optionsStatuts() {
    return STATUS_LIST.map(d => <Select.Option value={d.statutId} key={d.statutId}>{d.libelle}</Select.Option>);
}

export function getStatut(id) {
    return STATUS_LIST.find(item => item.statutId == id);
}

export function optionsFrequence() {
    return FREQUENCE_LIST.map(d => <Select.Option value={d.id} key={d.id}>{d.label}</Select.Option>);
}

export function compareEcheance(selected, selectedEcheance) {
    if (!selectedEcheance) return false
    return (

        selected.debut ===
        selectedEcheance.debut
        &&
        selected.fin ===
        selectedEcheance.fin
        /* &&
         selected.quantite ===
         selectedEcheance.quantite*/
    )
}

export function genereEcheancier({quantite = 0, frequence, valueDate, maturityDate}) {
    console.log(quantite, frequence, valueDate, maturityDate)
    // return []
    if (!frequence) {
        openNotificationWithIcon("error", "Fréquence invalide!", "Selectionner un fréquence valide!");
        return [];
    }
    let echeancierList = [];
    let startDate = new Date(valueDate);
    let periodeStartDate = startDate;
    let periodeEndDate;
    let endDate = new Date(maturityDate);
    while (periodeStartDate < endDate) {
        periodeEndDate = DateUtil.add(DateUtil.add(periodeStartDate, 1, frequence), -1, "D");
        let echeance = new Object();
        echeance.debut = DateUtil.Format(periodeStartDate);
        echeance.fin = DateUtil.Format((periodeEndDate <= endDate) ? periodeEndDate : endDate);
        echeance.quantite = 0;
        echeance.prixEcheance = 0;
        echeance.editable = false;
        echeancierList.push(echeance);
        periodeStartDate = DateUtil.add(periodeStartDate, 1, frequence);
    }

    let tempQty = quantite || 0
    let qtyStep = tempQty / echeancierList.length;
    let i = 0;
    for (i = 0; i < echeancierList.length; i++) {
        if (i < echeancierList.length - 1) {
            echeancierList[i].quantite = qtyStep;
        } else {
            echeancierList[i].quantite = qtyStep + tempQty - qtyStep * echeancierList.length;
        }
    }
    return echeancierList;
}

export function prapareSaveDealSwap(validation = false, deal) {

    if (deal.contrepartie.tiersId == null) {
        openNotificationWithIcon('error', "Contrepartie champ obligatoire!")
        return;
    }
    if (deal.sousJacent.sousJacentId == null) {
        openNotificationWithIcon('error', "Sous-jacent champ obligatoire!")
        return;
    }
    if (deal.frequence == null) {
        openNotificationWithIcon('error', "Frequence champ obligatoire!")
        return;
    }

    if (deal.echeances.length == 0) {
        openNotificationWithIcon('error', "Echeances vide!")
        return;
    }

    let previousFin = null, debut = null, fin = null;
    let valueDate = moment(deal.valueDate).format("DD/MM/YYYY");
    let maturityDate = moment(deal.maturityDate).format("DD/MM/YYYY");
    let sumQty = 0;

    for (let e of deal.echeances) {
        previousFin = new Date(fin)
        debut = e.debut;
        fin = e.fin;

        if ((debut < valueDate) || (debut > maturityDate)) {
            openNotificationWithIcon('error', "Echéances les valeurs entrées incorrectees!", "Veuillez corriger les erreurs de saisie!")
            return;
        }
        if ((fin < valueDate) || (fin > maturityDate)) {
            openNotificationWithIcon('error', "Echéances les valeurs entrées incorrectees!", "Veuillez corriger les erreurs de saisie!")
            return;
        }
        if (previousFin != null) {
            if (fin <= previousFin) {
                openNotificationWithIcon('error', "Echéances les valeurs entrées incorrectees!", "Veuillez corriger les erreurs de saisie!")
                return;
            }
        }
        if (fin <= debut) {
            openNotificationWithIcon('error', "Echéances les valeurs entrées incorrectees!", "Veuillez corriger les erreurs de saisie!")
            return;
        }
        sumQty += Number(e.quantite);
    }

    if (sumQty != deal.quantite) {
        openNotificationWithIcon('error', "Veuillez corriger les erreurs de saisie\n Echeancier invalide!");
        return;
    }
    let echeancierDebuts = [];
    let echeancierFins = [];
    let echeancierQuantites = [];
    let echeancierPrix = [];
    for (let e of deal.echeances) {
        echeancierDebuts.push(e.debut);
        echeancierFins.push(e.fin);
        echeancierQuantites.push(e.quantite);
        echeancierPrix.push(e.prixEcheance);
    }
    return {
        dealId: deal.dealId,
        counterpartyId: deal.contrepartie.tiersId,
        sousJacentId: deal.sousJacent.sousJacentId,
        tradeDate: DateUtil.Format(deal.tradeDate),
        valueDate: DateUtil.Format(deal.valueDate) ,
        maturityDate: DateUtil.Format(deal.maturityDate),
        quantite: deal.quantite,
        prix: deal.prixFixe,
        frequence: deal.frequence,
        sens: deal.sens,
        echeancierDebuts: echeancierDebuts,
        echeancierFins: echeancierFins,
        echeancierQuantites: echeancierQuantites,
        echeancierPrix: echeancierPrix,
        validation: validation,
    }

}

export function apiResultHandler(event,success=()=>{},error)
{
    if(event.hasOwnProperty('errorMessage')){
        error();
        return false;
    }else{
        success();
        return true;
    }

}

function getEcheancesId(gridDataState)
{
    let flagValidation=false;
    let param = new Object();
    let echeanceIds = "";
    for (let e of gridDataState){
        if(e.selected){
            flagValidation=true
            if(echeanceIds!="")
                echeanceIds=echeanceIds+","+e.echeanceId
            else
                echeanceIds=e.echeanceId
        }
    }
    if(!flagValidation){
        openNotificationWithIcon("error","Veuillez choisir au moins une transaction!")
        return;
    }
    return echeanceIds;

    //---------
    /*   var req:URLRequest = new URLRequest(ApplicationUtil.getInstance().SERVICE_URL_PREFIXE+"/swap/settlement/generate");
       if (ExternalInterface.available)
       {
           ExternalInterface.call(
               "window.open",
               req.url+"?contrepartieId="+contrepartieCombo.selectedItem.tiersId+"&echeanceIds="+echeanceIds+"&noCacheVar="+new Date().time.toString()+"&uid="+CommonData.LOGGED_USER.utilisateurId,

               "win",
               "height=800, width=800, toolbar=no, scrollbars=yes, location=no"
           );
       }*/

}