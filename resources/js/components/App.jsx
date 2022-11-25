import "./App.css"
import {BrowserRouter, Route, Routes} from "react-router-dom";
import AuthLayout from "./auth/AuthLayout"
import AuthHome from "./auth/AuthHome"
import Register from "./auth/Register"
import Login from "./auth/Login"
import ClientLayout from "./clients/ClientLayout"
import ClientHome from "./clients/ClientHome"
import {Toaster} from "react-hot-toast";
import NotFound from "./NotFound"
export default function App() {
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<AuthLayout/>}>
                        <Route index element={<AuthHome/>}></Route>
                        <Route path="register" element={<Register/>}></Route>
                        <Route path="login" element={<Login/>}></Route>
                    </Route>
                    <Route path="/profile" element={<ClientLayout/>}>
                        <Route index element={<ClientHome/>}></Route>
                    </Route>
                    <Route path="*" element={<NotFound/>}></Route>
                </Routes>
            </BrowserRouter>
            <Toaster/>
        </div>
    )
}

