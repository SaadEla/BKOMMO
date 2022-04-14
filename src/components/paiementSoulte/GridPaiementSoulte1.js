import {process} from '@progress/kendo-data-query';
import {Grid, GridColumn as Column, GridToolbar} from '@progress/kendo-react-grid';
import React, {useEffect, useState} from 'react';
import PaiementSoulteHeader from "./PaiementSoulteHeader";
import {DateUtil, NumberUtil} from "../../helpers/Utils";
import API_URL from "../../config/api/API_URL";
import {useDispatch, useSelector} from "react-redux";
import {PaiementSoulteDetailLoadingSelector} from '../../redux/PaiementSoulte/paiementSoulteSelector';
import {selectingGridRow} from "../../redux/PaiementSoulte/paiementSoulteSlice";
import {orderBy} from "@progress/kendo-data-query";
import {Checkbox, Spin} from "antd";


const GridPaiementSoulte1 = ({onChange, form, selectedRow, PaiementSoulteList = []}) => {

    const dispatch = useDispatch();
    let [dataGrid, setDataGrid] = useState([]);
    const [gridDataState, setGridDataState] = useState({})
    const [skip, setSkip] = useState(0);
    const [take, setTake] = useState(20);
    const [sort, setSort] = useState([]);
    const [selectedID, setSelectedID] = useState(null);
    const paiementSoulteLoading = useSelector(PaiementSoulteDetailLoadingSelector);
    const [totalSuspens, setTotalSuspens] = useState(0);


    const [state, setState] = useState();


    useEffect(function () {
        console.log(PaiementSoulteList)
        if (PaiementSoulteList && PaiementSoulteList.length > 0) {
           // setDataGrid([...PaiementSoulteList])
            setDataGrid(
                PaiementSoulteList.filter(positionsFilterFunction)
            )
            calculTotalSuspens()
        }

    }, [PaiementSoulteList])

    useEffect(function () {
        //setSelectedID(selectedRow)
    }, [selectedRow])

    function pageChange(event) {
        setTake(event.page.take);
        setSkip(event.page.skip);
    }


    function handleOnRowClick(e) {
        setSelectedID(e.dataItem);
        dispatch(selectingGridRow(e.dataItem))
    }

    function prepareDataGrid(dataGrid) {
        return orderBy(dataGrid.map(item => {
            return {
                tradeDateLabel: DateUtil.Format(item.tradeDate),
                settlementDateLabel: DateUtil.Format(item.settlementDate),
                sensLabel: sensLabelFunction(item),
                dealTypeLabel: dealTypeLabelFunction(item),
                ...item
            }
        }), sort).slice(skip, skip + take).map(
            (item) => ({
                ...item,
                selected: item.initDealId === (selectedID && selectedID.initDealId)
            }));
    }

    function getSuspens(PaiementSoulte) {
        return PaiementSoulte.pnl-PaiementSoulte.totalPaiement;
    }

    function getPnl(PaiementSoulte) {
        return PaiementSoulte.pnl;
    }

    function calculTotalSuspens() {
        var tmp_totalSuspens = {};
        var total;

        PaiementSoulteList.forEach(element => {
            let _suspens = getSuspens(element);
            let _devisedev = element.devise;
            let _pnl = getPnl(element);

            total = _pnl - _suspens;

            if (tmp_totalSuspens.hasOwnProperty(_devisedev)) {
                tmp_totalSuspens[_devisedev] += total;
            } else {
                tmp_totalSuspens[_devisedev] = total;
            }
        });
        setTotalSuspens(tmp_totalSuspens);
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

    // function positionsFilterFunction(item,column){
    //     return (getPnl(item)-getSuspens(item)!=0);
    // }
    function positionsFilterFunction(item) {
        return (!form.getFieldValue("soultePayee")) || (getSuspens(item) != 0);
    }

    function hidePayedPositionsCB_changeHandler(event) {
        setDataGrid(
            PaiementSoulteList.filter(positionsFilterFunction)
        )

    }

    function dealTypeLabelFunction(item, column) {
        if (item.hasOwnProperty('dealType')) {
            if (item.dealType == "F")
                return "FORWARD";
            else if (item.dealType == "O")
                return "OPTION";
            else if (item.dealType == "S")
                return "SWAP";
        }
        return "";
    }

    return (
        <Spin spinning={paiementSoulteLoading} size="large">
            <Grid
                style={{height: '500px', width: '100%'}}
                resizable={true}
                reorderable={true}
                data={prepareDataGrid(dataGrid)}
                total={dataGrid.length}
                //pageable={true}
                scrollable={true}
                onPageChange={pageChange}
                sortable
                groupable={true}

                selectedField="selected"
                onRowClick={(e) => handleOnRowClick(e)}

            >

                <GridToolbar>
                    <PaiementSoulteHeader
                        hidePayedPositionsCB_changeHandler={hidePayedPositionsCB_changeHandler}
                        onChange={onChange}
                        form={form}
                        totalPaiement={totalSuspens}>
                    </PaiementSoulteHeader>
                </GridToolbar>
                <Column className="centerAlign" field="dealTypeLabel" title="Type"/>
                <Column className="centerAlign" field="tradeDateLabel" title="Date d'opération"/>
                <Column className="centerAlign" field="settlementDateLabel" title="Date dénouement"/>
                <Column className="centerAlign" field="devise" title="Devise"/>
                <Column className="centerAlign" field="sousJacent" title="Sous-Jacent"/>
                <Column className="centerAlign" field="contrat" title="Contrat"/>
                <Column className="centerAlign" field="sensLabel" title="Sens"/>
                <Column className="centerAlign" field="nombreContrat" title="Nombre de contrat"/>
                <Column className="centerAlign" field="quantite" title="Quantité en unité"/>
                <Column className="centerAlign" field="nominal" title="Nominal"/>
                <Column className="centerAlign" field="prixOperation" title="Prix du Forward"/>
                <Column className="centerAlign" field="marge" title="Marge"/>
                <Column className="centerAlign" field="coursCloture" title="Cours de clotûre"/>
                <Column className="centerAlign" field="pnl" title="Pnl"/>
                <Column className="centerAlign" field="totalPaiement" title="Paiement"/>

            </Grid>
        </Spin>
    )


}

export default GridPaiementSoulte1;