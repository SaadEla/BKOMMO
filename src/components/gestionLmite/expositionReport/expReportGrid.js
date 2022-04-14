import React, {useEffect, useState} from "react";
import {Checkbox, Spin} from "antd";
import {Grid, GridToolbar} from "@progress/kendo-react-grid";
import {GridColumn as Column} from "@progress/kendo-react-grid/dist/npm/GridColumn";
import {ExpReportGridHeader} from "./expReportGridHeader";
import {useDispatch, useSelector} from "react-redux";
import {
    ExpReportDetailLoadingSelector,
    ExpReportListLoadingSelector, ExpReportListSelector
} from "../../../redux/GestionDeLimite/expReport/Selectors";
import {orderBy} from "@progress/kendo-data-query";
import {selectingGridRow} from "../../../redux/GestionDeLimite/expReport/expReportSlice";
import {NumberUtil} from "../../../helpers/Utils";
import * as moment from "moment";
import {ExcelExport} from "@progress/kendo-react-excel-export";
import {
    AlertOutlined,
    DeleteOutlined,
    SafetyCertificateFilled,
    SafetyCertificateOutlined,
    WarningOutlined
} from "@ant-design/icons";

export function ExpReportGrid({ajouter, supprimer, actualiser, selectedRow, heightGrid = '700px', ExpReportList, handleRowDoubleClick}) {

    const dispatch = useDispatch();
    let [dataGrid, setDataGrid] = useState([]);
    const [gridDataState, setGridDataState] = useState({})
    const [skip, setSkip] = useState(0);
    const [take, setTake] = useState(20);
    const [sort, setSort] = useState([]);
    const [selectedID, setSelectedID] = useState(null);
    const ExpReportLoading = useSelector(ExpReportListLoadingSelector);
    let exportCsv;

    useEffect(function () {
        setDataGrid([...ExpReportList])
    }, [ExpReportList])

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


    function ExpReportFilterFunction(value) {
        return item => {
            if (!value) return true;
            let target = value.toUpperCase();
            if (!target) return true;
            return (item.label.toUpperCase().indexOf(target.toUpperCase()) != -1)
                || (item.sousJacent.name.toUpperCase().indexOf(target.toUpperCase()) != -1);
        }
    }

    function quickSearch_changeHandler(evt) {
        setDataGrid(ExpReportList.filter(ExpReportFilterFunction(evt)))
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
        <Spin spinning={ExpReportLoading} size="large">
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
                        <ExpReportGridHeader
                            csvExport={() => exportCsv.save()}
                            selectedRow={selectedID} ajouter={ajouter} supprimer={supprimer}
                            quickSearch_changeHandler={quickSearch_changeHandler}
                            actualiser={actualiser}></ExpReportGridHeader>
                    </GridToolbar>
                    <Column
                        style={{textAlign:"center",fontSize:"15px"}}
                        width={"40px"} field="statut" title={" "} cell={
                        props => {
                            const statut = props.dataItem[props.field];
                            if (statut == 'OK')
                                //  statutIcon.source="assets/icons-protect-20.png";
                                return <div style={{textAlign:"center",fontSize:"15px"}}>
                                    <SafetyCertificateOutlined style={{textAlign:"center",fontSize:"15px",color:"#52c41a"}} />
                                </div>
                                    else if (statut == 'WARNING')
                                //statutIcon.source="assets/icons-warning-20.png";
                                return <div style={{textAlign:"center",fontSize:"15px"}}>
                                    <WarningOutlined style={{color:"#FF6347"}} />
                                </div>
                            else if (statut == 'NOLIMIT')
                                // statutIcon.source="assets/icons-delete-20.png";

                                return <div style={{textAlign:"center",fontSize:"15px"}}>
                                    <SafetyCertificateFilled style={{textAlign:"center",fontSize:"15px",color:"#DC143C"}}/>
                                </div>
                            else
                                //  statutIcon.source="assets/icons-high-priority-20.png";

                                return <div style={{textAlign:"center",fontSize:"15px"}}>
                            <AlertOutlined style={{color:"#ff9800"}}  />
                                </div>


                        }
                    }/>
                    <Column field="tiers.shortName" title="Cpty Short name"/>
                    <Column field="tiers.name" title="Cpty Name"/>
                    <Column field="limit" title="Limite" cell={numberCell}/>
                    <Column field="expositionNominal" title="Exposition Encours"
                            className="centerRight" format="{0:n2}"/>
                    <Column field="expositionDeltaMTM" title="Delta MTM"
                            className="centerRight" format="{0:n2}"/>
                    <Column field="expositionSuspens" title="Suspens"
                            className="centerRight" format="{0:n2}"/>
                    <Column field="externalUsed" title="Exposition Hors MP"
                            className="centerRight" format="{0:n2}"/>
                    <Column field="expositionTotal" title="Total MAD"
                            className="centerRight" format="{0:n2}"/>
                    <Column field="depassement" title="Dépassement MAD"
                            className="centerRight" format="{0:n2}"/>
                    <Column field="depassementRate" title="%Dépassement"
                            className="centerRight" format="{0:n2}"/>

                </Grid>
            </ExcelExport>
        </Spin>
    )
}