import React, {useEffect, useState} from "react";
import {Checkbox, Spin} from "antd";
import {Grid, GridToolbar} from "@progress/kendo-react-grid";
import {GridColumn as Column} from "@progress/kendo-react-grid/dist/npm/GridColumn";
import {NotationFinanciereGridHeader} from "./NotationFinanciereGridHeader";
import {useDispatch, useSelector} from "react-redux";
import {
    NotationFinanciereDetailLoadingSelector,
    NotationFinanciereListLoadingSelector
} from "../../../redux/GestionDeLimite/notationFinanciere/Selectors";
import {orderBy} from "@progress/kendo-data-query";
import {selectingGridRow} from "../../../redux/GestionDeLimite/notationFinanciere/notationFinanciereSlice";
import {DateUtil, NumberUtil} from "../../../helpers/Utils";

export function NotationFinanciereGrid({notationFinanciereRefloading,notationFinanciereRef,ajouterNotation,loadingDetail,ajouter, supprimer, actualiser, selectedRow, heightGrid = '700px', notationFinanciereList, handleRowDoubleClick}) {

    const dispatch = useDispatch();
    let [dataGrid, setDataGrid] = useState([]);
    const [gridDataState, setGridDataState] = useState({})
    const [skip, setSkip] = useState(0);
    const [take, setTake] = useState(20);
    const [sort, setSort] = useState([]);
    const [selectedID, setSelectedID] = useState(null);
    const notationFinanciereLoading = useSelector(NotationFinanciereListLoadingSelector);

    useEffect(function () {
        setDataGrid([...notationFinanciereList])
    }, [notationFinanciereList])

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
                typeLabel:typeLabelFunction(item),
                montantLabel:item.montant,
                dateEffetLabel:DateUtil.parseDate(item.dateEffet,'DD/MM/YYYY'),
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


    function notationFinanciereFilterFunction(value) {
        return item=>{
            if(!value) return true;
            let target = value.toUpperCase();
            if (!target) return true;
            return (item.label.toUpperCase().indexOf(target.toUpperCase()) != -1)
                || (item.sousJacent.name.toUpperCase().indexOf(target.toUpperCase()) != -1);
        }
     }

    function quickSearch_changeHandler(evt) {
        setDataGrid(notationFinanciereList.filter(notationFinanciereFilterFunction(evt)))
    }

    function rowClick(e) {

        dispatch(selectingGridRow(e.dataItem))
        handleRowDoubleClick(e);
    }
     function typeLabelFunction(item, column){
        if (item.type=="F")
            return "Fix";
        else if (item.type=="R")
            return "Revolving";
        else
            return "";
    }

    return (
        <Spin spinning={notationFinanciereLoading || loadingDetail} size="large">
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
                    <NotationFinanciereGridHeader
                        notationFinanciereRefloading={notationFinanciereRefloading}
                        ajouterNotation={ajouterNotation}
                        selectedRow={selectedID}
                                                  ajouter={ajouter} supprimer={supprimer}
                                                  quickSearch_changeHandler={quickSearch_changeHandler}
                                                  actualiser={actualiser}></NotationFinanciereGridHeader>
                </GridToolbar>
                <Column field="tiers.shortName" title="Cpty Short name"/>
                <Column field="tiers.name" title="Cpty Name"/>
                <Column className="centerAlign"
                        format="{0:dd/MM/yyyy}" field="dateEffetLabel" title="Date Effet"/>
                <Column field="notation.libelle" title="Notation financière"/>

            </Grid>
        </Spin>
    )
}