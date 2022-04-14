import React from "react";
import {Col, Row, Spin} from "antd";
import {Button} from "@progress/kendo-react-buttons";
import Search from "antd/es/input/Search";
import {useSelector} from "react-redux";
import {loadingRemoveSelector} from "../../../redux/MarketData/joursFeriers/Selectors";


export function JoursFeriersGridHeader({ajouter,supprimer,quickSearch,quickSearch_changeHandler,actualiser,selectedRow}) {

    const loadingRemove = useSelector(loadingRemoveSelector)

    return <Row style={{width: '100%'}}>
        <Col span={18}>
            <div>
                <Button onClick={ajouter} icon="add"
                        className="btn-header-style"
                        primary={true}
                        look="bare">Ajouter un jour férié</Button>


                <Button
                    disabled={!(selectedRow && selectedRow.id)}
                    onClick={supprimer}
                    icon="trash"
                    className="btn-remove-style"
                    primary={true} look="bare">
                    <Spin spinning={loadingRemove}>Supprimer un jour férié</Spin>
                </Button>
                <Button onClick={actualiser} icon="refresh"
                        className="btn-header-style"
                        primary={true}
                        look="bare">Actualiser</Button>
            </div>
        </Col>

    </Row>
}