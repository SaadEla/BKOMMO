import { DateUtil, NumberUtil } from "../../../helpers/Utils";
import React from "react";
import { Select } from "antd";
import { STATUS_LIST } from "../../../config/DATA/StatusList";
import {
  FREQUENCE_LIST,
  TYPE_EXERCICE,
} from "../../../config/DATA/FrequenceList";
import { openNotificationWithIcon } from "../../feedback/notification";

export function tiersLabelFunction(item) {
  return item.contrepartie.shortName + " - " + item.contrepartie.name;
}

export function montantGlobalLabelFunction(item) {
  return NumberUtil.Format(
    (Number(item.prixFixe) * Number(item.quantite)).toString()
  );
}

export function sensLabelFunction(item, column) {
  let s = "";
  if (item.sens == 1) s = "Achat";
  if (item.sens == -1) s = "Vente";
  return s;
}

export function sousJacentLabelFunction(item) {
  if (item.natureOption == "M")
    return item.sousJacent.shortName + " - " + item.sousJacent.name;
  else return item.contrat.label;
}
export function natureOptionLabelFunction(item) {
  let s = "";
  if (item.natureOption == "F") s = "Contrat Future";
  if (item.natureOption == "M") s = "Matière première";
  return s;
}

export function typeOptionLabelFunction(item, column) {
  var s = "";
  if (item.typeOption == "C") s = "Call";
  if (item.typeOption == "P") s = "Put";
  return s;
}

