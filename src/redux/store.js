import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit';
import {combineReducers} from 'redux'
import authReducer from './auth/authSlice';
import themeSwitcherReducer from './themeSwitcher/themeSwitcherSlice';
import appReducer from './app/appSlice';

//import Forward from './dealCapture/forwardSlice'
import Future from './dealCapture/future/futureSlice'
import DealFuture from './dealCapture/future/DealFutureSlice'
import Option from './dealCapture/option/optionSlice'
import Swap from './dealCapture/swap/swapSlice'
import Forward from './dealCapture/forward/forwardSlice'
import DealForward from './dealCapture/forward/DealForwardSlice'
import References from './references/ContratReferencesSlice'


import LimitSetup from './GestionDeLimite/limitSetup/limitSetupSlice'
import NotationFinanciere from './GestionDeLimite/notationFinanciere/notationFinanciereSlice'

import Contrat from './MarketData/contrat/contratSlice'
import Fees from './MarketData/fees/feesSlice'
import JoursFeries from './MarketData/joursFeriers/joursFeriersSlice'
import Tiers from './MarketData/tiers/tiersSlice'

import EtatPNL from './PNLReport/etatPNLSlice'
import ImportPrix from './PNLReport/importPrixSlice'

import PaiementSoulte from './PaiementSoulte/paiementSoulteSlice'
import UtilisateursSlice from './Administration/utilisateurs/utilisateursSlice'
import GroupesSlice from './Administration/groupes/groupesSlice'
import Reference from './Administration/utilisateurs/ReferenceSlice'
import DealSwapSlice from './dealCapture/swap/DealSwapSlice'
import DealOptionSlice from './dealCapture/option/DealOptionSlice'
import SousJacent from "./MarketData/sousJacent/sousJacentSlice";
import ExpReport from "../redux/GestionDeLimite/expReport/expReportSlice";
import ExternalUSD from "../redux/GestionDeLimite/externalUSD/externalUSDSlice";

export default configureStore({
    // devTools: false,
    middleware: [...getDefaultMiddleware({immutableCheck: false})],
    reducer: combineReducers({
            authentication: authReducer,
            themeSwitcher: themeSwitcherReducer,
            app: appReducer,
            future: Future,
            dealFuture: DealFuture,
            //forward: Forward,
            dcoption: Option,
            dealOption: DealOptionSlice,
            forward: Forward,
            dealForward: DealForward,
            swap: Swap,
            dealSwap: DealSwapSlice,
            references: References,
            expReport: ExpReport,
            limitSetup: LimitSetup,
            notationFinanciere: NotationFinanciere,
            externalUSD: ExternalUSD,
            //tiers
            tiers: Tiers,
            //sous-jacent
            sousJacent: SousJacent,
            //contrat
            contrat: Contrat,
            fees: Fees,
            joursFeriers: JoursFeries,
            etatPNL: EtatPNL,
            importPrix: ImportPrix,

            utilisateurs: UtilisateursSlice,
            Reference: Reference,
            PaiementSoulte: PaiementSoulte,

            Groupes: GroupesSlice,


            //   expositionReport: ExpositionReport,
            //   externalUsed: ExternalUsed,
            //   limitSetup: NotationFinanciere,
            //   notationFinanciere: NotationFinanciere,
            //  contrat: Contrat,
            //  fees: limitSetup,
            //   joursFeries: JoursFeries,
            //   paiementSoulte: PaiementSoulte,
            //    utilisateursSlice: UtilisateursSlice,
            //    administration: Administration
        },
    ),
});
