import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import LayoutContentWrapper from '../../../components/utility/layoutWrapper';
import LayoutContent from '../../../components/utility/layoutContent';
import PageHeader from '../../../components/utility/pageHeader';
import {Container, Section, Bar} from 'react-simple-resizer';
import * as ReactDOM from 'react-dom'
import DatePicker from '../../../components/uielements/DatePick';
import * as moment from 'moment';
import {userSelector} from '../../../redux/auth/authSlice'
import {Collapse, Spin} from 'antd';
import {Input, Select, Form, Row, Col, Modal, Breadcrumb} from 'antd';
import {HomeOutlined, UserOutlined} from '@ant-design/icons';
import {BreadCrumb} from "../../../components/breadCrumb/BreadCrumb";
import GridPositionDetaillee from "../../../components/pnlReport/GridpositionDetaillee";
import GridPositionParContrat from "../../../components/pnlReport/GridPositionParContrat";
import GridPositionParDevise from "../../../components/pnlReport/GridPositionParDevise";
import {useForm} from "antd/es/form/util";
import {openNotificationWithIcon} from "../../../components/feedback/notification";
import {loadingEtatPNLSelector, resEtatPnlSelector} from "../../../redux/PNLReport/etatPNLSelector";
import {DateUtil} from "../../../helpers/Utils";
import API_URL from "../../../config/api/API_URL";

//const [dateJournee, setDateJournee] = useState(moment().format('DD/MM/YYYY'));
//import SplitterLayout from 'react-splitter-layout';
//import 'react-splitter-layout/lib/index.css';

const {Search} = Input;
const {Panel} = Collapse;


function EtatPNL() {

    const [formSearch] = useForm();
    const dispatch = useDispatch();
    const [pnlDeviseList, setPnlDeviseList] = useState([])
    const [positionsList, setPositionsList] = useState([])
    const [positionsParContratList, setPositionsParContratList] = useState([])

    const [prixMTMInconnu, setPrixMTMInconnu] = useState(false)

    /* -----------Selectors------------ */
    const resEtatPnl = useSelector(resEtatPnlSelector)
    const loading = useSelector(loadingEtatPNLSelector)


    /* -----------Effects ------------- */
    useEffect(function () {
        if (resEtatPnl)
            pnlService_resultHandler(resEtatPnl)
    }, [resEtatPnl])

    function positionFilterFunction(item) {
        if (item.prixMTMInconnu)
            setPrixMTMInconnu(true);
        if (formSearch.getFieldValue("soultePayee"))
            return true;
        else {
            return (item.positionType == 'Positions ouvertes') || (!item.soultePayee);
        }

    }

    function positionFilerRefresh(positions=[]) {

       //  positionsList.filterFunction = positionFilterFunction;
        //positionsList.refresh();

        return positions.filter(positionFilterFunction).sort(function(a,b){
            if(b.tradeDate && a.tradeDate)
            return new Date(DateUtil.parseDate(b.tradeDate) ) - new Date(DateUtil.parseDate(a.tradeDate));
            else
            return new Date(DateUtil.parseDate(b.settlementDate) ) - new Date(DateUtil.parseDate(a.settlementDate));
        })

       /* setPositionsList(positionsList.sort(function(a,b){
            return new Date(DateUtil.parseDate(b.tradeDate) ) - new Date(DateUtil.parseDate(a.tradeDate));
        }))*/
        /*var sort = new Sort();
        var sortField1 = new SortField("settlementDate");
        var sortField2 = new SortField("tradeDate");
        sort.fields = [sortField1, sortField2];
        positionDg.dataProvider.sort = sort;
        gc.source.refresh();
        gc.refresh();
        positionDg.expandAll();*/

    }

    function pnlService_resultHandler(res) {

        // var res: Object = com.adobe.serialization.json.JSON.decode(event.result as String);
        setPnlDeviseList(res.devisePosition) //= new ArrayCollection( as Array);
        setPositionsList(positionFilerRefresh(res.detailPositions))// = new ArrayCollection(res.detailPositions as Array);
        setPositionsParContratList(res.contratPosition) // = new ArrayCollection(res.contratPosition as Array);
        ;

        if (prixMTMInconnu) {
            openNotificationWithIcon("error", "ATTENTION!\n" +
                "Les Prix MTM ne sont pas importés correctement!\n" +
                "Les opérations concernées sont soulignées en rouge dans le report.\n" +
                "Veuillez importer les prix manquants et réessayer à nouveau.");
        }

    }
    function onChange(values) {

        setPositionsList(positionFilerRefresh(positionsList))// = new ArrayCollection(res.detailPositions as Array);

        console.log(positionsList)
    }


    return (
        <LayoutContentWrapper style={{height: '82vh'}}>
            <PageHeader>
                <BreadCrumb elementRoot={"PNL REPORT"} element1={"ÉTAT PNL"}></BreadCrumb>
            </PageHeader>
            <LayoutContent>
                <Spin spinning={loading} size="large">

                    <Container vertical={true} style={{height: '700px', width: '104%', marginLeft: "-20px"}}>
                        <Section style={{background: '#d3d3d3'}} minSize={100}>
                            <GridPositionDetaillee
                                onChange={onChange}
                                form={formSearch}
                                position={positionsList}
                            > </GridPositionDetaillee>
                        </Section>
                        <Bar className="dividerBar" size={4}/>
                        <Section>

                            <GridPositionParContrat
                                data={positionsParContratList}
                            ></GridPositionParContrat>


                        </Section>
                        <Bar className="dividerBar" size={4}/>
                        <Section>


                            <GridPositionParDevise
                                data={pnlDeviseList}
                            >

                            </GridPositionParDevise>


                        </Section>
                    </Container>


                </Spin>

            </LayoutContent>
        </LayoutContentWrapper>

    );
}

export default EtatPNL;
