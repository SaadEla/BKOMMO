import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import LayoutContentWrapper from '../../../components/utility/layoutWrapper';
import LayoutContent from '../../../components/utility/layoutContent';
import PageHeader from '../../../components/utility/pageHeader';
import DataGrid from '../../../components/uielements/grid.js';
import ModalGrid from '../../../components/uielements/gridPopUp.js';

import DatePicker from '../../../components/uielements/DatePick';
import * as moment from 'moment';

import {GridColumn} from '@progress/kendo-react-grid';
import {FiRefreshCw, FiSettings} from 'react-icons/fi'
import {userSelector} from '../../../redux/auth/authSlice'
import {groupeDeviseSelector} from '../../../redux/devise/deviseSlice'
import {
    loadGroupesListAPI,
    groupesListSelector,
    GroupesListSelector
} from '../../../redux/Administration/groupes/groupesSlice';
import GroupesHeader from "../../../components/administrateur/groupes/GroupesHeader";

import UserColumns from './userColumns';
import {
    Button,
    ButtonGroup,
    SplitButton,
    SplitButtonItem,
    ToolbarSpacer,
    DropDownButton,
    DropDownButtonItem,
    Toolbar,
    ToolbarItem,
    ToolbarSeparator
} from '@progress/kendo-react-buttons'

import {Collapse} from 'antd';
import {Input, Select, Form, Row, Col, Modal, Breadcrumb} from 'antd';
import {HomeOutlined, UserOutlined} from '@ant-design/icons';
import Axios from "axios";
import API_URL from "../../../config/api/API_URL";
import {BreadCrumb} from "../../../components/breadCrumb/BreadCrumb";

const {Search} = Input;
const {Panel} = Collapse;


function Groupes() {

    const dispatch = useDispatch();

    /* -----------Selectors------------ */
    const user = useSelector(userSelector);

    const [dateJournee, setDateJournee] = useState(moment().format('DD/MM/YYYY'));
    const [modalVisible, setModalVisibles] = useState(false);

    /* -----------State------------ */
    const [isSettingShown, showUserSettingColumns] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false)
    const [targetKeys, setTargetKeys] = useState()
    const toggleSetting = () => showUserSettingColumns(!isSettingShown)
    const groupes = useSelector(GroupesListSelector);
    useEffect(() => {
        dispatch(loadGroupesListAPI());
        //   dispatch(loadReferencesAdmAPI());
    }, []);

    function loadReferencesAdmAPI() {
        return async dispatch => {
            // dispatch(fetchingAdministrationReferences());
            try {
                //Rest api
                const data = [];
                Axios.get(API_URL.GROUPES_REF).then((resp) => {
                    //     dispatch(loadAdministrationReferences(resp.data));
                    // dispatch(fetchingAdministrationReferencesSuccess());
                }).catch(() => {

                });
            } catch (error) {
                console.log(error)
            }
        };
    }

    function setModalVisible(modalVisible) {
        setModalVisibles(modalVisible);
    }

    const handleChangeTarget = (list) => {
        setTargetKeys(list)
    };


    const [open, setOpen] = useState(false);

    function callback(key) {
        console.log(key);
    }

    return (
        <LayoutContentWrapper style={{height: '82vh'}}>
            <PageHeader>
                <BreadCrumb elementRoot={'ADMINISTRATION'} element1={'GROUPES'}
                            style={{width: '27%', marginBottom: '10px'}}></BreadCrumb>
            </PageHeader>


            <LayoutContent>

                <GroupesHeader groupes={groupes}></GroupesHeader>

            </LayoutContent>
        </LayoutContentWrapper>

    );
}

export default Groupes;

