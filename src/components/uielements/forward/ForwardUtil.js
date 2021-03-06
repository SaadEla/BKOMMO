/**
 * MODIFICATION HISTORY
 *
 * 1- ajouter les parametres (validationOnly,validation) a la fonction prapareSaveDealForward
 *
 */

import { DateUtil, NumberUtil } from "../../../helpers/Utils";
import React from "react";
import { Select } from "antd";
import { STATUS_LIST } from "../../../config/DATA/StatusList";
import { FREQUENCE_LIST } from "../../../config/DATA/FrequenceList";
import { openNotificationWithIcon } from "../../feedback/notification";

export function tiersLabelFunction(item) {
  return item.contrepartie.shortName + " - " + item.contrepartie.name;
}

export function montantGlobalLabelFunction(item) {
  return (Number(item.prixFixe) * Number(item.quantite)).toString();
}

export function sensLabelFunction(item, column) {
  var s = "";
  if (item.sens == 1) s = "Achat";
  if (item.sens == -1) s = "Vente";
  return s;
  //			return item.contrat.maturity;
}

export function sousJacentLabelFunction(item) {
  return;
  //    return item.sousJacent.shortName + " - " + item.sousJacent.name;
}
function globalBrutLabelFunction(item) {
  //return NumberUtil.Format((Number(item.prix)*Number(item.quantite)).toString());
  let prixbrut = parseFloat(item.prix);
  let qtyGlobale =
    parseFloat(item.quantite) * parseFloat(item.contrat.quantiteUnitaire);
  let coefPrix = parseFloat(item.contrat.sousJacent.coefPrix);
  let mntGlobalBrut = prixbrut * qtyGlobale * coefPrix;
  return mntGlobalBrut;
}
function globalNetLabelFunction(item) {
  //return NumberUtil.Format(((Number(item.prix)-Number(item.commission))*Number(item.quantite)).toString());
  let prixNet =
    parseFloat(item.prix) -
    (item.sens == 1 ? 1 : -1) * parseFloat(item.commission);
  let qtyGlobale =
    parseFloat(item.quantite) * parseFloat(item.contrat.quantiteUnitaire);
  let coefPrix = parseFloat(item.contrat.sousJacent.coefPrix);
  let mntGlobalNet = prixNet * qtyGlobale * coefPrix;
  return mntGlobalNet;
}

