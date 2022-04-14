import React, {useEffect} from 'react';
import { ThemeProvider } from 'styled-components';
import Topbar from '../Topbar/Topbar';
import AppHolder from './commonStyle';
import './global.css';
import themes from '../../config/themes';
import { Layout } from 'antd';
import {useSelector, useDispatch} from 'react-redux';
import {selectedThemeSelector} from '../../redux/themeSwitcher/themeSwitcherSlice';
import Sidebar from '../Sidebar/Sidebar';
import config, { siteConfig } from '../../config.js';
import {useLocation} from 'react-router';
import { Debounce } from 'react-throttle';
import WindowResizeListener from 'react-window-size-listener';
import { toggleAll } from '../../redux/app/appSlice';
import ROUTES,{AppRouter} from './AppRouter';
import Future from '../DealCapture/Future/future';
import {loadReferencesAPI} from "../../redux/references/ContratReferencesSlice";







const App = () => {


  /*if(!localStorage.getItem('user')){
    window.location.assign(config.appCatalogueUrl)    
  }*/
  
  const { Content, Footer } = Layout;
  const selectedTheme = useSelector(selectedThemeSelector);
  const location = useLocation();

  const dispatch = useDispatch();

  // getting referebces on start app
  useEffect(function () {
      dispatch(loadReferencesAPI());
  },[])

  return (
    <ThemeProvider theme={themes[selectedTheme]}>
            <AppHolder>
              <Layout style={{ height: '100vh' }}>
                <Debounce time="1000" handler="onResize">
                  <WindowResizeListener
                    onResize={windowSize =>
                      dispatch(toggleAll(
                        windowSize.windowWidth,
                        windowSize.windowHeight
                      ))}
                  />
                </Debounce>
                <Topbar/>
                <Layout style={{ flexDirection: 'row', overflowX: 'hidden' }}>
                  <Sidebar url={location.pathname}/>
                  <Layout
                    className="isoContentMainLayout"
                    style={{
                      height: '100vh',
                    }}>
                    <Content
                      className="isomorphicContent"
                      style={{
                        padding: '70px 0 0',
                        flexShrink: '0',
                        background: '#f1f3f6',
                      }}>
                        <AppRouter routes={ROUTES}/>
                    </Content>
                    <Footer
                        style={{
                            background: '#ffffff',
                            textAlign: 'center',
                            borderTop: '1px solid #ededed',
                            padding: '18px',
                            fontWeight: 'bold'
                        }}>
                      {siteConfig.footerText}
                    </Footer>
                  </Layout>
                </Layout>
              </Layout>
            </AppHolder>
          </ThemeProvider>
  )
}

export default App
