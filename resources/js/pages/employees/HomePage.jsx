import React, {useEffect} from "react"
import Me from "../../services/MeEmployee";
import toast from "react-hot-toast";
import {Outlet, useNavigate} from "react-router-dom";
import {logout, setMe} from "../../store/employees/MeEmployee";
import {useDispatch, useSelector} from "react-redux";
import AppHeader from "./AppHeader";

const HomePage = () => {
    const me = useSelector(state => state.meEmployee.me)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const load = () => {
        Me.me()
            .then((result) => {
                console.log(result)
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
            <AppHeader me={me} handleLogout={handleLogout}/>
            <Outlet/>
        </div>
    )
}

export default HomePage
