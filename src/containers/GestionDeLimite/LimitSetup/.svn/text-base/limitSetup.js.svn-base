import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import LayoutContentWrapper from '../../../components/utility/layoutWrapper';
import LayoutContent from '../../../components/utility/layoutContent';
import PageHeader from '../../../components/utility/pageHeader';
import DataGrid from '../../../components/uielements/grid.js';
import * as moment from 'moment';
import { userSelector } from '../../../redux/auth/authSlice'
import { Button, ButtonGroup, SplitButton, SplitButtonItem, ToolbarSpacer, DropDownButton, DropDownButtonItem, Toolbar, ToolbarItem, ToolbarSeparator } from '@progress/kendo-react-buttons'
import { Collapse } from 'antd';
import { Input,Select,Form,Row, Col,Modal,Breadcrumb } from 'antd';
import { HomeOutlined, UserOutlined } from '@ant-design/icons';
const { Search } = Input;
const { Panel } = Collapse;


function NotationFinanciere  () {

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

  useEffect(() => {
   // dispatch(loadLimitSetupListAPI())
  });
  const refresh = () => {
    //dispatch(loadUserColumnsAPI("/login/userColumns?username=" + user.userName))
   // dispatch(loadTresoRecapAPI("/treso/tresorerie?groupeDevise=" + devise + "&dateOp=" + dateJournee))
  }
  const onChangeDate = (e) => {
    //setDateJournee(moment(e.target.value).format('DD/MM/YYYY'))
  }

  const handleOk = () => {

    /*setConfirmLoading(true)
    // to pass the [] long in URL
    let columnsId = "";
    targetKeys.map(column => columnsId += "&columnIds=" + column)

    dispatch(saveUserInstrumentsAPI("/login/settings?userId=" + user.id + columnsId))

    setTimeout(() => {

      setConfirmLoading(false)
      showUserSettingColumns(false)
      refresh()
    }, 2000);*/

  }
  

  function setModalVisible(modalVisible) {
    setModalVisibles( modalVisible );
  }

  const handleChangeTarget = (list) => {
    setTargetKeys(list)
  };


  //if (loadingColumns || loadingTresoRecap) return <Loading title="Chargement en cours ..." />

 /* const activeUsersColumns = Columns.map(column => {
      <Row width= '100%'>
            <Col>
                <h6> > Deal Capture > Future</h6>
            </Col> 
       </Row>
    let isDevise = column.id === 1 ? true : false;
    return (
      <GridColumn
        key={column.id}
        field={column.name}
        title={column.label}
        format="{0:n2}"
        reorderable
        className={isDevise ? "futureGrid" : ""}
      />
    )
  });*/
  const [open, setOpen] = useState(false);

  function callback(key) {
    console.log(key);
  }

  return (
    <LayoutContentWrapper style={{ height: '82vh' }}>
        <PageHeader>
          <Row >
          <Col span={18}>
              <div style ={{height: '65px', width: '586px', marginRight: '510px'}}  > 
                  <Button icon="page-properties" style={{borderRadius:'10px', color:'#2181da'}}  primary={true} look="bare">Paramétrer Limite</Button>
                  &nbsp; &nbsp;&nbsp;
                  <Button icon="refresh" style={{borderRadius:'10px', color:'#2181da'}} primary={true} look="bare">Actualiser</Button>
                  &nbsp;&nbsp;&nbsp;
              </div> 
            </Col>
            <Col span = {6}>
                <Search style ={{ width : '70%'}}  placeholder="Quick search text" onSearch={value => console.log(value)} enterButton />
                <Breadcrumb style={{marginTop:'3%', marginLeft:'12%'}}>
                  <Breadcrumb.Item href="">
                    <HomeOutlined />
                   </Breadcrumb.Item>
                   <Breadcrumb.Item href="/app/GestionDeLimite/NotationFinanciere">
                    <UserOutlined />
                    <span>Gestion De Limite</span>
                   </Breadcrumb.Item>
                   <Breadcrumb.Item>Limit Setup</Breadcrumb.Item>
                 </Breadcrumb>
            </Col>
 
           </Row>

          </PageHeader>
           
        <LayoutContent>
          <DataGrid> </DataGrid>
        </LayoutContent>
      </LayoutContentWrapper>

  );
}

export default NotationFinanciere;

