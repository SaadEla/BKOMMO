import {process} from '@progress/kendo-data-query';
import {Grid, GridColumn as Column, GridToolbar} from '@progress/kendo-react-grid';
import React, {useEffect, useState} from 'react';
import PnlReportHeader from "./PnlReportHeader";
import {DateUtil, NumberUtil} from "../../helpers/Utils";
import API_URL from "../../config/api/API_URL";
import UserService from '../../keycloak/UserService';


const GridPositionDetaillee = ({onChange,form, position = [], children}) => {

    const [gridDataState, setGridDataState] = useState({})

    const handleGridDataStateChange = (e) => {
        setGridDataState(e.data);
    }
    const [state, setState] = useState();

    let pnlStyle=null

    useEffect(function () {
        setState(createAppState({
            take: 10,
            expand: false,
            group: [{field: 'positionType', expand: false}]
        }));
    }, [])
    useEffect(function () {
        if (position && position.length > 0) {
            setState(createAppState({
                take: 10,
                expand: false,
                group: [{field: 'positionType', expand: false}]
            }));
        }

    }, [position])

    /*
    const checkboxColumn =
              <td>
                <input type="checkbox" checked={true} disabled="disabled" />
              </td>
  */
    function exporter(event)
    {

        let param = {}
        param.tiersId= form.getFieldValue("contrepartie");// contrepartieCombo.selectedItem.tiersId;
        param.datePosition = form.getFieldValue("date");//dateInput.text;
        let tiersParam ="";
        if (form.getFieldValue("client")=="C")
            tiersParam ="&tiersId="+form.getFieldValue("contrepartie");
       /* var req:URLRequest = new URLRequest(ApplicationUtil.getInstance().SERVICE_URL_PREFIXE+"/forward/pnl");
        if (ExternalInterface.available)
        {
            ExternalInterface.call(
                "window.open",
                req.url+"?datePosition="+form.getFieldValue("date")+tiersParam+"&noCacheVar="+new Date().time.toString()+"&uid="+CommonData.LOGGED_USER.utilisateurId,

                "win",
                "height=800, width=800, toolbar=no, scrollbars=yes, location=no"
            );
        }*/
        //else Alert.show("ExternalInterface not available");

        

        window.open(API_URL.SERVER_BASE_URL.concat(API_URL.PNL_IMPORT_PRIX_EXPORT+"?datePosition="+
            DateUtil.Format(form.getFieldValue("date"))+tiersParam+"&uid="+UserService.getUserId()), "win", "height=800, width=800, toolbar=no, scrollbars=yes, location=no")

    }
    function tiersLabelFunctionDg(item, column) {
        if (item.hasOwnProperty('tiers'))
            return item.tiers.shortName;
        else return "";
    }

    function sensLabelFunction(item, column) {
        if (item.hasOwnProperty('sens'))
            //sens client
            return (item.sens == 1) ? "Vente" : "Achat";
        else
            return "";
    }

    function soultePayeeLabelFunction(item, column) {
        if (item.hasOwnProperty('soultePayee')) {
            if (item.soultePayee)
                return "Payé"
            else
                return "Non payé"
        } else {
            return "";
        }
    }

    function createAppState(dataState) {
        const result = process(position.map(function (item) {

            return {
                tradeDateLabel:DateUtil.parseDate(item.tradeDate),
                settlementDateLabel:DateUtil.parseDate(item.settlementDate),
                sensLabel: sensLabelFunction(item),
                tiersLabel: tiersLabelFunctionDg(item),
                soultePayeeLabel: soultePayeeLabelFunction(item),
                ...item
            }
        }), dataState)
       result.data.forEach(dataItem => dataItem.expanded = false);
        return {
            result,
            dataState: dataState
        };
    }

    const dataStateChange = (event) => {
        setState(createAppState(event.dataState));
    }

    const expandChange = (event) => {
        event.dataItem[event.target.props.expandField] = event.value;
        setState({
            result: Object.assign({}, state.result),
            dataState: state.dataState
        });

    }

    function prixInconnuStyleFunction(data, col) {
        let style = {}
        if (data.hasOwnProperty('prixMTMInconnu')) {
            if (data["prixMTMInconnu"] == true) {
                style.fontWeight = "bold";
                style.color = "#FF0000";
                return style;
            } else {
                if (col.dataField == "pnl") {
                    style.fontWeight = "bold";
                    if (data["pnl"] > 0)
                        style.color = "#32998C";
                    else
                        style.color = "#FF0000";

                    return style;
                }

            }

        }
        /* style.fontWeight="bold";
        if (data["pnl"] > 0)
            style.color=0x32998C;
        else
            style.color=0xFF0000;

        return style;   */
        return null;
    }

    function prixInconnuStyleFunction(data, col) {
        let style = {}
        if (data.hasOwnProperty('prixMTMInconnu')) {
            if (data["prixMTMInconnu"] == true) {

                style.fontWeight = "bold";
                style.color = "#FF0000";
                return style;
            } else {
                if (col.dataField == "pnl") {
                    style.fontWeight = "bold";
                    if (data["pnl"] > 0)
                        style.color = "#32998C";
                    else
                        style.color = "#FF0000";

                    return style;
                }

            }

        }
        return null;
    }

    function rowRender(trElement, props) {
        let trProps = {style: null};
        const available = props.dataItem.prixMTMInconnu;
        const green = {fontWeight: "bold", color: "#32998C"};
        const red = {fontWeight: "bold", color: "#FF0000"};
        if (available) {
            trProps = {style: red};
        } else {
         //   console.log(trElement)
           /* if (props.dataItem.pnl > 0)
                pnlStyle=( {style: red})
            else
                pnlStyle=({style: green})*/
        }
        return React.cloneElement(trElement, {...trProps}, trElement.props.children);
    }

    return (
        (state && state.dataState) ?
            <Grid
                style={{height: '100%', width: '100%'}}
                resizable={true}
                reorderable={true}
                sortable={true}
                groupable={true}
                data={state.result}
                total={state.result.length}
                {...state.dataState}
                onDataStateChange={dataStateChange}
                onExpandChange={expandChange}
                expandField="expanded"
                expand={true}
                rowRender={rowRender}
            >
                <GridToolbar>
                    <PnlReportHeader
                        exporter={exporter}
                        onChange={onChange} form={form}></PnlReportHeader>
                    <div style={{color: "rgba(19,105,180,0.9)"}}>Position détaillée</div>
                </GridToolbar>

                <Column width={150} format="{0:dd/MM/yyyy}" field="tradeDateLabel" title="Date d'opération"/>
                <Column format="{0:dd/MM/yyyy}" field="settlementDateLabel" title="Date dénouement"/>
                <Column field="tiersLabel" title="Cpty"/>
                <Column field="ric" title="RIC"/>
                <Column field="devise" title="Devise"/>
                <Column field="sousJacent" title="Sous-Jacent"/>
                <Column field="contrat" title="Contrat"/>
                <Column className="centerAlign" field="sensLabel" title="Sens"/>
                <Column className="centerRight" format="{0:n2}" field="nombreContrat" title="Nombre de contrat"/>
                <Column className="centerRight" format="{0:n2}" field="quantite" title="Quantité en unité"/>
                <Column className="centerRight" format="{0:n2}" field="nominal" title="Nominal"/>
                <Column className="centerRight" format="{0:n2}" field="prixOperation" title="Prix du Forward"/>
                <Column className="centerRight" format="{0:n2}" field="marge" title="Marge"/>
                <Column className="centerRight" format="{0:n2}" field="coursCloture" title="Cours de clotûre"/>
                <Column className={"centerRight"}  format="{0:n2}"
                        field="pnl" title="PnL"
                />
                <Column className="centerAlign"
                        field="soultePayeeLabel"
                        title="Soulte Payée"/>
            </Grid> : <div>loading ...</div>
        /*<Grid
            data={process(data, gridDataState)}
            sortable
            {...gridDataState}
            onDataStateChange={handleGridDataStateChange}
            resizable
            reorderable
            style={{  width: '100%' }}

            >

            {children}

        </Grid>*/
    )
}

export default GridPositionDetaillee;