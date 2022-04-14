import React, {useEffect} from "react";
import {Col, Form, Input, Row,Select} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {
    UtilisateursDetailLoadingSelector,
    UtilisateursSelectedRowSelector,
    ReferenceListSelector
} from "../../../../redux/Administration/utilisateurs/Selectors";

export function DetailUtilisateur({selectedRow, onFinish,onChangeEcheance,form}) {

    
    const utilisateur = useSelector(UtilisateursSelectedRowSelector);
    const reference = useSelector(ReferenceListSelector);
    useEffect(function () {

    if(utilisateur)
        form.setFieldsValue({
            nom: utilisateur.nom,
            prenom: utilisateur.prenom,
            login: utilisateur.login,
            mail:utilisateur.mail,
            password : utilisateur.password,
            groupeId : utilisateur.groupe.groupeId
        })
        else
        form.resetFields()
        console.log(utilisateur)
    }, [utilisateur])

    function optionsGroupe(reference) {
        if (reference && reference.groupes)
            return reference.groupes.map(d => <Select.Option value={d.groupeId}
                                                             key={d.groupeId}>{d.libelleGroupe}</Select.Option>);
    }

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
                    name={`nom`}
                    label={`Nom`}
                    rules={[
                        {
                            required: true,
                            message: 'Champ obligatoire!',
                        },
                    ]}
                >
                    <Input ></Input>

                </Form.Item>
                <Form.Item
                    className={"detaildata"}
                    colon={false}
                    name={`prenom`}
                    label={`Prénom`}
                    rules={[
                        {
                            required: true,
                            message: 'Champ obligatoire!',
                        },
                    ]}
                >
                    <Input  ></Input>

                </Form.Item>
                <Form.Item
                    className={"detaildata"}
                    colon={false}
                    name={`mail`}
                    label={`E-mail`}
                    
                >
                    <Input  ></Input>

                </Form.Item>
                <Form.Item
                    colon={false}
                    name={`login`}
                    label={`Login`}
                    rules={[
                        {
                            required: true,
                            message: 'Champ obligatoire!',
                        },
                    ]}
                >
                    <Input ></Input>

                </Form.Item>

                <Form.Item
                    className={"detaildata"}
                    colon={false}
                    name={`password`}
                    label={`Mot de passe`}
                    rules={[
                        {
                            required: true,
                            message: 'Champ obligatoire!',
                        },
                    ]}
                >
                    <Input type="password" ></Input>

                </Form.Item>
                <Form.Item
                    className={"detaildata"}
                    colon={false}
                    name={`groupeId`}
                    label={`Groupe`}

                >
                     <Select  style={{  width: '40%', marginBottom: '10px'}} 
                        showSearch
                        filterOption={(input, option) =>
                            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                        >
                        {optionsGroupe(reference)}
                    </Select>

                </Form.Item>
            </Col>
            
        </Row>
    </Form>
}