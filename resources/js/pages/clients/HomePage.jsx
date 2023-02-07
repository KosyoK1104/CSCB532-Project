import React, {useEffect} from "react"
import Me from "../../services/MeClient";
import {Outlet, useNavigate} from "react-router-dom";
import {logout, setMe} from "../../store/clients/MeClient";
import {useDispatch, useSelector} from "react-redux";
import AppHeader from "./AppHeader";

export default function HomePage() {
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

    useEffect(() => {
        load()
    }, [])

    return (
        <div>
            <AppHeader me={me}/>
            <div className='pb-3'>
                <Outlet/>
            </div>
        </div>
    )
}
