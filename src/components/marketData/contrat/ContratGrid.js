import React, {useEffect, useState} from "react";
import {Checkbox, Spin} from "antd";
import {Grid, GridToolbar} from "@progress/kendo-react-grid";
import {GridColumn as Column} from "@progress/kendo-react-grid/dist/npm/GridColumn";
import {ContratGridHeader} from "./ContratGridHeader";
import {useDispatch, useSelector} from "react-redux";
import {
    ContratDetailLoadingSelector,
    ContratListLoadingSelector
} from "../../../redux/MarketData/contrat/Selectors";
import {orderBy} from "@progress/kendo-data-query";
import {selectingGridRow} from "../../../redux/MarketData/contrat/contratSlice";
import {DateUtil} from "../../../helpers/Utils";

export function ContratGrid({ajouter, supprimer, actualiser, selectedRow, heightGrid = '700px', contratList, handleRowDoubleClick}) {

    const dispatch = useDispatch();
    let [dataGrid, setDataGrid] = useState([]);
    const [gridDataState, setGridDataState] = useState({})
    const [skip, setSkip] = useState(0);
    const [take, setTake] = useState(20);
    const [sort, setSort] = useState([]);
    const [selectedID, setSelectedID] = useState(null);
    const contratLoading = useSelector(ContratListLoadingSelector);

    const [quickSearch, setQuickSearch] = useState()

    useEffect(function () {
        setDataGrid([...contratList])
    }, [contratList])

    useEffect(function () {
        setSelectedID(selectedRow)
    }, [selectedRow])

    function pageChange(event) {
        setTake(event.page.take);
        setSkip(event.page.skip);
    }

    function prepareDataGrid(dataGrid) {
        return orderBy(dataGrid.map(item => {
            return {
                marketLabel: marketLabelFunction(item),
                maturityLabel: DateUtil.parseDate(item.maturity,"DD/MM/YYYY"),
                ...item
            }
        }), sort).slice(skip, skip + take).map(
            (item) => ({
                ...item,
                selected: item.contratId === (selectedID && selectedID.contratId)
            }));
    }

    function marketLabelFunction(item) {
        return item.sousJacent.market.shortName + "-" + item.sousJacent.market.name;
    }

    function handleOnRowClick(e) {
        dispatch(selectingGridRow(e.dataItem))
        setSelectedID(e.dataItem);
    }


    function contratFilterFunction(value) {
        return item=>{
            if(!value) return true;
            let target = value.toUpperCase();
            if (!target) return true;
            return (item.label.toUpperCase().indexOf(target.toUpperCase()) != -1)
                || (item.sousJacent.name.toUpperCase().indexOf(target.toUpperCase()) != -1);
        }
     }

    function quickSearch_changeHandler(evt) {
        console.log(evt)
        console.log(contratList)
        console.log(contratList.filter(contratFilterFunction(evt)))
        setDataGrid(contratList.filter(contratFilterFunction(evt)))
    }

    function rowClick(e) {

        dispatch(selectingGridRow(e.dataItem))
        handleRowDoubleClick(e);
    }

    return (
        <Spin spinning={contratLoading} size="large">
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
                    <ContratGridHeader selectedRow={selectedID} ajouter={ajouter} supprimer={supprimer}
                                       quickSearch_changeHandler={quickSearch_changeHandler}
                                       actualiser={actualiser}></ContratGridHeader>
                </GridToolbar>
                <Column className="centerAlign" field="contratId" title="ID"/>
                <Column field="code" title="RIC"/>
                <Column field="label" title="Contrat"/>
                <Column field="sousJacent.name" title="Sous-Jacent"/>
                <Column field="sousJacent.shortName" title="Sous-Jacent(Short name)"/>
                <Column format="{0:dd/MM/yyyy}"  field="maturityLabel" title="Maturity"/>
                <Column field="marketLabel" title="Marché"/>
                <Column className="centerAlign" field="sousJacent.devise.shortName" title="Devise"/>
                <Column className="centerRight" format="{0:n2}" field="commissionForward" title="Commission BMCE(Forward)"/>

            </Grid>
        </Spin>
    )
}