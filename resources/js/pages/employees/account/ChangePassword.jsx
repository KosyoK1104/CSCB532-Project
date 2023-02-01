import {useState} from "react";
import Api from "../../../services/Api";

const ChangePassword = () => {
    let [password, setPassword] = useState({
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
        Api.post('/api/employees/me/change-password', password)
            .then(() => {
                setPassword({
                    old_password: '',
                    new_password: '',
                    new_password_confirmation: ''
                })
            })
            .catch((error) => console.log(error.response))
    }

    return (
        <div className="container">
            <div className="card">
                <form onSubmit={handleSubmit}>
                    <div className="card-header">
                        <h4 className="card-title">Change password</h4>
                    </div>
                    <div className="card-body">
                        <div className="form-group">
                            <label htmlFor="old_password">Old password</label>
                            <input type="password" name="old_password" id="old_password" className="form-control"
                                   value={password.old_password} onChange={handleChange}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="new_password">New password</label>
                            <input type="password" name="new_password" id="new_password" className="form-control"
                                   value={password.new_password} onChange={handleChange}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="new_password_confirmation">Confirm new password</label>
                            <input type="password" name="new_password_confirmation" id="new_password_confirmation"
                                   className="form-control" value={password.new_password_confirmation}
                                   onChange={handleChange}/>
                        </div>
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
