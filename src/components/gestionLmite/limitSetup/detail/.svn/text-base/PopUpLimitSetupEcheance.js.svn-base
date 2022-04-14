import React from "react";
import CustomDialog from "../../../feedback/modal";
import {FooterPopUpDetailLimitSetup} from "./FooterPopUpDetalLimitSetup";
import DetailLimitSetup from "./DetailLimitSetup";
import './DetailLimitSetup.scss'
import {LimitSetupEcheance} from "./LimitSetupEcheance";
import {Button, Form} from "antd";
import {CloseOutlined, SaveOutlined} from "@ant-design/icons";
export function PopUpLimitSetupEcheance({onChange,referencesList,onFinish,selectedRow,form,loadUpdateLimitSetup, updateFlag, updateOrSaveLimitSetup,setShowPopUp, showPopUp}){
    const [formEcheance] = Form.useForm();
    function annuler() {
        setShowPopUp(false)
    }

    return <CustomDialog
        className={"detail-limitSetup-popup-echeance"}
        title={"Limit Setup - Echéance"}
        visible={showPopUp}
        onOk={() => setShowPopUp(false)}
        onCancel={() => setShowPopUp(false)}
        centered
        footer={[
            <Button
                loading={loadUpdateLimitSetup}
                onClick={()=>formEcheance.submit()}
                icon={<SaveOutlined/>}
                key={1}
                type="primary" htmlType="submit" ghost>
                Ajouter
            </Button>,
            <Button
                onClick={annuler}
                icon={<CloseOutlined/>}
                key={2}
                type="primary" htmlType="submit" ghost>
                Annuler
            </Button>,
        ]}

    >
        <LimitSetupEcheance
        form={formEcheance}
        ></LimitSetupEcheance>
    </CustomDialog>
}