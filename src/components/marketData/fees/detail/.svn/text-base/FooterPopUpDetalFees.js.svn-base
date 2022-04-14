

import React from "react";
import {Button} from "antd";
import {CloseOutlined, SaveOutlined} from "@ant-design/icons";

export function FooterPopUpDetailFees({annuler, updateOrSaveFees,updateFlag,loadUpdateFees}) {

    return [
        <Button
            disabled={!updateFlag}
            loading={loadUpdateFees}
            onClick={updateOrSaveFees}
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
}