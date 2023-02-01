import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import Api from "../../../../services/Api";

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

    const handleChange = (e) => {
        console.log(e.target.name, e.target.value);
        setEmployee({
            ...employee,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        Api.put('/api/employees/employees/' + id, employee)
            .then(() => load())
            .catch((error) => console.log(error))
    }

    const load = () => {
        Api.get(`/api/employees/employees/${id}`)
            .then((result) => {
                setEmployee(result.data.data);
            })
            .catch((error) => {
                console.log((error))
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
                            <div className="form-group mt-2">
                                <label htmlFor="name" className="form-label">Name</label>
                                <input name="name" value={employee.name} className="form-control"
                                       onChange={handleChange}/>
                            </div>
                            <div className="form-group mt-2">
                                <label htmlFor="phone_number" className="form-label">Phone number</label>
                                <input name="phone_number" value={employee.phone_number} className="form-control"
                                       onChange={handleChange}/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="card-footer">
                    <button type="submit" className="btn btn-primary mt-2">Update</button>
                </div>
            </form>
        </div>
    );
}

export default UpdateEmployee;
