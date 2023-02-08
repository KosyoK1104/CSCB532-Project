import {useNavigate} from "react-router-dom";
import Api from "../../../services/Api";
import {useState} from "react";
import toast from "react-hot-toast";
import FormErrorWrapper from "../../../components/FormErrorWrapper";

const CreateEmployee = () => {
    let [employee, setEmployee] = useState({
        email: null,
        name: null,
        phone_number: null,
        type: 'office'
    });
    let [errors, setErrors] = useState({
        email: null,
        name: null,
        phone_number: null,
        type: null,
    })
    let navigate = useNavigate();

    const handleChange = (e) => {
        setEmployee({
            ...employee,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        Api.post('/api/employees/employees', employee)
            .then(() => navigate('/employee/employees'))
            .catch((error) => {
                if(error.response.status === 422) {
                    setErrors(Api.resolveValidationError(error))
                    return;
                }
                toast.error(Api.resolveError(error))
            })
    }

    return (
        <div className="container">
            <div className="card">
                <form className="form" onSubmit={handleSubmit}>
                    <div className="card-header">
                        <h4 className="card-title">Create employee</h4>
                    </div>
                    <div className="card-body">
                        <FormErrorWrapper error={errors.email}>
                            <label htmlFor="email" className="form-label">Email</label>
                            <input name="email" className="form-control" onChange={handleChange}
                                   value={employee.email}/>
                        </FormErrorWrapper>
                        <FormErrorWrapper error={errors.name}>
                            <label htmlFor="name" className="form-label">Name</label>
                            <input name="name" className="form-control" onChange={handleChange} value={employee.name}/>
                        </FormErrorWrapper>
                        <FormErrorWrapper error={errors.phone_number}>
                            <label htmlFor="phone_number" className="form-label">Phone number</label>
                            <input name="phone_number" className="form-control" onChange={handleChange}
                                   value={employee.phone_number}/>
                        </FormErrorWrapper>
                        <FormErrorWrapper error={errors.type}>
                            <label htmlFor="type" className="form-label">Type</label>
                            <select name="type" className="form-select" onChange={handleChange} value={employee.type}>
                                <option value="admin">Admin</option>
                                <option value="delivery">Delivery</option>
                                <option value="office">Office</option>
                            </select>
                        </FormErrorWrapper>
                    </div>
                    <div className="card-footer">
                        <button type="submit" className="btn btn-primary">Create</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default CreateEmployee
