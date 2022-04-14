import {DateUtil, NumberUtil} from "../../../helpers/Utils";
import React from "react";
import {Select} from "antd";
import {STATUS_LIST} from "../../../config/DATA/StatusList";
import {FREQUENCE_LIST} from "../../../config/DATA/FrequenceList";
import {openNotificationWithIcon} from "../../feedback/notification";

export function tiersLabelFunction(item) {

        return item.broker.shortName + " - " + item.broker.name;
}

export function montantGlobalLabelFunction(item) {
    return NumberUtil.Format((Number(item.prixFixe) * Number(item.quantite)).toString());
}

export function sensLabelFunction(item) {
    let s="";
    if  (item.sens==1) s="Achat";
    if  (item.sens==-1) s="Vente";
    return s;
}

export function sousJacentLabelFunction(item) {

    return
    //    return item.sousJacent.shortName + " - " + item.sousJacent.name;
}

export function mappingListFuture(dataList, dataGrid = []) {
    if (dataList)
        for (let i = 0; i < dataList.length; i++) {
            const newData = dataList[i];
            dataGrid.push({
                contrepartieLabel: tiersLabelFunction(newData),
                sousJacentLabel: sousJacentLabelFunction(newData),
                sensLabel: sensLabelFunction(newData),
                montantGlobalLabel: montantGlobalLabelFunction(newData),
                usernameLabel: newData.updateUser ? newData.updateUser.nom + " " + newData.updateUser.prenom : newData.creationUser.nom + " " + newData.creationUser.prenom,
                maturityDateLabel: DateUtil.parseDate(newData.contrat.maturity,"DD/MM/YYYY"),
                valueDateLabel: DateUtil.parseDate(newData.valueDate),
                tradeDateLabel: DateUtil.parseDate(newData.tradeDate),
                quantiteLabel: NumberUtil.Parse(newData.quantite),
                prixLabel: NumberUtil.Parse(newData.prix),
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
                                                              key={d.sousJacentId}>{d.shortName} - {d.name}</Select.Option>);
}

export function getSousjacent(references, id) {
    if (references && references.sousjacents)
        return references.sousjacents.find(item => item.sousJacentId == id);
}
export function optionsContrats(references) {
    if (references && references.contrats)
        return references.contrats.map(d => <Select.Option value={d.contratId}
                                                           key={d.contratId}>{d.label}</Select.Option>);
}
export function optionsContrat(contrats) {
    if (contrats)
        return contrats.map(d => <Select.Option value={d.contratId}
                                                           key={d.contratId}>{d.label}</Select.Option>);
}
export function getContrat(references, id) {
    let initContrat={
        sousJacent: {
            devise: "",
            unite: {shortName: ""}
        },
        quantiteUnitaire:null
    }
    if (references && references.contrats)
        return references.contrats.find(item => item.contratId == id) || initContrat;
}
export function optionsStrategieTypes(references) {
    if (references && references.strategieTypes)
        return references.strategieTypes.map(d => <Select.Option value={d.id}
                                                                 key={d.id}>{d.name}</Select.Option>);
}
export function optionsStrategieType(strategieTypes) {
    if (strategieTypes)
        return strategieTypes.map(d => <Select.Option value={d.id}
                                                                 key={d.id}>{d.name}</Select.Option>);
}
export function optionsBroker(references) {
    if (references && references.brokers)
        return references.brokers.map(d => <Select.Option value={d.tiersId}
                                                          key={d.tiersId}>{tiersLabelFunction2(d)}</Select.Option>);
}
export function getBroker(references,id) {
    if (references && references.brokers)
       return  references.brokers
            .find(item => item.tiersId == id)
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
export function controlMaturity(tradeDate,contratMaturity){
    var d1 = DateUtil.ToJsDate(tradeDate).getTime();
    var d2 = DateUtil.ToJsDate(contratMaturity,"DD/MM/YYYY").getTime();

    if (d1<=d2){
        return true;
    }
    return false;
}
export function prapareSaveDealFuture(validation, deal)
{
    var flagValidation=true;
  // contratCombo.errorString="";
    //brokerCombo.errorString="";
    //tradeDateInput.errorString="";
    if (deal.contrat.contratId==null){
        openNotificationWithIcon('error', "Contrat champ obligatoire!")
        //contratCombo.errorString="Champ obligatoire!";
        flagValidation=false;
        return;
    }
    if ((deal.broker==null)||(deal.broker.tiersId==null)){
        openNotificationWithIcon('error', "Broker champ obligatoire!")
     //   brokerCombo.errorString="Champ obligatoire!";
        flagValidation=false;
        return;
    }
    //var validationResult:Array = Validator.validateAll(validators);
    /*if(validationResult.length>0){
        flagValidation=false;
    }*/
    if(deal.tradeDate){
        if(!controlMaturity(deal.tradeDate,deal.contrat.maturity)){
            openNotificationWithIcon('error', "Trade date supérieure à la maturité du contrat!")
           // tradeDateInput.errorString="Trade date supérieure à la maturité du contrat!";
            flagValidation=false;
            return;
        }
    }
   /* if(flagValidation==false){
        CommonFunctions.msgbox_error("Veuillez corriger les erreurs de saise!");
        return;
    }*/
    /*var param=new Object();
    if((deal!=null)&&deal.hasOwnProperty("dealId"))
        param.dealId = deal.dealId
    param.tradeDate = tradeDateInput.text;
    param.sens = sensRadioGroup.selectedValue;
    param.quantite = NumberUtil.NumberParse(quantiteInput.text);
    param.prix = NumberUtil.NumberParse(prixInput.text);
    param.contratId = contratCombo.selectedItem.contratId;
    param.brokerId = brokerCombo.selectedItem.tiersId;
    param.commission = NumberUtil.NumberParse(commissionInput.text);
    param.validation = validation;
    save_service.send(param);*/
    return {
        dealId : deal.dealId,
        tradeDate : DateUtil.Format(deal.tradeDate),
        sens : deal.sens,
        quantite : deal.quantite,
        prix : deal.prix,
        contratId : deal.contrat.contratId,
        brokerId : deal.broker.tiersId,
        commission : deal.commission,
        validation : validation
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