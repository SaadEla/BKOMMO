import React from "react";
import {Route, Switch, Link} from "react-router-dom";
import Menu from '../../components/uielements/menu';
import BlankPage from '../blankPage';
import SubMenu from "antd/lib/menu/SubMenu";
import Future from "../DealCapture/Future/future";
import Forward from "../DealCapture/Forward/forward";
import Option from "../DealCapture/Option/option";
import Swap from "../DealCapture/Swap/swap";
import Tiers from "../MarketData/Tiers/tiers";
import SousJacent from "../MarketData/SousJacent/sousJacent";
import Contrat from "../MarketData/Contrat/contrat";
import Fees from "../MarketData/Fees/fees";
import JoursFeriers from "../MarketData/JoursFeries/joursFeries";
import ExpReport from "../gestionLimite/expReport/expReport";
import LimitSetup from "../gestionLimite/limitSetup/limitSetup";
import ExternalUSD from "../gestionLimite/externalUSD/externalUSD";
import NotationFinanciere from "../gestionLimite/notationFinanciere/notationFinanciere";
import EtatPNL from "../PNLReport/EtatPNL/etatPNL";
import ImportPrix from "../PNLReport/ImportPrix/importPrix";
import PaimentSoulte from "../Paiement/PaiementSoulte/paiementSoulte";
import Utilisateurs from "../Administration/Utilisateurs/utilisateurs";
import Groupes from "../Administration/Groupes/groupes";


// to-do set component path
const ROUTES = [
    {
        path: "/app/dealcapture",
        name: "Deal capture",
        key: "DEAL_CAPTURE",
        exact: true,
        icon: "ion-ios-briefcase-outline",
        component: Future,
        routes: [
            {
                path: "/app/dealcapture/future",
                name: "Future",
                key: "FUTURE",
                exact: true,
                icon: "ion-ios-more",
                component: Future
            },
            {
                path: "/app/dealcapture/forward",
                name: "Forward",
                key: "FORWARD",
                exact: true,
                icon: "ion-ios-more",
                component: Forward
            },
            {
                path: "/app/dealcapture/option",
                name: "Option",
                key: "OPTION",
                exact: true,
                icon: "ion-ios-more",
                component: Option
            },
            {
                path: "/app/dealcapture/swap",
                name: "Swap",
                key: "SWAP",
                exact: true,
                icon: "ion-ios-more",
                component: Swap
            }
        ]
    },
    {
        path: "/app/marketData",
        name: "Market data",
        key: "MARKET",
        exact: true,
        icon: "ion-android-clipboard",
        component: Tiers,
        routes: [
            {
                path: "/app/marketData/tiers",
                name: "Tiers",
                key: "TIERS",
                exact: true,
                icon: "ion-ios-more",
                component: Tiers
            },
            {
                path: "/app/dealcapture/sousJacent",
                name: "Sous jacent",
                key: "SOUS_JACENT",
                exact: true,
                icon: "ion-ios-more",
                component: SousJacent
            },
            {
                path: "/app/dealcapture/contrat",
                name: "Contrat",
                key: "CONTRAT",
                exact: true,
                icon: "ion-ios-more",
                component: Contrat
            },
            {
                path: "/app/dealcapture/fees",
                name: "Fees",
                key: "FEES",
                exact: true,
                icon: "ion-ios-more",
                component: Fees
            },
            {
                path: "/app/dealcapture/ferie",
                name: "Jours feriers",
                key: "JOURS_FERIERS",
                exact: true,
                icon: "ion-ios-more",
                component: JoursFeriers
            }
        ]
    },
    {
        path: "/app/dealcapture/gestionDeLimite",
        name: "Gestion de limite",
        key: "GEST_LIMIT",
        exact: true,
        icon: "ion-ios-copy-outline",
        component: BlankPage,
        routes: [
            {
                path: "/app/gestionLimite/expReport",
                name: "Exposition report",
                key: "EXP_REPORT",
                exact: true,
                icon: "ion-ios-more",
                component: ExpReport
            },
            {
                path: "/app/gestionLimite/limitSetup",
                name: "Limit setup",
                key: "LIMIT_SETUP",
                exact: true,
                icon: "ion-ios-more",
                component: LimitSetup
            },
            {
                path: "/app/gestionLimite/notationFinanciere",
                name: "Notation financiere",
                key: "NOT_FIN",
                exact: true,
                icon: "ion-ios-more",
                component: NotationFinanciere
            },
            {
                path: "/app/gestionLimite/externalUSD",
                name: "External used",
                key: "EXT_USED",
                exact: true,
                icon: "ion-ios-more",
                component: ExternalUSD
            }
        ]
    },
    {
        path: "/app/pnlReport/future_t",
        name: "Pnl report",
        key: "PNL_REPORT",
        icon: "ion-stats-bars",
        component: AppRouter,
        routes: [
            {
                path: "/app/pnlReport/etatPnl",
                name: "Etat pnl",
                key: "ETAT_PNL",
                exact: true,
                icon: "ion-ios-more",
                component: EtatPNL
            },
            {
                path: "/app/pnlReport/importPrix",
                name: "Import prix",
                key: "IMP_PRIX",
                exact: true,
                icon: "ion-ios-more",
                component: ImportPrix
            }
        ]
    },
    {
        path: "/app/paiement/paiementSoulte",
        name: "Paiement",
        key: "PAIEMENT",
        exact: true,
        icon: "ion-cash",
        component: PaimentSoulte,
        routes: [
            {
                path: "/app/paiement/paiementSoulte",
                name: "Paiement soulte",
                key: "PAIE_SOULTE",
                exact: true,
                icon: "ion-ios-more",
                component: PaimentSoulte
            }
        ]
    },
    {
        path: "/app/administration/utilisateurs",
        name: "Administration",
        key: "ADMIN",
        exact: true,
        icon: "ion-android-laptop",
        component: Utilisateurs,
        routes: [
            {
                path: "/app/administration/utilisateurs",
                name: "UTILISATEURS",
                key: "USER",
                exact: true,
                icon: "ion-ios-more",
                component: Utilisateurs
            },
            {
                path: "/app/administration/groupes",
                name: "Groupes",
                key: "GROUPES",
                exact: true,
                icon: "ion-ios-more",
                component: Groupes
            }
        ]
    },
];


