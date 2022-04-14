//Future
import {getContrat} from "../../../components/uielements/future/FutureUtil";

export const groupeFutureelector = state => state.Future.groupeFuture;
export const FutureListSelector = state => state.future.FutureList;
export const FutureListLoadingSelector = state => state.future.loadingFuture;
export const futureSelectedRowSelector = state => state.future.selectedRow;
//Selection Settlement Future
export const selectionSettlementFutureSelector = state => state.future.selectionSettlementFuture;
export const loadingSelectSettlementFutureSelector = state => state.future.loadingSelectSettlementFuture;

//Audit historique
export const auditHistoriqueListSelector = state => state.future.auditHistorique;
export const auditHistoriqueListLoadingSelector = state => state.future.loadingAuditHistorique;
export const auditHistoriqueModalVisibleSelector = state => state.future.auditHistoriqueModalVisible;
//future detail
export const dealFutureDetailSelector = state => state.dealFuture.dealFutureData;
export const dealFutureVisibleSelector = state => state.dealFuture.dealFutureVisible;
export const dealFutureDetailLoadingSelector = state => state.dealFuture.loadingDealFuture;
export const dealFutureEcheancesSelector = state => state.dealFuture.dealFutureData.deal.echeances;
export const dealFutureDealSelector = state => state.dealFuture.dealFutureData.deal;
export const dealFutureSelectedEcheanceSelector = state => state.dealFuture.selectedDealFuture;
export const dealFutureSuffixMontantGlobalSelector = state => {
    const contrat = getContrat(state.dealFuture.dealFutureData.references || state.references.listReferences, state.dealFuture.dealFutureData.deal.contrat.contratId)
   if(contrat)
    return contrat.sousJacent.devise && contrat.sousJacent.devise.shortName;
};
export const dealFutureSuffixPrixSelector = state => {

    const contrat = getContrat(state.dealFuture.dealFutureData.references || state.references.listReferences, state.dealFuture.dealFutureData.deal.contrat.contratId)
    if(contrat)
    return contrat.sousJacent.devise && ((contrat.sousJacent.coefPrix == 1 ?
        contrat.sousJacent.devise.shortName :
        'Cents') + '/' + contrat.sousJacent.unite.shortName);
    return
}
export const dealFutureReferencesSelector = state => state.dealFuture.dealFutureData.references;

export const dealFutureUpdateFlagSelector = state => state.dealFuture.updateDealFutureFlag;
export const dealFutureloadUpdateSelector = state => state.dealFuture.loadupdateDealFuture;
export const dealFutureloadValidateSelector = state => state.dealFuture.loadValidateDealFuture;
export const loadCheckLimitDealFutureSelector = state => state.dealFuture.loadCheckLimitDealFuture;
export const checkedLimitDealFutureSelector = state => state.dealFuture.checkedLimitDealFuture;


export const updateFlagDealFutureSelector = state => state.dealFuture.dealFutureData.updateFlag;
export const validationFlagDealFutureSelector = state => state.dealFuture.dealFutureData.validationFlag;
