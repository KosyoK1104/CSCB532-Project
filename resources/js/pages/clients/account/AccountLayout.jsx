import React from "react";
import {BsPersonSquare} from "react-icons/bs";
import {FaRegAddressBook, FiSettings, SlLogout} from "react-icons/all";
import {Outlet, useLocation, useNavigate} from "react-router-dom";
import Me from "../../../services/MeClient";
import {logout} from "../../../store/clients/MeClient";
import toast from "react-hot-toast";
import {useDispatch} from "react-redux";

export default function AccountLayout() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const location = useLocation()
    const handleLogout = () => {
        Me.logout()
            .then(() => dispatch(logout()))
            .catch((error) => toast.error(error.response.message))
    }

    let navLink = (path) => {
        let classes = ['nav-link']
        console.log(location)
        if(path === location.pathname) {
            classes.push('active')
        }
        return classes.join(' ')
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-12 col-lg-3">
                    <ul className="nav nav-pills">
                        <li className="nav-item cursor-pointer col-12">
                            <span onClick={() => navigate('/client/account')}
                                  className={navLink('/client/account')}>
                                    <span className="nav-icon">
                                        <BsPersonSquare/></span>
                                My account
                            </span>
                        </li>
                        <li className="nav-item cursor-pointer col-12">
                            <span onClick={() => navigate('/client/account/update')}
                                  className={navLink('/client/account/update')}>
                                <span className="nav-icon"><FaRegAddressBook/></span>
                                Update
                            </span>
                        </li>
                        <li className="nav-item cursor-pointer col-12">
                            <span onClick={() => navigate('/client/account/change-password')}
                                  className={navLink('/client/account/change-password')}>
                                    <span className="nav-icon">
                                        <FiSettings/></span>
                                Change password
                            </span>
                        </li>
                        <li className="nav-item cursor-pointer col-12">
                            <span onClick={handleLogout} className="nav-link">
                                <span className="nav-icon"><SlLogout/></span>
                                Logout
                            </span>
                        </li>
                    </ul>
                </div>
                <div className="col-12 col-lg-9 mt-3 mt-lg-0">
                    <Outlet/>
                </div>
            </div>
        </div>
    )
}