/**
 * Use this component for any new section of routes (any config object that has a "routes" property)
 */
function AppRouter({routes}) {

    return (
        <Switch>
            {routes.map((route, i) => {
                return route.routes.map(item => {
                    return <Route
                        {...item}
                    />
                })
            })}
            <Route
                component={Future}
                path= "/**"
            />

        </Switch>
    );
}


/**
 * Render a nested hierarchy of route configs with unknown depth/breadth
 */
function AppMenu(props) {

    /**
     * Render a single route as a list item link to the config's pathname
     */

    function subMenu(route) {
        return (
            <Menu.Item style={props.submenuStyle} key={route.key}>
                <Link style={props.submenuColor} to={route.path}>
                    {route.name}
                </Link>
            </Menu.Item>
        )
    }

    function singleRoute(route) {
        return (
            <Menu.Item key={route.key}>
                <Link to={route.path}>
            <span className="isoMenuHolder" style={props.submenuColor}>
                <i className={route.icon}/>
                <span className="nav-text">
                   {route.name}
                </span>
            </span>
                </Link>
            </Menu.Item>
        );
    }

    // loop through the array of routes and generate an unordered list
    return (
        <Menu {...props}>
            {props.routes.map(route => {
                // if this route has sub-routes, then show the ROOT as a list item and recursively render a nested list of route links
                if (route.routes) {
                    return (
                        <SubMenu
                            key={route.key}
                            title={
                                <span className="isoMenuHolder" style={props.submenuColor}>
                            <i className={route.icon}/>
                            <span className="nav-text">
                              {route.name}
                            </span>
                        </span>}
                        >
                            {route.routes.map(route => {
                                return subMenu(route)
                            })}
                        </SubMenu>
                    );
                }

                // no nested routes, so just render a single route
                return singleRoute(route);
            })}
        </Menu>

    );
}


export {AppRouter, AppMenu};
export default ROUTES;