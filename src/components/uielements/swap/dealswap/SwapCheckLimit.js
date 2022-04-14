import React from "react";
import {Col, Row} from "antd";
import {NumberUtil} from "../../../../helpers/Utils";


export function SwapCheckLimit({checkedLimitDealSwap}) {

    console.log("checkedLimitDealSwap",checkedLimitDealSwap)
    return <div>
        <Row gutter={24}>
            <Col span={12} className={'bkm-label'}>Limit(MAD)</Col>
            <Col span={12}>{(checkedLimitDealSwap.limit!=null)?NumberUtil.Format(checkedLimitDealSwap.limit):'Non définie'}</Col>
        </Row>
        <Row gutter={24}>
            <Col span={12} className={'bkm-label'}>Used MP(MAD)</Col>
            <Col span={12}>{NumberUtil.Format(checkedLimitDealSwap.expositionMP)}</Col>
        </Row>
        <Row gutter={24}>
            <Col span={12} className={'bkm-label'}>Used Hors MP(MAD)</Col>
            <Col span={12}>{NumberUtil.Format(checkedLimitDealSwap.externalUsed)}</Col>
        </Row>
        <Row gutter={24}>
            <Col span={12} className={'bkm-label'}>Used(MAD)</Col>
            <Col span={12}>{NumberUtil.Format(checkedLimitDealSwap.expositionTotal)}</Col>
        </Row>
        <Row gutter={24}>
            <Col span={12} className={'bkm-label'}>Used(%)</Col>
            <Col span={12}>{checkedLimitDealSwap.used?NumberUtil.Format(checkedLimitDealSwap.used) : "-"}</Col>
        </Row>
        <Row gutter={24}>
            <Col span={12} className={'bkm-label'}>Depassement(%)</Col>
            <Col span={12}>{checkedLimitDealSwap.depassement?NumberUtil.Format(checkedLimitDealSwap.depassement) : "Pas de dépassement"}</Col>
        </Row>
    </div>
}