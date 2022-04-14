import React, {useEffect, useState} from "react";
import {Checkbox, Col, Divider, Form, Input, Radio, Row, Select} from "antd";
import GridDetail from "./GridDetail";
import RadioBox from "../../../uielements/radio";

export default function DetailNotationFinanciere({notationFinanciereRef,notationFinanciereRefloading,detail, referencesList, selectedRow, onFinish, onChange, form}) {

    useEffect(function () {
        console.log("detaildetail", detail)
        if (detail && detail.id) {
            form.setFieldsValue({
                tiersId: detail.tiers.tiersId,
                ...detail,
            })
        } else
            form.resetFields()
    }, [detail])

    function optionsContrePartie() {
        if (referencesList && referencesList.counterparties)
            return referencesList.counterparties
                .map(d => <Select.Option value={d.tiersId}
                                         key={d.tiersId}>{tiersLabelFunction(d)}</Select.Option>);
    }

    function tiersLabelFunction(item) {
        if (item == null) return "";
        if (item.tiersId == null) return item.shortName
        else return item.shortName + " - " + item.name;
    }

    return <>
        <GridDetail list={notationFinanciereRef}></GridDetail>
    </>

}