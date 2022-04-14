import React, { useEffect, useState } from "react";
import { Button, Col, Form, Input, Row, Select } from "antd";
import { optionsContrePartie } from "../SwapUtil";
import DatePicker from "../../DatePick";

import NumberFormat from "react-number-format";
import { DateUtil } from "../../../../helpers/Utils";
import { useDispatch } from "react-redux";
import {
  addDealSwap,
  updateDealSwap,
} from "../../../../redux/dealCapture/swap/DealSwapSlice";
import * as moment from "moment";

export function SwapEcheance({
  flagUpdatePrixVariable,
  add,
  update,
  echeance,
  flagUpdate = true,
  hideModal,
}) {
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  useEffect(
    function () {
      if (flagUpdate) {
        form.setFieldsValue({
          prixEcheance: echeance.prixEcheance,
          quantite: echeance.quantite,
          debut: DateUtil.ToJsDate(echeance.debut, "DD/MM/YYYY"),
          fin: DateUtil.ToJsDate(echeance.fin, "DD/MM/YYYY"),
        });
      } else {
        initializeForm();
      }
    },
    [flagUpdate, echeance]
  );

  const onFinish = (values) => {
    if (flagUpdate) {
      update(prepareEcheanceUpdateData(values));
    } else {
      add(prepareEcheanceUpdateData(values));
      initializeForm();
    }
    hideModal();
  };

  function add(values) {
    dispatch(addDealSwap(values));
  }

  function update(values) {
    dispatch(updateDealSwap(values));
  }

  function prepareEcheanceUpdateData(values) {
    console.log("typeof", typeof values.quantite);
    console.log(
      "prepareEcheanceUpdateData",
      values.quantite.replace(/\s/g, "")
    );
    return {
      debut: DateUtil.Format(values.debut),
      fin: DateUtil.Format(values.fin),
      quantite: parseFloat(String(values.quantite).replace(/\s/g, "")),
      prixEcheance:
        values && values.prixEcheance
          ? parseFloat(values.prixEcheance.replace(/\s/g, ""))
          : echeance && echeance.prixEcheance,
    };
  }

  function initializeForm() {
    form.resetFields();
  }

  return (
    <Form
      form={form}
      name="advanced_search"
      className="ant-advanced-search-form"
      onFinish={onFinish}
    >
      <Row gutter={24}>
        <Col span={24} key={"debutPeriode"}>
          <Form.Item
            rules={[{ required: true }]}
            name="debut"
            label={`Début de période`}
          >
            <DatePicker
              name="debut"
              //  onChangeDate={d => setDebutPeriode(d.value)}
              //  name={`debutPeriode`}
              // defaultValue={DateUtil.ToJsDate(echeance.debut, "DD/MM/YYYY")}
              //  value={debutPeriode}
              width={"100%"}
            ></DatePicker>
          </Form.Item>
        </Col>
        <Col span={24} key={"finPeriode"}>
          <Form.Item
            rules={[{ required: true }]}
            name="fin"
            label={`Fin de période`}
          >
            <DatePicker
              name="fin"
              //  onChangeDate={d => setFinPeriode(d.value)}
              // value={finPeriode}
              width={"100%"}
            ></DatePicker>
          </Form.Item>
        </Col>
        <Col span={24} key={"quantite"}>
          <Form.Item
            name="quantite"
            rules={[{ required: true }]}
            label={`Quantite`}
          >
            <NumberFormat
              //    value={quantite}
              customInput={Input}
              // style={{width: '162px'}}
              name="quantite"
              // value={this.state.montant}
              //  onChange={(e) => setQuantite(parseFloat(e.target.value.replace(/ /g, "")))}
              required={true}
              thousandSeparator={" "}
              decimalSeparator={"."}
            />
          </Form.Item>
        </Col>
        {flagUpdatePrixVariable && (
          <Col span={24} key={"prixEcheance"}>
            <Form.Item
              name="prixEcheance"
              rules={[{ required: true }]}
              label={`Prix Variable`}
            >
              <NumberFormat
                //    value={quantite}
                customInput={Input}
                // style={{width: '162px'}}
                name="prixEcheance"
                // value={this.state.montant}
                //  onChange={(e) => setQuantite(parseFloat(e.target.value.replace(/ /g, "")))}
                required={true}
                thousandSeparator={" "}
                decimalSeparator={"."}
              />
            </Form.Item>
          </Col>
        )}
      </Row>

      <Row>
        <Col span={24} style={{ textAlign: "right" }}>
          <Button
            onClick={(event) => {
              hideModal();
            }}
            style={{ margin: "0 8px" }}
            htmlType="submit"
          >
            Annuler
          </Button>
          <Button
            //  onClick={modifyList}
            style={{ margin: "0 8px" }}
            type="primary"
            htmlType="submit"
          >
            OK
          </Button>
        </Col>
      </Row>
    </Form>
  );
}
