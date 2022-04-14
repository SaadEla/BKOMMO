import { Col, Modal, Row, Spin } from "antd";
import { Button } from "@progress/kendo-react-buttons";
import ModalGrid from "./gridPopUpSwap";
import { AvisSettlementSwap } from "./AvisSettlementSwap";
import React, { useState } from "react";
import Search from "antd/es/input/Search";
import CustomDialog from "../../feedback/modal";
import { AvisSettlementFooter } from "./AvisSettlementFooter";
import API_URL from "../../../config/api/API_URL";
import { openNotificationWithIcon } from "../../feedback/notification";
import { useDispatch, useSelector } from "react-redux";
import { selectEcheanceIds } from "../../../redux/dealCapture/selectors/selectors";
import { selectionEcheanceIds } from "../../../redux/dealCapture/swap/swapSlice";
import UserService from "../../../keycloak/UserService";

export function SwapHeader({
  loadingAvisSettlement,
  removeSwap,
  showAdvancedSearch,
  auditHistoriqueLoading,
  quickSearch_changeHandler,
  referencesList,
  exportCsv,
  setAvisVisible,
  actualiser,
  avisVisible,
  addNewDealSwap,
  selectedRow,
  handleAuditTrail,
  modalVisible,
  setModalVisible,
  advancedSearch,
}) {
  const dispatch = useDispatch();
  let [contrepartieId, setContrepartieId] = useState();

  function generateAvisSttlment() {
    dispatch(selectionEcheanceIds(["GENRATE"]));
  }
  function annulerAvisSettelement() {
    setAvisVisible(false);
  }

  return (
    <Row style={{ width: "100%" }}>
      <Col span={18}>
        <div>
          {UserService.hasRole("SWAP_DEAL_CREATE") && (
            <Button
              onClick={addNewDealSwap}
              icon="add"
              className="btn-header-style"
              primary={true}
              look="bare"
            >
              Nouveau deal
            </Button>
          )}
          {UserService.hasRole("SWAP_DEAL_DELETE") && (
            <Button
              disabled={!(selectedRow && selectedRow.dealId)}
              onClick={removeSwap}
              icon="trash"
              className="btn-remove-style"
              primary={true}
              look="bare"
            >
              <Spin spinning={false}> Supprimer deal</Spin>
            </Button>
          )}

          <Button
            disabled={
              !(selectedRow && selectedRow.dealId) || auditHistoriqueLoading
            }
            icon="sort-desc"
            className="btn-header-style"
            primary={true}
            look="bare"
            onClick={handleAuditTrail}
          >
            <Spin spinning={auditHistoriqueLoading == true}>Audit trail</Spin>
          </Button>

          <CustomDialog
            title="DEAL FORWARD - AUDIT TRAIL"
            style={{}}
            visible={modalVisible}
            onOk={() => setModalVisible(false)}
            onCancel={() => setModalVisible(false)}
            centered
            footer={null}
            width="1200px"
          >
            <ModalGrid></ModalGrid>
          </CustomDialog>

          <Button
            onClick={actualiser}
            icon="refresh"
            className="btn-header-style"
            primary={true}
            look="bare"
          >
            Actualiser
          </Button>

          <Button
            onClick={exportCsv}
            icon="csv"
            className="btn-header-style"
            primary={true}
            look="bare"
          >
            Exporter(.CSV)
          </Button>

          <Button
            icon="paste-plain-text"
            className="btn-header-style"
            primary={true}
            look="bare"
            onClick={() => setAvisVisible(true)}
          >
            Avis de Settlement
          </Button>

          <CustomDialog
            className="avis_settlement_swap"
            title="AVIS DE SETTLEMENT SWAP"
            visible={avisVisible}
            onOk={() => setAvisVisible(false)}
            onCancel={() => setAvisVisible(false)}
            centered
            footer={AvisSettlementFooter({
              annulerAvisSettelement,
              loadingAvisSettlement,
              generateAvisSttlment,
            })}
            width="1100px"
          >
            <AvisSettlementSwap
              references={referencesList}
            ></AvisSettlementSwap>
          </CustomDialog>
        </div>
      </Col>
      <Col span={6}>
        <div style={{ float: "right" }}>
          <Search
            className={"input-search-style"}
            placeholder="Quick search text"
            onSearch={(value) => quickSearch_changeHandler(value)}
            onChange={(value) => quickSearch_changeHandler(value.target.value)}
            // onKeyPress={value => quickSearch_changeHandler(value)}
            // onKeyUp={value => quickSearch_changeHandler(value)}
            //  onKeyDown={value => quickSearch_changeHandler(value)}
          />
          <Button
            className={"btn-show-colopse"}
            primary={true}
            onClick={advancedSearch}
          >
            {showAdvancedSearch ? (
              <>
                <span
                  style={{ font: "14px" }}
                  className="k-icon k-i-arrow-chevron-up"
                ></span>
              </>
            ) : (
              <>
                <span
                  style={{ font: "14px" }}
                  className="k-icon k-i-arrow-chevron-down"
                ></span>
              </>
            )}
          </Button>
        </div>
      </Col>
    </Row>
  );
}
