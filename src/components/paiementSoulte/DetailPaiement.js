import React, {useEffect} from "react";
import {Col, Form, Input, Row,Select} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {
    PaiementSoulteDetailLoadingSelector,
} from "../../redux/PaiementSoulte/paiementSoulteSelector";
import RadioBox, { RadioButton } from "../uielements/radio";
import { Radio } from 'antd';
import PaimentSoulte from "../../containers/Paiement/PaiementSoulte/paiementSoulte";
import { NumberUtil } from "../../helpers/Utils";

export function DetailPaiement({selectedRow, onFinish,onChangeEcheance,form}) {

    
    const PaiementSoulte = useSelector(PaiementSoulteDetailLoadingSelector);
   // const reference = useSelector(ReferenceListSelector);
    useEffect(function () {

    if(PaiementSoulte)
        form.setFieldsValue({
            initDealId: PaiementSoulte.initDealId,
            pnl: PaiementSoulte.pnl,
            settlementDealId : PaiementSoulte.settlementDealId,
            totalPaiement: PaiementSoulte.totalPaiement,//+montant,
            suspens: PaiementSoulte.suspens,
            montant: PaiementSoulte.montant,
            devise : PaiementSoulte.devise,
            sens : PaiementSoulte.sens
        })
    else
        form.resetFields()
        console.log(PaiementSoulte)
    }, [PaiementSoulte])


    const checkPrice = (_, value) => {
        
        if (value > 0) {
          return Promise.resolve();
        }
        return Promise.reject('Montant du paiement invalide!');
      };

      const checkSuspens = (_, value)=> {
        if (selectedRow.pnl-selectedRow.totalPaiement >= value) {
          return Promise.resolve();
        }
        return Promise.reject('Montant du paiement supérieur au suspens!');
      };

    return <Form
        form={form}
        name="advanced_search"
        className="ant-detail-Utilisateur-form"
        onFinish={onFinish}
        onValuesChange={onChangeEcheance}
    >
        <Row gutter={[12, 0]}>
            <Col span={24}>
                <Form.Item
                    className={"detaildata"}
                    colon={false}
                    name={`pnl`}
                    label={`PnL`}
                  
                >
                    <text> {selectedRow.pnl} </text>

                </Form.Item>
                <Form.Item
                    className={"detaildata"}
                    colon={false}
                    name={`totalPaiement`}
                    label={`Total Payé`}
                    
                >
                    <text >{selectedRow.totalPaiement}</text>

                </Form.Item>
                <Form.Item
                    className={"detaildata"}
                    colon={false}
                    name={`suspens`}
                    label={`suspens`}
                    
                >
                    <text > {NumberUtil.Format(selectedRow.pnl - selectedRow.totalPaiement)}</text>

                </Form.Item>
                
                <Form.Item
                    colon={false}
                    name={`montant`}
                    label={`Montant`}
                    rules={[
                        {
                            required: true,
                            message: 'Champ obligatoire!',
                        },
                        {
                            validator: checkPrice,
                        },
                        {
                            validator: checkSuspens,
                        }
                        
                    ]}
                >
                    <Input type="number" min="0" ></Input>

                </Form.Item>

                <Form.Item
                    className={"detaildata"}
                    colon={false}
                    name={`devise`}
                    label={`Devise`}
                >
                    <text> {selectedRow.devise}</text>

                </Form.Item>
                <Form.Item
                    className={"detaildata"}
                    colon={false}
                    name={`sens`}
                    label="Sens(Client)"

                >
                    <Radio.Group defaultValue="1" size="small">
                    <Radio.Button value="1">Crédit</Radio.Button>
                    <Radio.Button value="-1">Débit</Radio.Button>
      
                     </Radio.Group>

                </Form.Item>

                <Form.Item
                    className={"detaildata"}
                    colon={false}
                    name={`datePaiement`}
                    label={`Date de paiement`}
                    rules={[
                        {
                            required: true,
                            message: 'Champ obligatoire!',
                        },
                    ]}
                >
                    <Input ></Input>

                </Form.Item>
            </Col>
            
        </Row>
    </Form>
}