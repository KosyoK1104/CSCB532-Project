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
import OfficeRoot from "./employees/offices/OfficeRoot";
import OfficeListing from "./employees/offices/view/OfficeListing";
import CreateOffice from "./employees/offices/view/CreateOffice";
import OfficeView from "./employees/offices/view/OfficeView";
import AccountSettings from "./employees/account/AccountSettings";
import EmployeeRoot from "./employees/employees/EmployeeRoot";
import EmployeesListing from "./employees/employees/EmployeesListing";
import EmployeeLayout from "./employees/employees/view/EmployeeLayout";
import EmployeeHome from "./employees/employees/view/EmployeeHome";
import UpdateEmployee from "./employees/employees/view/UpdateEmployee";
import CreateEmployee from "./employees/employees/CreateEmployee";
import ChangePassword from "./employees/account/ChangePassword";

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
                                <Route path="settings" element={<AccountSettings/>}/>
                                <Route path="change-password" element={<ChangePassword/>}/>
                            </Route>
                            <Route path="employees" element={<EmployeeRoot/>}>
                                <Route index element={<EmployeesListing/>}/>
                                <Route path="create" element={<CreateEmployee/>}/>
                                <Route path=":id" element={<EmployeeLayout/>}>
                                    <Route index element={<EmployeeHome/>}/>
                                    <Route path="update" element={<UpdateEmployee/>}/>
                                </Route>
                            </Route>
                            <Route path="offices" element={<OfficeRoot/>}>
                                <Route index element={<OfficeListing/>}/>
                                <Route path="create" element={<CreateOffice/>}/>
                                <Route path=":id" element={<OfficeView/>}/>
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

