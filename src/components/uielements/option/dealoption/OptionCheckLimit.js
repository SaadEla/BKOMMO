import React from "react";
import {Col, Row} from "antd";
import {NumberUtil} from "../../../../helpers/Utils";


export function OptionCheckLimit({checkedLimitDealOption}) {

    console.log("checkedLimitDealOption",checkedLimitDealOption)
    return <div>
        <Row gutter={24}>
            <Col span={12} className={'bkm-label'}>Limit(MAD)</Col>
            <Col span={12}>{(checkedLimitDealOption.limit!=null)?NumberUtil.Format(checkedLimitDealOption.limit):'Non définie'}</Col>
        </Row>
        <Row gutter={24}>
            <Col span={12} className={'bkm-label'}>Used MP(MAD)</Col>
            <Col span={12}>{NumberUtil.Format(checkedLimitDealOption.expositionMP)}</Col>
        </Row>
        <Row gutter={24} >
            <Col span={12} className={'bkm-label'}>Used Hors MP(MAD)</Col>
            <Col span={12}>{NumberUtil.Format(checkedLimitDealOption.externalUsed)}</Col>
        </Row>
        <Row gutter={24} >
            <Col span={12} className={'bkm-label'}>Used(MAD)</Col>
            <Col span={12}>{NumberUtil.Format(checkedLimitDealOption.expositionTotal)}</Col>
        </Row>
        <Row gutter={24} >
            <Col span={12} className={'bkm-label'}>Used(%)</Col>
            <Col span={12}>{checkedLimitDealOption.used?NumberUtil.Format(checkedLimitDealOption.used) : "-"}</Col>
        </Row>
        <Row gutter={24} >
            <Col span={12} className={'bkm-label'}>Depassement(%)</Col>
            <Col span={12}>{checkedLimitDealOption.depassement?NumberUtil.Format(checkedLimitDealOption.depassement) : "Pas de dépassement"}</Col>
        </Row>
    </div>
}