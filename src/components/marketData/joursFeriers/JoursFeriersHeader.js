import React from "react";
import {BreadCrumb} from "../../breadCrumb/BreadCrumb";
import {Divider} from "antd";
import {ContratHeader} from "../contrat/ContratHeader";
import PageHeader from "../../utility/pageHeader";

export function JoursFeriersHeader() {
    return <>
        <PageHeader>
            <BreadCrumb element1={"JOURS FÉRIERS"} elementRoot={"MARKET DATA"}></BreadCrumb>
        </PageHeader>
    </>
}