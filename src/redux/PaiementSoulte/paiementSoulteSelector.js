
export const PaiementSoulteListSelector = state => state.PaiementSoulte.PaiementSoulteList;
export const PaiementSoulteListLoadingSelector = state => state.PaiementSoulte.loadingPaiementSoulte;
export const PaiementSoulteSelectedRowSelector = state => state.PaiementSoulte.selectedRow;
export const PaiementSoulteDetailLoadingSelector = state => state.PaiementSoulte.detail.loading;

export const PaiementDetailSelectedRowSelector = state => state.PaiementSoulte.selectedRowDetail;
export const ReloadListPaiementSelector = state => state.PaiementSoulte.reloadListPaiement;