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
    });

    const load = (page = 1) => {
        PackageService.loadEmployee(page, searchParams)
            .then((response) => {
                setPackages(response.data);
                setMeta(response.meta);
            })

    }

    useEffect(() => {
        load()
    }, []);

    const handleSearch = (e) => {
        e.preventDefault()
        load();
    }

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
                <div className="card-header">
                    <h3 className="card-title">All packages</h3>
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
                                <th></th>
                            </tr>
                            <tr>
                                <th>
                                    <input type="text" name="tracking-number" className="form-control"
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
                                    <input className="form-control" value={searchParams.recipient_phone_number}
                                           name="recipient_phone_number"
                                           onChange={handleSearchChange}
                                    />
                                </th>
                                <th>
                                    <select className="form-control" value={searchParams.delivery_type}
                                           name="delivery_type"
                                           onChange={handleSearchChange}
                                    >
                                        <option value=""></option>
                                        <option value="address">Address</option>
                                        <option value="office">Office</option>
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
