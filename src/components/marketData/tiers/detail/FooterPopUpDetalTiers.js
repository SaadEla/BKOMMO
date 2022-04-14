import React from "react";
import {Button} from "antd";
import {CloseOutlined, SaveOutlined} from "@ant-design/icons";
import UserService from "../../../../keycloak/UserService";

export function FooterPopUpDetailTiers({annuler, updateOrSaveTier, updateFlag, loadUpdateTier}) {

    let footer = [
        <Button
            disabled={!updateFlag}
            loading={loadUpdateTier}
            onClick={updateOrSaveTier}
            icon={<SaveOutlined/>}
            key={1}
            type="primary" htmlType="submit" ghost>
            Enregistrer
        </Button>,
        <Button
            disabled={!updateFlag}
            onClick={annuler}
            icon={<CloseOutlined/>}
            key={2}
            type="primary" htmlType="submit" ghost>
            Annuler
        </Button>,
    ]
    if (!UserService.hasRole("TIERS_UPDATE"))
        footer.splice(0, 1)
    return footer

}