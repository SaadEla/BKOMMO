import React from "react";
import CustomDialog from "../../../feedback/modal";
import {FooterPopUpDetailNotationFinanciere} from "./FooterPopUpDetalNotationFinanciere";
import DetailNotationFinanciere from "./DetailNotationFinanciere";
import './DetailNotationFinanciere.scss'
import AjouterNotationFinanciere from "./AjouterNotationFinanciere";
import {useForm} from "antd/es/form/util";
import {DateUtil} from "../../../../helpers/Utils";
import {useDispatch} from "react-redux";
import {editOrSaveDetailNotationFinanciereAPI} from "../../../../redux/GestionDeLimite/notationFinanciere/RestCall";
export function PopUpNewNotationFinanciere({notationFinanciereRefloading,notationFinanciereRef,detail,onChange,referencesList,selectedRow,loadUpdateNotationFinanciere, updateFlag,setShowPopUp, showPopUp}){

    const  [form]=useForm()
    const dispatch = useDispatch()

    console.log("mydetail",detail)
    function updateOrSaveNotationFinanciere() {
        form.submit()
    }
    function onFinish(values) {
        let param= {};
        if(detail && detail.id){
            param.id = detail.id;
        }
        param.tiersId =values.tiersId;
        param.notationId =values.notationId;
        param.dateEffet = DateUtil.Format(values.dateEffet);
        dispatch(editOrSaveDetailNotationFinanciereAPI(param))
      //  save_service.send(param);

    }
    function annuler() {
        setShowPopUp(false)
    }

    return <CustomDialog
        className={"detail-notationFinanciere"}
        title={"NOTATION FINANCIÈRE - PARAMÉTRAGE"}
        visible={showPopUp}
        onOk={() => setShowPopUp(false)}
        onCancel={() => setShowPopUp(false)}
        centered
        footer={FooterPopUpDetailNotationFinanciere({annuler, updateOrSaveNotationFinanciere,updateFlag,loadUpdateNotationFinanciere})}


    >
        <AjouterNotationFinanciere
            notationFinanciereRef={notationFinanciereRef}
            detail={detail}
            onChange={onChange}
            referencesList={referencesList}
            onFinish={onFinish}
            selectedRow={selectedRow}
            form={form}
        ></AjouterNotationFinanciere>
    </CustomDialog>
}