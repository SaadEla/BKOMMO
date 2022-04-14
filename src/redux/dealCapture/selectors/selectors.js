//Swap
export const groupeSwapelector = state => state.Swap.groupeSwap;
export const SwapListSelector = state => state.swap.SwapList;
export const SwapListLoadingSelector = state => state.swap.loadingSwap;
export const swapSelectedRowSelector = state => state.swap.selectedRow;
//Selection Settlement Swap
export const selectionSettlementSwapSelector = state => state.swap.selectionSettlementSwap;
export const loadingSelectSettlementSwapSelector = state => state.swap.loadingSelectSettlementSwap;

//Audit historique
export const auditHistoriqueListSelector = state => state.swap.auditHistorique;
export const auditHistoriqueListLoadingSelector = state => state.swap.loadingAuditHistorique;
export const auditHistoriqueModalVisibleSelector = state => state.swap.auditHistoriqueModalVisible;
//swap detail
export const dealSwapDetailSelector = state => state.dealSwap.dealSwapData;
export const dealSwapVisibleSelector = state => state.dealSwap.dealSwapVisible;
export const dealSwapDetailLoadingSelector = state => state.dealSwap.loadingDealSwap;
export const dealSwapEcheancesSelector = state => state.dealSwap.dealSwapData.deal.echeances;
export const dealSwapDealSelector = state => state.dealSwap.dealSwapData.deal;
export const dealSwapSelectedEcheanceSelector = state => state.dealSwap.selectedDealSwap;
export const dealSwapSuffixMontantGlobalSelector = state => state.dealSwap.dealSwapData.deal.sousJacent.devise && state.dealSwap.dealSwapData.deal.sousJacent.devise.shortName;
export const dealSwapSuffixPrixSelector = state => {
    return state.dealSwap.dealSwapData.deal.sousJacent.devise && ((state.dealSwap.dealSwapData.deal.sousJacent.coefPrix==1?
        state.dealSwap.dealSwapData.deal.sousJacent.devise.shortName:
        'Cents')+'/'+state.dealSwap.dealSwapData.deal.sousJacent.unite.shortName);
}
export const dealSwapUpdateFlagSelector = state => state.dealSwap.updateDealSwapFlag;
export const dealSwaploadUpdateSelector = state => state.dealSwap.loadupdateDealSwap;
export const dealSwaploadValidateSelector = state => state.dealSwap.loadValidateDealSwap;
export const loadCheckLimitDealSwapSelector = state => state.dealSwap.loadCheckLimitDealSwap;
export const checkedLimitDealSwapSelector = state => state.dealSwap.checkedLimitDealSwap;


export const updateFlagDealSwapSelector = state => state.dealSwap.dealSwapData.updateFlag;
export const validationFlagDealSwapSelector = state => state.dealSwap.dealSwapData.validationFlag;


export const selectEcheanceIds=state=>state.swap.echeanceIds