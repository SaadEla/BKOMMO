import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Layout } from 'antd';
import TopbarWrapper from './topbar.style';
import {
  TopbarUser
} from '../../components/topbar';
import {toggleCollapsed} from '../../redux/app/appSlice';


const { Header } = Layout;

const Topbar = () => {
    const dispatch = useDispatch();
    const customizedTheme = useSelector((state) => state.themeSwitcher.topbarTheme);
    const collapsedState = useSelector((state) => state.app.collapsed);
    const openDrawerState = useSelector((state) => state.app.openDrawer); 
    const collapsed =  collapsedState && !openDrawerState;
    const styling = {
      background: customizedTheme.backgroundColor,
      position: 'fixed',
      width: '100%',
      height: 70,
    };
    return (
      <TopbarWrapper>
        <Header
          style={styling}
          className={
            collapsed ? 'isomorphicTopbar collapsed' : 'isomorphicTopbar'
          }>
          <div className="isoLeft">
            <button
              className={
                collapsed ? 'triggerBtn menuCollapsed' : 'triggerBtn menuOpen'
              }
              style={{ color: customizedTheme.textColor }}
              onClick={() => dispatch(toggleCollapsed())}
            />
          </div>

          <ul className="isoRight">            
            <li
              className="isoUser">
              <TopbarUser/>
            </li>
          </ul>
        </Header>
      </TopbarWrapper>
    );
}


export default Topbar;
