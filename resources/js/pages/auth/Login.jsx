import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import ClientAuthService from "../../services/ClientAuthService";
import EmployeeAuthService from "../../services/EmployeeAuthService";
import toast from "react-hot-toast";
import Api from "../../services/Api";
import {useDispatch} from "react-redux";

export default function Login() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [form, setForm] = useState({
        email: null,
        password: null,
    })
    const [submitLoading, setSubmitLoading] = useState(false)
    const [error, setError] = useState(null)

    function handleInput(event) {
        setForm(form => ({
            ...form,
            ...{[event.target.name]: event.target.value}
        }))
    }

    function handleClientLogin(event) {
        setSubmitLoading(true)
        ClientAuthService.login(form)
            .then(result => {
                navigate('/client/account')
            })
            .catch(error => {
                setError(Api.resolveError(error))
                toast.error(Api.resolveError(error))
            })
            .finally(() => setSubmitLoading(false))
    }

    function handleEmployeeLogin(event) {
        setSubmitLoading(true)
        EmployeeAuthService.login(form)
            .then(result => {
                navigate('/employee/account')
            })
            .catch(error => {
                setError(Api.resolveError(error))
                toast.error(Api.resolveError(error))
            })
            .finally(() => setSubmitLoading(false))
    }

    return (
        <div className="card w-100 w-lg-25 w-sm-75 w-md-50  position-absolute top-50 start-50 translate-middle">
            <form>
                <div className="card-header">
                    <h4 className="card-title text-center text-secondary">Login</h4>
                    <hr/>
                </div>
                <div className="card-body px-4">
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input type="email" className="form-control" id="email" name="email"
                               value={form.email} onChange={handleInput}>
                        </input>
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" className="form-control" id="password" name="password"
                               value={form.password} onChange={handleInput}>
                        </input>
                    </div>
                </div>
                <div className="card-footer pb-2 d-flex flex-sm-row flex-column justify-content-center gap-2">
                    <button type="button" className="btn btn-primary" onClick={handleClientLogin}>Login as client
                    </button>
                    <button type="button" className="btn btn-outline-primary" onClick={handleEmployeeLogin}>Login as
                        employee
                    </button>
                </div>
            </form>
        </div>
    )
}
