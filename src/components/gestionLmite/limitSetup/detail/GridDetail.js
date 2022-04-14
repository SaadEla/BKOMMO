import {Grid, GridToolbar} from "@progress/kendo-react-grid";
import {LimitSetupGridHeader} from "../LimitSetupGridHeader";
import {GridColumn as Column} from "@progress/kendo-react-grid/dist/npm/GridColumn";
import {Col, Row, Spin} from "antd";
import React, {useEffect, useState} from "react";
import {orderBy} from "@progress/kendo-data-query";
import {NumberUtil} from "../../../../helpers/Utils";
import {useDispatch} from "react-redux";
import {
    Button
} from '@progress/kendo-react-buttons'
import {PopUpLimitSetupEcheance} from "./PopUpLimitSetupEcheance";
import {removeEcheance} from "../../../../redux/GestionDeLimite/limitSetup/limitSetupSlice"
import {selectingGridRow} from "../../../../redux/GestionDeLimite/limitSetup/limitSetupSlice";

const EcheancierStyle = {
    Button: {
        borderRadius: '10px',
        color: 'rgba(19,105,180,0.9)'
    }

}
export default function GridDetail({limitDetails}) {
    const dispatch = useDispatch();
    const [skip, setSkip] = useState(0);
    const [take, setTake] = useState(20);
    const [sort, setSort] = useState([]);
    const [selectedID, setSelectedID] = useState(null);
    const [showPopUp, setShowPopUp] = useState(false);

    function prepareDataGrid(dataGrid) {
        return  orderBy(dataGrid, sort).slice(skip, skip + take).map(
            (item) => ({
                ...item,
                selected: item.debut === (selectedID && selectedID.debut)
                && item.fin === (selectedID && selectedID.fin)
            }));
    }
    useEffect(function () {
        setSelectedID(null)
    },[limitDetails])

    function handleOnRowClick(e) {

      //  dispatch(selectingGridRow(e.dataItem))
        setSelectedID(e.dataItem);
    }

    function pageChange(event) {
        setTake(event.page.take);
        setSkip(event.page.skip);
    }

    function remove() {
        dispatch(removeEcheance(selectedID))
    }

    return <>
        <Row>
            <Col span={12}>
                <Button
                    //onClick={generateEcheancier}
                    style={EcheancierStyle.Button} look="bare">
                    Échéances
                </Button>
            </Col>
            <Col span={12}>
                <div style={{float: 'right'}}>
                    <Button
                        type={"button"}
                        onClick={e=>{ setShowPopUp(true)}}
                        style={EcheancierStyle.Button}
                        icon="plus-circle" look="bare"></Button>
                    <Button
                        type={"button"}
                        disabled={!selectedID}
                          onClick={remove}
                        style={EcheancierStyle.Button}
                        icon="minus-circle" look="bare"></Button>
                </div>

            </Col>
        </Row>
        <Grid
            style={{height: '200px', width: '100%'}}
            resizable
            reorderable
            sortable={true}
            data={[...prepareDataGrid(limitDetails)]}
            // onRowDoubleClick={showMoadlSwapEcheance}
            selectedField={"selected"}
            onRowClick={(e) => handleOnRowClick(e)}
        >
            <Column field="debut" title="Début"/>
            <Column field="fin" title="Fin"/>
            <Column field="montant" title="Montant limit"/>
        </Grid>
        <PopUpLimitSetupEcheance showPopUp={showPopUp} setShowPopUp={setShowPopUp}></PopUpLimitSetupEcheance>
    </>
}