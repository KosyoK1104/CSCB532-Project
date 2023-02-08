import {useEffect, useState} from "react";
import PackageService from "../../../services/PackageService";
import {useNavigate} from "react-router-dom";
import LoaderProvider from "../../../components/LoaderProvider";
import Pagination from "../../../components/Pagination";
import {DEFAULT_META} from "../../../services/PaginationService";

const EmployeePackageListing = () => {
    let [meta, setMeta] = useState(DEFAULT_META);
    const navigate = useNavigate();
    let [packages, setPackages] = useState([]);
    let [searchParams, setSearchParams] = useState({
        tracking_number: '',
        delivery_type: '',
        recipient_phone_number: '',
        status: '',
    });

    const load = (page = 1) => {
        PackageService.loadEmployee(page, searchParams)
            .then((response) => {
                setPackages(response.data);
                setMeta(response.meta);
            })

    }

    const TYPES = [
        {value: '', label: ''},
        {value: 'address', label: 'Address'},
        {value: 'office', label: 'Office'},
    ]

    const STATUS_TYPES = [
        {value: '', label: ''},
        {value: 'created', label: 'created'},
        {value: 'delivered', label: 'delivered'},
    ]

    useEffect(() => {
        load()
    }, []);

    const handleSearch = (e) => {
        e.preventDefault()
        load();
    }

    //listen if all inputs are empty then load all packages
    useEffect(() => {
        if (searchParams.tracking_number === ''
            && searchParams.delivery_type === ''
            && searchParams.recipient_phone_number === ''
            && searchParams.status === '') {
            load();
        }
    }, [searchParams]);

    const handleSearchChange = (e) => {
        setSearchParams({
            ...searchParams,
            [e.target.name]: e.target.value
        })
    }


    const goToPackage = (id) => {
        navigate(`/employee/packages/${id}`)
    }

    return (
        <div className="container">
            <div className="card">
                <div className="card-header d-flex justify-content-between">
                    <h3 className="card-title">All packages</h3>
                    <div className="d-flex gx-1">
                        <button className="btn btn-success" onClick={() => navigate('/employee/packages/create')}>Create
                            package
                        </button>
                    </div>
                </div>
                <LoaderProvider>
                    <div className="card-body p-3">
                        <table className="table table-hover table-striped">
                            <thead>
                            <tr>
                                <th>Tracking number</th>
                                <th>Price</th>
                                <th>Weight</th>
                                <th>Recipient phone number</th>
                                <th>Type</th>
                                <th>Status</th>
                                <th width="10"></th>
                            </tr>
                            <tr>
                                <th>
                                    <input type="text" name="tracking_number" className="form-control form-control-sm"
                                           value={searchParams.tracking_number}
                                           onChange={handleSearchChange}/>
                                </th>
                                <th>
                                    {/*// no filter*/}
                                </th>
                                <th>
                                    {/*// no filter*/}
                                </th>
                                <th>
                                    <input className="form-control form-control-sm"
                                           name="recipient_phone_number"
                                           value={searchParams.recipient_phone_number}
                                           onChange={handleSearchChange}
                                    />
                                </th>
                                <th>
                                    <select className="form-select form-select-sm" onChange={handleSearchChange}
                                            name="delivery_type" value={searchParams.delivery_type}>
                                        {TYPES.map((type, index) => (
                                            <option key={index} value={type.value}>{type.label}</option>
                                        ))}
                                    </select>
                                </th>
                                <th>
                                    <select className="form-select form-select-sm" onChange={handleSearchChange}
                                            name="status" value={searchParams.status}>
                                        {STATUS_TYPES.map((status, index) => (
                                            <option key={index} value={status.value}>{status.label}</option>
                                        ))}
                                    </select>
                                </th>
                                <th>
                                    <button className="btn btn-primary" onClick={handleSearch}>Search</button>
                                </th>

                            </tr>
                            </thead>
                            <tbody>
                            {packages.map((el) => (
                                <tr onDoubleClick={() => goToPackage(el.id)} key={el.id}>
                                    <td>{el.tracking_number}</td>
                                    <td>{parseFloat(el.price).toFixed(2)}</td>
                                    <td>{parseFloat(el.weight).toFixed(2)}</td>
                                    <td>{el.recipient_phone_number}</td>
                                    <td>{el.delivery_type}</td>
                                    <td>{el.status}</td>
                                    <td>
                                        <button className="btn btn-outline-secondary btn-sm"
                                                onClick={() => goToPackage(el.id)}>View
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                    <Pagination meta={meta} onPageChange={load}/>
                </LoaderProvider>
            </div>
        </div>
    )
}

export default EmployeePackageListing
