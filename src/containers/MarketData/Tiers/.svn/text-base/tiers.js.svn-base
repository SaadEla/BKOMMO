import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import LayoutContentWrapper from '../../../components/utility/layoutWrapper';
import LayoutContent from '../../../components/utility/layoutContent';
import {Collapse} from 'antd';
import {Input, Select, Form, Row, Col, Modal, Breadcrumb} from 'antd';
import {TiersGrid} from "../../../components/marketData/tiers/TiersGrid";
import {TiersHeader} from "../../../components/marketData/tiers/TiersHeader";
import {editOrSaveDetailTiersAPI, loadTiersListAPI} from "../../../redux/MarketData/tiers/RestCall";
import {
    TiersDetailLoadingSelector,
    TiersListSelector,
    TiersSelectedRowSelector
} from "../../../redux/MarketData/tiers/Selectors";
import {PopUpDetailTiers} from "../../../components/marketData/tiers/detail/PopUpDetailTiers";
import {useForm} from "antd/es/form/util";
import {SousJacentHeader} from "../../../components/marketData/sousJacent/SousJacentHeader";
import PageHeader from "../../../components/utility/pageHeader";

const {Search} = Input;
const {Panel} = Collapse;


function Tiers() {

    /*-----------Form-------------*/
    const [formDetailTier] = useForm();
    /* -----------dispatch------------ */
    const dispatch = useDispatch();
    /* -----------vars------------ */

    /* -----------Selectors------------ */
    const tiersData = useSelector(TiersListSelector);
    const updateFlag = true
    const loadUpdateTier = useSelector(TiersDetailLoadingSelector)
    const selectedRow =useSelector(TiersSelectedRowSelector)
    /* -----------State------------ */
    const [tiersList, setTiersList] = useState([]);
    const [showPopUpDetail, setShowPopUpDetail] = useState(false)


    /* -----------Effect------------ */
    /**
     * load list tiers from API
     */
    useEffect(() => {
        if (!(tiersList && tiersList.length > 0)) {
            dispatch(loadTiersListAPI());
        }
    }, []);
    useEffect(function () {
        setTiersList([...tiersData]);
    }, [tiersData])


    function actualiser() {
        dispatch(loadTiersListAPI());
    }

    function updateOrSaveTier() {
        formDetailTier.submit()
    }

     function saveButton_clickHandler()
    {
            dispatch(editOrSaveDetailTiersAPI({
                tiersId:selectedRow.tiersId,
                futureFolder:formDetailTier.getFieldValue("futureFolder")
            }))
    }

    function handleRowDoubleClick() {
        setShowPopUpDetail(true)
    }




    return (
        <LayoutContentWrapper style={{height: '82vh'}}>
            <PageHeader>
                <TiersHeader></TiersHeader>

            </PageHeader>
            <LayoutContent>

                <TiersGrid
                    {
                        ...{
                            handleRowDoubleClick,
                            actualiser,
                            tiersList,

                        }
                    }></TiersGrid>

                <PopUpDetailTiers
                    {
                        ...{
                            onFinish:saveButton_clickHandler,
                            selectedRow,
                            form : formDetailTier,
                            loadUpdateTier,
                            updateFlag,
                            updateOrSaveTier,
                            setShowPopUpDetail,
                            showPopUpDetail
                        }
                    }

                ></PopUpDetailTiers>
            </LayoutContent>
        </LayoutContentWrapper>

    );
}

export default Tiers;

