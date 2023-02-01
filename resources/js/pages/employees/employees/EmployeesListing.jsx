import {useEffect, useState} from "react";
import Api from "../../../services/Api";
import {useNavigate} from "react-router-dom";
import LoaderProvider from "../../../components/LoaderProvider";

const EmployeesListing = () => {
    const [employees, setEmployees] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        Api.get('/api/employees/employees')
            .then(response => {
                setEmployees(response.data.data);
            })
            .catch(error => {
                console.log(error);
            })
    }, []);

    const goToEmployee = (id) => {
        navigate(`/employee/employees/${id}`);
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
                            </tr>
                            </thead>
                            <tbody>
                            {employees.map(employee => (
                                <tr onDoubleClick={() => goToEmployee(employee.id)} key={employee.id}>
                                    <td>{employee.name}</td>
                                    <td>{employee.email}</td>
                                    <td>{employee.type}</td>
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
