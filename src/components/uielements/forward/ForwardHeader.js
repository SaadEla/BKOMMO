import {Col, Modal, Row, Spin} from "antd";
import {Button} from "@progress/kendo-react-buttons";
import ModalGrid from "./gridPopUpForward";
import {AvisSettlementForward} from "./AvisSettlementForward";
import React from "react";
import Search from "antd/es/input/Search";
import CustomDialog from "../../feedback/modal";
import UserService from "../../../keycloak/UserService";

export function ForwardHeader({confirmationValidation_clickHandler,removeForward, showAdvancedSearch, auditHistoriqueLoading, quickSearch_changeHandler, referencesList, exportCsv, setAvisVisible, actualiser, avisVisible, addNewDealForward, selectedRow, handleAuditTrail, modalVisible, setModalVisible, advancedSearch}) {

    return (
        <Row style={{width: '100%'}}>
            <Col span={18}>
                <div>
                    {
                        UserService.hasRole("FORWARD_DEAL_CREATE") &&
                        <Button
                            onClick={addNewDealForward}
                            icon="add"
                            className="btn-header-style"
                            primary={true} look="bare">
                            Nouveau deal
                        </Button>
                    }
                    {
                        UserService.hasRole("FORWARD_DEAL_DELETE") &&
                        <Button
                            disabled={!(selectedRow && selectedRow.dealId)}
                            onClick={removeForward}
                            icon="trash"  className="btn-remove-style"
                            primary={true} look="bare">
                            <Spin spinning={false}> Supprimer deal</Spin>
                        </Button>
                    }

                    {
                        UserService.hasRole("CONFIRMATION_MO") &&
                        <Button
                            disabled={!(selectedRow && selectedRow.dealId)}
                            onClick={confirmationValidation_clickHandler}
                            icon="check"
                            className="btn-header-style"
                            primary={true} look="bare">
                            Confirmation validée MO
                        </Button>
                    }
                    {
                        UserService.hasRole("CONFIRMATION_BO") &&
                        <Button
                            disabled={!(selectedRow && selectedRow.dealId)}
                            onClick={confirmationValidation_clickHandler}
                            icon="check"
                            className="btn-header-style"
                            primary={true} look="bare">
                            Confirmation validée BO
                        </Button>
                    }



                    <Button  disabled={!(selectedRow && selectedRow.dealId) || auditHistoriqueLoading} icon="sort-desc"
                             className="btn-header-style" primary={true}
                            look="bare" onClick={handleAuditTrail}><Spin spinning={auditHistoriqueLoading == true}>Audit
                        trail</Spin></Button>

                    <CustomDialog
                        className={"deal-forward-audit-trail"}
                        title="DEAL FORWARD - AUDIT TRAIL"
                        style={{}}
                        visible={modalVisible}
                        onOk={() => setModalVisible(false)}
                        onCancel={() => setModalVisible(false)}
                        centered
                        footer={null}
                        width='1200px'
                    >
                        <ModalGrid></ModalGrid>
                    </CustomDialog>

                    <Button onClick={actualiser} icon="refresh"
                            className="btn-header-style"
                            primary={true}
                            look="bare">Actualiser</Button>

                    <Button onClick={exportCsv} icon="csv"
                            className="btn-header-style"
                            primary={true}
                            look="bare">Exporter(.CSV)</Button>
                </div>
            </Col>
            <Col span={6}>
                <div style={{float: 'right'}}>
                    <Search
                        className={"input-search-style"}
                        placeholder="Quick search text"
                        onSearch={value => quickSearch_changeHandler(value)}
                        onChange={value => quickSearch_changeHandler(value.target.value)}
                        //onKeyPress={value => quickSearch_changeHandler(value)}
                        //onKeyUp={value => quickSearch_changeHandler(value)}
                        //onKeyDown={value => quickSearch_changeHandler(value)}
                    />
                    <Button
                        className={"btn-show-colopse"}
                            primary={true} onClick={advancedSearch}>
                        {
                            showAdvancedSearch ? (<><span style={{font: '14px'}}
                                                          className="k-icon k-i-arrow-chevron-up"></span></>
                            ) : (<><span style={{font: '14px'}}
                                         className="k-icon k-i-arrow-chevron-down"></span></>)
                        }

                    </Button>
                </div>


            </Col>
        </Row>
    )
}