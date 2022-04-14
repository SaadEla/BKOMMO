export default {
    SERVER_BASE_URL: window.configs.SERVER_BASE_URL,//`http://10.110.101.80:8082/COMMODITIES_SERVICE`,
    SWAP_AUDIT_HISTORIQUE: '/swap/audit_historique',
    SWAP_SEARCH: '/swap/search',
    SWAP_DETAIL: '/swap/detail',
    SWAP_SAVE: '/swap/save',
    CHEK_LIMIT_SWAP: '/swap/checkLimit',
    CONTRAT_REFERENCES: '/contrat/references',
    CONFIRMATION_SWAP: '/swap/confirmation',
    DELETE_SWAP: '/swap/delete',
    SELECTION_SETTLEMENT_SWAP: '/swap/settlement/select',
    GENERATE_AVIS_SETTLEMENT: '/swap/settlement/generate',

    //API Option
    OPTION_SEARCH: '/option/search',
    OPTION_AUDIT_HISTORIQUE: '/option/audit_historique',
    OPTION_DETAIL: '/option/detail',
    OPTION_SAVE: '/option/save',
    CHEK_LIMIT_OPTION: '/option/checkLimit',
    CONFIRMATION_OPTION: '/option/confirmation',
    DELETE_OPTION: '/option/delete',
    GENERATE_ECHEANCIER_OPTION: '/option/generateEcheancier',

    //API Forward
    FORWARD_SEARCH: '/forward/search',
    FORWARD_AUDIT_HISTORIQUE: '/forward/audit',
    FORWARD_DETAIL: '/forward/detail',
    FORWARD_SAVE: '/forward/save',
    CHEK_LIMIT_FORWARD: '/forward/checkLimit',
    CONFIRMATION_FORWARD: '/forward/confirmation',
    DELETE_FORWARD: '/forward/delete',
    AVISSETTLEMENT_FORWARD: '/forward/avisSettlement',
    POSITION_FORWARD: '/forward/position',
    SOULTE_FORWARD: '/forward/soulte',
    COMMISSION_FORWARD: '/forward/fee',
    DEALMATURITY_FORWARD: '/forward/dealMaturity',

    //API Future
    FUTURE_SEARCH: '/future/search',
    FUTURE_AUDIT_HISTORIQUE: '/future/audit/history',
    FUTURE_DETAIL: '/future/detail',
    FUTURE_SAVE: '/future/save',
    CHEK_LIMIT_FUTURE: '/future/checkLimit',
    CONFIRMATION_FUTURE: '/future/confirmation',
    DELETE_FUTURE: '/future/delete',

    //API Tiers
    TIERS_LIST: '/test',
    TIERS_SAVE: '/tiers/save',

    //API sous-jacent
    SOUSJACENT_LIST: '/contrat/sousJacent/search',
    SOUSJACENT_SAVE: '/contrat/sousJacent/save',
    SOUSJACENT_DETAIL: '/contrat/sousJacent/detail',
    SOUSJACENT_DELETE: '/contrat/sousJacent/delete',

    //API contrat
    CONTRAT_LIST: '/contrat/search',
    CONTRAT_SAVE: '/contrat/save',
    CONTRAT_DETAIL: '/contrat/detail',
    CONTRAT_DELETE: '/contrat/delete',

    //API FEES
    FEES_LIST: '/contrat/fees/list',
    FEES_SAVE: '/contrat/fees/save',
    FEES_DETAIL: '/contrat/fees/detail',
    FEES_DELETE: '/contrat/fees/delete',

    //API LIMITE
    LIMITE_LIST: '/limit/exposition',

    //API LIMITE EXternal usd
    LIMIT_EXTERNALUSED_LIST: '/limit/externalUsed/values',
    LIMIT_EXTERNALUSED_UPLOAD: '/limit/upload/used',


    //API FEES
    JOURS_FERIERS_LIST: '/contrat/ferie/list',
    JOURS_FERIERS_SAVE: '/contrat/ferie/add',
    JOURS_FERIERS_DETAIL: '/contrat/ferie/detail',
    JOURS_FERIERS_DELETE: '/contrat/ferie/delete',

    //API LIMIT SETUP
    LIMIT_SETUP_LIST: '/limit/list',
    LIMIT_SETUP_SAVE: '/limit/save',
    LIMIT_SETUP_DETAIL: '/limit/detail',

    //API Notation financiere
    NOTATION_FINANCIERE_LIST: '/limit/notationTiers/list',
    NOTATION_FINANCIERE_SAVE: '/limit/notationTiers/save',
    NOTATION_FINANCIERE_PARAM_SAVE: '/limit/notation/save',
    NOTATION_FINANCIERE_DETAIL: '/limit/notationTiers/detail',
    NOTATION_FINANCIERE_REFERENCES: '/limit/notationTiers/references',

    //user url
    USER_DETAIL: '/login/userDetail',

    //pnl
    PNL_SEARCH: '/pnl/data',
    PNL_IMPORT_PRIX_SEARCH: '/contrat/prixMTM/values',
    PNL_IMPORT_PRIX_UPLOAD: '/contrat/upload/prixMTM',
    PNL_IMPORT_PRIX_EXPORT: '/pnl/report',
    //Utilisateurs
    UTILISATEUR_LIST: '/login/utilisateur',
    UTILISATEUR_SAVE: '/login/utilisateur/save',
    UTILISATEUR_REF: '/login/utilisateur/references',
    // Paiement Soulte
    PAIEMENTSOULTE_LIST: '/pnl/suspens/paiements',
    PAIEMENTSOULTE_ADD: '/pnl/suspens/addPaiement',
    PAIEMENTSOULTE_DELETE: '/pnl/suspens/deletePaiement',
    PAIEMENTSOULTE_POSITION: '/pnl/suspens/positions',

    //Groupes
    GROUPES_SAVE : 'login/groupe/save',
    GROUPES_LIST : 'login/groupes',
    GROUPES_REF : 'login/utilisateur/references',

}