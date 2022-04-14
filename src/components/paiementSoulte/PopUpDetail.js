import React from "react";
import CustomDialog from "../feedback/modal";
import {FooterPopUpDetail} from "./FooterPopUpDetail";
import {DetailPaiement} from "./DetailPaiement";
import './AddPaiement.scss'
export function PopUpDetail({onFinish,selectedRow,form,loadUpdate, updateFlag, updateOrSave,removeOption,setShowPopUpDetail, showPopUpDetail}){

    function annuler() {
        setShowPopUpDetail(false)
    }
    

    return <CustomDialog
        className={"add-paiement"}
            title={"Paiement soulte"}
        visible={showPopUpDetail}
        onOk={() => setShowPopUpDetail(false)}
        onCancel={() => setShowPopUpDetail(false)}
        centered
        footer={FooterPopUpDetail({annuler, updateOrSave,updateFlag,loadUpdate,setShowPopUpDetail})}
        width='40%'

    >
        <DetailPaiement
            onFinish={onFinish}
            selectedRow={selectedRow}
            form={form}
        ></DetailPaiement>
    </CustomDialog>
}