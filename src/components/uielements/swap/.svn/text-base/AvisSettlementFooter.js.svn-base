import React from "react";
import {Button} from "antd";
import {CloseOutlined, FileSyncOutlined, SaveOutlined} from "@ant-design/icons";


export function AvisSettlementFooter({annulerAvisSettelement,loadingAvisSettlement,generateAvisSttlment}){


    return [
        <Button

            loading={loadingAvisSettlement}
            onClick={generateAvisSttlment}
            icon={<FileSyncOutlined />}
            key={2}
            type="primary" htmlType="submit" ghost
        >
            Générer Avis de Settlement
        </Button>,
        <Button
            icon={<CloseOutlined/>}
            onClick={annulerAvisSettelement}
            key={4}
            type="primary"
            ghost
        >
            Annuler
        </Button>
    ]
}