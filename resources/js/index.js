import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App"
// Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";
// Bootstrap Bundle JS
import "bootstrap/dist/js/bootstrap.bundle.min";
import "./assets/app.css"
import {Provider} from "react-redux"
import store from "./store"


ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('root'))
