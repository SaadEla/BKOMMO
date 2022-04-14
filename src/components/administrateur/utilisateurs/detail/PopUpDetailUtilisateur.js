import React from "react";
import CustomDialog from "../../../feedback/modal";
import {FooterPopUpDetailUtilisateurs} from "./FooterPopUpDetailUtilisateur";
import {DetailUtilisateur} from "./DetailUtilisateur";
import './DetailUtilisateur.scss'
export function PopUpDetailUtilisateurs({onFinish,selectedRow,form,loadUpdateUtilisateur, updateFlag, updateOrSaveUtilisateur,setShowPopUpDetail, showPopUpDetail}){

    function annuler() {
        setShowPopUpDetail(false)
    }

    return <CustomDialog
        className={"detail-Utilisateur"}
            title={"Paramètres compte"}
        visible={showPopUpDetail}
        onOk={() => setShowPopUpDetail(false)}
        onCancel={() => setShowPopUpDetail(false)}
        centered
        footer={FooterPopUpDetailUtilisateurs({annuler, updateOrSaveUtilisateur,updateFlag,loadUpdateUtilisateur})}
        width='40%'

    >
        <DetailUtilisateur
            onFinish={onFinish}
            selectedRow={selectedRow}
            form={form}
        ></DetailUtilisateur>
    </CustomDialog>
}