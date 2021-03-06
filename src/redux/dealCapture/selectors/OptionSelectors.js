//Option
import {getContrat} from "../../../components/uielements/future/FutureUtil";

export const groupeOptionelector = state => state.Option.groupeOption;
export const OptionListSelector = state => state.dcoption.OptionList;
export const OptionListLoadingSelector = state => state.dcoption.loadingOption;
export const optionSelectedRowSelector = state => state.dcoption.selectedRow;
//Selection Settlement Option
export const selectionSettlementOptionSelector = state => state.dcoption.selectionSettlementOption;
export const loadingSelectSettlementOptionSelector = state => state.dcoption.loadingSelectSettlementOption;

//Audit historique
export const auditHistoriqueListSelector = state => state.dcoption.auditHistorique;
export const auditHistoriqueListLoadingSelector = state => state.dcoption.loadingAuditHistorique;
export const auditHistoriqueModalVisibleSelector = state => state.dcoption.auditHistoriqueModalVisible;
//option detail
export const dealOptionDetailSelector = state => state.dealOption.dealOptionData;
export const dealExercicePermissionSelector = state => state.dealOption.dealOptionData.exercicePermission;
export const dealLoadGenerateEcheancierOptionSelector = state => state.dealOption.loadGenerateEcheancier;
export const dealOptionReferencesSelector = state => state.dealOption.dealOptionData.references;
export const dealOptionVisibleSelector = state => state.dealOption.dealOptionVisible;
export const dealOptionDetailLoadingSelector = state => state.dealOption.loadingDealOption;
export const dealOptionEcheancesSelector = state => state.dealOption.dealOptionData.deal.echeances;
export const dealOptionDealSelector = state => state.dealOption.dealOptionData.deal;
export const dealOptionSelectedEcheanceSelector = state => state.dealOption.selectedDealOption;
export const dealOptionSuffixMontantGlobalSelector = state => {
    const contrat = getContrat(state.dealOption.dealOptionData.references, state.dealOption.dealOptionData.deal.contrat.contratId)

    if( contrat && state.dealOption.dealOptionData.deal.natureOption == 'F')
    return contrat.sousJacent.devise && contrat.sousJacent.devise.shortName
    else
        return state.dealOption.dealOptionData.deal.sousJacent.devise && state.dealOption.dealOptionData.deal.sousJacent.devise.shortName

};
export const dealOptionSuffixPrixSelector = state => {
    const contrat = getContrat(state.dealOption.dealOptionData.references, state.dealOption.dealOptionData.deal.contrat.contratId)

    if(contrat && state.dealOption.dealOptionData.deal.natureOption == 'F')
    return contrat.sousJacent.devise && ((contrat.sousJacent.coefPrix==1?
        contrat.sousJacent.devise.shortName:
        'Cents')+'/'+contrat.sousJacent.unite.shortName);
    else
        return state.dealOption.dealOptionData.deal.sousJacent.devise && ((state.dealOption.dealOptionData.deal.sousJacent.coefPrix==1?
            state.dealOption.dealOptionData.deal.sousJacent.devise.shortName:
            'Cents')+'/'+state.dealOption.dealOptionData.deal.sousJacent.unite.shortName);
}
export const dealOptionUpdateFlagSelector = state => state.dealOption.dealOptionData.updateFlag;
export const dealOptionloadUpdateSelector = state => state.dealOption.loadupdateDealOption;
export const dealOptionloadValidateSelector = state => state.dealOption.loadValidateDealOption;
export const loadCheckLimitDealOptionSelector = state => state.dealOption.loadCheckLimitDealOption;
export const checkedLimitDealOptionSelector = state => state.dealOption.checkedLimitDealOption;


export const updateFlagDealOptionSelector = state => state.dealOption.dealOptionData.updateFlag;
export const validationFlagDealOptionSelector = state => state.dealOption.dealOptionData.validationFlag;
