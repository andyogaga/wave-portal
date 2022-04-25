import React, { Component } from "react";
import { createBrowserHistory } from "history";
import { Router } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";

// import redux
import { Provider } from "react-redux";
import configureStore from "./configureStore";

import Routes from "./routes";
export const history = createBrowserHistory();
const { store, persistor } = configureStore;

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <div>
            <Router history={history}>
              <Routes />
            </Router>
          </div>
        </PersistGate>
      </Provider>
    );
  }
}

export default App;
