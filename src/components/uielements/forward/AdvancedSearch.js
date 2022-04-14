import React, { useState } from "react";
import { Col, Collapse, Divider, Form, Row, Select } from "antd";
import DatePicker from "../DatePick";
import { Button } from "@progress/kendo-react-buttons";
import {
  optionsContrePartie,
  optionsSousjacents,
  optionsStatuts,
  tiersLabelFunction2,
} from "./ForwardUtil";
import { useDispatch } from "react-redux";
import { DateUtil } from "../../../helpers/Utils";
import { loadForwardListAPI } from "../../../redux/dealCapture/rest/ForwardRestCall";
import { optionsContrats } from "../option/OptionUtil";

const { Panel } = Collapse;
const { Option } = Select;
const ForwardAdvancedSearchModel = {
  contratId: null,
  contrepartieId: null,
  statutId: null,
  minTradeDate: null,
  maxTradeDate: null,
  minMaturity: null,
  maxMaturity: null,
};
export default function AdvancedSearch({ callback, references, style }) {
  const dispatch = useDispatch();
  const [forwardAdvancedSearch, setForwardAdvancedSearch] = useState(
    ForwardAdvancedSearchModel
  );

  function handleForwardSearchModel(newValue) {
    setForwardAdvancedSearch((oldState) => {
      return { ...oldState, ...newValue };
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    dispatch(loadForwardListAPI(forwardAdvancedSearch));
    console.log("model", forwardAdvancedSearch);
  }

  return (
    <card style={{ width: "100%", background: "white", ...style }}>
      <Row>
        <Col span={3 / 2}>
          <Form.Item colon={false} label="Contre Partie"></Form.Item>

          <Form.Item colon={false} label="Contrat"></Form.Item>
        </Col>

        <Col span={5}>
          <Form.Item>
            <Select
              allowClear
              showSearch
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
              onChange={(e) => handleForwardSearchModel({ contrepartieId: e })}
              style={{ width: "95%" }}
            >
              {optionsContrePartie(references)}
            </Select>
          </Form.Item>
          <Form.Item>
            <Select
              showSearch
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
              onChange={(e) => handleForwardSearchModel({ contratId: e })}
              allowClear
              style={{ width: "95%" }}
            >
              {optionsContrats(references)}
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
                handleForwardSearchModel({
                  minTradeDate: DateUtil.Format(e.value),
                })
              }
            />
          </Form.Item>
          <Form.Item>
            <DatePicker
              width={"90%"}
              onChangeDate={(e) =>
                handleForwardSearchModel({
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
                handleForwardSearchModel({
                  maxTradeDate: DateUtil.Format(e.value),
                })
              }
            />
          </Form.Item>
          <Form.Item>
            <DatePicker
              width={"90%"}
              onChangeDate={(e) =>
                handleForwardSearchModel({
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
              onChange={(e) => handleForwardSearchModel({ statutId: e })}
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
