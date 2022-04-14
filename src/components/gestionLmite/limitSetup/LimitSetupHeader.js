import React from "react";
import {BreadCrumb} from "../../breadCrumb/BreadCrumb";
import {Divider} from "antd";
import PageHeader from "../../utility/pageHeader";

export function LimitSetupHeader() {
    return <>
        <PageHeader>
            <BreadCrumb element1={"LIMIT SETUP"} elementRoot={"GÉSTION DE LIMITE"}></BreadCrumb>

            </PageHeader>
    </>
}