export function mappingListOption(dataList, dataGrid = []) {
  if (dataList)
    for (let i = 0; i < dataList.length; i++) {
      const newData = dataList[i];
      dataGrid.push({
        prixOptionLabel: newData.prixOption,
        prixSousJacentLabel: newData.prixSousJacent,
        quantiteLabel: newData.quantite,
        contrepartieLabel: newData.tiers.shortName + " - " + newData.tiers.name, //tiersLabelFunction(newData),
        sousJacentLabel: sousJacentLabelFunction(newData),
        natureOptionLabel: natureOptionLabelFunction(newData),
        sensLabel: sensLabelFunction(newData),
        typeOptionLabel: typeOptionLabelFunction(newData),
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
export function optionsTiers(references) {
  if (references && references.tiers)
    return references.tiers.map((d) => (
      <Select.Option value={d.tiersId} key={d.tiersId}>
        {tiersLabelFunction2(d)}
      </Select.Option>
    ));
}
export function optionsBroker(references) {
  if (references && references.brokers)
    return references.brokers.map((d) => (
      <Select.Option value={d.tiersId} key={d.tiersId}>
        {tiersLabelFunction2(d)}
      </Select.Option>
    ));
}

export function getContrePartie(references, id) {
  if (references && references.counterparties)
    return (
      references.counterparties.find((item) => item.tiersId == id) ||
      references.brokers.find((item) => item.tiersId == id)
    );
}

export function optionsSousjacents(references) {
  if (references && references.sousjacents)
    return references.sousjacents.map((d) => (
      <Select.Option value={d.sousJacentId} key={d.sousJacentId}>
        {d.shortName} - {d.name}
      </Select.Option>
    ));
}
export function optionsStrategieTypes(references) {
  if (references && references.strategieTypes)
    return references.strategieTypes.map((d) => (
      <Select.Option value={d.id} key={d.id}>
        {d.name}
      </Select.Option>
    ));
}
export function optionsStrategieType(strategieList) {
  if (strategieList)
    return strategieList.map((d) => (
      <Select.Option value={d.id} key={d.id}>
        {d.name}
      </Select.Option>
    ));
}

export function optionsContrats(references) {
  if (references && references.contrats)
    return references.contrats.map((d) => (
      <Select.Option value={d.contratId} key={d.contratId}>
        {d.label}
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
export function getFrequence(id) {
  return FREQUENCE_LIST.find((item) => item.id == parseFloat(id)) || {};
}
export function optionsTypeExercice() {
  return TYPE_EXERCICE.map((d) => (
    <Select.Option value={d.id} key={d.id}>
      {d.label}
    </Select.Option>
  ));
}
export function getTypeExercice(id) {
  return TYPE_EXERCICE.find((item) => item.id == parseFloat(id)) || {};
}
export function optionsModePaiements(reference) {
  return reference.modePaiements.map((d) => (
    <Select.Option value={d.id} key={d.id}>
      {d.libelle}
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

export function checkEcheancier(deal) {
  //new version 08/11/2017 : server side calculation including holydays
  let flagValidation = true;

  if (!deal.typeExercice) {
    openNotificationWithIcon("error", "Type exercice Champ obligatoire!");

    //  typeExerciceCombo.errorString="Champ obligatoire!";
    // flagValidation=false;
    return;
  }
  if (getTypeExercice(deal.typeExercice).frequence == true && !deal.frequence) {
    openNotificationWithIcon("error", "Fréquence Champ obligatoire!");
    //frequenceCombo.errorString="Champ obligatoire!";
    //flagValidation=false;
    return;
  }
  return true;
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
      "Fréquence invalide!",
      "Selectionner un fréquence valide!"
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

export function prapareSaveDealOption(
  validation,
  deal,
  echeancierOnly = false
) {
  let flagValidation = true;
  let errors = {};

  /*  tiersCombo.errorString="";
    sousJacentCombo.errorString="";
    contratCombo.errorString="";
    typeExerciceCombo.errorString="";
    frequenceCombo.errorString="";
    tradeDateInput.errorString="";
    valueDateInput.errorString="";
    maturityDateInput.errorString="";
    modePaiementCombo.errorString="";*/

  if (deal.tiers == null || deal.tiers.tiersId == null) {
    openNotificationWithIcon("error", "TiersHeader champ obligatoire!");
    //tiersCombo.errorString="Champ obligatoire!";
    errors.tiers = "Champ obligatoire!";
    // flagValidation=false;
    return;
  }
  if (deal.natureOption == "M" && deal.sousJacent.sousJacentId == null) {
    openNotificationWithIcon("error", "Sous-jacent champ obligatoire!");
    //sousJacentCombo.errorString="Champ obligatoire!";
    //flagValidation=false;
    errors.sousJacent = "Champ obligatoire!";
  }
  if (deal.natureOption == "F" && deal.contrat.contratId == null) {
    openNotificationWithIcon("error", "Contrat champ obligatoire!");
    // contratCombo.errorString="Champ obligatoire!";
    //flagValidation=false;
    errors.contrat = "Champ obligatoire!";
    return;
  }
  if (deal.typeExercice == null) {
    openNotificationWithIcon("error", "Type exercice champ obligatoire!");
    errors.typeExercice = "Champ obligatoire!";
    return;
    //   typeExerciceCombo.errorString="Champ obligatoire!";
    // flagValidation=false;
  }
  if (deal.typeExercice.frequence == true && !deal.frequence) {
    openNotificationWithIcon("error", "Frequence champ obligatoire!");
    //  frequenceCombo.errorString="Champ obligatoire!";
    // flagValidation=false;
    errors.frequence = "Champ obligatoire!";
    return;
  }
  if (deal.natureOption == "F") {
    if (!deal.tradeDate) {
      if (!controlMaturity(deal.tradeDate, deal.contrat.maturity)) {
        openNotificationWithIcon(
          "error",
          "Trade date supérieure à la maturité du contrat!"
        );
        // tradeDateInput.errorString="Trade date supérieure à la maturité du contrat!";
        //flagValidation=false;
        errors.tradeDate = "Trade date supérieure à la maturité du contrat!";
        return;
      }
    }
    if (!deal.valueDate) {
      if (!controlMaturity(deal.valueDate, deal.contrat.maturity)) {
        openNotificationWithIcon(
          "error",
          "Value date supérieure à la maturité du contrat!"
        );

        errors.valueDate = "Value date supérieure à la maturité du contrat!";
        return;
        // valueDateInput.errorString="Value date supérieure à la maturité du contrat!";
        // flagValidation=false;
      }
    }
    if (!deal.maturityDate) {
      if (!controlMaturity(deal.maturityDate, deal.contrat.maturity)) {
        openNotificationWithIcon(
          "error",
          "Maturity date supérieure à la maturité du contrat!"
        );

        errors.maturityDate =
          "Maturity date supérieure à la maturité du contrat!";
        return;
        //deal.maturityDateInput.errorString="Maturity date supérieure à la maturité du contrat!";
        //flagValidation=false;
      }
    }
  }

  if (deal.modePaiement == null || deal.modePaiement.id == null) {
    openNotificationWithIcon("error", "Mode paiement champ obligatoire!");
    errors.modePaiement = "Champ obligatoire!";
    return;
    // modePaiementCombo.errorString="Champ obligatoire!";
    //flagValidation=false;
  }

  // var validationResult:Array = Validator.validateAll(validators);
  //if(validationResult.length>0){
  //  flagValidation=false;
  //}
  // var flagValidationEcheance=true;

  if (deal.echeances == null || deal.echeances.length == 0) {
    //    CommonFunctions.msgbox_error("Veuillez corriger les erreurs de saise!");
    openNotificationWithIcon(
      "error",
      "Echeancier list invalide",
      "Veuillez corriger les erreurs de saise!"
    );

    return;
    // flagValidationEcheance=false;
  }

  let previousDebut, debut, fin;
  previousDebut = null;
  var sumQty = 0;
  for (let e of deal.echeances) {
    previousDebut = new Date(debut && debut.getTime());
    debut = DateUtil.parseDate(e.debut);
    fin = DateUtil.parseDate(e.fin);
    if (previousDebut != null) {
      if (fin <= previousDebut) {
        openNotificationWithIcon(
          "error",
          "Echeancier list invalide",
          "Veuillez corriger les erreurs de saise!"
        );

        // flagValidation=false;
        break;
      }
    }

    if (fin <= debut) {
      openNotificationWithIcon(
        "error",
        "Veuillez corriger les erreurs de saise!"
      );

      // flagValidationEcheance=false;
      break;
    }
    sumQty += Number(e.quantite);
  }

  /* if((flagValidation)==false){
        CommonFunctions.msgbox_error("Veuillez corriger les erreurs de saise!");
        return;
    }*/

  if (sumQty != parseFloat(deal.quantite)) {
    openNotificationWithIcon(
      "error",
      "Veuillez corriger les erreurs de saise!"
    );

    return;
    //    flagValidationEcheance = false;
  }
  /* if(flagValidationEcheance==false){
        mainViewStack.selectedIndex = 1;
        CommonFunctions.msgbox_error("Veuillez corriger les erreurs de saise\n Echeancier invalide!");
        return;
    }*/

  /* --------------------------------- */
  let echeancierIds = [];
  let echeancierDebuts = [];
  let echeancierFins = [];
  let echeancierQuantites = [];
  let echeancierPrix = [];
  let echeancierExerces = [];
  let livraisonDealIds = [];
  let newExercices = [];
  for (let e of deal.echeances) {
    echeancierIds.push(e.echeanceId);
    echeancierDebuts.push(e.debut);
    echeancierFins.push(e.fin);
    echeancierQuantites.push(e.quantite);
    echeancierExerces.push(e.exerce);
    //echeancierPrix.push(0);
    echeancierPrix.push(
      e.hasOwnProperty("prixEcheance") && e.prixEcheance != null
        ? e.prixEcheance
        : 0
    );
    newExercices.push(
      e.hasOwnProperty("newExercice") && e.newExercice ? e.newExercice : false
    );
    //newExercices.push(e.newExercice);
    if (
      e.hasOwnProperty("livraisonDeal") &&
      e.livraisonDeal != null &&
      e.livraisonDeal > 0
    ) {
      livraisonDealIds.push(e.livraisonDeal.dealId);
    } else {
      livraisonDealIds.push(0);
    }
  }
  let param = {};
  param.dealId = deal.dealId;
  param.natureOption = deal.natureOption;
  param.tiersId = deal.tiers.tiersId;

  if (deal.natureOption == "M") {
    param.sousJacentId = deal.sousJacent.sousJacentId;
  } else {
    param.contratId = deal.contrat.contratId;
  }
  param.sens = deal.sens;
  param.typeOption = deal.typeOption;
  param.typeExercice = deal.typeExercice;
  param.frequence = deal.frequence;
  param.tradeDate = DateUtil.Format(deal.tradeDate);
  param.valueDate = DateUtil.Format(deal.valueDate);
  param.maturityDate = DateUtil.Format(deal.maturityDate);
  param.quantite = parseFloat(deal.quantite);
  param.strike = parseFloat(deal.strike);
  param.prixSousJacent = NumberUtil.Parse(deal.prixSousJacent);
  param.prixOption = NumberUtil.Parse(deal.prixOption);
  param.commission = NumberUtil.Parse(deal.commission);
  param.typeDenouement = deal.typeDenouement;
  param.validation = validation;
  param.modePaiementId = deal.modePaiement.id;
  //param.settlementOffset = settlementOffsetInput.text;

  param.echeancierIds = echeancierIds;
  param.echeancierDebuts = echeancierDebuts;
  param.echeancierFins = echeancierFins;
  param.echeancierQuantites = echeancierQuantites;
  param.echeancierExerces = echeancierExerces;
  param.echeancierPrix = echeancierPrix;
  param.livraisonDealIds = livraisonDealIds;
  param.newExercices = newExercices;
  //Alert(">>"+com.adobe.serialization.json.JSON.encode(param));
  // save_service.send(param);
  return param;
}
export function controlMaturity(tradeDate, contratMaturity) {
  var d1 = DateUtil.ToJsDate(tradeDate).getTime();
  var d2 = DateUtil.ToJsDate(contratMaturity, "DD/MM/YYYY").getTime();

  if (d1 <= d2) {
    return true;
  }
  return false;
}
/*

export function prapareSaveDealOption(validation = false, deal) {

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

export function checkExerce(deal, echeance) {
  let diffPrix = 0;
  if (deal.typeOption == "C")
    diffPrix = parseFloat(echeance.prixEcheance) - deal.strike;
  else diffPrix = deal.strike - parseFloat(echeance.prixEcheance);

  if (diffPrix < 0 && echeance.exerce) {
    openNotificationWithIcon(
      "error",
      "Impossible d'éxercer l'option!\n Pay-off inférieur à 0."
    );
    return false;
  }
  return true;

  /* if(flagValidation){
        let evt = new CustomEvent("optionExerciceEvent");
        evt.data = NumberUtil.Parse(prixEcheanceInput.text);
        this.dispatchEvent(evt);
        PopUpManager.removePopUp(this);
    }else{
        openNotificationWithIcon('error',"Veuillez corriger les erreurs de saisie.")
    }*/
}
