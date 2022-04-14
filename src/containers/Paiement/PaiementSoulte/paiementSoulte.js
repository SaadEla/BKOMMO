import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import LayoutContentWrapper from '../../../components/utility/layoutWrapper';
import LayoutContent from '../../../components/utility/layoutContent';
import PageHeader from '../../../components/utility/pageHeader';
import {Container, Section, Bar} from 'react-simple-resizer';
import {Spin} from 'antd';
import {BreadCrumb} from "../../../components/breadCrumb/BreadCrumb";
import {useForm} from "antd/es/form/util";
import {
    PaiementSoulteListLoadingSelector,
    PaiementSoulteListSelector,
    PaiementSoulteDetailLoadingSelector,
    PaiementSoulteSelectedRowSelector, PaiementDetailSelectedRowSelector
} from "../../../redux/PaiementSoulte/paiementSoulteSelector";
import {PopUpDetail} from "../../../components/paiementSoulte/PopUpDetail";

import {
    editOrSaveDetailPaiementSoulteAPI,
    loadPaiementSoulteListAPI,
    deletePaiementSoulteAPI
} from "../../../redux/PaiementSoulte/RestCall";
import {loadReferencesAPI} from "../../../redux/references/ContratReferencesSlice";
import GridPaiementSoulte1 from "../../../components/paiementSoulte/GridPaiementSoulte1";
import GridPaiementSoulte2 from "../../../components/paiementSoulte/GridPaiementSoulte2";
import {showDeleteConfirm} from '../../../components/feedback/modal';

function PaimentSoulte() {

    const [formSearch] = useForm();
    const dispatch = useDispatch();
    const [formDetail] = useForm();
    const selectedRow = useSelector(PaiementSoulteSelectedRowSelector)
    const selectedRow2 = useSelector(PaiementDetailSelectedRowSelector)

    const loadUpdate = useSelector(PaiementSoulteDetailLoadingSelector)
    const updateFlag = true
    const [showPopUpDetail, setShowPopUpDetail] = useState(false)

    /* -----------Selectors------------ */
    const PaiementSoulteList = useSelector(PaiementSoulteListSelector)
    const loading = useSelector(PaiementSoulteListLoadingSelector)

    const selectedItem = useSelector(PaiementSoulteSelectedRowSelector)


    /* -----------Effects ------------- */
    useEffect(() => {
        setTimeout(function () {
            if (!(PaiementSoulteList && PaiementSoulteList.length > 0)) {
                dispatch(loadPaiementSoulteListAPI());
                dispatch(loadReferencesAPI());
            }
        })
    }, []);

    function updateOrSave() {
        formDetail.submit()
    }

     function prapareSave(form, paiementSoulte) {

        return {
            initDealId: paiementSoulte ? paiementSoulte.initDealId : undefined,
            settlementDealId: paiementSoulte ? paiementSoulte.settlementDealId : undefined,
            datePaiement: form.getFieldValue('datePaiement'),
            montant: form.getFieldValue('montant'),
            dealType: paiementSoulte.dealType
        }
    }

    function onFinishForm() {
        let dataToSend = prapareSave(formDetail, selectedItem)
        if (dataToSend)
            dispatch(editOrSaveDetailPaiementSoulteAPI(dataToSend))

    }

    function saveButton_clickHandler() {
        onFinishForm()
        dispatch(loadPaiementSoulteListAPI)
    }


    function onOkRemoveOption() {
        dispatch(deletePaiementSoulteAPI({id: selectedRow2.id, dealType: selectedRow.dealType}))
    }

    function removeOption() {
        showDeleteConfirm(onOkRemoveOption)
    }

    function onChange(values) {
        /*setPositionsList(positionFilerRefresh(positionsList))// = new ArrayCollection(res.detailPositions as Array);
        console.log(positionsList)*/
    }


    return (
        <LayoutContentWrapper style={{height: '82vh'}}>
            <PageHeader>
                <BreadCrumb elementRoot={"Paiement"} element1={"Paiement Soulte"}></BreadCrumb>
            </PageHeader>
            <LayoutContent>
                <Spin spinning={loading} size="large">

                    <Container vertical={true} style={{height: '700px', width: '104%', marginLeft: "-20px"}}>
                        <Section style={{background: '#d3d3d3'}} minSize={100}>
                            <GridPaiementSoulte1
                                onChange={onChange}
                                form={formSearch}
                                PaiementSoulteList={PaiementSoulteList}
                            > </GridPaiementSoulte1>
                        </Section>
                        <Bar className="dividerBar" size={4}/>
                        <Section>
                            <GridPaiementSoulte2
                                removeOption={removeOption}
                                setShowPopUpDetail={setShowPopUpDetail}
                            ></GridPaiementSoulte2>
                            <PopUpDetail
                                {
                                    ...{
                                        onFinish: saveButton_clickHandler,
                                        selectedRow,
                                        form: formDetail,
                                        loadUpdate,
                                        updateFlag,
                                        updateOrSave,
                                        removeOption,
                                        setShowPopUpDetail,
                                        showPopUpDetail
                                    }
                                }
                            ></PopUpDetail>
                        </Section>
                    </Container>
                </Spin>
            </LayoutContent>
        </LayoutContentWrapper>
    );
}

export default PaimentSoulte;
