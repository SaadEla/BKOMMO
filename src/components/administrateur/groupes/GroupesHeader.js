import React, {useEffect, useState} from "react";
import {Checkbox, Select, Divider} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {ListReferencesSelector} from "../../../redux/references/AdministrationReferenceSlice";
import {Button} from "@progress/kendo-react-buttons";

import {List, Typography} from 'antd';
import {editOrSaveDetailGroupesAPI} from "../../../redux/Administration/groupes/groupesSlice";
import UserService from "../../../keycloak/UserService";

export default function GroupesHeader({groupes, exporter, form, onChange}) {

    const dispatch = useDispatch()
    const referencesList = useSelector(ListReferencesSelector);
    const [disableTiers, setDisableTiers] = useState(false)

    const [roles, setRoles] = useState([]);
    const [currentRoles, setCurrentRoles] = useState([]);
    const [listGroupes, setListGroupes] = useState([]);
    const [groupeId, setGroupeId] = useState(0)


    useEffect(function () {
        setListGroupes(groupes)
    }, [groupes])

    useEffect(function () {
        if (listGroupes.roles && listGroupes.roles.length > 0 && groupeId) {
            const currentGroupeRoles = listGroupes.groupes.find(function (it) {
                return it.groupeId == groupeId
            }).roles;
            setCurrentRoles(currentGroupeRoles);
            setRoles(listGroupes.roles.map(function (item) {
                return {
                    checkedRole: contains(currentGroupeRoles, item.roleId),
                    ...item
                }
            }))
        } else {
            setRoles(listGroupes.roles)
        }

    }, [listGroupes, groupeId])

    function contains(list = [], roleId) {
        return list.filter(function (item) {
            return item.roleId == roleId
        }).length > 0;
    }

    function groupeLabelFunction(item) {
        if (item == null) return "";
        if (item.groupeId == null) return "";
        return item.libelleGroupe;
    }

    function groupeOption() {

        if (groupes && groupes.groupes) {
            return groupes.groupes.map(function (item) {

                return <Select.Option checked={item.groupeId == 1} key={item.groupeId}
                                      value={item.codeGroupe}>{groupeLabelFunction(item)}</Select.Option>
            })
        } else return []
    }

    useEffect(function () {
        if (listGroupes.roles && listGroupes.roles.length > 0 && groupeId) {
            const currentGroupeRoles = currentRoles;
            setRoles(listGroupes.roles.map(function (item) {
                return {
                    checkedRole: contains(currentGroupeRoles, item.roleId),
                    ...item
                }
            }))
        } else {
            setRoles(listGroupes.roles)
        }
    }, [currentRoles])

    function onChecked(checked, role) {
        if (role.checkedRole) {
            setCurrentRoles([
                ...currentRoles.filter(function (item) {
                    return item.roleId != role.roleId
                })
            ])
        } else {
            if (listGroupes.roles && listGroupes.roles.length > 0 && groupeId) {

                setCurrentRoles([
                    ...currentRoles,
                    ...[role]
                ])

            }

        }
    }

     function save_button_clickHandler(event)
    {
        let roles= [];
        let roleIds= [];
        let params={};

        params.groupeId=groupeId;
        params.groupeName=groupes.groupes.find(item => item.groupeId==groupeId).libelleGroupe;

            //(this.currentState=="create")?groupInput.text:groupCombo.selectedItem.libelleGroupe;

        for (let o of currentRoles){
            roleIds.push(o.roleId);
            roles.push(o);
        }
        if (roleIds.length>0)
            params.roleIds=roleIds

        dispatch(editOrSaveDetailGroupesAPI(params))
       // groupe_save_service.send(params);
        /* 	--
            groupCombo.selectedItem.roles=roles; */
    }

    function saveRoles() {
        if(currentRoles){
            dispatch(editOrSaveDetailGroupesAPI(currentRoles))
        }
    }

    return <div>
        <div>
            Groupe : {'\n'}
            <Select

                allowClear
                showSearch
                onChange={(data) => setGroupeId(data)}
                filterOption={(input, option) =>
                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }

                style={{width: '400px'}}>
                {groupeOption()}
            </Select>

            {
                UserService.hasRole("ADMINISTRATION") &&
                <Button
                    onClick={save_button_clickHandler}
                    disabled={!groupeId}
                    type={"submit"} icon="save"
                    className="btn-header-style"
                    primary={true}
                    look="bare"
                    style={{marginLeft: '10%'}}>Enregistrer</Button>
            }

        </div>
        <br/>
        <Divider orientation="left">Rôles</Divider>
        <List
            size="small"
            // header={<div>Header</div>}
            // footer={<div>Footer</div>}
            bordered
            pagination
            dataSource={roles}
            renderItem={item => <List.Item><Checkbox
                disabled={!groupeId}
                onChange={it => onChecked(it.target.checked, item)}
                checked={item.checkedRole}></Checkbox> {item.roleDesc}</List.Item>}
        />
    </div>
}