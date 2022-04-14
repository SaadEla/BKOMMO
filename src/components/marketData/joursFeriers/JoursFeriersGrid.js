import React, {useEffect, useState} from "react";
import {Checkbox, Spin} from "antd";
import {Grid, GridToolbar} from "@progress/kendo-react-grid";
import {GridColumn as Column} from "@progress/kendo-react-grid/dist/npm/GridColumn";
import {JoursFeriersGridHeader} from "./JoursFeriersGridHeader";
import {useDispatch, useSelector} from "react-redux";
import {
    JoursFeriersDetailLoadingSelector,
    JoursFeriersListLoadingSelector
} from "../../../redux/MarketData/joursFeriers/Selectors";
import {orderBy} from "@progress/kendo-data-query";
import {selectingGridRow} from "../../../redux/MarketData/joursFeriers/joursFeriersSlice";

export function JoursFeriersGrid({ajouter, supprimer, actualiser, selectedRow, heightGrid = '700px', joursFeriersList, handleRowDoubleClick}) {

    const dispatch = useDispatch();
    let [dataGrid, setDataGrid] = useState([]);
    const [gridDataState, setGridDataState] = useState({})
    const [skip, setSkip] = useState(0);
    const [take, setTake] = useState(20);
    const [sort, setSort] = useState([]);
    const [selectedID, setSelectedID] = useState(null);
    const joursFeriersLoading = useSelector(JoursFeriersListLoadingSelector);

    useEffect(function () {
        setDataGrid([...joursFeriersList])
    }, [joursFeriersList])

    useEffect(function () {
        setSelectedID(selectedRow)
    }, [selectedRow])

    function pageChange(event) {
        setTake(event.page.take);
        setSkip(event.page.skip);
    }

    function prepareDataGrid(dataGrid) {
        return orderBy(dataGrid, sort).slice(skip, skip + take).map(
            (item) => ({
                ...item,
                selected: item.id === (selectedID && selectedID.id)
            }));
    }

    function marketLabelFunction(item) {
        return item.sousJacent.market.shortName + "-" + item.sousJacent.market.name;
    }

    function handleOnRowClick(e) {
        dispatch(selectingGridRow(e.dataItem))
        setSelectedID(e.dataItem);
    }


    function joursFeriersFilterFunction(value) {
        return item=>{
            if(!value) return true;
            let target = value.toUpperCase();
            if (!target) return true;
            return (item.label.toUpperCase().indexOf(target.toUpperCase()) != -1)
                || (item.sousJacent.name.toUpperCase().indexOf(target.toUpperCase()) != -1);
        }
     }

    function quickSearch_changeHandler(evt) {
        setDataGrid(joursFeriersList.filter(joursFeriersFilterFunction(evt)))
    }

    function rowClick(e) {

        dispatch(selectingGridRow(e.dataItem))
        handleRowDoubleClick(e);
    }

    return (
        <Spin spinning={joursFeriersLoading} size="large">
            <Grid
                style={{height: '67vh', width: '104%', marginLeft: '-2%'}}
                resizable
                reorderable
                data={prepareDataGrid(dataGrid)}
                skip={skip}
                take={take}
                total={dataGrid.length}
                pageable={true}
                onPageChange={pageChange}
                sortable
                sort={sort}
                onSortChange={(e) => {
                    setSort(e.sort);
                }}
                selectedField="selected"
                onRowClick={(e) => handleOnRowClick(e)}
                onRowDoubleClick={e =>  {}}
            >
                <GridToolbar>
                    <JoursFeriersGridHeader selectedRow={selectedID} ajouter={ajouter} supprimer={supprimer}
                                       quickSearch_changeHandler={quickSearch_changeHandler}
                                       actualiser={actualiser}></JoursFeriersGridHeader>
                </GridToolbar>
                <Column className="centerAlign" field="id" title="#"/>
                <Column field="market.shortName" title="Market"/>
                <Column field="jour" title="Jour"/>
                <Column className="centerAlign" field="recurrent" title="Récurrent"/>
                <Column field="commentaire" title="Commentaire"/>

            </Grid>
        </Spin>
    )
}