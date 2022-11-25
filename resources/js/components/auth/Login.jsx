import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import ClientAuthService from "../../services/ClientAuthService";
import toast from "react-hot-toast";
import Api from "../../services/Api";

export default function Login() {
    const navigate = useNavigate()
    const [form, setForm] = useState({
        email: null,
        password: null,
    })

    function handleInput(event) {
        setForm(form => ({
            ...form,
            ...{[event.target.name]: event.target.value}
        }))
    }

    function handleLogin(event) {
        ClientAuthService.login(form)
            .then(result => {
                navigate('/profile')
            })
            .catch(error => {
                toast.error(Api.resolveError(error))
            })
    }

    return (
        <div className="card ">
            <div className="card-header">
                Login
            </div>
            <div className="card-body container__body">
                <div className="card__body">
                    <form method="POST" onSubmit={(event) => event.preventDefault()}>
                        <div className="form-group">
                            <label htmlFor="exampleInputEmail1">Email address</label>
                            <input type="text" name="email" className="form-control"
                                   onChange={(event) => handleInput(event)}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleInputEmail1">Password</label>
                            <input type="password" name="password" className="form-control"
                                   onChange={(event) => handleInput(event)}/>
                        </div>
                        <button type="submit" className="btn btn-primary mt-2"
                                onClick={() => handleLogin()}>Login
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}
