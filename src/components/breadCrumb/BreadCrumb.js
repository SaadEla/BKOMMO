import React from "react";
import {Breadcrumb, Col, Row} from "antd";
import {HomeOutlined, UserOutlined} from '@ant-design/icons';


export function BreadCrumb({style,element1="Swap",elementRoot="Deal Capture"}) {

    return <Row style={{width: '100%',...style}}>
        <Col span={24}>
            <Breadcrumb style={{float: 'left',}}>
                <Breadcrumb.Item href="">
                    <HomeOutlined/>
                </Breadcrumb.Item>
                <Breadcrumb.Item href="/app/dealcapture/Swap">
                    <UserOutlined/>
                    <span>{elementRoot.toUpperCase()}</span>
                </Breadcrumb.Item>
                <Breadcrumb.Item>{element1.toUpperCase()}</Breadcrumb.Item>
            </Breadcrumb>
        </Col>
    </Row>
}
