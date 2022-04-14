import React from "react";
import {BreadCrumb} from "../../breadCrumb/BreadCrumb";
import {Divider} from "antd";

export function ContratHeader() {
    return <>
        <BreadCrumb element1={"CONTRAT"} elementRoot={"MARKET DATA"}></BreadCrumb>
    </>
}