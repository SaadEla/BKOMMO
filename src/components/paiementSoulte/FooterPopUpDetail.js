

import React from "react";
import {Button} from "antd";
import {CloseOutlined, SaveOutlined} from "@ant-design/icons";

export function FooterPopUpDetail({annuler, updateOrSave,updateFlag,loadUpdate,setShowPopUpDetail}) {

    return [
        <Button
            disabled={!updateFlag}
            loading={loadUpdate}
            onClick={updateOrSave}
            icon={<SaveOutlined/>}
            key={1}
            type="primary" htmlType="submit" ghost>
            Enregistrer
        </Button>,
        <Button
            disabled={!updateFlag}
            onClick={()=>setShowPopUpDetail(false)}
            icon={<CloseOutlined/>}
            key={2}
            type="primary" htmlType="submit" ghost>
            Annuler
        </Button>,
    ]
}