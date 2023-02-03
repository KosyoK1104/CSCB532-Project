import {useEffect, useState} from "react";
import Api from "../../../services/Api";
import {useNavigate} from "react-router-dom";
import LoaderProvider from "../../../components/LoaderProvider";

const EmployeesListing = () => {
    const [employees, setEmployees] = useState([]);
    const navigate = useNavigate();

    const load = () => {
        Api.get('/api/employees/employees')
            .then(response => {
                setEmployees(response.data.data);
            })
            .catch(error => {
                console.log(error);
            })
    }

    useEffect(() => {
        load();
    }, []);

    const goToEmployee = (id) => {
        navigate(`/employee/employees/${id}`);
    }

    const deleteEmployee = (id) => {
        Api.delete(`/api/employees/employees/${id}`)
            .then(() => load())
    }

    return (
        <div className="container">
            <div className="card">
                <div className="card-header d-flex justify-content-between">
                    <h3 className="card-title">Employees</h3>
                    <div className="d-flex gx-1">
                        <button onClick={() => navigate('/employee/employees/create')}
                                className="btn btn-primary">Create
                        </button>
                    </div>
                </div>
                <div className="card-body">
                    <LoaderProvider>
                        <table className="table table-hover">
                            <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Type</th>
                                <th width="10"></th>
                            </tr>
                            <tr>
                                <th></th>
                                <th></th>
                                <th></th>
                                <th>
                                    <button className="btn btn-primary w-100">Search</button>
                                </th>
                            </tr>
                            </thead>
                            <tbody>
                            {employees.map(employee => (
                                <tr onDoubleClick={() => goToEmployee(employee.id)} key={employee.id}>
                                    <td>{employee.name}</td>
                                    <td>{employee.email}</td>
                                    <td>{employee.type}</td>
                                    <td>
                                        <div className="d-flex justify-content-between gap-2">
                                            <button className="btn btn-outline-secondary btn-sm w-100"
                                                    onClick={() => goToEmployee(employee.id)}>View
                                            </button>
                                            <button className="btn btn-outline-danger btn-sm w-100"
                                                    onClick={() => deleteEmployee(employee.id)}>Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </LoaderProvider>
                </div>
            </div>
        </div>
    );
}

export default EmployeesListing;
