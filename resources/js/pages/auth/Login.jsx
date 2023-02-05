import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import ClientAuthService from "../../services/ClientAuthService";
import EmployeeAuthService from "../../services/EmployeeAuthService";
import toast from "react-hot-toast";
import Api from "../../services/Api";
import FormErrorWrapper from "../../components/FormErrorWrapper";
import LoaderProvider from "../../components/LoaderProvider";

export default function Login() {
    const navigate = useNavigate()
    const [form, setForm] = useState({
        email: null,
        password: null,
    })
    const [errors, setErrors] = useState(
        {
            email: [],
            password: [],
        }
    )

    function handleInput(event) {
        setForm(form => ({
            ...form,
            ...{[event.target.name]: event.target.value}
        }))
    }

    function handleClientLogin() {
        ClientAuthService.login(form)
            .then(() => {
                navigate('/client/account')
            })
            .catch(error => {
                if (error.response.status === 422) {
                    setErrors(Api.resolveValidationError(error))
                    return
                }
                toast.error(Api.resolveError(error))
            })
    }

    function handleEmployeeLogin() {
        EmployeeAuthService.login(form)
            .then(() => {
                navigate('/employee/account')
            })
            .catch(error => {
                if (error.response.status === 422) {
                    setErrors(Api.resolveValidationError(error))
                    return
                }
                toast.error(Api.resolveError(error))
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
                        <h4 className="card-title text-center text-secondary">Login</h4>
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

                            <FormErrorWrapper error={errors.password}>
                                <label htmlFor="password">Password</label>
                                <input type="password" className="form-control" id="password" name="password"
                                       placeholder="Enter password"
                                       value={form.password} onChange={handleInput}>
                                </input>
                            </FormErrorWrapper>
                        </LoaderProvider>
                    </div>
                    <div className="card-footer pb-2 d-flex justify-content-center gap-2"
                         style={{"flex-direction": "column"}}>
                        <button type="button" className="btn btn-primary" onClick={handleClientLogin}>Login as client
                        </button>
                        <button type="button" className="btn btn-outline-primary" onClick={handleEmployeeLogin}>Login as
                            employee
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
