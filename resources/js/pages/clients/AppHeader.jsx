import React, {useState} from "react";
import Me from "../../services/MeClient";
import {logout} from "../../store/clients/MeClient";
import toast from "react-hot-toast";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";

const AppHeader = ({me}) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    let [isOpen, setIsOpen] = useState(false);
    const handleLogout = () => {
        Me.logout()
            .then(() => dispatch(logout()))
            .catch((error) => toast.error(error.response.message))
    }

    return (
        <nav className="navbar navbar-light bg-light navbar-expand-lg mb-4">
            <div className="container">
                <button className="navbar-toggler" type="button" onClick={() => setIsOpen(!isOpen)}>
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className={`collapse navbar-collapse ${isOpen ? 'show ' : ''}`} id="navbarSupportedContent">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <span className="nav-link cursor-pointer"
                                  onClick={() => navigate('/client/account')}>Account</span>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link cursor-pointer"onClick={() => navigate('/client/myPackages')}>My packages</a>
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
