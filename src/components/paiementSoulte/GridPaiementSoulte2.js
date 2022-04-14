import {process} from '@progress/kendo-data-query';
import {Grid, GridColumn as Column, GridToolbar} from '@progress/kendo-react-grid';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Col, Form, Row, Select} from "antd";
import {DateUtil, NumberUtil} from "../../helpers/Utils";
import {orderBy} from "@progress/kendo-data-query";
import PaiementSoulteHeader2 from "./PaiementSoulteHeader2";
import { PaiementSoulteSelectedRowSelector } from "../../redux/PaiementSoulte/paiementSoulteSelector";
import { PaiementDetailSelectedRowSelector } from "../../redux/PaiementSoulte/paiementSoulteSelector";
import {selectingGridRow} from "../../redux/PaiementSoulte/paiementSoulteSlice";
import {selectingGrid2Row} from "../../redux/PaiementSoulte/paiementSoulteSlice";



const GridPaiementSoulte2 = ({onChange,form, selectedRow, removeOption,setShowPopUpDetail}) => {

    const dispatch = useDispatch();
    const [gridDataState, setGridDataState] = useState({})
    let [dataGrid, setDataGrid] = useState([]);
    const [skip, setSkip] = useState(0);
    const [take, setTake] = useState(20);
    const [sort, setSort] = useState([]);
    const [selectedID, setSelectedID] = useState(null);
    const [listPaiements, setListPaiements] = useState([]);
    const [pnl, setPnl] = useState(null);
    const [totalPaiement, setTotalPaiement] = useState(null);
    const [suspens, setSuspens] = useState(null);

    //const selectedItem1 = useSelector(PaiementSoulteSelectedRowSelector)
    const selectedItem = useSelector(PaiementSoulteSelectedRowSelector)



    useEffect(function () {
        console.log(listPaiements)
        if(listPaiements && listPaiements.length>0){
            setDataGrid([...listPaiements])
        }else{
            setDataGrid([])
        }
    }, [listPaiements])

    useEffect(function () {
        if(selectedItem){
            if(selectedItem.paiements.length > 0){
                setListPaiements(selectedItem.paiements)
                setPnl(selectedItem.pnl)
                setTotalPaiement(selectedItem.totalPaiement)
                setSuspens(selectedItem.pnl - selectedItem.totalPaiement)
            }else{
                setListPaiements(null)
                setPnl(0)
                setTotalPaiement(0)
                setSuspens(0)
            }
        }

    },[selectedItem])


    function handleOnRowClick(e) {
        setSelectedID(e.dataItem);
        dispatch(selectingGrid2Row(e.dataItem))
    }
    const handleGridDataStateChange = (e) => {
        setGridDataState(e.data);
    }

    function prepareDataGrid(dataGrid) {
        return orderBy(dataGrid.map(item=>{
            return {
                ...item
            }
        }), sort).slice(skip, skip + take).map(
            (item) => ({...item,
                selected: item.id === (selectedID && selectedID.id)}));
    }

    return (
        <Grid
            style={{height: '100%', width: '100%'}}
            resizable={true}
            reorderable={true}
            sortable={true}
            groupable={true}
            data={prepareDataGrid(dataGrid)}
            selectedField="selected"
            onRowClick={(e) => handleOnRowClick(e)}

        >
            <GridToolbar>
                <PaiementSoulteHeader2
                    onChange={onChange}
                    form={form}
                    pnl={pnl}
                    totalPaiement={totalPaiement}
                    suspens={suspens}
                    setShowPopUpDetail={setShowPopUpDetail}
                    removeOption = {removeOption}>
                </PaiementSoulteHeader2>
            </GridToolbar>

            <Column className="centerAlign" format="{0:dd/MM/yyyy}" field="datePaiement" title="Date Paiement"/>
            <Column className="centerAlign" format="{0:n2}" field="montant" title="Montant Payé"/>
            <Column field="" title="Saisi par"/>
            <Column field="" title="Saisi le"/>


        </Grid>

    )
}

export default GridPaiementSoulte2;