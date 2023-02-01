import {BsPersonSquare} from "react-icons/bs";
import {FiSettings} from "react-icons/all";
import LoaderProvider from "../../../../components/LoaderProvider";
import {Outlet, useNavigate, useParams} from "react-router-dom";
import React from "react";

const EmployeeLayout = () => {
    const {id} = useParams();
    const navigate = useNavigate();

    let navLink = (path) => {
        let classes = ['nav-link']
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
                            <span onClick={() => navigate(`/employee/employees/${id}`)}
                                  className={navLink(`/employee/employees/${id}`)}>
                                    <span className="nav-icon">
                                        <BsPersonSquare/></span>
                                Profile
                            </span>
                        </li>
                        <li className="nav-item cursor-pointer col-12">
                            <span onClick={() => navigate(`/employee/employees/${id}/update`)}
                                  className={navLink(`/employee/employees/${id}/update`)}>
                                    <span className="nav-icon">
                                        <FiSettings/></span>
                                Update
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

export default EmployeeLayout
