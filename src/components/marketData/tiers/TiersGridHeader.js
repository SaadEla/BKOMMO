import React from "react";
import {Col, Row, Spin} from "antd";
import {Button} from "@progress/kendo-react-buttons";
import Search from "antd/es/input/Search";


export function TiersGridHeader({quickSearch,quickSearch_changeHandler,actualiser,selectedRow}) {

    return <Row style={{width: '100%'}}>
        <Col span={18}>
            <div>
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