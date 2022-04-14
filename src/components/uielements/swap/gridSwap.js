import {process} from '@progress/kendo-data-query';
import {Grid, GridColumn as Column, GridToolbar} from '@progress/kendo-react-grid';
import React, {useEffect, useState} from 'react';
import {orderBy} from '@progress/kendo-data-query';
import * as moment from 'moment'
import {useDispatch, useSelector} from "react-redux";
import {selectingGridRow} from '../../../redux/dealCapture/swap/swapSlice';
import {
    mappingListSwap
} from "./SwapUtil";
import {ExcelExport} from '@progress/kendo-react-excel-export';
import {Spin} from "antd";
import {dealSwapDetailLoadingSelector, SwapListLoadingSelector} from "../../../redux/dealCapture/selectors/selectors";
import products from "../../uielements/fakedata.json";

const DataGrid = ({selectedRow,heightGrid = '700px', setExportCsv, data, children, handleRowDoubleClick}) => {


    const dispatch = useDispatch();
    let [dataGrid, setDataGrid] = useState([]);
    const [gridDataState, setGridDataState] = useState({})
    const [skip, setSkip] = useState(0);
    const [take, setTake] = useState(20);
    const [sort, setSort] = useState([]);
    const [selectedID, setSelectedID] = useState(null);
    const swapLoading = useSelector(SwapListLoadingSelector);
    const dealSwapLoading = useSelector(dealSwapDetailLoadingSelector);
    const handleGridDataStateChange = (e) => {
        setGridDataState(e.data);
    }

    useEffect(function () {

        //  if(selectedRow && !selectedRow)
        setSelectedID(selectedRow)
    },[selectedRow])
    useEffect(function () {
        setDataGrid(mappingListSwap(data))
    }, [data])


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
        <Spin spinning={swapLoading || dealSwapLoading} size="large">
            <ExcelExport
                data={dataGrid}
                ref={setExportCsv}
                fileName={"swap " + moment().format("DD-MM-YYYY HH_mm_ss")}
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
                    selectedField="selected"
                    onRowClick={(e) => handleOnRowClick(e)}
                    onRowDoubleClick={e => handleRowDoubleClick(e)}
                >
                    <GridToolbar>
                        {
                            children
                        }
                    </GridToolbar>
                    <Column className={"centerAlign"} width={'60px'} field="kplusId" title="Kondor ID"/>
                    <Column className={"centerAlign"} width={'90px'} format="{0:dd/MM/yyyy}"  field="tradeDateLabel" title="Trade Date"/>
                    <Column className={"centerAlign"} width={'90px'} format="{0:dd/MM/yyyy}"  field="maturityDateLabel" title="Maturity Date"/>
                    <Column className={"centerAlign"} width={'90px'} format="{0:dd/MM/yyyy}"  field="valueDateLabel" title="Value Date"/>
                    <Column field="contrepartieLabel" title="Contre Partie"/>
                    <Column field="sousJacentLabel" title="Sous-Jacent"/>
                    <Column className={"centerAlign"} width={'60px'} field="sensLabel" title="BMCE paie"/>
                    <Column width={'80px'} className="centerRight" format="{0:n2}"  field="quantite" title="Quantité"/>
                    <Column width={'80px'} className="centerRight" format="{0:n2}"  field="prixFixe" title="Prix"/>
                    <Column width={'80px'} className="centerRight" format="{0:n2}"  field="montantGlobalLabel" title="Montant Global"/>
                    <Column className={"centerAlign"} width={'80px'} field="statut.libelle" title="Statut"/>
                    <Column className={"centerAlign"} width={'70px'} field="usernameLabel" title="Créé par"/>
                </Grid>
            </ExcelExport>
        </Spin>
    )
}

export default DataGrid;