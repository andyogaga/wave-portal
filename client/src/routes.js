import React, { Component } from "react";
import { Route, Switch, Redirect, withRouter } from "react-router-dom";
// core components
import CaptionsContainer from "./views/Captions/CaptionsContainer";
import Home from "./views/Home/HomeContainer";
// Error Boundary
// import ErrorBoundary from "./components/ErrorBoundary.jsx";

class Routes extends Component {
  render() {
    return (
      // <ErrorBoundary>
      <Switch>
        <Route path="/home" component={Home} />
        <Route path="/captions" component={CaptionsContainer} />
        <Route path="/" component={Home} />
        <Redirect from="*" to="/" />
      </Switch>
      // </ErrorBoundary>
    );
  }
}


export default withRouter(Routes);
