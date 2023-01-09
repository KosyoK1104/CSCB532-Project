import "./App.css"
import {BrowserRouter, Route, Routes} from "react-router-dom";
import AuthLayout from "./auth/AuthLayout"
import AuthHome from "./auth/AuthHome"
import Register from "./auth/Register"
import Login from "./auth/Login"
import {Toaster} from "react-hot-toast";
import NotFound from "./NotFound"
import AccountLayout from "./clients/account/AccountLayout";
import HomePage from "./clients/HomePage";
import AccountHome from "./clients/account/AccountHome";
import {Provider} from "react-redux";
import store from "../store"
import Address from "./clients/account/Address";
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
                        <Route path="/account" element={<HomePage/>}>
                            <Route element={<AccountLayout/>}>
                                <Route index element={<AccountHome/>}/>
                                <Route path="address" element={<Address/>}/>
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

