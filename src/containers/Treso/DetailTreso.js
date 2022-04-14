import React from 'react';
import { InputWrapper, InputSumWrapper, TresoDetailWrapper, LeftWrapper, RightWrapper } from './TresoStyle';
import { Input, Row, Col, Layout } from 'antd';




const DetailTreso = () => {




    return (
        <TresoDetailWrapper>
            <LeftWrapper>
                <Row>
                    <div>
                        <InputWrapper ><label>Spot</label>  <Input /></InputWrapper >
                        <InputWrapper ><label>Termes</label> <Input /></InputWrapper >
                        <InputWrapper ><label>Termes FX Swap</label> <Input /></InputWrapper >
                        <InputWrapper ><label>Spot FX Swap</label> <Input /></InputWrapper >

                    </div>
                    <div>
                        <InputSumWrapper ><Input /></InputSumWrapper >

                    </div>
                </Row>
                <Row>
                <div >
                    <InputWrapper ><label>Spot</label>  <Input /></InputWrapper >
                    <InputWrapper ><label>Termes</label> <Input /></InputWrapper >
                    <InputWrapper ><label>Termes FX Swap</label> <Input /></InputWrapper >
                    <InputWrapper ><label>Spot FX Swap</label> <Input /></InputWrapper >

                </div>
                <div>
                    <InputSumWrapper ><Input /></InputSumWrapper >

                </div>
                </Row>
            </LeftWrapper>
            <RightWrapper>
                {/* Start Right side */}
                <Row>
                <div >
                    <InputWrapper ><label>Solde simulation</label> <Input /></InputWrapper >
                    <InputWrapper ><label>Simulation 1</label> <Input /></InputWrapper >
                    <InputWrapper ><label>Simulation 2</label> <Input /></InputWrapper >

                </div>
                <div>
                    <div><Input /></div >

                </div>
                </Row>
            </RightWrapper>
        </TresoDetailWrapper>
    );
}

export default DetailTreso