export function mappingListForward(dataList, dataGrid = []) {
  if (dataList)
    for (let i = 0; i < dataList.length; i++) {
      const newData = dataList[i];
      dataGrid.push({
        prixLabel: newData.prix,
        globalBrutLabel: globalBrutLabelFunction(newData),
        globalNetLabel: globalNetLabelFunction(newData),
        contrepartieLabel: tiersLabelFunction(newData),
        sousJacentLabel: sousJacentLabelFunction(newData),
        sensLabel: sensLabelFunction(newData),
        montantGlobalLabel: montantGlobalLabelFunction(newData),
        usernameLabel:
          newData.updateUser && newData.updateUser.nom
            ? newData.updateUser.nom + " " + newData.updateUser.prenom
            : newData.creationUser.nom + " " + newData.creationUser.prenom,
        maturityDateLabel: DateUtil.parseDate(newData.maturityDate),
        valueDateLabel: DateUtil.parseDate(newData.valueDate),
        tradeDateLabel: DateUtil.parseDate(newData.tradeDate),
        ...newData,
      });
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
    return references.counterparties.map((d) => (
      <Select.Option value={d.tiersId} key={d.tiersId}>
        {tiersLabelFunction2(d)}
      </Select.Option>
    ));
}

export function getContrePartie(references, id) {
  if (references && references.counterparties)
    return references.counterparties.find((item) => item.tiersId == id);
}

export function optionsSousjacents(references) {
  if (references && references.sousjacents)
    return references.sousjacents.map((d) => (
      <Select.Option value={d.sousJacentId} key={d.sousJacentId}>
        {d.shortName} - {d.name}
      </Select.Option>
    ));
}

export function getSousjacent(references, id) {
  if (references && references.sousjacents)
    return references.sousjacents.find((item) => item.sousJacentId == id);
}

export function optionsStatuts() {
  return STATUS_LIST.map((d) => (
    <Select.Option value={d.statutId} key={d.statutId}>
      {d.libelle}
    </Select.Option>
  ));
}

export function getStatut(id) {
  return STATUS_LIST.find((item) => item.statutId == id);
}

export function optionsFrequence() {
  return FREQUENCE_LIST.map((d) => (
    <Select.Option value={d.id} key={d.id}>
      {d.label}
    </Select.Option>
  ));
}

export function compareEcheance(selected, selectedEcheance) {
  if (!selectedEcheance) return false;
  return (
    selected.debut === selectedEcheance.debut &&
    selected.fin === selectedEcheance.fin
    /* &&
         selected.quantite ===
         selectedEcheance.quantite*/
  );
}

export function genereEcheancier({
  quantite = 0,
  frequence,
  valueDate,
  maturityDate,
}) {
  console.log(quantite, frequence, valueDate, maturityDate);
  // return []
  if (!frequence) {
    openNotificationWithIcon(
      "error",
      "Fr??quence invalide!",
      "Selectionner un fr??quence valide!"
    );
    return [];
  }
  let echeancierList = [];
  let startDate = new Date(valueDate);
  let periodeStartDate = startDate;
  let periodeEndDate;
  let endDate = new Date(maturityDate);
  while (periodeStartDate < endDate) {
    periodeEndDate = DateUtil.add(
      DateUtil.add(periodeStartDate, 1, frequence),
      -1,
      "D"
    );
    let echeance = new Object();
    echeance.debut = DateUtil.Format(periodeStartDate);
    echeance.fin = DateUtil.Format(
      periodeEndDate <= endDate ? periodeEndDate : endDate
    );
    echeance.quantite = 0;
    echeance.prixEcheance = 0;
    echeance.editable = false;
    echeancierList.push(echeance);
    periodeStartDate = DateUtil.add(periodeStartDate, 1, frequence);
  }

  let tempQty = quantite || 0;
  let qtyStep = tempQty / echeancierList.length;
  let i = 0;
  for (i = 0; i < echeancierList.length; i++) {
    if (i < echeancierList.length - 1) {
      echeancierList[i].quantite = qtyStep;
    } else {
      echeancierList[i].quantite =
        qtyStep + tempQty - qtyStep * echeancierList.length;
    }
  }
  return echeancierList;
}
export function prapareSaveDealForward(validation, deal) {
  // MaturityValidator.enabled=(this.currentState=='initiationState')

  let flagValidation = true;
  //  contratCombo.errorString="";
  //  contrepartieCombo.errorString="";
  // maturityDateInput.errorString="";
  if (deal.contrat.contratId == null) {
    openNotificationWithIcon("error", "Contrat champ obligatoire!");
    //contratCombo.errorString="Champ obligatoire!";
    flagValidation = false;
    return;
  }
  if (deal.contrepartie == null || deal.contrepartie.tiersId == null) {
    openNotificationWithIcon("error", "Contrepartie champ obligatoire!");
    //contrepartieCombo.errorString="Champ obligatoire!";
    flagValidation = false;
    return;
  }

  /*  var validationResult:Array = Validator.validateAll(validators);
    if(validationResult.length>0){
        flagValidation=false;
    }*/
  if (!deal.tradeDate) {
    // if(this.currentState=='initiationState'){
    var tradeDate = DateUtil.parseDate(deal.tradeDate);
    var maturityDate = DateUtil.parseDate(deal.maturityDate);
    var contratMaturity = DateUtil.parseDate(deal.contrat.maturity);
    if (maturityDate > contratMaturity) {
      openNotificationWithIcon(
        "error",
        "La Maturity date doit ??tre inf??rieure ou ??gale ?? la Maturity du contrat!"
      );
      //maturityDateInput.errorString="La Maturity date doit ??tre inf??rieure ou ??gale ?? la Maturity du contrat!"
      //flagValidation=false;
      return;
    }
    if (maturityDate < tradeDate) {
      openNotificationWithIcon(
        "error",
        "La Maturity date doit ??tre sup??rieure ou ??gale ?? la Trade date!"
      );
      //maturityDateInput.errorString="La Maturity date doit ??tre sup??rieure ou ??gale ?? la Trade date!"
      flagValidation = false;
      return;
    }
    // }
  }
  /* if(flagValidation==false){
        CommonFunctions.msgbox_error("Veuillez corriger les erreurs de saise!");
        return;
    }*/ /*
    var param:Object=new Object();
    param.dealId = deal.dealId;
    param.tradeDate = tradeDateInput.text;
    param.maturityDate = maturityDateInput.text;
    param.sens = sensRadioGroup.selectedValue;
    param.quantite = NumberUtil.Parse(quantiteInput.text);
    param.prix = NumberUtil.Parse(prixInput.text);
    param.commission = NumberUtil.Parse(commissionInput.text);
    param.contratId = contratCombo.selectedItem.contratId;
    param.counterpartyId = contrepartieCombo.selectedItem.tiersId;
    if((strategieTypeCombo.selectedItem!=null)&&(strategieTypeCombo.selectedItem.id!=null))
        param.strategieTypeId=strategieTypeCombo.selectedItem.id;
    param.validation = validation;

    if(actionType==ADD_ACTION)
        param.commissionStandard = commissionStandard;
*/
  return {
    dealId: deal.dealId,
    tradeDate: DateUtil.Format(deal.tradeDate),
    maturityDate: DateUtil.Format(deal.maturityDate),
    sens: deal.sens,
    quantite: deal.quantite,
    prix: deal.prix,
    commission: deal.commission,
    contratId: deal.contrat.contratId,
    counterpartyId: deal.contrepartie.tiersId,
    validationOnly: validation,
    validation: validation,
    //commissionStandard:deal.commissionStandard
  };
} /*
export function prapareSaveDealForward(validation = false, deal) {

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
    let valueDate = deal.valueDate;
    let maturityDate = deal.maturityDate;
    let sumQty = 0;

    for (let e of deal.echeances) {
        previousFin = new Date(fin)
        debut = DateUtil.ToJsDate(e.debut);
        fin = DateUtil.ToJsDate(e.fin);
        if ((debut < valueDate) || (debut > maturityDate)) {
            openNotificationWithIcon('error', "Ech??ances les valeurs entr??es incorrectees!", "Veuillez corriger les erreurs de saisie!")
            return;
        }
        if ((fin < valueDate) || (fin > maturityDate)) {
            openNotificationWithIcon('error', "Ech??ances les valeurs entr??es incorrectees!", "Veuillez corriger les erreurs de saisie!")
            return;
        }
        if (previousFin != null) {
            if (fin <= previousFin) {
                openNotificationWithIcon('error', "Ech??ances les valeurs entr??es incorrectees!", "Veuillez corriger les erreurs de saisie!")
                return;
            }
        }
        if (fin <= debut) {
            openNotificationWithIcon('error', "Ech??ances les valeurs entr??es incorrectees!", "Veuillez corriger les erreurs de saisie!")
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
*/
export function apiResultHandler(event, success = () => {}, error) {
  if (event.hasOwnProperty("errorMessage")) {
    error();
    return false;
  } else {
    success();
    return true;
  }
}
