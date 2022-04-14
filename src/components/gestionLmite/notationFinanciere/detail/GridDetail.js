import {Grid, GridToolbar} from "@progress/kendo-react-grid";
import {NotationFinanciereGridHeader} from "../NotationFinanciereGridHeader";
import {GridColumn as Column} from "@progress/kendo-react-grid/dist/npm/GridColumn";
import {Col, Row, Spin} from "antd";
import React, {useEffect, useState} from "react";
import {orderBy} from "@progress/kendo-data-query";
import {NumberUtil} from "../../../../helpers/Utils";
import {useDispatch} from "react-redux";
import {
    Button
} from '@progress/kendo-react-buttons'
import {PopUpNotationFinanciereEcheance} from "./PopUpNotationFinanciereEcheance";
import {removeEcheance} from "../../../../redux/GestionDeLimite/notationFinanciere/notationFinanciereSlice"
import {selectingGridNotationRow} from "../../../../redux/GestionDeLimite/notationFinanciere/notationFinanciereSlice";

const EcheancierStyle = {
    Button: {
        borderRadius: '10px',
        color: 'rgba(19,105,180,0.9)'
    }

}
export default function GridDetail({list}) {
    const dispatch = useDispatch();
    const [skip, setSkip] = useState(0);
    const [take, setTake] = useState(20);
    const [sort, setSort] = useState([]);
    const [selectedID, setSelectedID] = useState(null);
    const [showPopUp, setShowPopUp] = useState(false);

    function prepareDataGrid(dataGrid) {
        return orderBy(dataGrid, sort).slice(skip, skip + take).map(
            (item) => ({
                ...item,
                selected: item.id === (selectedID && selectedID.id)
            }));
    }

    useEffect(function () {
        setSelectedID(null)
    }, [list])

    function handleOnRowClick(e) {
        dispatch(selectingGridNotationRow(e.dataItem))
        setSelectedID(e.dataItem);
    }

    function pageChange(event) {
        setTake(event.page.take);
        setSkip(event.page.skip);
    }

    function remove() {
        dispatch(removeEcheance(selectedID))
    }

    function edit() {
        setShowPopUp(true)
    }

    function ajouter() {
        setShowPopUp(true)
        setTimeout(function () {
            dispatch(selectingGridNotationRow(null))
            setSelectedID(null)

        })
    }

    return <>
        <Row>
            <Col span={12}>
                <Button
                    //onClick={generateEcheancier}
                    style={EcheancierStyle.Button} look="bare">
                    Liste des Notations
                </Button>
            </Col>
            <Col span={12}>
                <div style={{float: 'right'}}>
                    <Button
                        type={"button"}
                        onClick={ajouter}
                        style={EcheancierStyle.Button}
                        icon="plus-circle" look="bare"></Button>
                    <Button
                        type={"button"}
                        disabled={!selectedID}
                        onClick={edit}
                        style={EcheancierStyle.Button}
                        icon="edit-tools" look="bare"></Button>
                </div>

            </Col>
        </Row>
        <Grid
            style={{height: '200px', width: '100%'}}
            resizable
            reorderable
            sortable={true}
            data={[...prepareDataGrid(list.notations)]}
            // onRowDoubleClick={showMoadlSwapEcheance}
            selectedField={"selected"}
            onRowClick={(e) => handleOnRowClick(e)}
        >
            <Column field="libelle" title="Notation"/>
            <Column field="poids" title="Pondération% (Consommation de limite)"/>
        </Grid>
        <PopUpNotationFinanciereEcheance
            selectedID={selectedID}
            showPopUp={showPopUp} setShowPopUp={setShowPopUp}></PopUpNotationFinanciereEcheance>
    </>
}