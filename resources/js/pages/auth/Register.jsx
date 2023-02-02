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
    const [submitLoading, setSubmitLoading] = useState(false)

    function handleInput(event) {
        setForm(form => ({
            ...form,
            ...{[event.target.name]: event.target.value}
        }))
    }

    function handleRegister() {
        setSubmitLoading(true)
        ClientAuthService.register(form)
            .then(response => navigate('/login'))
            .catch(error => {
                setErrors(Api.resolveValidationError(error))
            })
            .finally(() => setSubmitLoading(false))
    }

    return (
        <div className="card w-100 w-lg-25 w-sm-75 w-md-50  position-absolute top-50 start-50 translate-middle">
            <form>
                <div className="card-header">
                    <h4 className="card-title text-center text-secondary">Register</h4>
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
                        <label htmlFor="username">Username</label>
                        <input className="form-control" id="username" name="username"
                               value={form.username} onChange={handleInput}>
                        </input>
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" className="form-control" id="password" name="password"
                               value={form.password} onChange={handleInput}>
                        </input>
                    </div>
                    <div className="form-group">
                        <label htmlFor="repeat_password">Repeat password</label>
                        <input type="password" className="form-control" id="repeat_password" name="repeat_password"
                               value={form.repeat_password} onChange={handleInput}>
                        </input>
                    </div>
                </div>
                <div className="card-footer pb-2 d-flex flex-sm-row flex-column justify-content-center gap-2">
                    <button type="button" className="btn btn-primary" onClick={handleRegister}>Register
                    </button>
                </div>
            </form>
        </div>
    )
}
