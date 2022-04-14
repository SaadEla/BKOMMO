//Forward
import { getContrat } from "../../../components/uielements/future/FutureUtil";

export const groupeForwardelector = (state) => state.Forward.groupeForward;
export const ForwardListSelector = (state) => state.forward.ForwardList;
export const ForwardListLoadingSelector = (state) =>
  state.forward.loadingForward;
export const forwardSelectedRowSelector = (state) => state.forward.selectedRow;
//Selection Settlement Forward
export const selectionSettlementForwardSelector = (state) =>
  state.forward.selectionSettlementForward;
export const loadingSelectSettlementForwardSelector = (state) =>
  state.forward.loadingSelectSettlementForward;

//Audit historique
export const auditHistoriqueListSelector = (state) =>
  state.forward.auditHistorique;
export const auditHistoriqueListLoadingSelector = (state) =>
  state.forward.loadingAuditHistorique;
export const auditHistoriqueModalVisibleSelector = (state) =>
  state.forward.auditHistoriqueModalVisible;
//forward detail
export const dealForwardDetailSelector = (state) =>
  state.dealForward.dealForwardData;
export const dealForwardVisibleSelector = (state) =>
  state.dealForward.dealForwardVisible;
export const dealForwardDetailLoadingSelector = (state) =>
  state.dealForward.loadingDealForward;
export const dealForwardEcheancesSelector = (state) =>
  state.dealForward.dealForwardData.deal.echeances;
export const dealForwardDealSelector = (state) =>
  state.dealForward.dealForwardData.deal;
export const dealForwardSettlementsSelector = (state) =>
  state.dealForward.dealForwardData.deal.settlements;
export const dealForwardSelectedEcheanceSelector = (state) =>
  state.dealForward.selectedDealForward;
export const dealForwardSuffixMontantGlobalSelector = (state) => {
  const contrat = getContrat(
    state.dealForward.dealForwardData.references ||
      state.references.listReferences,
    state.dealForward.dealForwardData.deal.contrat.contratId
  );
  if (contrat)
    return contrat.sousJacent.devise && contrat.sousJacent.devise.shortName;
};
export const dealForwardSuffixPrixSelector = (state) => {
  const contrat = getContrat(
    state.dealForward.dealForwardData.references ||
      state.references.listReferences,
    state.dealForward.dealForwardData.deal.contrat.contratId
  );

  if (contrat)
    return (
      contrat.sousJacent.devise &&
      (contrat.sousJacent.coefPrix == 1
        ? contrat.sousJacent.devise.shortName
        : "Cents") +
        "/" +
        contrat.sousJacent.unite.shortName
    );
};
export const dealForwardReferencesSelector = (state) =>
  state.dealForward.dealForwardData.references;

export const dealForwardUpdateFlagSelector = (state) =>
  state.dealForward.updateDealForwardFlag;
export const dealForwardloadUpdateSelector = (state) =>
  state.dealForward.loadupdateDealForward;
export const dealForwardloadValidateSelector = (state) =>
  state.dealForward.loadValidateDealForward;
export const loadCheckLimitDealForwardSelector = (state) =>
  state.dealForward.loadCheckLimitDealForward;
export const checkedLimitDealForwardSelector = (state) =>
  state.dealForward.checkedLimitDealForward;
//position
export const checkPositionForwardSelector = (state) =>
  state.dealForward.position;
export const loadCheckPositionSelector = (state) =>
  state.dealForward.loadCheckPosition;

export const updateFlagDealForwardSelector = (state) =>
  state.dealForward.dealForwardData.updateFlag;
export const validationFlagDealForwardSelector = (state) =>
  state.dealForward.dealForwardData.validationFlag;
