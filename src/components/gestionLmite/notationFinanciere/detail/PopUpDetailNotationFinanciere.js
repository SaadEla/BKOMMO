import React from "react";
import CustomDialog from "../../../feedback/modal";
import {FooterPopUpDetailNotationFinanciere} from "./FooterPopUpDetalNotationFinanciere";
import DetailNotationFinanciere from "./DetailNotationFinanciere";
import './DetailNotationFinanciere.scss'
import {Button} from "antd";
import {CloseOutlined} from "@ant-design/icons";
export function PopUpDetailNotationFinanciere({ notationFinanciereRefloading,
                                                  notationFinanciereRef,detail,onChange,referencesList,onFinish,selectedRow,form,loadUpdateNotationFinanciere, updateFlag, updateOrSaveNotationFinanciere,setShowPopUpDetail, showPopUpDetail}){

    function annuler() {
        setShowPopUpDetail(false)
    }

    return <CustomDialog
        className={"detail-notationFinanciere"}
        title={"NOTATION FINANCIÈRE - PARAMÉTRAGE"}
        visible={showPopUpDetail}
        onOk={() => setShowPopUpDetail(false)}
        onCancel={() => setShowPopUpDetail(false)}
        centered
        footer={
            [
                <Button
                    //   disabled={!updateFlag}
                    onClick={annuler}
                    icon={<CloseOutlined/>}
                    key={2}
                    type="primary" htmlType="submit" ghost>
                    Fermer
                </Button>,
            ]
        }
        width='50%'

    >
        <DetailNotationFinanciere
            notationFinanciereRefloading={notationFinanciereRefloading}
        notationFinanciereRef={notationFinanciereRef}
            detail={detail}
             onChange={onChange}
            referencesList={referencesList}
            onFinish={onFinish}
            selectedRow={selectedRow}
        form={form}
        ></DetailNotationFinanciere>
    </CustomDialog>
}