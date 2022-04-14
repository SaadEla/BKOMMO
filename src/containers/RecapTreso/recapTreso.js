import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import LayoutContentWrapper from '../../components/utility/layoutWrapper';
import LayoutContent from '../../components/utility/layoutContent';
import PageHeader from '../../components/utility/pageHeader';
import DataGrid from '../../components/uielements/grid.js';
import DatePick from '../../components/uielements/DatePick';
import * as moment from 'moment';

import Loading from '../Loading/index'
import { GridColumn } from '@progress/kendo-react-grid';
import Modal from '../../components/feedback/modal'
import { FiRefreshCw, FiSettings } from 'react-icons/fi'
import { userColumnSelector, tresoRecapSelector, tresoRecapLoadingSelector, userColumnsLoadingSelector } from '../../redux/tresoReacp/tresoRecapSlice'
import { userSelector } from '../../redux/auth/authSlice'
import { groupeDeviseSelector } from '../../redux/devise/deviseSlice'
import { loadUserColumnsAPI, loadTresoRecapAPI, saveUserInstrumentsAPI } from '../../redux/tresoReacp/tresoRecapSlice'
import { DateWrapper } from "./recapTresoStyle"
import UserColumns from './userColumns';




const RecapTreso = () => {

  const dispatch = useDispatch();

  /* -----------Selectors------------ */
  const user = useSelector(userSelector);
 // const devise = useSelector(groupeDeviseSelector)
  const loadingColumns = useSelector(userColumnsLoadingSelector)
  const loadingTresoRecap = useSelector(tresoRecapLoadingSelector)
  const Columns = useSelector(userColumnSelector)
  const recapTresoData = useSelector(tresoRecapSelector)
  const [dateJournee, setDateJournee] = useState(moment().format('DD/MM/YYYY'));

  /*  Listen to refresh, then redirect to Devise
  window.addEventListener('beforeunload', () =>{
    console.log("REFRSHED")
    });
    
  */
  /* -----------State------------ */
  const [isSettingShown, showUserSettingColumns] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false)
  const [targetKeys, setTargetKeys] = useState()
  const toggleSetting = () => showUserSettingColumns(!isSettingShown)


  useEffect(() => {


  }, [recapTresoData, Columns])

  const refresh = () => {
    dispatch(loadUserColumnsAPI("/login/userColumns?username=" + user.userName))
    dispatch(loadTresoRecapAPI("/treso/tresorerie?groupeDevise=" + devise + "&dateOp=" + dateJournee))
  }

  const onChangeDate = (e) => {
    setDateJournee(moment(e.target.value).format('DD/MM/YYYY'))
  }


  const handleOk = () => {

    setConfirmLoading(true)
    // to pass the [] long in URL
    let columnsId = "";
    targetKeys.map(column => columnsId += "&columnIds=" + column)

    dispatch(saveUserInstrumentsAPI("/login/settings?userId=" + user.id + columnsId))

    setTimeout(() => {

      setConfirmLoading(false)
      showUserSettingColumns(false)
      refresh()
    }, 2000);

  }

  const handleChangeTarget = (list) => {
    setTargetKeys(list)
  }


  if (loadingColumns || loadingTresoRecap) return <Loading title="Chargement en cours ..." />

  const activeUsersColumns = Columns.map(column => {

    let isDevise = column.id === 1 ? true : false;
    return (
      <GridColumn
        key={column.id}
        field={column.name}
        title={column.label}
        format="{0:n2}"
        reorderable
        className={isDevise ? "recapTresoGrid" : ""}
      />
    )
  });

  return (

    <LayoutContentWrapper style={{ height: '70vh' }}>
      <PageHeader>Récap. trésorerie</PageHeader>
      <DateWrapper>
        <DatePick onChangeDate={onChangeDate} defaultValue={moment(dateJournee, 'DD/MM/YYYY').toDate()} />
        <FiSettings onClick={() => showUserSettingColumns(true)} size="20" />
        <FiRefreshCw onClick={() => refresh()} size="20" />
      </DateWrapper>
      <LayoutContent>
        <DataGrid data={recapTresoData} >
          {activeUsersColumns}
        </DataGrid>
      </LayoutContent>

      <Modal
        visible={isSettingShown}
        title="Gestion d'affichage"
        toggle={toggleSetting}
        onOk={handleOk}
        onCancel={toggleSetting}
        okText="Enregistrer"
        cancelText="Annuler"
        confirmLoading={confirmLoading}
      >
        <LayoutContent>
          <UserColumns handleChangeTarget={handleChangeTarget} />
        </LayoutContent>
      </Modal>
    </LayoutContentWrapper>
  );
}

export default RecapTreso;

