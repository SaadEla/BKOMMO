import React from "react";
import {Col, Form, Input, Row} from "antd";
import {NumberUtil} from "../../../../helpers/Utils";


export function ForwardCheckLimit({checkedLimitDealForward}) {

    console.log("checkedLimitDealForward",checkedLimitDealForward)
    return <div>
        <Row gutter={24}>

            <Col span={12} className={'bkm-label'}>Limit (MAD)</Col>
            <Col span={12}>{(checkedLimitDealForward.limit!=null)?NumberUtil.Format(checkedLimitDealForward.limit):'Non définie'}</Col>
        </Row>
        <Row gutter={24}>
            <Col span={12} className={'bkm-label'}>Used MP (MAD)</Col>
            <Col span={12}>{NumberUtil.Format(checkedLimitDealForward.expositionMP)}</Col>
        </Row>
        <Row gutter={24}>
            <Col span={12} className={'bkm-label'}>Used Hors MP (MAD)</Col>
            <Col span={12}>{NumberUtil.Format(checkedLimitDealForward.externalUsed)}</Col>
        </Row>
        <Row gutter={24}>
            <Col span={12} className={'bkm-label'}>Used (MAD)</Col>
            <Col span={12}>{NumberUtil.Format(checkedLimitDealForward.expositionTotal)}</Col>
        </Row>
        <Row gutter={24}>
            <Col span={12} className={'bkm-label'}>Used (%)</Col>
            <Col span={12}>{checkedLimitDealForward.used?NumberUtil.Format(checkedLimitDealForward.used) : "-"}</Col>
        </Row>
        <Row gutter={24}>
            <Col span={12} className={'bkm-label'}>Depassement (%)</Col>
            <Col span={12}>{checkedLimitDealForward.depassement?NumberUtil.Format(checkedLimitDealForward.depassement) : "Pas de dépassement"}</Col>
        </Row>
    </div>
}