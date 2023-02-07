import {useEffect, useState} from "react";
import OfficeService from "../../../../services/OfficeService";
import {useNavigate} from "react-router-dom";
import '../OfficeListing.css';
import {useSelector} from "react-redux";
import LoaderProvider from "../../../../components/LoaderProvider";
import {DEFAULT_META} from "../../../../services/PaginationService";
import Pagination from "../../../../components/Pagination";
import Api from "../../../../services/Api";

const OfficeListing = () => {
    const me = useSelector(state => state.meEmployee.me);
    const navigate = useNavigate();

    const [offices, setOffices] = useState([]);
    const [meta, setMeta] = useState(DEFAULT_META);
    const [searchParams, setSearchParams] = useState({
        visual_id: '',
        name: '',
        city: '',
        status: '',
    })

    const TYPES = [
        {value: '', label: ''},
        {value: 'active', label: 'Active'},
        {value: 'inactive', label: 'Inactive'},
    ]

    const load = (page = 1) => {
        OfficeService.load(page, searchParams)
            .then((response) => {
                setOffices(response.data)
                //id, name, city, address FIND visual_id
                //TODO show notification if there are no offices
                if (response.data.length === 0) {
                    alert('No offices found')
                }

                setMeta(response.meta);
            })
    }

    useEffect(() => {
        load();
    }, []);

    const handleSearchChange = (e) => {
        setSearchParams({
            ...searchParams,
            [e.target.name]: e.target.value
        })
    }

    const goToEditOffice = (id) => {
        if(me.type !== 'admin') {
            return;
        }

        navigate(`/employee/offices/${id}`)
    }

    const deleteOffice = (id) => {
        Api.delete(`/api/employees/offices/${id}`)
            .then(() => load())
    }

    const activateOffice = (id) => {
        Api.post(`/api/employees/offices/${id}/activate`)
            .then(() => load())
    }

    return (
        <div className="container">
            <div className="card">
                <div className="card-header d-flex justify-content-between">
                    <h3 className="card-title">Offices</h3>
                    {/*TODO @Simeon - create new tab tor creating offices and make controller and route*/}
                    {
                        me.type === 'admin' && (
                        <div className="d-flex gx-1">
                            <button onClick={() => navigate('/employee/offices/create')}
                                    className="btn btn-success">Create
                            </button>
                        </div>
                        )
                    }

                </div>
                <div className="card-body">
                    <LoaderProvider>
                        <table className="table table-hover table-striped">
                            <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>City</th>
                                <th>Status</th>
                                <th width="10"></th>
                            </tr>
                            <tr>
                                <th>
                                    <input type="text" name="id" className="form-control form-control-sm" value={searchParams.id}
                                           onChange={handleSearchChange}/>
                                </th>
                                <th>
                                    <input type="text" name="name" className="form-control form-control-sm" value={searchParams.name}
                                           onChange={handleSearchChange}/>
                                </th>
                                <th>
                                    <input type="text" name="city" className="form-control form-control-sm" value={searchParams.city}
                                           onChange={handleSearchChange}/>
                                </th>
                                <th>
                                    <select className="form-select form-select-sm" onChange={handleSearchChange}
                                            name="status" value={searchParams.status}>
                                        {TYPES.map((status, index) => (
                                            <option key={index} value={status.value}>{status.label}</option>
                                        ))}
                                    </select>
                                </th>
                                <th>
                                    <button className="btn btn-primary w-100" onClick={load}>Search</button>
                                </th>
                            </tr>
                            </thead>
                            <tbody>
                            {offices.map((office) => (
                                <tr onDoubleClick={() => goToEditOffice(office.id)} key={office.id}>
                                    <td>{office.visual_id}</td>
                                    <td>{office.name}</td>
                                    <td>{office.city}</td>
                                    <td>{office.status}</td>
                                    <td>
                                        {
                                            (me.type === 'admin') && ((office.status === 'active') && (
                                                <div className="d-flex gap-2">
                                                    <button className="btn btn-sm btn-outline-warning w-100" onClick={() => goToEditOffice(office.id)}>Edit
                                                    </button>
                                                    <button className="btn btn-sm btn-outline-danger w-100" onClick={() => deleteOffice(office.id)} >Delete
                                                    </button>
                                                </div>
                                            ) || (
                                                <button className="btn btn-sm btn-outline-success w-100" onClick={() => activateOffice(office.id)}>Activate</button>
                                            ))
                                        }
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
    )
}

export default OfficeListing
