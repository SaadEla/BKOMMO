import React from "react";
import {Col, Row} from "antd";
import {NumberUtil} from "../../../../helpers/Utils";


export function FutureCheckLimit({checkedLimitDealFuture}) {

    console.log("checkedLimitDealFuture",checkedLimitDealFuture)
    return <div>
        <Row gutter={24}>
            <Col span={12}>Limit(MAD):</Col>
            <Col span={12}>{(checkedLimitDealFuture.limit!=null)?NumberUtil.Format(checkedLimitDealFuture.limit):'Non définie'}</Col>
        </Row>
        <Row gutter={24}>
            <Col span={12}>Used MP(MAD):</Col>
            <Col span={12}>{NumberUtil.Format(checkedLimitDealFuture.expositionMP)}</Col>
        </Row>
        <Row gutter={24}>
            <Col span={12}>Used Hors MP(MAD):</Col>
            <Col span={12}>{NumberUtil.Format(checkedLimitDealFuture.externalUsed)}</Col>
        </Row>
        <Row gutter={24}>
            <Col span={12}>Used(MAD):</Col>
            <Col span={12}>{NumberUtil.Format(checkedLimitDealFuture.expositionTotal)}</Col>
        </Row>
        <Row gutter={24}>
            <Col span={12}>Used(%):</Col>
            <Col span={12}>{checkedLimitDealFuture.used?NumberUtil.Format(checkedLimitDealFuture.used) : "-"}</Col>
        </Row>
        <Row gutter={24}>
            <Col span={12}>Depassement(%):</Col>
            <Col span={12}>{checkedLimitDealFuture.depassement?NumberUtil.Format(checkedLimitDealFuture.depassement) : "Pas de dépassement"}</Col>
        </Row>
    </div>
}