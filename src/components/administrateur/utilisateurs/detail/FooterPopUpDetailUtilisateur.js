

import React from "react";
import {Button} from "antd";
import {CloseOutlined, SaveOutlined} from "@ant-design/icons";
import UserService from "../../../../keycloak/UserService";

export function FooterPopUpDetailUtilisateurs({annuler, updateOrSaveUtilisateur,updateFlag,loadUpdateUtilisateur}) {

    return [
        <Button
            disabled={!updateFlag}
            loading={loadUpdateUtilisateur}
            onClick={updateOrSaveUtilisateur}
            icon={<SaveOutlined/>}
            key={1}
            type="primary" htmlType="submit" ghost>
            Enregistrer
        </Button>
        ,
        <Button
            disabled={!updateFlag}
            onClick={annuler}
            icon={<CloseOutlined/>}
            key={2}
            type="primary" htmlType="submit" ghost>
            Annuler
        </Button>,
    ]
}