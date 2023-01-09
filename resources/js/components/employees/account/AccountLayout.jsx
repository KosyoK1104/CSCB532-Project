import React from "react";
import {BsPersonSquare} from "react-icons/bs";
import {FaRegAddressBook, FiSettings, GiSettingsKnobs, SlLogout} from "react-icons/all";
import {Outlet, useLocation, useNavigate} from "react-router-dom";
import Me from "../../../services/MeEmployee";
import {logout} from "../../../store/employees/me";
import toast from "react-hot-toast";
import {useDispatch} from "react-redux";



export default function AccountLayout(props) {
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
                            <span onClick={() => navigate('/account')}
                                  className={navLink('/account')}>
                                    <span className="nav-icon">
                                        <BsPersonSquare/></span>
                                My account
                            </span>
                        </li>
                        <li className="nav-item cursor-pointer col-12">
                            <a href="#" className="nav-link">
                                <span className="nav-icon"><GiSettingsKnobs/></span>
                                Preferences
                            </a>
                        </li>
                        <li className="nav-item cursor-pointer col-12">
                            <a href="#" className="nav-link">
                                <span className="nav-icon"><FiSettings/></span>
                                Settings
                            </a>
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
