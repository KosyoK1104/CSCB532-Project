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
        id: '',
        tracking_number: '',
        office_id: '',
        client_id: '',
        delivery_type: '',
        status: '',
        price: '',
        weight: '',
        recipient_name: '',
        recipient_phone_number: '',
        recipient_address: '',
    });

    const load = (page = 1) => {
        PackageService.load(page, searchParams)
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
                                <th>ID</th>
                                <th>Tracking number</th>
                                <th>Office ID</th>
                                <th>Client ID</th>
                                <th>Delivery type</th>
                                <th>Status</th>
                                <th>Price</th>
                                <th>Weight</th>
                                <th>Recipient name</th>
                                <th>Recipient phone</th>
                                <th>Recipient address</th>
                                <th></th>
                            </tr>
                            <tr>
                                <th>
                                    <input type="text" name="id" className="form-control" value={searchParams.id}
                                           onChange={handleSearchChange}/>
                                </th>
                                <th>
                                    <input type="text" name="tracking-number" className="form-control"
                                           value={searchParams.tracking_number}
                                           onChange={handleSearchChange}/>
                                </th>
                                <th>
                                    <input type="text" name="office-id" className="form-control"
                                           value={searchParams.office_id}
                                           onChange={handleSearchChange}/>
                                </th>
                                <th>
                                    <input type="text" name="client-id" className="form-control"
                                           value={searchParams.client_id}
                                           onChange={handleSearchChange}/>
                                </th>
                                <th>
                                    <input type="text" name="delivery-type" className="form-control"
                                           value={searchParams.delivery_type}
                                           onChange={handleSearchChange}/>
                                </th>
                                <th>
                                    <input type="text" name="status" className="form-control"
                                           value={searchParams.status}
                                           onChange={handleSearchChange}/>
                                </th>
                                <th>
                                    <input type="text" name="price" className="form-control"
                                           value={searchParams.price}
                                           onChange={handleSearchChange}/>
                                </th>
                                <th>
                                    <input type="text" name="weight" className="form-control"
                                           value={searchParams.weight}
                                           onChange={handleSearchChange}/>
                                </th>
                                <th>
                                    <input type="text" name="recipient-name" className="form-control"
                                           value={searchParams.recipient_name}
                                           onChange={handleSearchChange}/>
                                </th>
                                <th>
                                    <input type="text" name="recipient-phone-number" className="form-control"
                                           value={searchParams.recipient_phone_number}
                                           onChange={handleSearchChange}/>
                                </th>
                                <th>
                                    <input type="text" name="recipient-address" className="form-control"
                                           value={searchParams.recipient_address}
                                           onChange={handleSearchChange}/>
                                </th>
                                <th>
                                    <button className="btn btn-primary" onClick={handleSearch}>Search</button>
                                </th>

                            </tr>
                            </thead>
                            <tbody>
                            {packages.map((el) => (
                                <tr onDoubleClick={() => goToPackage(el.id)} key={el.id}>
                                    <td>{el.id}</td>
                                    <td>{el.sender}</td>
                                    <td>{el.recipient}</td>
                                    <td>{el.city}</td>
                                    <td>{el.address}</td>
                                    <td>{el.weight}</td>
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
