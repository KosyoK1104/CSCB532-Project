import React from "react";
import ReactDOM from "react-dom";
import App from "./pages/App"
// Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";
// Bootstrap Bundle JS
import "bootstrap/dist/js/bootstrap.bundle.min";
import "./assets/app.css"
import "./assets/_bootstrap.css"

ReactDOM.render(
    <App/>,
    document.getElementById('root')
)
