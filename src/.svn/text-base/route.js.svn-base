import React from "react";
import { Route, Switch } from "react-router-dom";
import App from './containers/App/App';



const RestrictedRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => <Component {...props} />}
  />
);

/**
 * Use this component for any new section of routes (any config object that has a "routes" property)
 */
function RenderRoutes () {
    return (
      <Switch>
        <RestrictedRoute path="/app" component={App}  />
        <RestrictedRoute component={() => <App title=""/>}/>
      </Switch>
    );
}







export {RenderRoutes};
