import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import Api from "../../../../services/Api";
import FormErrorWrapper from "../../../../components/FormErrorWrapper";
import toast from "react-hot-toast";

const UpdateEmployee = () => {
    const {id} = useParams();
    let [employee, setEmployee] = useState({
        id: null,
        name: null,
        email: null,
        phone_number: null,
        profile_picture: null,
        type: null,
    });

    const [errors, setErrors] = useState({
        name: null,
        email: null,
    })

    const handleChange = (e) => {
        console.log(e.target.name, e.target.value);
        setEmployee({
            ...employee,
            [e.target.name]: e.target.value
        })
        setErrors({
            ...errors,
            [e.target.name]: null
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        Api.put('/api/employees/employees/' + id, employee)
            .then(() => load())
            .catch((error) => {
                if(error.response.status === 422) {
                    setErrors(Api.resolveValidationError(error))
                }
                toast.error(Api.resolveError(error))
            })
    }

    const load = () => {
        Api.get(`/api/employees/employees/${id}`, employee)
            .then((result) => {
                setEmployee(result.data.data);
            })
            .catch((error) => {
                setErrors(Api.resolveError(error))
            })
    }

    useEffect(() => {
        load()
    }, [])
    return (
        <div className="card">
            <form className="form" onSubmit={handleSubmit}>

                <div className="card-header">
                    <h4 className="card-title">Update employee</h4>
                </div>
                <div className="card-body">
                    <div className="row">
                        <div className="col-md-6 col-12">
                            <FormErrorWrapper error={errors.name}>
                                <label htmlFor="name" className="form-label">Name</label>
                                <input name="name" value={employee.name} className="form-control"
                                       onChange={handleChange}/>
                            </FormErrorWrapper>
                            <FormErrorWrapper error={errors.phone_number}>
                                <label htmlFor="phone_number" className="form-label">Phone number</label>
                                <input name="phone_number" value={employee.phone_number} className="form-control"
                                       onChange={handleChange}/>
                            </FormErrorWrapper>
                        </div>
                    </div>
                </div>
                <div className="card-footer">
                    <button type="submit" className="btn btn-primary mt-2">Update</button>
                </div>
            </form>
        </div>
    )
        ;
}

export default UpdateEmployee;
