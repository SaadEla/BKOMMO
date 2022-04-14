import React from "react";
import {Button} from "antd";
import {CheckOutlined, CheckSquareOutlined, SaveOutlined, CloseOutlined, SnippetsOutlined} from '@ant-design/icons'

export default function DealFutureFormFooter(validationFlag,updateFlag,canActivateTicketConfirmation,openticketConfirmation, loadCheckLimitDealFuture, loadValidateDealFuture, loadUpdateDealFuture, updateOrSaveDealFuture, checkLimiteDealFuture, validerDealFuture, annulerDealFuture) {

    return [
        <Button
            disabled={!updateFlag}
            loading={loadUpdateDealFuture}
            onClick={updateOrSaveDealFuture}
            icon={<SaveOutlined/>}
            key={2}
            type="primary" htmlType="submit" ghost>
            Enregistrer
        </Button>,
        <Button
            disabled={!validationFlag}
            loading={loadValidateDealFuture}
            icon={<CheckSquareOutlined/>}
            key={3}
            type="primary"
            onClick={validerDealFuture}
            ghost>
            Valider
        </Button>,
        <Button className={"bkm-btn-danger"} icon={<CloseOutlined/>}
                onClick={annulerDealFuture}
                key={4}
                type="primary"
                ghost>
            Annuler
        </Button>
    ]


}