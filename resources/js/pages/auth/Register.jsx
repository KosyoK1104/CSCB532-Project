import React, {useState} from "react";
import ClientAuthService from "../../services/ClientAuthService";
import {useNavigate} from "react-router-dom";
import Api from "../../services/Api";
import FormErrorWrapper from "../../components/FormErrorWrapper";
import LoaderProvider from "../../components/LoaderProvider";

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
            .then(() => navigate('/login'))
            .catch(error => {
                if (error.response.status === 422) {
                    console.log(Api.resolveValidationError(error))
                    setErrors(Api.resolveValidationError(error))
                    console.log(errors)
                }
            })
    }

    return (
        <div className="container w-xl-25 w-lg-50 w-md-75 w-100 vh-100 d-flex">
            <div className="card w-100 my-auto">
                <form style={{"box-shadow": "1px 10px 10px #4788b733"}}>
                    <div className="card-header" style={
                        {
                            "display": "flex",
                            "flex-direction": "column",
                            "align-content": "center",
                        }}>
                        <h4 className="card-title text-center text-secondary">Register</h4>
                        <hr/>
                    </div>
                    <div className="card-body px-4">
                        <LoaderProvider>
                            <FormErrorWrapper error={errors.email}>
                                <label htmlFor="email">Email</label>
                                <input type="email" className="form-control" id="email" name="email"
                                       placeholder="Enter email"
                                       value={form.email} onChange={handleInput}>
                                </input>
                            </FormErrorWrapper>
                            <FormErrorWrapper error={errors.username}>
                                <label htmlFor="username">Username</label>
                                <input className="form-control" id="username" name="username"
                                       placeholder="Enter username"
                                       value={form.username} onChange={handleInput}></input>
                            </FormErrorWrapper>
                            <FormErrorWrapper error={errors.password}>
                                <label htmlFor="password">Password</label>
                                <input type="password"
                                       className={`form-control ${errors.password ? 'has-validation' : ''}`}
                                       id="password" name="password" placeholder="Enter password"
                                       value={form.password} onChange={handleInput}>
                                </input>
                            </FormErrorWrapper>
                            <FormErrorWrapper error={errors.repeat_password}>
                                <label htmlFor="repeat_password">Repeat password</label>
                                <input type="password" className="form-control" id="repeat_password"
                                       name="repeat_password" placeholder="Re-enter password"
                                       value={form.repeat_password} onChange={handleInput}>
                                </input>
                            </FormErrorWrapper>
                        </LoaderProvider>
                    </div>
                    <div className="card-footer pb-2 d-flex flex-sm-row flex-column justify-content-center gap-2">
                        <button type="button" className="btn btn-primary" onClick={handleRegister}>Register
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
