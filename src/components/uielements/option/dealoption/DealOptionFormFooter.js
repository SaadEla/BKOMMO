import React from "react";
import {Button} from "antd";
import {CheckOutlined, CheckSquareOutlined, SaveOutlined, CloseOutlined, SnippetsOutlined} from '@ant-design/icons'
import UserService from "../../../../keycloak/UserService";

export default function DealOptionFormFooter(validationFlag,updateFlag,canActivateTicketConfirmation,openticketConfirmation, loadCheckLimitDealOption, loadValidateDealOption, loadUpdateDealOption, updateOrSaveDealOption, checkLimiteDealOption, validerDealOption, annulerDealOption) {


    let footer = [
        <Button
            disabled={!updateFlag}
            loading={loadCheckLimitDealOption}
            onClick={checkLimiteDealOption}
            icon={<CheckOutlined style={{color: 'green'}}/>}
            key={1}
            type="primary" htmlType="submit" ghost>
            Check limit
        </Button>,
        <Button
            disabled={!(updateFlag || UserService.hasRole('OPTION_EXERCICE'))}
            loading={loadUpdateDealOption}
            onClick={updateOrSaveDealOption}
            icon={<SaveOutlined/>}
            key={2}
            type="primary" htmlType="submit" ghost>
            Enregistrer
        </Button>,
        <Button
            disabled={!validationFlag}
            loading={loadValidateDealOption}
            icon={<CheckSquareOutlined/>}
            key={3}
            type="primary"
            onClick={validerDealOption}
            ghost>
            Valider
        </Button>,
        <Button
            disabled={!canActivateTicketConfirmation()}
           // disabled={}
            //loading={loadValidateDealOption}
            icon={<SnippetsOutlined />}
            key={30}
            type="primary"
            onClick={openticketConfirmation}
            ghost>
            Ticket confirmation
        </Button>,
        <Button icon={<CloseOutlined/>}
                onClick={annulerDealOption}
                key={4}
                type="primary"
                ghost>
            Annuler
        </Button>
    ]
    if(!UserService.hasRole("OPTION_CONFIRMATION"))
        footer.splice(3, 1);

    return footer;


}