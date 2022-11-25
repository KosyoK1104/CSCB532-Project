import React from "react";
import {Link, Outlet} from "react-router-dom";
import Me from "./../../services/Me"
import toast from "react-hot-toast";

class ClientLayout extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            me: Me.initialState(),

        }
    }

    load() {
        Me.me()
            .then((result) => {
                this.setState({me: result.me})
            })
        console.log(this.state)
    }

    componentDidMount() {
        this.load()
    }

    handleLogout() {
        Me.logout()
            .catch((error) => toast.error(error.response.message))
    }

    render() {
        return (
            <div>
                <nav className="navbar navbar-light bg-light navbar-expand-lg">
                    <div className="container">
                        <div className="collapse navbar-collapse">
                            <ul className="navbar-nav">
                                <li className="nav-item">
                                    <Link className="nav-link" to="/profile">Account</Link>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#">Deliveries</a>
                                </li>
                            </ul>
                            <div className="ms-auto">
                                <div className="row">
                                    <div className="col">
                                        <span>Hello {this.state.me.username}</span>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col">
                                        <span className="cursor-pointer text-link"
                                              onClick={this.handleLogout}>Logout</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>
                <Outlet/>
            </div>
        )
    }
}

export default ClientLayout
