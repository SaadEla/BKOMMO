import React from "react";
import {Col, Row, Spin} from "antd";
import {Button} from "@progress/kendo-react-buttons";
import Search from "antd/es/input/Search";
import {useSelector} from "react-redux";
import {loadingRemoveSelector} from "../../../redux/GestionDeLimite/limitSetup/Selectors";


export function LimitSetupGridHeader({ajouter, supprimer, quickSearch, quickSearch_changeHandler, actualiser, selectedRow}) {

    const loadingRemove = useSelector(loadingRemoveSelector)

    return <Row style={{width: '100%'}}>
        <Col span={18}>
            <div>
                <Button onClick={ajouter} icon="wrench" style={{borderRadius: '10px', color: 'rgba(19,105,180,0.9)'}}
                        primary={true}
                        look="bare">Paramétrer limite</Button>
                <Button onClick={actualiser} icon="refresh" style={{borderRadius: '10px', color: 'rgba(19,105,180,0.9)'}}
                        primary={true}
                        look="bare">Actualiser</Button>
            </div>
        </Col>
        {
            /*
             <Col span={6}>
            <div style={{float: 'right'}}>
                <Search
                    style={{width: '100%'}} placeholder="Quick search text"
                    onSearch={value => quickSearch_changeHandler(value)}
                    onChange={value => quickSearch_changeHandler(value.target.value)}
                    //onKeyPress={value => quickSearch_changeHandler(value)}
                    //onKeyUp={value => quickSearch_changeHandler(value)}
                    //onKeyDown={value => quickSearch_changeHandler(value)}
                />
            </div>
        </Col>
             */
        }


    </Row>
}