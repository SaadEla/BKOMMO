import React from "react";
import CustomDialog from "../../../feedback/modal";
import {FooterPopUpDetailSousJacent} from "./FooterPopUpDetalSousJacent";
import {DetailSousJacent} from "./DetailSousJacent";
import './DetailSousJacent.scss'
export function PopUpDetailSousJacent({onChange,referencesList,onFinish,selectedRow,form,loadUpdateSousJacent, updateFlag, updateOrSaveSousJacent,setShowPopUpDetail, showPopUpDetail}){

    function annuler() {
        setShowPopUpDetail(false)
    }

    return <CustomDialog
        className={"detail-sousJacent"}
        title={"SOUS-JACENT"}
        visible={showPopUpDetail}
        onOk={() => setShowPopUpDetail(false)}
        onCancel={() => setShowPopUpDetail(false)}
        centered
        footer={FooterPopUpDetailSousJacent({annuler, updateOrSaveSousJacent,updateFlag,loadUpdateSousJacent})}
        width='40%'

    >
        <DetailSousJacent
             onChange={onChange}
            referencesList={referencesList}
            onFinish={onFinish}
            selectedRow={selectedRow}
        form={form}
        ></DetailSousJacent>
    </CustomDialog>
}