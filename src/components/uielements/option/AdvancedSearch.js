import React, { useState } from "react";
import { Col, Collapse, Divider, Form, Row, Select } from "antd";
import DatePicker from "../DatePick";
import { Button } from "@progress/kendo-react-buttons";
import {
  optionsContrePartie,
  optionsSousjacents,
  optionsStatuts,
  optionsTiers,
  tiersLabelFunction2,
} from "./OptionUtil";
import { useDispatch } from "react-redux";
import { DateUtil } from "../../../helpers/Utils";
import { loadOptionListAPI } from "../../../redux/dealCapture/rest/OptionRestCall";

const { Panel } = Collapse;
const { Option } = Select;
const OptionAdvancedSearchModel = {
  sousJacentId: null,
  tiersId: null,
  statutId: null,
  minTradeDate: null,
  maxTradeDate: null,
  minMaturity: null,
  maxMaturity: null,
};
export default function AdvancedSearch({ callback, references, style }) {
  const dispatch = useDispatch();
  const [optionAdvancedSearch, setOptionAdvancedSearch] = useState(
    OptionAdvancedSearchModel
  );

  function handleOptionSearchModel(newValue) {
    setOptionAdvancedSearch((oldState) => {
      return { ...oldState, ...newValue };
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    dispatch(loadOptionListAPI(optionAdvancedSearch));
    console.log("model", optionAdvancedSearch);
  }

  return (
    <card style={{ width: "100%", background: "white", ...style }}>
      <Row>
        <Col span={3 / 2}>
          <Form.Item colon={false} label="Broker/Contrepartie"></Form.Item>

          <Form.Item colon={false} label="Sous-jacent"></Form.Item>
        </Col>

        <Col span={5}>
          <Form.Item>
            <Select
              allowClear
              showSearch
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
              onChange={(e) => handleOptionSearchModel({ tiersId: e })}
              style={{ width: "95%" }}
            >
              {optionsTiers(references)}
            </Select>
          </Form.Item>
          <Form.Item>
            <Select
              showSearch
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
              onChange={(e) => handleOptionSearchModel({ sousJacentId: e })}
              allowClear
              style={{ width: "95%" }}
            >
              {optionsSousjacents(references)}
            </Select>
          </Form.Item>
        </Col>

        <Col span={5 / 2}>
          <Form.Item
            name={"uuuu"}
            colon={false}
            label="Trade date du"
          ></Form.Item>
          <Form.Item colon={false} label="Maturité du"></Form.Item>
        </Col>

        <Col span={5}>
          <Form.Item>
            <DatePicker
              width={"90%"}
              onChangeDate={(e) =>
                handleOptionSearchModel({
                  minTradeDate: DateUtil.Format(e.value),
                })
              }
            />
          </Form.Item>
          <Form.Item>
            <DatePicker
              width={"90%"}
              onChangeDate={(e) =>
                handleOptionSearchModel({
                  minMaturity: DateUtil.Format(e.value),
                })
              }
            />
          </Form.Item>
        </Col>

        <Col span={1 / 2}>
          <Form.Item colon={false} label="au"></Form.Item>
          <Form.Item colon={false} label="au"></Form.Item>
        </Col>

        <Col span={5}>
          <Form.Item>
            <DatePicker
              width={"90%"}
              onChangeDate={(e) =>
                handleOptionSearchModel({
                  maxTradeDate: DateUtil.Format(e.value),
                })
              }
            />
          </Form.Item>
          <Form.Item>
            <DatePicker
              width={"90%"}
              onChangeDate={(e) =>
                handleOptionSearchModel({
                  maxMaturity: DateUtil.Format(e.value),
                })
              }
            />
          </Form.Item>
        </Col>

        <Col span={1}>
          <Form.Item colon={false} label="Statut"></Form.Item>
        </Col>

        <Col span={3}>
          <Form.Item>
            <Select
              showSearch
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
              onChange={(e) => handleOptionSearchModel({ statutId: e })}
              allowClear
              style={{ width: "100%" }}
            >
              {optionsStatuts()}
            </Select>
          </Form.Item>
        </Col>
      </Row>
      <Divider orientation="right" plain>
        {" "}
        <Button
          onClick={handleSubmit}
          type="submit"
          icon="search"
          className="btn-header-style"
          primary={true}
          look="bare"
        >
          Rechercher
        </Button>
      </Divider>
    </card>
  );
}
