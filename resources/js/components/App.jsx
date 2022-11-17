import React, {useState} from "react";
import "./App.css"
import {BrowserRouter, Routes, Route} from "react-router-dom";
import AuthLayout from "./auth/AuthLayout"
import AuthHome from "./auth/AuthHome"
import Register from "./auth/Register"
import Login from "./auth/Login"
export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<AuthLayout/>}>
                    <Route index element={<AuthHome/>}></Route>
                    <Route path="register" element={<Register/>}></Route>
                    <Route path="login" element={<Login/>}></Route>
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

