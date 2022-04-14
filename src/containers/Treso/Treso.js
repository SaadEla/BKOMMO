import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Layout, Menu } from 'antd';
import { FiCheck, FiFolder, FiRefreshCw, FiSave } from 'react-icons/fi'
import DatePick from '../../components/uielements/DatePick';
import DetailTreso from './DetailTreso';
import * as moment from 'moment';

import LayoutContentWrapper from '../../components/utility/layoutWrapper';
import LayoutContent from '../../components/utility/layoutContent';
import PageHeader from '../../components/utility/pageHeader';
import { DateWrapper, MenuWrapper } from './TresoStyle';

import { deviseListSelector } from '../../redux/devise/deviseSlice';

const DeviseMenu = () => {

    /* -----------Selectors------------ */
    const deviseList = useSelector(deviseListSelector);

    const handleClick = e => {
        console.log('click ', e);
    };

    const menuList = deviseList && deviseList.length > 0 ? deviseList.map(menu => <Menu.Item key={menu.currencyId} >{menu.currencyShortName}</Menu.Item>) : ""

    return (
        <MenuWrapper>
            <Menu onClick={handleClick} defaultSelectedKeys={['1']} mode="horizontal"  >
                {menuList}
            </Menu>
        </MenuWrapper>
    );
}

const Treso = () => {

    const onChangeDate = (e) => {
        console.log(e)
    }

    const refresh = () => {
        console.log("Refreshing...")
    }
    return (
        <LayoutContentWrapper>
            <PageHeader>Trésorerie</PageHeader>
            <DateWrapper>
                <DeviseMenu />
                <DatePick onChangeDate={onChangeDate} defaultValue={moment("24/05/2020", 'DD/MM/YYYY').toDate()} />
                <FiRefreshCw onClick={() => refresh()} size="23" />
                <FiFolder size="23" />
                <FiSave size="23" />
                <FiCheck size="23" />
            </DateWrapper>

            <DetailTreso />
        </LayoutContentWrapper>
    )
}



export default Treso