import React from "react";
import CustomDialog from "../../../feedback/modal";
import {FooterPopUpDetailJoursFeriers} from "./FooterPopUpDetalJoursFeriers";
import {DetailJoursFeriers} from "./DetailJoursFeriers";
import './DetailJoursFeriers.scss'
export function PopUpDetailJoursFeriers({onChange,referencesList,onFinish,selectedRow,form,loadUpdateJoursFeriers, updateFlag, updateOrSaveJoursFeriers,setShowPopUpDetail, showPopUpDetail}){

    function annuler() {
        setShowPopUpDetail(false)
    }

    return <CustomDialog
        className={"detail-joursFeriers"}
        title={"JOURS FÉRIERS"}
        visible={showPopUpDetail}
        onOk={() => setShowPopUpDetail(false)}
        onCancel={() => setShowPopUpDetail(false)}
        centered
        footer={FooterPopUpDetailJoursFeriers({annuler, updateOrSaveJoursFeriers,updateFlag,loadUpdateJoursFeriers})}
        width='40%'

    >
        <DetailJoursFeriers
             onChange={onChange}
            referencesList={referencesList}
            onFinish={onFinish}
            selectedRow={selectedRow}
        form={form}
        ></DetailJoursFeriers>
    </CustomDialog>
}