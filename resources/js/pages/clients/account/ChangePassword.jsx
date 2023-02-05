import {useState} from "react";
import Api from "../../../services/Api";
import toast from "react-hot-toast";
import FormErrorWrapper from "../../../components/FormErrorWrapper";

const ChangePassword = () => {
    let [password, setPassword] = useState({
        old_password: '',
        new_password: '',
        new_password_confirmation: ''
    })
    let [errors, setErrors] = useState({
        old_password: '',
        new_password: '',
        new_password_confirmation: ''
    })

    const handleChange = (e) => {
        setPassword({
            ...password,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        Api.post('/api/clients/me/change-password', password)
            .then(() => {
                setPassword({
                    old_password: '',
                    new_password: '',
                    new_password_confirmation: ''
                })
            })
            .catch((error) => {
                if(error.response.status === 422) {
                    setErrors(Api.resolveValidationError(error))
                    return
                }
                toast.error(Api.resolveError(error))
            })
    }

    return (
        <div className="container">
            <div className="card">
                <form onSubmit={handleSubmit}>
                    <div className="card-header">
                        <h4 className="card-title">Change password</h4>
                    </div>
                    <div className="card-body">
                        <FormErrorWrapper error={errors.old_password}>
                            <label htmlFor="old_password">Old password</label>
                            <input type="password" name="old_password" id="old_password" className="form-control"
                                   value={password.old_password} onChange={handleChange}/>
                        </FormErrorWrapper>
                        <FormErrorWrapper error={errors.new_password}>
                            <label htmlFor="new_password">New password</label>
                            <input type="password" name="new_password" id="new_password" className="form-control"
                                   value={password.new_password} onChange={handleChange}/>
                        </FormErrorWrapper>
                        <FormErrorWrapper error={errors.new_password_confirmation}>
                            <label htmlFor="new_password_confirmation">Confirm new password</label>
                            <input type="password" name="new_password_confirmation" id="new_password_confirmation"
                                   className="form-control" value={password.new_password_confirmation}
                                   onChange={handleChange}/>
                        </FormErrorWrapper>
                    </div>
                    <div className="card-footer">
                        <button type="submit" className="btn btn-primary">Change password</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default ChangePassword
