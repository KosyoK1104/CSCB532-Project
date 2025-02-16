import {useDispatch} from "react-redux";
import {setMe} from "../store/clients/MeClient";

const requireLogin = (to, from, next) => {
    const me = store.getState().me
    const dispatch = useDispatch()
    if(me.id === null) {
        Me.me()
            .then(result => {
                dispatch(setMe(result))
            })
            .catch(() => {
                next().redirect('/login')
            })
        return
    }
    next()
};

export default requireLogin
