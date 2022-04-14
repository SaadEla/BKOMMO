import React from 'react';
import clone from 'clone';
import { Layout } from 'antd';
import { Scrollbars } from 'react-custom-scrollbars';
import SidebarWrapper from './sidebar.style';


import {appSelector, toggleOpenDrawer, changeOpenKeys, changeCurrent } from '../../redux/app/appSlice';
import Logo from '../../components/utility/logo';
import { rtl } from '../../config/withDirection';
import { useSelector, useDispatch } from 'react-redux';
import ROUTES, {AppMenu} from '../App/AppRouter'; 

/*const stripTrailingSlash = str => {
  if (str.substr(-1) === '/') {
    return str.substr(0, str.length - 1);
  }
  return str;
};*/


const Sidebar = ({url}) => {
    const dispatch = useDispatch();
    /*const _url = stripTrailingSlash(url);*/
    
    const app = useSelector(appSelector);
    const collapsed = clone(app.collapsed) && !clone(app.openDrawer);
    const { openDrawer } = app;
    const mode = collapsed === true ? 'vertical' : 'inline';
    const onMouseEnter = event => {
      if (openDrawer === false) {
        dispatch(toggleOpenDrawer());
      }
      return;
    };
    const onMouseLeave = () => {
      if (openDrawer === true) {
        dispatch(toggleOpenDrawer());
      }
      return;
    };
    const scrollheight = app.height;
    const customizedTheme = useSelector((state) => state.themeSwitcher.sidebarTheme);
    const styling = {
      backgroundColor: customizedTheme.backgroundColor
    };
   

    const submenuStyle = {
      backgroundColor: 'rgb(45 52 70)',
      color: customizedTheme.textColor
    };
    const submenuColor = {
      color: customizedTheme.textColor
    };

const { Sider } = Layout;
  
  


  
  const getAncestorKeys = (key) => {
    const map = {
      sub3: ['sub2']
    };
    return map[key] || [];
  };

  
  const handleClick = (e) =>{
    dispatch(changeCurrent([e.key]));
    /*if (app.view === 'MobileView') {
      setTimeout(() => {
        dispatch(toggleCollapsed());
        dispatch(toggleOpenDrawer());
      }, 100);
    }*/
  }
  const onOpenChange = (newOpenKeys) => {
    
    const latestOpenKey = newOpenKeys.find(
      key => !(app.openKeys.indexOf(key) > -1)
    );
    const latestCloseKey = app.openKeys.find(
      key => !(newOpenKeys.indexOf(key) > -1)
    );
    let nextOpenKeys = [];
    if (latestOpenKey) {
      nextOpenKeys = getAncestorKeys(latestOpenKey).concat(latestOpenKey);
    }
    if (latestCloseKey) {
      nextOpenKeys = getAncestorKeys(latestCloseKey);
    }
    dispatch(changeOpenKeys(nextOpenKeys));
  }

  
  const renderView = ({ style, ...props }) => {
    const viewStyle = {
      marginRight: rtl === 'rtl' ? '0' : '-17px',
      paddingRight: '0px', /*rtl === 'rtl' ? '0' : '9px',*/
      marginLeft: rtl === 'rtl' ? '-17px' : '0',
      paddingLeft: rtl === 'rtl' ? '9px' : '0'
    };
    return (
      <div className="box" style={{ ...style, ...viewStyle }} {...props} />
    );
  }

  return (
    
      <SidebarWrapper>
        <Sider
          trigger={null}
          collapsible={true}
          collapsed={collapsed}
          width="240"
          className="isomorphicSidebar"
          //onMouseEnter={onMouseEnter}
         // onMouseLeave={onMouseLeave}
          style={styling}
        >
          <Logo collapsed={collapsed} />
          <Scrollbars
            renderView={renderView}
            style={{ height: scrollheight - 70 }}
          >
            <AppMenu
              onClick={handleClick}
              theme="dark"
              mode="inline"
              //mode={mode}
              openKeys={app.openKeys}
              selectedKeys={app.current}
              onOpenChange={onOpenChange}
              className="isoDashboardMenu"
              routes={ROUTES}
              //submenuStyle={submenuStyle}
             // submenuColor={submenuColor}
            />
          </Scrollbars>
        </Sider>
      </SidebarWrapper>
    );
}


export default Sidebar;
