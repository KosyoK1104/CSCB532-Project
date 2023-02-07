import {useState} from "react";
import {useNavigate} from "react-router-dom";

const AppHeader = ({me, handleLogout}) => {
    const navigate = useNavigate();
    let [isOpen, setIsOpen] = useState(false);
    return (
        <nav className="navbar navbar-light bg-light navbar-expand-lg mb-4">
            <div className="container">
                <button className="navbar-toggler" type="button" onClick={() => setIsOpen(!isOpen)}>
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className={`collapse navbar-collapse ${isOpen ? 'show ' : ''}`} id="navbarSupportedContent">
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

                        {
                            me.type === 'admin' && (
                                <li className="nav-item cursor-pointer">
                                <span className="nav-link"
                                      onClick={() => navigate('/employee/report/earnings')}>Report</span>
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
