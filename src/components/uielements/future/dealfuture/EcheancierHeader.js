import React from "react";
import {Col, Row} from "antd";
import {
    Button
} from '@progress/kendo-react-buttons'
import {useDispatch} from "react-redux";
import {updateDealFuture,removeSelectDealFuture,addDealFuture}
    from '../../../../redux/dealCapture/future/DealFutureSlice';
const EcheancierStyle = {
    Button: {
        borderRadius: '10px',
        color: 'rgba(19,105,180,0.9)'
    }

}

export function EcheancierHeader({generateEcheancier,add,update,remove,echeance}) {

    return <Row>
        <Col span={12}>
            <Button onClick={generateEcheancier} style={EcheancierStyle.Button} look="bare">
                Générer L'échéancier
            </Button>
        </Col>
        <Col span={12}>
            <div style={{float: 'right'}}>
                <Button disabled={!echeance} onClick={update} style={EcheancierStyle.Button} icon="checkmark-circle" look="bare"></Button>
                <Button onClick={add} style={EcheancierStyle.Button} icon="plus-circle" look="bare"></Button>
                <Button disabled={!echeance} onClick={remove} style={EcheancierStyle.Button} icon="minus-circle" look="bare"></Button>
            </div>

        </Col>
    </Row>
}