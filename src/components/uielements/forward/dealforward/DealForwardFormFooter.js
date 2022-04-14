import React from "react";
import {Button, Col, Row, Spin} from "antd";
import {CheckOutlined, CheckSquareOutlined, SaveOutlined, CloseOutlined, SnippetsOutlined} from '@ant-design/icons'
import UserService from "../../../../keycloak/UserService";

export default function DealForwardFormFooter(loadCheckPosition,avisSettlementButton_clickHandler, soultes, validationFlag, updateFlag, canActivateTicketConfirmation, openticketConfirmation, loadCheckLimitDealForward, loadValidateDealForward, loadUpdateDealForward, updateOrSaveDealForward, checkLimiteDealForward, validerDealForward, annulerDealForward) {

    const btns = [

        <Spin
            style={{float: "left"}}
            spinning={loadCheckPosition}></Spin>
        ,
        <Button
            disabled={!updateFlag}
            loading={loadCheckLimitDealForward}
            onClick={checkLimiteDealForward}
            icon={<CheckOutlined style={{color: 'green'}}/>}
            key={1}
            type="primary" htmlType="submit" ghost>
            Check limit
        </Button>,
        <Button
            disabled={!updateFlag}
            loading={loadUpdateDealForward}
            onClick={updateOrSaveDealForward}
            icon={<SaveOutlined/>}
            key={2}
            type="primary" htmlType="submit" ghost>
            Enregistrer
        </Button>,
        <Button
            disabled={!validationFlag}
            loading={loadValidateDealForward}
            icon={<CheckSquareOutlined/>}
            key={3}
            type="primary"
            onClick={validerDealForward}
            ghost>
            Valider
        </Button>

    ]

    if (soultes && soultes.length > 0 && UserService.hasRole("FORWARD_SETTLEMENT"))
        btns.push(<Button
            disabled={!canActivateTicketConfirmation()}
            loading={loadValidateDealForward}
            icon={<SnippetsOutlined/>}
            key={20}
            type="primary"
            onClick={avisSettlementButton_clickHandler}
            ghost>
            Avis de settlement
        </Button>)
    else if(UserService.hasRole("FORWARD_CONFIRMATION")) btns.push(<Button
        disabled={!canActivateTicketConfirmation()}
        loading={loadValidateDealForward}
        icon={<SnippetsOutlined/>}
        key={20}
        type="primary"
        onClick={openticketConfirmation}
        ghost>
        Ticket confirmation
    </Button>)
    btns.push(<Button icon={<CloseOutlined/>}
                      onClick={annulerDealForward}
                      key={4}
                      type="primary"
                      ghost>
        Annuler
    </Button>)

    return btns;

}