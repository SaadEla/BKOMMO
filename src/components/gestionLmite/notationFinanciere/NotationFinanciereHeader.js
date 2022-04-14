import React from "react";
import {BreadCrumb} from "../../breadCrumb/BreadCrumb";
import {Divider} from "antd";
import PageHeader from "../../utility/pageHeader";

export function NotationFinanciereHeader() {
    return <>
        <PageHeader>
            <BreadCrumb element1={"NOTATION FINANCIERE"} elementRoot={"GÉSTION DE LIMITE"}></BreadCrumb>

            </PageHeader>
    </>
}