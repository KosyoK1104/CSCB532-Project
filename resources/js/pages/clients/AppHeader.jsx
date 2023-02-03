// noinspection ES6UnusedImports

import React from "react";
import Me from "../../services/MeClient";
import {logout} from "../../store/clients/MeClient";
import toast from "react-hot-toast";
import {useDispatch} from "react-redux";
import {Collapse} from "bootstrap";

const AppHeader = ({me}) => {
    const dispatch = useDispatch();
    const handleLogout = () => {
        Me.logout()
            .then(() => dispatch(logout()))
            .catch((error) => toast.error(error.response.message))
    }

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
                        <li className="nav-item">
                            <span className="nav-link cursor-pointer" onClick={() => navigate('/client/account')}>Account</span>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">My packages</a>
                        </li>
                    </ul>
                    <div className="ms-auto">
                        <div className="row">
                            <div className="col">
                                <span>Hello, {me.username}!</span>
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

export default AppHeader;
