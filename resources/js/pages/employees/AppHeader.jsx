// noinspection ES6UnusedImports

import React from "react";
import {useNavigate} from "react-router-dom";
import {Collapse} from 'bootstrap';

const AppHeader = ({me, handleLogout}) => {
    const navigate = useNavigate();

    return (
        <nav className="navbar navbar-light bg-light navbar-expand-lg mb-4">
            <div className="container">
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                        aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav">
                        <li className="nav-item  cursor-pointer">
                            <span className="nav-link" onClick={() => navigate('/employee/account')}>Account</span>
                        </li>
                        <li className="nav-item cursor-pointer">
                            <span className="nav-link"
                                  onClick={() => navigate('/employee/packages')}>All packages</span>
                        </li>
                        <li className="nav-item cursor-pointer">
                            <span className="nav-link" onClick={() => navigate('/employee/clients')}>Clients</span>
                        </li>
                        <li className="nav-item cursor-pointer">
                            <span className="nav-link" onClick={() => navigate('/employee/offices')}>Offices</span>
                        </li>

                        {
                            me.type === 'admin' && (
                                <li className="nav-item cursor-pointer">
                                <span className="nav-link"
                                      onClick={() => navigate('/employee/employees')}>Employees</span>
                                </li>
                            )
                        }
                    </ul>
                    <div className="ms-auto">
                        <div className="row">
                            <div className="col">
                                <span>Hello, {me.email}!</span>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                        <span className="cursor-pointer text-link"
                                              onClick={handleLogout}>Logout</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default AppHeader
