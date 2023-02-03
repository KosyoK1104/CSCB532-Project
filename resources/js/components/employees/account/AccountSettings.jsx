import React, {useEffect} from "react"
import {useSelector} from "react-redux";
import Api from "../../../services/Api"

/*todo: HandleSubmitChange*/

export default function ChangePassword(props){
    const me = useSelector(state => state.meEmployee.me);

    const [oldPassword, newPassword, setPassword] = useState({

    })
}
