import React from "react";
import {BsPersonSquare} from "react-icons/bs";
import {FaRegAddressBook, FiSettings, GiSettingsKnobs, SlLogout} from "react-icons/all";
import {Outlet} from "react-router-dom";
import {Navigate} from "react-router-dom";

class AccountLayout extends React.Component {

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-3">
                        <ul className="nav nav-pills">
                            <li className="nav-item col-12">
                                <a href="/account"
                                   className="nav-link active">
                                    <span className="nav-icon">
                                        <BsPersonSquare/></span>
                                    My account
                                </a>
                            </li>
                            <li className="nav-item col-12">
                                <a href="/account/address" className="nav-link">
                                    <span className="nav-icon"><FaRegAddressBook/></span>
                                    Address
                                </a>
                            </li>
                            <li className="nav-item col-12">
                                <a href="#" className="nav-link">
                                    <span className="nav-icon"><GiSettingsKnobs/></span>
                                    Preferences
                                </a>
                            </li>
                            <li className="nav-item col-12">
                                <a href="#" className="nav-link">
                                    <span className="nav-icon"><FiSettings/></span>
                                    Settings
                                </a>
                            </li>
                            <li className="nav-item col-12">
                                <a href="#" className="nav-link">
                                    <span className="nav-icon"><SlLogout/></span>
                                    Logout
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div className="col-9">
                        <Outlet/>
                    </div>
                </div>
            </div>
        )
    }
}

export default AccountLayout
