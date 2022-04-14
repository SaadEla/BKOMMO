import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "./global.css";
import DashApp from "./dashApp";
import * as serviceWorker from "./serviceWorker";
import UserService from "./keycloak/UserService";
import FourZeroThree from "./containers/Page/403";
import { Spin } from "antd";
/*
ReactDOM.render(
    <DashApp />,
    document.getElementById('root')
)*/
console.log = function () {};
console.warn = function () {};
console.error = function () {};

const renderApp = () =>
  ReactDOM.render(<DashApp />, document.getElementById("root"));
const renderFoorZeroThree = () =>
  ReactDOM.render(<FourZeroThree />, document.getElementById("root"));
ReactDOM.render(
  <div style={{ marginLeft: "50%", marginTop: "20%" }}>
    <Spin size="large" />
  </div>,
  document.getElementById("root")
);
UserService.initKeycloak(renderApp, renderFoorZeroThree);
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
