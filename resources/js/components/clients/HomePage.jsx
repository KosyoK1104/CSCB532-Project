import React from "react"
import Me from "../../services/Me";
import toast from "react-hot-toast";
import {Link, Outlet} from "react-router-dom";
import ClientStore from "../../store/clients";
import {logout, setMe} from "../../store/clients/me";

export class HomePage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            me: ClientStore.getState().me.me,
        }
    }

    load() {
        Me.me()
            .then((result) => {
                ClientStore.dispatch(setMe(result.me))
                console.log(ClientStore.getState().me)
                this.setState({me: ClientStore.getState().me.me})
            })
            .catch(() => {
                ClientStore.dispatch(logout())
                this.props.navigate('/login')
            })
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
                <nav className="navbar navbar-light bg-light navbar-expand-lg mb-4">
                    <div className="container">
                        <div className="collapse navbar-collapse">
                            <ul className="navbar-nav">
                                <li className="nav-item">
                                    <Link className="nav-link" to="/account">Account</Link>
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
