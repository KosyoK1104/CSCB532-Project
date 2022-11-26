import React from "react";
import {BsPersonSquare} from "react-icons/bs"
import {FaRegAddressBook, FiSettings, GiSettingsKnobs, SlLogout} from "react-icons/all";

class ClientHome extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-3">
                        <ul className="nav nav-pills">
                            <li className="nav-item col-12">
                                <a href="#"
                                   className="nav-link active">
                                    <span className="nav-icon"><BsPersonSquare/></span>
                                    <span>My account</span>
                                </a>
                            </li>
                            <li className="nav-item col-12">
                                <a href="#" className="nav-link">
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
                        <div className="container-fluid">
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">My Account</h5>
                                    <div className="row">
                                        <div className="col">
                                            Lorem ipsum
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ClientHome
