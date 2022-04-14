import React from "react";
import CustomDialog from "../../../feedback/modal";
import {FooterPopUpDetailFees} from "./FooterPopUpDetalFees";
import {DetailFees} from "./DetailFees";
import './DetailFees.scss'
export function PopUpDetailFees({onChange,referencesList,onFinish,selectedRow,form,loadUpdateFees, updateFlag, updateOrSaveFees,setShowPopUpDetail, showPopUpDetail}){

    function annuler() {
        setShowPopUpDetail(false)
    }

    return <CustomDialog
        className={"detail-fees"}
        title={"FEES FUTURE"}
        visible={showPopUpDetail}
        onOk={() => setShowPopUpDetail(false)}
        onCancel={() => setShowPopUpDetail(false)}
        centered
        footer={FooterPopUpDetailFees({annuler, updateOrSaveFees,updateFlag,loadUpdateFees})}
        width='40%'

    >
        <DetailFees
             onChange={onChange}
            referencesList={referencesList}
            onFinish={onFinish}
            selectedRow={selectedRow}
        form={form}
        ></DetailFees>
    </CustomDialog>
}