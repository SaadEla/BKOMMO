import React from "react";
import CustomDialog from "../../../feedback/modal";
import {FooterPopUpDetailLimitSetup} from "./FooterPopUpDetalLimitSetup";
import DetailLimitSetup from "./DetailLimitSetup";
import './DetailLimitSetup.scss'
import {useDispatch} from "react-redux";
import {editOrSaveDetailLimitSetupAPI} from "../../../../redux/GestionDeLimite/limitSetup/RestCall";
export function PopUpDetailLimitSetup({detail,onChange,referencesList,selectedRow,form,loadUpdateLimitSetup, updateFlag, updateOrSaveLimitSetup,setShowPopUpDetail, showPopUpDetail}){

    const dispatch = useDispatch();
    function annuler() {
        setShowPopUpDetail(false)
    }

    function onFinish() {
        let param= {};
        console.log(detail)
        param.id = detail.id;
        param.tiersId = detail.tiers.tiersId;
        param.type = detail.type;
        //contrepartieCombo.selectedItem.tiersId;
        let detailIds = new Array();
        let detailDebuts = new Array();
        let detailFins = new Array();
        let detailMontants = new Array();
        for(let d of detail.limitDetails){
            if(d.hasOwnProperty('id'))
                detailIds.push(d.id);
            else
                detailIds.push(0);
            detailDebuts.push(d.debut);
            detailFins.push(d.fin)
            detailMontants.push(d.montant && parseFloat(String(d.montant).replace(/ /g, "")) );
      
            console.log(d.montant )
        }
        param.detailIds = detailIds;
        param.detailDebuts = detailDebuts;
        param.detailFins = detailFins;
        param.detailMontants =detailMontants 
        //save_service.send(param);
        console.log(param)
        dispatch(editOrSaveDetailLimitSetupAPI(param))

    }
    function updateOrSaveLimitSetup(event)
    {
        form.submit();
    }

    return <CustomDialog
        className={"detail-limitSetup"}
        title={"LIMIT SETUP FUTURE"}
        visible={showPopUpDetail}
        onOk={() => setShowPopUpDetail(false)}
        onCancel={() => setShowPopUpDetail(false)}
        centered
        footer={FooterPopUpDetailLimitSetup({annuler, updateOrSaveLimitSetup,updateFlag,loadUpdateLimitSetup})}
        width='50%'

    >
        <DetailLimitSetup
            detail={detail}
             onChange={onChange}
            referencesList={referencesList}
            onFinish={onFinish}
            selectedRow={selectedRow}
        form={form}
        ></DetailLimitSetup>
    </CustomDialog>
}