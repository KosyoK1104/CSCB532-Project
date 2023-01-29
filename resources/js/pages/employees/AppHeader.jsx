import React from "react";
import {useNavigate} from "react-router-dom";

const AppHeader = ({me, handleLogout}) => {
    const navigate = useNavigate();
    return (
        <nav className="navbar navbar-light bg-light navbar-expand-lg mb-4">
            <div className="container">
                <div className="collapse navbar-collapse">
                    <ul className="navbar-nav">
                        <li className="nav-item  cursor-pointer">
                            <span className="nav-link" onClick={() => navigate('/employee/account')}>Account</span>
                        </li>
                        <li className="nav-item cursor-pointer">
                            <span className="nav-link" href="#">All packages</span>
                        </li>
                        <li className="nav-item cursor-pointer">
                            <span className="nav-link" href="#">Clients</span>
                        </li>
                        <li className="nav-item cursor-pointer">
                            <span className="nav-link" onClick={() => navigate('/employee/offices')}>Offices</span>
                        </li>
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
