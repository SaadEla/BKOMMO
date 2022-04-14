import React, {useEffect, useState} from "react";
import {Checkbox, Spin} from "antd";
import {Grid, GridToolbar} from "@progress/kendo-react-grid";
import {GridColumn as Column} from "@progress/kendo-react-grid/dist/npm/GridColumn";
import {FeesGridHeader} from "./FeesGridHeader";
import {useDispatch, useSelector} from "react-redux";
import {
    FeesDetailLoadingSelector,
    FeesListLoadingSelector
} from "../../../redux/MarketData/fees/Selectors";
import {orderBy} from "@progress/kendo-data-query";
import {selectingGridRow} from "../../../redux/MarketData/fees/feesSlice";

export function FeesGrid({ajouter, supprimer, actualiser, selectedRow, heightGrid = '700px', feesList, handleRowDoubleClick}) {

    const dispatch = useDispatch();
    let [dataGrid, setDataGrid] = useState([]);
    const [gridDataState, setGridDataState] = useState({})
    const [skip, setSkip] = useState(0);
    const [take, setTake] = useState(20);
    const [sort, setSort] = useState([]);
    const [selectedID, setSelectedID] = useState(null);
    const feesLoading = useSelector(FeesListLoadingSelector);

    useEffect(function () {
        setDataGrid([...feesList])
    }, [feesList])

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


    function feesFilterFunction(value) {
        return item=>{
            if(!value) return true;
            let target = value.toUpperCase();
            if (!target) return true;
            return (item.label.toUpperCase().indexOf(target.toUpperCase()) != -1)
                || (item.sousJacent.name.toUpperCase().indexOf(target.toUpperCase()) != -1);
        }
     }

    function quickSearch_changeHandler(evt) {
        setDataGrid(feesList.filter(feesFilterFunction(evt)))
    }

    function rowClick(e) {

        dispatch(selectingGridRow(e.dataItem))
        handleRowDoubleClick(e);
    }

    return (
        <Spin spinning={feesLoading} size="large">
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
                onRowDoubleClick={e => rowClick(e)}
            >
                <GridToolbar>
                    <FeesGridHeader selectedRow={selectedID} ajouter={ajouter} supprimer={supprimer}
                                       quickSearch_changeHandler={quickSearch_changeHandler}
                                       actualiser={actualiser}></FeesGridHeader>
                </GridToolbar>
                <Column className="centerAlign" field="sousJacent.devise.shortName" title="Devise"/>
                <Column field="sousJacent.shortName" title="Sous-Jacent"/>
                <Column className="centerRight" field="maturity" title="Maturité (En Nbr jours)"/>
                <Column className="centerRight" field="fee" title="NotationFinanciere"/>

            </Grid>
        </Spin>
    )
}