import {useEffect, useState} from "react";
import Api from "../../../services/Api";
import {useNavigate} from "react-router-dom";
import LoaderProvider from "../../../components/LoaderProvider";
import EmplolyeeListingService from "../../../services/EmployeeListingService";
import Pagination from "../../../components/Pagination";
import {DEFAULT_META} from "../../../services/PaginationService";

const EmployeesListing = () => {
    const [employees, setEmployees] = useState([]);
    const [meta, setMeta] = useState(DEFAULT_META);
    const [searchParams, setSearchParams] = useState({
        name: null,
        email: null,
        type: null,
    })

    const TYPES = [
        {value: '', label: ''},
        {value: 'admin', label: 'Admin'},
        {value: 'delivery', label: 'Delivery'},
        {value: 'office', label: 'Office'},
    ]

    const navigate = useNavigate();

    const load = (page = 1) => {
        console.log(searchParams);
        EmplolyeeListingService.load(page, searchParams).then(result => {
            setEmployees(result.data);
            setMeta(result.meta);
        })
    }

    const handleSearchChange = (e) => {
        setSearchParams({
            ...searchParams,
            [e.target.name]: e.target.value
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
                                className="btn btn-success">Create
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
                                <th>
                                    <input type="text" className="form-control form-control-sm"
                                           onChange={handleSearchChange} name="name" value={searchParams.name}/>
                                </th>
                                <th>
                                    <input type="text" className="form-control form-control-sm"
                                           onChange={handleSearchChange} name="email" value={searchParams.email}/>
                                </th>
                                <th>
                                    <select className="form-select form-select-sm" onChange={handleSearchChange}
                                            name="type" value={searchParams.type}>
                                        {TYPES.map((type, index) => (
                                            <option key={index} value={type.value}>{type.label}</option>
                                        ))}
                                    </select>
                                </th>
                                <th>
                                    <button className="btn btn-primary w-100" onClick={load}>Search</button>
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
                        <Pagination meta={meta} onPageChange={load}/>
                    </LoaderProvider>
                </div>
            </div>
        </div>
    );
}

export default EmployeesListing;
