import React, {useState} from "react";

import {Tabs, Select, Space, Modal, Form, Button} from 'antd';
import {EcheancierHeader} from "./EcheancierHeader";
import {EcheancierDataGrid} from "./EcheancierDataGrid";
import {DealSwapForm} from "./DealSwapForm";
import {
    addDealSwap,
    removeSelectDealSwap,
    genereDealSwapEcheancier,
    updateDealSwapEcheancier
} from "../../../../redux/dealCapture/swap/DealSwapSlice";
import {SwapEcheance} from "./SwapEcheance";
import {useDispatch, useSelector} from "react-redux";
import {
    dealSwapSelectedEcheanceSelector,
    dealSwapUpdateFlagSelector
} from "../../../../redux/dealCapture/selectors/selectors";
import {getContrePartie, getSousjacent, getStatut} from "../SwapUtil";
import {Divider} from 'antd';
import DealSwapFormFooter from './DealSwapFormFooter'
import CustomDialog from "../../../feedback/modal";
import {SwapCheckLimit} from "./SwapCheckLimit";

const {TabPane} = Tabs;
const {Option} = Select;

export function DealSwap({form,checkedLimitDealSwap,swapCheckLimitModalVisible,setSwapCheckLimitModalVisible, references, dealSwapData}) {

    const dispatch = useDispatch();
    const [tabPosition, setTabPosition] = useState('left');
    const [swapEcheanceVisible, setSwapEcheanceVisible] = useState(false);
    const selectedEcheance = useSelector(dealSwapSelectedEcheanceSelector);
    const updateDealSwapFlag = useSelector(dealSwapUpdateFlagSelector);
    const [echeanceFrom, setEcheanceFrom] = useState();
    const [flagUpdate, setFlagUpdate] = useState()
    const [flagUpdatePrixVariable, setFlagUpdatePrixVariable] = useState()

    function changeTabPosition(tabPosition) {
        setTabPosition(tabPosition);
    };

    function add() {
        setFlagUpdate(false)
        setFlagUpdatePrixVariable(false)
        setSwapEcheanceVisible(true)
    }

    function remove() {
        dispatch(removeSelectDealSwap())
    }

    function update() {
        setFlagUpdate(true)
        setFlagUpdatePrixVariable(false)
        setSwapEcheanceVisible(true)
    }
    function updatePrixVariable() {
        setFlagUpdate(true)
        setFlagUpdatePrixVariable(true)
        setSwapEcheanceVisible(true)
    }

    function generateEcheancier() {
        dispatch(genereDealSwapEcheancier(echeanceFrom))
    }

    function onChangeEcheance(values) {
        dispatch(updateDealSwapEcheancier(prepareEcheance(values)))
        console.log(values)
        setEcheanceFrom(prepareEcheance(values));
    }

    function prepareEcheance(values) {
        return {
            ...values,
            quantite: parseFloat(values.quantite && String(values.quantite).replace(/ /g, "")),
            prixFixe: parseFloat(values.prixFixe && String(values.prixFixe).replace(/ /g, "")),
            contrepartie: {...getContrePartie(references, values.tiersId)},
            statut: {libelle: values.statutId},
            sousJacent: {...getSousjacent(references, values.sousJacentId)},
        };
    }

    return <div>
        <Tabs tabPosition={tabPosition}>
            <TabPane tab="Deal" key="1">
                <DealSwapForm form={form} onChange={onChangeEcheance} references={references}></DealSwapForm>
                <CustomDialog
                    className={"check-limit-swap"}
                    title="Check limit"
                    visible={swapCheckLimitModalVisible}
                    onOk={() => setSwapCheckLimitModalVisible(false)}
                    onCancel={() => setSwapCheckLimitModalVisible(false)}
                    centered
                    footer={[<Button onClick={() => setSwapCheckLimitModalVisible(false)} >Fermer</Button>]}
                >
                    <SwapCheckLimit checkedLimitDealSwap={checkedLimitDealSwap}></SwapCheckLimit>
                </CustomDialog>
            </TabPane>
            <TabPane tab="Ech??ancier" key="2">
                <EcheancierHeader
                    flagUpdate={flagUpdate}
                    updatePrixVariable={updatePrixVariable}
                    generateEcheancier={generateEcheancier} echeance={selectedEcheance} add={add}
                                  remove={remove}
                                  update={update}></EcheancierHeader>
                <EcheancierDataGrid showMoadlSwapEcheance={update}></EcheancierDataGrid>
                <CustomDialog
                    className={"dealSwapEcheance"}
                    title="Swap Echeance"
                    visible={swapEcheanceVisible}
                    onOk={() => setSwapEcheanceVisible(false)}
                    onCancel={() => setSwapEcheanceVisible(false)}
                    centered
                    footer={null}
                >
                    <SwapEcheance hideModal={() => setSwapEcheanceVisible(false)}
                                  flagUpdatePrixVariable={flagUpdatePrixVariable}
                                  flagUpdate={flagUpdate}
                                  echeance={selectedEcheance}></SwapEcheance>
                </CustomDialog>
            </TabPane>

        </Tabs>
    </div>
}