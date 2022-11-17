import React from "react";
import {Outlet} from "react-router-dom";
import "./AuthLayout.css"
export default function AuthLayout() {
    return (
        <div className="container__view">
            <div className="container-fluid ">
                <div className="container__wrapper">
                    <div className="container__card">
                        <Outlet/>
                    </div>
                </div>
            </div>
        </div>
    )
}
