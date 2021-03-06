import React from "react";
import store from "./redux/store";
import { Provider } from "react-redux";
import { ThemeProvider } from "styled-components";
import { themeConfig } from "./config";
import themes from "./config/themes";
import DashAppHolder from "./dashAppStyle";
import { RenderRoutes } from "./route";
import { HashRouter } from "react-router-dom";
import "@progress/kendo-theme-default/dist/all.css";
import "antd/dist/antd.css";

const DashApp = () => {
  function onAuthSuccess(event) {
    switch (event) {
      case "onAuthSuccess":
        alert("success");
    }
  }

  return (
    <div>
      <ThemeProvider theme={themes[themeConfig.theme]}>
        <DashAppHolder>
          <Provider store={store}>
            <HashRouter basename={window.configs.BASE_NAME}>
              <RenderRoutes />
            </HashRouter>
          </Provider>
        </DashAppHolder>
      </ThemeProvider>
    </div>
  );
};

export default DashApp;
