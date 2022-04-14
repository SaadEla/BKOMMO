import React from "react";
import {Col, Row, Spin} from "antd";
import {Button} from "@progress/kendo-react-buttons";
import Search from "antd/es/input/Search";
import {useSelector} from "react-redux";
import {loadingRemoveSelector} from "../../../redux/MarketData/contrat/Selectors";
import UserService from "../../../keycloak/UserService";


export function ContratGridHeader({ajouter,supprimer,quickSearch,quickSearch_changeHandler,actualiser,selectedRow}) {

    const loadingRemove = useSelector(loadingRemoveSelector)

    return <Row style={{width: '100%'}}>
        <Col span={18}>
            <div>
                {
                    UserService.hasRole("CONTRAT_CREATE") &&
                    <Button onClick={ajouter} icon="add"
                            className="btn-header-style"
                            primary={true}
                            look="bare">Nouveau contrat</Button>
                }
                {
                    UserService.hasRole("CONTRAT_CREATE") &&

                    <Button
                        disabled={!(selectedRow && selectedRow.contratId)}
                        onClick={supprimer}
                        icon="trash" className="btn-remove-style" primary={true} look="bare">
                        <Spin spinning={loadingRemove}>Supprimer contrat</Spin>
                    </Button>
                }

                <Button onClick={actualiser} icon="refresh"
                        className="btn-header-style"
                        primary={true}
                        look="bare">Actualiser</Button>
            </div>
        </Col>
        <Col span={6}>
            <div style={{float: 'right'}}>
                <Search


                    style={{width: '100%'}} placeholder="Quick search text"
                    onSearch={value => quickSearch_changeHandler(value)}
                    onChange={evt => quickSearch_changeHandler(evt.target.value)}
                    /*  onChange={value => quickSearch_changeHandler(value)}
                      onKeyPress={value => quickSearch_changeHandler(value)}
                      onKeyUp={value => quickSearch_changeHandler(value)}
                      onKeyDown={value => quickSearch_changeHandler(value)}*//>
            </div>
        </Col>
    </Row>
}