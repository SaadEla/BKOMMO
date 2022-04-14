import {process} from '@progress/kendo-data-query';
import {Grid, GridColumn as Column, GridToolbar} from '@progress/kendo-react-grid';
import React, {useEffect, useState} from 'react';
import {orderBy} from '@progress/kendo-data-query';
import * as moment from 'moment'
import {useDispatch, useSelector} from "react-redux";
import {selectingGridRow} from '../../../redux/dealCapture/future/futureSlice';
import {
    mappingListFuture
} from "./FutureUtil";
import {ExcelExport} from '@progress/kendo-react-excel-export';
import {Spin} from "antd";
import {dealFutureDetailLoadingSelector, FutureListLoadingSelector} from "../../../redux/dealCapture/selectors/FutureSelectors";
import products from "../../uielements/fakedata.json";
import {DateUtil} from "../../../helpers/Utils";
import {IntlProvider, LocalizationProvider} from "@progress/kendo-react-intl";

const DataGrid = ({selectedRow,heightGrid = '700px', setExportCsv, data, children, handleRowDoubleClick}) => {


    const dispatch = useDispatch();
    let [dataGrid, setDataGrid] = useState([]);
    const [gridDataState, setGridDataState] = useState({})
    const [skip, setSkip] = useState(0);
    const [take, setTake] = useState(20);
    const [sort, setSort] = useState([]);
    const [selectedID, setSelectedID] = useState(null);
    const futureLoading = useSelector(FutureListLoadingSelector);
    const dealFutureLoading = useSelector(dealFutureDetailLoadingSelector);
    const handleGridDataStateChange = (e) => {
        setGridDataState(e.data);
    }

    useEffect(function () {
        setDataGrid(mappingListFuture(data))
    }, [data])
    useEffect(function () {

        //  if(selectedRow && !selectedRow)
        setSelectedID(selectedRow)
    },[selectedRow])

    function pageChange(event) {
        setTake(event.page.take);
        setSkip(event.page.skip);
    }

    function prepareDataGrid(dataGrid) {
        return orderBy(dataGrid, sort).slice(skip, skip + take).map(
            (item) => ({...item, selected: item.dealId === (selectedID && selectedID.dealId)}));
    }

    function handleOnRowClick(e) {
        setSelectedID(e.dataItem);
        dispatch(selectingGridRow(e.dataItem))
    }


    return (
        <Spin spinning={futureLoading || dealFutureLoading} size="large">
            <ExcelExport
                data={dataGrid}
                ref={setExportCsv}
                fileName={"future " + moment().format("DD-MM-YYYY HH_mm_ss")}
            >
                        <Grid
                            style={{fontSize: 12,height: '67vh', width: '104%', marginLeft: '-2%'}}
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


                                console.log("taouala",e.sort)
                                setSort(e.sort);
                            }}
                            selectedField="selected"
                            onRowClick={(e) => handleOnRowClick(e)}
                            onRowDoubleClick={e => handleRowDoubleClick(e)}
                        >
                            <GridToolbar>
                                {
                                    children
                                }
                            </GridToolbar>
                            <Column width={'80px'} field="kplusId" title="Kondor ID"/>
                            <Column
                                className={"centerAlign"}
                                format="{0:dd/MM/yyyy}"
                                field="tradeDateLabel" title="Trade Date"/>
                            <Column width={'160px'} field="broker.name" title="Broker"/>
                            <Column width={'160px'} field="contrat.label" title="Contrat"/>
                            <Column  className={"centerAlign"} width={'60px'} field="sensLabel" title="Sens"/>
                            <Column width={'80px'} className="centerRight" field="quantiteLabel" format="{0:n2}" title="Quantité"/>
                            <Column width={'80px'} className="centerRight" format="{0:n2}" field="prixLabel"  title="Prix"/>
                            <Column width={'80px'} className="centerRight" field="commission" format="{0:n2}" title="Commission"/>
                            <Column className={"centerAlign"} field="statut.libelle" title="Statut"/>
                            <Column field="usernameLabel" title="Créé par"/>
                            <Column
                                className={"centerAlign"}
                                format="{0:dd/MM/yyyy}"
                                field="maturityDateLabel" title="Maturity Date"/>
                            {
                                /*
                                                    <Column field="maturityDateLabel" title="Maturity Date"/>

                                 */
                            }
                        </Grid>


            </ExcelExport>
        </Spin>
    )
}

export default DataGrid;