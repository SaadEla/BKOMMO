import React from "react";
import CustomDialog from "../../../feedback/modal";
import {FooterPopUpDetailTiers} from "./FooterPopUpDetalTiers";
import {DetailTiers} from "./DetailTiers";
import './DetailTiers.scss'
export function PopUpDetailTiers({onFinish,selectedRow,form,loadUpdateTier, updateFlag, updateOrSaveTier,setShowPopUpDetail, showPopUpDetail}){

    function annuler() {
        setShowPopUpDetail(false)
    }

    return <CustomDialog
        className={"detail-tiers"}
            title={"TIERS"}
        visible={showPopUpDetail}
        onOk={() => setShowPopUpDetail(false)}
        onCancel={() => setShowPopUpDetail(false)}
        centered
        footer={FooterPopUpDetailTiers({annuler, updateOrSaveTier,updateFlag,loadUpdateTier})}
        width='40%'

    >
        <DetailTiers
            onFinish={onFinish}
            selectedRow={selectedRow}
        form={form}
        ></DetailTiers>
    </CustomDialog>
}