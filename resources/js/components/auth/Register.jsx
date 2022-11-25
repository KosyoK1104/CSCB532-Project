import React, {useState} from "react";
import ClientAuthService from "../../services/ClientAuthService";
import {useNavigate} from "react-router-dom";
import Api from "../../services/Api";

export default function Register() {

    const navigate = useNavigate()
    const [errors, setErrors] = useState({
        email: [],
        username: [],
        password: [],
        repeat_password: []
    })
    const [form, setForm] = useState({
        email: null,
        username: null,
        password: null,
        repeat_password: null
    })

    function handleInput(event) {
        setForm(form => ({
            ...form,
            ...{[event.target.name]: event.target.value}
        }))
    }

    function handleRegister() {
        ClientAuthService.register(form)
            .then(response => navigate('/login'))
            .catch(error => {
                setErrors(Api.resolveValidationError(error))
            })
    }

    return (
        <div className="card ">
            <div className="card-header">
                Register
            </div>
            <div className="card-body container__body">
                <div className="card__body">
                    <form method="POST" onSubmit={(event) => event.preventDefault()}
                          noValidate="">

                        <div className={`form-group ${errors.hasOwnProperty('email') ? "is-invalid" : ""}`}>
                            <label htmlFor="email">Email address</label>
                            <input type="text" name="email" className="form-control"
                                   onChange={event => handleInput(event)}/>
                        </div>
                        {errors.email?.map((error, index) => (
                            <div key={index} className="invalid-feedback">
                                {error}
                            </div>
                        ))}
                        <div className={`form-group ${errors.hasOwnProperty('username') ? "is-invalid" : ""}`}>
                            <label htmlFor="username">Username</label>
                            <input type="text" name="username" className="form-control"
                                   onChange={event => handleInput(event)}/>
                        </div>
                        {errors.username?.map((error, index) => (
                            <div key={index} className="invalid-feedback">
                                {error}
                            </div>
                        ))}
                        <div className={`form-group ${errors.hasOwnProperty('password') ? "is-invalid" : ""}`}>
                            <label htmlFor="password">Password</label>
                            <input type="password" name="password" className="form-control"
                                   onChange={event => handleInput(event)}/>
                        </div>
                        {errors.password?.map((error, index) => (
                            <div key={index} className="invalid-feedback">
                                {error}
                            </div>
                        ))}
                        <div className={`form-group ${errors.hasOwnProperty('repeat_password') ? "is-invalid" : ""}`}>
                            <label htmlFor="repeat_password">Repeat password</label>
                            <input type="password" name="repeat_password" className="form-control"
                                   onChange={event => handleInput(event)}/>
                        </div>
                        {errors.repeat_password?.map((error, index) => (
                            <div key={index} className="invalid-feedback">
                                {error}
                            </div>
                        ))}
                        <button type="submit" className="btn btn-primary mt-2"
                                onClick={() => handleRegister()}>Register
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}
