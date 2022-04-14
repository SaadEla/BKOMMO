import React, {useEffect, useState} from "react";
import {Checkbox, Spin} from "antd";
import {Grid, GridToolbar} from "@progress/kendo-react-grid";
import {GridColumn as Column} from "@progress/kendo-react-grid/dist/npm/GridColumn";
import {TiersGridHeader} from "./TiersGridHeader";
import {useDispatch, useSelector} from "react-redux";
import {
    TiersDetailLoadingSelector,
    TiersListLoadingSelector
} from "../../../redux/MarketData/tiers/Selectors";
import {orderBy} from "@progress/kendo-data-query";
import {selectingGridRow} from "../../../redux/MarketData/tiers/tiersSlice";

export function TiersGrid  ({actualiser,selectedRow,heightGrid = '700px', tiersList, handleRowDoubleClick})  {

    const dispatch = useDispatch();
    let [dataGrid, setDataGrid] = useState([]);
    const [gridDataState, setGridDataState] = useState({})
    const [skip, setSkip] = useState(0);
    const [take, setTake] = useState(20);
    const [sort, setSort] = useState([]);
    const [selectedID, setSelectedID] = useState(null);
    const tiersLoading = useSelector(TiersListLoadingSelector);

    const [quickSearch,setQuickSearch] = useState()

    useEffect(function () {
        setDataGrid([...tiersList])
    }, [tiersList])

    useEffect(function () {
        setSelectedID(selectedRow)
    },[selectedRow])

    function pageChange(event) {
        setTake(event.page.take);
        setSkip(event.page.skip);
    }

    function prepareDataGrid(dataGrid) {
        return orderBy(dataGrid.map(item=>{
            return {
                typeLabel: typeLabelFunction(item.type),
                ...item
            }
        }), sort).slice(skip, skip + take).map(
            (item) => ({...item,
                selected: item.tiersId === (selectedID && selectedID.tiersId)}));
    }

    function handleOnRowClick(e) {
        setSelectedID(e.dataItem);
        dispatch(selectingGridRow(e.dataItem))
    }

     function typeLabelFunction(type){
        if (type=="B")
            return "Broker";
        else if (type=="C")
            return "Contrepartie";
        else
            return "";
    }


     function tiersFilterFunction(value){
        return item=>{
           if(!value) return true;
            let target = value.toUpperCase();
            return (item.name.toUpperCase().indexOf(target)!=-1)
                ||(item.shortName.toUpperCase().indexOf(target)!=-1);
        }
    }
    function quickSearch_changeHandler(evt) {
        console.log(evt)
        console.log(tiersList)
        console.log(tiersList.filter(tiersFilterFunction(evt)))
        setDataGrid(tiersList.filter(tiersFilterFunction(evt)))
    }

    return (
        <Spin spinning={tiersLoading } size="large">
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
                    onRowDoubleClick={e => handleRowDoubleClick(e)}
                >
                    <GridToolbar>
                        <TiersGridHeader quickSearch_changeHandler={quickSearch_changeHandler} actualiser={actualiser}></TiersGridHeader>
                    </GridToolbar>
                    <Column field="shortName" title="Short Name"/>
                    <Column field="name" title="Name"/>
                    <Column  field="typeLabel" title="Type"/>
                    <Column field="futureFolder" title="Folder Future"/>
                    <Column field="contact.nom" title="Contact"/>

                </Grid>
        </Spin>
    )
}