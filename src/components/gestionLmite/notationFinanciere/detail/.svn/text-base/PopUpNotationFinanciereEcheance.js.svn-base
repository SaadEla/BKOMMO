import React from "react";
import CustomDialog from "../../../feedback/modal";
import {FooterPopUpDetailNotationFinanciere} from "./FooterPopUpDetalNotationFinanciere";
import DetailNotationFinanciere from "./DetailNotationFinanciere";
import './DetailNotationFinanciere.scss'
import {NotationFinanciereEcheance} from "./NotationFinanciereEcheance";
import {Button, Form} from "antd";
import {CloseOutlined, SaveOutlined} from "@ant-design/icons";
import {useSelector} from "react-redux";
import {loadingAddParamSelector} from "../../../../redux/GestionDeLimite/notationFinanciere/Selectors";
export function PopUpNotationFinanciereEcheance({selectedID, onChange,referencesList,onFinish,selectedRow,form,loadUpdateNotationFinanciere, updateFlag, updateOrSaveNotationFinanciere,setShowPopUp, showPopUp}){
    const [formEcheance] = Form.useForm();
    const loadingAddParam = useSelector(loadingAddParamSelector);
    function annuler() {
        setShowPopUp(false)
    }
    console.log("selectedID",selectedID)

    return <CustomDialog
        className={"detail-notationFinanciere-popup-echeance"}
        title={"Notation financiere - Echéance"}
        visible={showPopUp}
        onOk={() => setShowPopUp(false)}
        onCancel={() => setShowPopUp(false)}
        centered
        footer={[
            <Button
                loading={loadingAddParam}
                onClick={()=>formEcheance.submit()}
                icon={<SaveOutlined/>}
                key={1}
                type="primary" htmlType="submit" ghost>
                Enregistrer
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
        <NotationFinanciereEcheance
        form={formEcheance}
        ></NotationFinanciereEcheance>
    </CustomDialog>
}