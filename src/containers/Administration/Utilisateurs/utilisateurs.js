import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import LayoutContentWrapper from '../../../components/utility/layoutWrapper';
import LayoutContent from '../../../components/utility/layoutContent';
import PageHeader from '../../../components/utility/pageHeader';
import DataGrid from '../../../components/administrateur/utilisateurs/gridUser.js';

//import Loading from '../Loading/index'
//import { userColumnSelector, futureSelector, userColumnsLoadingSelector } from '../../redux/tresoReacp/tresoRecapSlice'
import {userSelector} from '../../../redux/auth/authSlice'
import {
    editOrSaveDetailUtilisateursAPI,
    loadUtilisateursListAPI,
    loadUtilisateursReferenceAPI
} from "../../../redux/Administration/utilisateurs/RestCall";
import {
    UtilisateursDetailLoadingSelector,
    UtilisateursListSelector,
    UtilisateursSelectedRowSelector
} from "../../../redux/Administration/utilisateurs/Selectors";
import {PopUpDetailUtilisateurs} from "../../../components/administrateur/utilisateurs/detail/PopUpDetailUtilisateur";
import {selectingGridRow} from "../../../redux/Administration/utilisateurs/utilisateursSlice";

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
//import { Input, NumericTextBox } from '@progress/kendo-react-inputs';
//import {Tooltip,ButtonToolbar,OverlayTrigger,Col,Row,Form,FormGroup,InputGroup,Button,Glyphicon,Panel,PanelGroup,Checkbox,Table} from 'react-bootstrap'
//import Collapse from 'react-bootstrap/Collapse'
import {Collapse} from 'antd';
import {useForm} from "antd/es/form/util";
import {Input, Select, Form, Row, Col, Modal, Breadcrumb} from 'antd';
import {HomeOutlined, UserOutlined} from '@ant-design/icons';
import {BreadCrumb} from "../../../components/breadCrumb/BreadCrumb";
import UserService from "../../../keycloak/UserService";
//const [dateJournee, setDateJournee] = useState(moment().format('DD/MM/YYYY'));
const {Search} = Input;
const {Panel} = Collapse;


function Utilisateurs() {

    const dispatch = useDispatch();

    /* -----------Selectors------------ */
    const user = useSelector(userSelector);
    const [formDetailUtilisateur] = useForm();

    const updateFlag = true
    const loadUpdateUtilisateur = useSelector(UtilisateursDetailLoadingSelector)
    const selectedRow = useSelector(UtilisateursSelectedRowSelector)
    /* -----------State------------ */
    const utilisateursList = useSelector(UtilisateursListSelector);
    const [showPopUpDetail, setShowPopUpDetail] = useState(false)

    useEffect(() => {
        dispatch(loadUtilisateursListAPI())
        dispatch(loadUtilisateursReferenceAPI())
    }, []);


    function actualiser() {
        dispatch(loadUtilisateursListAPI());
    }

    function ajouter() {
        dispatch(selectingGridRow(null))
        // Utilisateur.utilisateurId = null;
        setShowPopUpDetail(true);
    }

    function handleRowDoubleClick() {
        setShowPopUpDetail(true)
    }

    function updateOrSaveUtilisateur() {
        formDetailUtilisateur.submit()
    }

    const Utilisateur = useSelector(UtilisateursSelectedRowSelector);


    function prapareSaveUtilisateurs(form, Utilisateur) {

        return {
            utilisateurId: Utilisateur ? Utilisateur.utilisateurId : undefined,
            nom: form.getFieldValue('nom'),
            prenom: form.getFieldValue('prenom'),
            mail: form.getFieldValue('mail'),
            login: form.getFieldValue('login'),
            password: form.getFieldValue('password'),
            groupeId: form.getFieldValue('groupeId')
        }
    }

    function onFinishUtilisateursForm() {
        let dataToSend = prapareSaveUtilisateurs(formDetailUtilisateur, Utilisateur)
        if (dataToSend)
            dispatch(editOrSaveDetailUtilisateursAPI(dataToSend))
    }


    function saveButton_clickHandler() {
        onFinishUtilisateursForm()
    }


    return (
        <LayoutContentWrapper style={{height: '82vh'}}>
            <PageHeader>
                <BreadCrumb elementRoot={'ADMINISTRATION'}  element1={'UTILISATEURS'} style={{width:'27%',marginBottom: '10px'}}></BreadCrumb>
            </PageHeader>
            <LayoutContent>
                <DataGrid
                    utilisateursList={utilisateursList}
                    handleRowDoubleClick={handleRowDoubleClick}
                    actualiser={actualiser}
                    ajouter={ajouter}
                >

                </DataGrid>

                <PopUpDetailUtilisateurs
                    {
                        ...{
                            onFinish: saveButton_clickHandler,
                            selectedRow,
                            form: formDetailUtilisateur,
                            loadUpdateUtilisateur,
                            updateFlag,
                            updateOrSaveUtilisateur,
                            setShowPopUpDetail,
                            showPopUpDetail
                        }
                    }
                ></PopUpDetailUtilisateurs>
            </LayoutContent>
        </LayoutContentWrapper>

    );
}

export default Utilisateurs;

