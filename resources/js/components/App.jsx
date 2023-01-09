import "./App.css"
import {BrowserRouter, Route, Routes} from "react-router-dom";

import AuthLayout from "./auth/AuthLayout"
import AuthHome from "./auth/AuthHome"
import Register from "./auth/Register"
import Login from "./auth/Login"
import {Toaster} from "react-hot-toast";
import NotFound from "./NotFound"

import ClientHomePage from "./clients/HomePage";
import ClientAccountLayout from "./clients/account/AccountLayout";
import ClientAccountHome from "./clients/account/AccountHome";
import ClientAddress from "./clients/account/Address";

import EmployeeHomePage from "./employees/HomePage";
import EmployeeAccountHome from "./employees/account/AccountHome";
import EmployeeAccountLayout from "./employees/account/AccountLayout";

import {Provider} from "react-redux";
import store from "../store"

import {ConfigProvider} from "antd";

export default function App() {
    return (
        <ConfigProvider>
            <Provider store={store}>
                <BrowserRouter>
                    <Routes>
                        <Route path="" element={<AuthLayout/>}>
                            <Route index element={<AuthHome/>}/>
                            <Route path="register" element={<Register/>}/>
                            <Route path="login" element={<Login/>}/>
                        </Route>

                        <Route path="client" element={<ClientHomePage/>}>
                            <Route path="account" element={<ClientAccountLayout/>}>
                                <Route index element={<ClientAccountHome/>}/>
                                <Route path="address" element={<ClientAddress/>}/>
                            </Route>
                        </Route>

                        <Route path="employee" element={<EmployeeHomePage/>}>
                            <Route path="account" element={<EmployeeAccountLayout/>}>
                                <Route index element={<EmployeeAccountHome/>}/>
                            </Route>
                        </Route>

                        <Route path="*" element={<NotFound/>}/>
                    </Routes>
                    <Toaster/>
                </BrowserRouter>
            </Provider>
        </ConfigProvider>
    )
}

