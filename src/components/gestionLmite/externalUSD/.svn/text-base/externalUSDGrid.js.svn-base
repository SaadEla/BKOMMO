import React, {useEffect, useState} from "react";
import {Checkbox, Spin} from "antd";
import {Grid, GridToolbar} from "@progress/kendo-react-grid";
import {GridColumn as Column} from "@progress/kendo-react-grid/dist/npm/GridColumn";
import {ExternalUSDGridHeader} from "./externalUSDGridHeader";
import {useDispatch, useSelector} from "react-redux";
import {
    ExternalUSDDetailLoadingSelector,
    ExternalUSDListLoadingSelector, ExternalUSDListSelector
} from "../../../redux/GestionDeLimite/externalUSD/Selectors";
import {orderBy} from "@progress/kendo-data-query";
import {selectingGridRow} from "../../../redux/GestionDeLimite/externalUSD/externalUSDSlice";
import {DateUtil, NumberUtil} from "../../../helpers/Utils";
import * as moment from "moment";
import {ExcelExport} from "@progress/kendo-react-excel-export";
import {
    AlertOutlined,
    DeleteOutlined,
    SafetyCertificateFilled,
    SafetyCertificateOutlined,
    WarningOutlined
} from "@ant-design/icons";

export function ExternalUSDGrid({ajouter, supprimer, actualiser, selectedRow, heightGrid = '700px', ExternalUSDList, handleRowDoubleClick}) {

    const dispatch = useDispatch();
    let [dataGrid, setDataGrid] = useState([]);
    const [gridDataState, setGridDataState] = useState({})
    const [skip, setSkip] = useState(0);
    const [take, setTake] = useState(20);
    const [sort, setSort] = useState([]);
    const [selectedID, setSelectedID] = useState(null);
    const ExternalUSDLoading = useSelector(ExternalUSDListLoadingSelector);
    let exportCsv;

    useEffect(function () {
        setDataGrid([...ExternalUSDList])
    }, [ExternalUSDList])

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
                datePositionLabel:DateUtil.parseDate(item.datePosition),
                ...item,
                // selected: item.id === (selectedID && selectedID.id)
            }));
    }

    function marketLabelFunction(item) {
        return item.sousJacent.market.shortName + "-" + item.sousJacent.market.name;
    }

    function handleOnRowClick(e) {
        dispatch(selectingGridRow(e.dataItem))
        setSelectedID(e.dataItem);
    }


    function ExternalUSDFilterFunction(value) {
        return item => {
            if (!value) return true;
            let target = value.toUpperCase();
            if (!target) return true;
            return (item.label.toUpperCase().indexOf(target.toUpperCase()) != -1)
                || (item.sousJacent.name.toUpperCase().indexOf(target.toUpperCase()) != -1);
        }
    }

    function quickSearch_changeHandler(evt) {
        setDataGrid(ExternalUSDList.filter(ExternalUSDFilterFunction(evt)))
    }

    function rowClick(e) {

        dispatch(selectingGridRow(e.dataItem))
        handleRowDoubleClick(e);
    }

    function numberCell(props) {

        return (
            <td>
                {NumberUtil.Format(props.dataItem[props.field])}
            </td>
        )
    }

    function statutLabelFunction(item) {
        if (item.statut == 'OK')
            return "Pas de dépassement";
        else if (item.statut == 'WARNING')
            return "Used > 90%";
        else if (item.statut == 'NOLIMIT')
            return "limite non définie";
        else
            return "Dépassement";
    }

    return (
        <Spin spinning={ExternalUSDLoading} size="large">
            <ExcelExport
                data={dataGrid}
                ref={e => exportCsv = e}
                fileName={"Exposition report " + moment().format("DD-MM-YYYY HH_mm_ss")}
            >
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
                    // selectedField="selected"
                    onRowClick={(e) => handleOnRowClick(e)}
                    onRowDoubleClick={e => {
                    }}
                >
                    <GridToolbar>
                        <ExternalUSDGridHeader
                            csvExport={() => exportCsv.save()}
                            selectedRow={selectedID} ajouter={ajouter} supprimer={supprimer}
                            quickSearch_changeHandler={quickSearch_changeHandler}
                            actualiser={actualiser}></ExternalUSDGridHeader>
                    </GridToolbar>
                    <Column field="datePositionLabel" title="Date"
                            format="{0:dd/MM/yyyy}" className={"centerAlign"} />
                    <Column field="tiers.shortName" title="Cpty"
                            />
                    <Column field="montant" title="Used(MAD)"
                            className="centerRight" format="{0:n2}"/>
                </Grid>
            </ExcelExport>
        </Spin>
    )
}