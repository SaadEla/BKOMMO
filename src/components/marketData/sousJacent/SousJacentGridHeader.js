import React from "react";
import {Col, Row, Spin} from "antd";
import {Button} from "@progress/kendo-react-buttons";
import Search from "antd/es/input/Search";
import {useSelector} from "react-redux";
import {loadingRemoveSelector} from "../../../redux/MarketData/sousJacent/Selectors";
import UserService from "../../../keycloak/UserService";


export function SousJacentGridHeader({ajouter,supprimer,quickSearch,quickSearch_changeHandler,actualiser,selectedRow}) {

    const loadingRemove = useSelector(loadingRemoveSelector)

    return <Row style={{width: '100%'}}>
        <Col span={18}>
            <div>
                {
                    UserService.hasRole("SOUS_JACENT_CREATE") &&
                    <Button onClick={ajouter} icon="add"
                            className="btn-header-style"
                            primary={true}
                            look="bare">Nouveau sous-jacent</Button>
                }
                {
                    UserService.hasRole("SOUS_JACENT_CREATE") &&
                    <Button
                        disabled={!(selectedRow && selectedRow.sousJacentId)}
                        onClick={supprimer}
                        icon="trash" style={{borderRadius: '10px',}} primary={true} look="bare">
                        <Spin spinning={loadingRemove}>Supprimer sous-jacent</Spin>
                    </Button>
                }

                <Button onClick={actualiser} icon="refresh"
                        className="btn-header-style"
                        primary={true}
                        look="bare">Actualiser</Button>
            </div>
        </Col>

    </Row>
}