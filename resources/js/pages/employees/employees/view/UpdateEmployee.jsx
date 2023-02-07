import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import Api from "../../../../services/Api";
import FormErrorWrapper from "../../../../components/FormErrorWrapper";
import toast from "react-hot-toast";
import SelectFilter from "../../../../components/SelectFilter";
import OfficeService from "../../../../services/OfficeService";

const UpdateEmployee = () => {
    const {id} = useParams();
    let [employee, setEmployee] = useState({
        id: null,
        name: null,
        email: null,
        phone_number: null,
        profile_picture: null,
        type: null,
        office_id: null,
    });
    let [offices, setOffices] = useState([]);

    const [errors, setErrors] = useState({
        name: null,
        email: null,
        office_id: null,
    })

    const handleChange = (e) => {
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
        OfficeService.allForEmployee()
            .then((result) => {
                result = result.map(office => {
                    return {
                        value: office.id,
                        name: `[${office.visual_id}] ${office.name}`
                    }
                })
                setOffices(result)
            })
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
                            {employee.type === 'office' && (
                                <FormErrorWrapper error={errors.office_id}>
                                    <label htmlFor="office_id" className="form-label">Office</label>
                                    <SelectFilter data={offices} value={employee.office_id}
                                                  onSelect={(v) => setEmployee({
                                                      ...employee,
                                                      office_id: v
                                                  })}/>
                                </FormErrorWrapper>
                            )
                            }
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
