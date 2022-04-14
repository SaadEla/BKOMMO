import React, {useEffect, useState} from "react";
import {Checkbox, Spin} from "antd";
import {Grid, GridToolbar} from "@progress/kendo-react-grid";
import {GridColumn as Column} from "@progress/kendo-react-grid/dist/npm/GridColumn";
import {SousJacentGridHeader} from "./SousJacentGridHeader";
import {useDispatch, useSelector} from "react-redux";
import {
    SousJacentDetailLoadingSelector,
    SousJacentListLoadingSelector
} from "../../../redux/MarketData/sousJacent/Selectors";
import {orderBy} from "@progress/kendo-data-query";
import {selectingGridRow} from "../../../redux/MarketData/sousJacent/sousJacentSlice";

export function SousJacentGrid  ({ajouter,supprimer,actualiser,selectedRow,heightGrid = '700px', sousJacentList, handleRowDoubleClick})  {

    const dispatch = useDispatch();
    let [dataGrid, setDataGrid] = useState([]);
    const [gridDataState, setGridDataState] = useState({})
    const [skip, setSkip] = useState(0);
    const [take, setTake] = useState(20);
    const [sort, setSort] = useState([]);
    const [selectedID, setSelectedID] = useState(null);
    const sousJacentLoading = useSelector(SousJacentListLoadingSelector);

    const [quickSearch,setQuickSearch] = useState()

    useEffect(function () {
        setDataGrid([...sousJacentList])
    }, [sousJacentList])

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
                marketLabel: marketLabelFunction(item),
                ...item
            }
        }), sort).slice(skip, skip + take).map(
            (item) => ({...item,
                selected: item.sousJacentId === (selectedID && selectedID.sousJacentId)}));
    }
     function marketLabelFunction(item, column){
        return item.market.shortName+"-"+item.market.name;
    }

    function handleOnRowClick(e) {
        dispatch(selectingGridRow(e.dataItem))
        setSelectedID(e.dataItem);
    }



     function sousJacentFilterFunction(value){
        return item=>{
           if(!value) return true;
            let target = value.toUpperCase();
            return (item.name.toUpperCase().indexOf(target)!=-1)
                ||(item.shortName.toUpperCase().indexOf(target)!=-1);
        }
    }
    function quickSearch_changeHandler(evt) {
        console.log(evt)
        console.log(sousJacentList)
        console.log(sousJacentList.filter(sousJacentFilterFunction(evt)))
        setDataGrid(sousJacentList.filter(sousJacentFilterFunction(evt)))
    }

   function rowClick(e){

       dispatch(selectingGridRow(e.dataItem))
        handleRowDoubleClick(e);
    }

    return (
        <Spin spinning={sousJacentLoading } size="large">
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
                        <SousJacentGridHeader selectedRow={selectedID} ajouter={ajouter} supprimer={supprimer} quickSearch_changeHandler={quickSearch_changeHandler} actualiser={actualiser}></SousJacentGridHeader>
                    </GridToolbar>
                    <Column
                        className={"centerAlign"}
                        field="sousJacentId" title="ID"/>
                    <Column field="name" title="Sous-Jacent"/>
                    <Column  field="shortName" title="Sous-Jacent(Short name)"/>
                    <Column field="marketLabel" title="Marché"/>
                    <Column className={"centerAlign"} field="devise.shortName" title="Devise"/>

                </Grid>
        </Spin>
    )
}