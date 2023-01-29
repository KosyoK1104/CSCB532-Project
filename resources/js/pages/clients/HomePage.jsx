import React, {useEffect} from "react"
import Me from "../../services/MeClient";
import toast from "react-hot-toast";
import {Outlet, useNavigate} from "react-router-dom";
import {logout, setMe} from "../../store/clients/MeClient";
import {useDispatch, useSelector} from "react-redux";

export default function HomePage(props) {
    const me = useSelector(state => state.meClient.me)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const load = () => {
        Me.me()
            .then((result) => {
                dispatch(setMe(result.me))
            })
            .catch(() => {
                dispatch(logout())
                navigate('/login')
            })
    }

    const handleLogout = () => {
        Me.logout()
            .then(() => dispatch(logout()))
            .catch((error) => toast.error(error.response.message))
    }

    useEffect(() => {
        load()
    }, [])

    return (
        <div>
            <nav className="navbar navbar-light bg-light navbar-expand-lg mb-4">
                <div className="container">
                    <div className="collapse navbar-collapse">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <span className="nav-link" onClick={() => navigate('/account')}>Account</span>
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
            <Outlet/>
        </div>
    )
}

/*
export class HomePage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            me: ClientStore.getState().me.me,
        }
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

        )
    }
}*/
