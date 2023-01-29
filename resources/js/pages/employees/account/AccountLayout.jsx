import React from "react";
import {BsPersonSquare} from "react-icons/bs";
import {FiSettings, SlLogout} from "react-icons/all";
import {Outlet, useLocation, useNavigate} from "react-router-dom";
import Me from "../../../services/MeEmployee";
import {logout} from "../../../store/employees/MeEmployee";
import toast from "react-hot-toast";
import {useDispatch} from "react-redux";
import LoaderProvider from "../../../components/LoaderProvider";


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
                            <span onClick={() => navigate('/employee/account')}
                                  className={navLink('/emoloyee/account')}>
                                    <span className="nav-icon">
                                        <BsPersonSquare/></span>
                                My account
                            </span>
                        </li>
                        <li className="nav-item cursor-pointer col-12">
                            <span onClick={() => navigate('/employee/account/settings')}
                                  className={navLink('/emoloyee/account/settings')}>
                                    <span className="nav-icon">
                                        <FiSettings/></span>
                                Settings
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
                    <LoaderProvider>
                        <Outlet/>
                    </LoaderProvider>
                </div>
            </div>
        </div>
    )
}
