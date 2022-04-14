import {process} from '@progress/kendo-data-query';
import {Grid, GridColumn as Column, GridToolbar} from '@progress/kendo-react-grid';
import React, {useEffect, useState} from 'react';
import {orderBy} from '@progress/kendo-data-query';
import * as moment from 'moment'
import {useDispatch, useSelector} from "react-redux";
import {selectingGridRow} from '../../../redux/dealCapture/forward/forwardSlice';
import {
    mappingListForward
} from "./ForwardUtil";
import {ExcelExport} from '@progress/kendo-react-excel-export';
import {Spin} from "antd";
import {dealForwardDetailLoadingSelector, ForwardListLoadingSelector} from "../../../redux/dealCapture/selectors/ForwardSelectors";
import products from "../../uielements/fakedata.json";

const DataGrid = ({selectedRow,heightGrid = '700px', setExportCsv, data, children, handleRowDoubleClick}) => {


    const dispatch = useDispatch();
    let [dataGrid, setDataGrid] = useState([]);
    const [gridDataState, setGridDataState] = useState({})
    const [skip, setSkip] = useState(0);
    const [take, setTake] = useState(20);
    const [sort, setSort] = useState([]);
    const [selectedID, setSelectedID] = useState(null);
    const forwardLoading = useSelector(ForwardListLoadingSelector);
    const dealForwardLoading = useSelector(dealForwardDetailLoadingSelector);
    const handleGridDataStateChange = (e) => {
        setGridDataState(e.data);
    }

    useEffect(function () {

      //  if(selectedRow && !selectedRow)
        setSelectedID(selectedRow)
    },[selectedRow])

    useEffect(function () {
        setDataGrid(mappingListForward(data))
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
        <Spin spinning={forwardLoading || dealForwardLoading} size="large">
            <ExcelExport
                data={dataGrid}
                ref={setExportCsv}
                fileName={"forward " + moment().format("DD-MM-YYYY HH_mm_ss")}
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
                    <Column width={'60px'} field="dealId" title="ID"/>
                    <Column width={'80px'} field="kplusId" title="Kondor ID"/>
                    <Column format="{0:dd/MM/yyyy}" field="tradeDateLabel" title="Trade Date"/>
                    <Column format="{0:dd/MM/yyyy}" field="maturityDateLabel" title="Maturity Date"/>
                    <Column field="contrepartieLabel" title="Contre Partie"/>
                    <Column field="contrat.label" title="Contrat"/>
                    <Column className={"centerAlign"} width={'60px'} field="sensLabel" title="Sens"/>
                    <Column width={'80px'} className="centerRight" format="{0:n2}" field="quantite" title="Quantité"/>
                    <Column width={'80px'} className="centerRight" format="{0:n2}" field="prixLabel" title="Prix"/>
                    <Column width={'80px'} className="centerRight" format="{0:n2}" field="commission" title="Commission"/>
                    <Column width={'80px'} className="centerRight" format="{0:n2}" field="globalBrutLabel" title="Global brut"/>
                    <Column width={'90px'} className="centerRight" format="{0:n2}" field="globalNetLabel" title="Global Net"/>
                    <Column className={"centerAlign"} width={'80px'} field="statut.libelle" title="Statut"/>
                    <Column className={"centerAlign"} width={'70px'} field="usernameLabel" title="Créé par"/>
                </Grid>
            </ExcelExport>
        </Spin>
    )
}

export default DataGrid;