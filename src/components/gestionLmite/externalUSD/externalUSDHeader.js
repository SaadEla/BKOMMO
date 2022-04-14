import React from "react";
import {BreadCrumb} from "../../breadCrumb/BreadCrumb";
import {Divider} from "antd";
import PageHeader from "../../utility/pageHeader";

export function ExternalUSDHeader() {
    return <>
        <PageHeader>
            <BreadCrumb element1={"EXTERNAL USD"} elementRoot={"GÉSTION  DE LIMITE"}></BreadCrumb>
        </PageHeader>
    </>
}