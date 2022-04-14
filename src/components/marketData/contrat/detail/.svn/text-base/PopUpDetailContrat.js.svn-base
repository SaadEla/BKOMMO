import React from "react";
import CustomDialog from "../../../feedback/modal";
import {FooterPopUpDetailContrat} from "./FooterPopUpDetalContrat";
import {DetailContrat} from "./DetailContrat";
import './DetailContrat.scss'
export function PopUpDetailContrat({onChange,referencesList,onFinish,selectedRow,form,loadUpdateContrat, updateFlag, updateOrSaveContrat,setShowPopUpDetail, showPopUpDetail}){

    function annuler() {
        setShowPopUpDetail(false)
    }

    return <CustomDialog
        className={"detail-contrat"}
        title={"CONTRAT FUTURE"}
        visible={showPopUpDetail}
        onOk={() => setShowPopUpDetail(false)}
        onCancel={() => setShowPopUpDetail(false)}
        centered
        footer={FooterPopUpDetailContrat({annuler, updateOrSaveContrat,updateFlag,loadUpdateContrat})}
        width='40%'

    >
        <DetailContrat
             onChange={onChange}
            referencesList={referencesList}
            onFinish={onFinish}
            selectedRow={selectedRow}
        form={form}
        ></DetailContrat>
    </CustomDialog>
}