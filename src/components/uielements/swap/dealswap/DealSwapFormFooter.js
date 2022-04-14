import React from "react";
import {Button} from "antd";
import {CheckOutlined, CheckSquareOutlined, SaveOutlined, CloseOutlined, SnippetsOutlined} from '@ant-design/icons'
import UserService from "../../../../keycloak/UserService";

export default function DealSwapFormFooter(validationFlag,updateFlag,canActivateTicketConfirmation,openticketConfirmation,loadCheckLimitDealSwap, loadValidateDealSwap, loadUpdateDealSwap, updateOrSaveDealSwap, checkLimiteDealSwap, validerDealSwap, annulerDealSwap) {

    const footer = [
        <Button
            disabled={!updateFlag}
            loading={loadCheckLimitDealSwap}
            onClick={checkLimiteDealSwap}
            icon={<CheckOutlined style={{color: 'green'}}/>}
            key={1}
            type="primary" htmlType="submit" ghost>
            Check limit
        </Button>,
        <Button
            disabled={!(updateFlag ||  UserService.hasRole('SWAP_ECHEANCIER_SOULTE'))}
            loading={loadUpdateDealSwap}
            onClick={updateOrSaveDealSwap}
            icon={<SaveOutlined/>}
            key={2}
            type="primary" htmlType="submit" ghost>
            Enregistrer
        </Button>,
        <Button
            disabled={!validationFlag}
            loading={loadValidateDealSwap}
            icon={<CheckSquareOutlined/>}
            key={3}
            type="primary"
            onClick={validerDealSwap}
            ghost>
            Valider
        </Button>,
        <Button
            disabled={!canActivateTicketConfirmation() }
            loading={loadValidateDealSwap}
            icon={<SnippetsOutlined />}
            key={30}
            type="primary"
            onClick={openticketConfirmation}
            ghost>
            Ticket confirmation
        </Button>,
        <Button icon={<CloseOutlined/>}
                onClick={annulerDealSwap}
                key={4}
                type="primary"
                ghost>
            Annuler
        </Button>
    ]
    if(!UserService.hasRole("SWAP_CONFIRMATION"))
        footer.splice(3, 1);

    return footer;

}