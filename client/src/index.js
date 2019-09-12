import "materialize-css/dist/css/materialize.min.css";

import React from "react";
import ReactDOM from "react-dom";

import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";

import reduxThunk from "redux-thunk";

import App from "./components/App";

import reducers from "./reducers";

const store = createStore(reducers, {}, applyMiddleware(reduxThunk));

/**
  the Provider allows the state to be accessible across the app
  also helps react-redux and Redux to properly communicate
*/
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
