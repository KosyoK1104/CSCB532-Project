import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import LoaderProvider from "../../../components/LoaderProvider";
import ClientLisitngService from "../../../services/ClientLisitngService";
import {DEFAULT_META} from "../../../services/PaginationService";
import Pagination from "../../../components/Pagination";

const ClientListing = () => {
    let [clients, setClients] = useState([]);
    let [searchParams, setSearchParams] = useState({
        name: null,
        email: null,
        phone_number: null,
    })
    let [meta, setMeta] = useState(DEFAULT_META);
    const navigate = useNavigate();

    const load = (page = 1) => {
        ClientLisitngService.load(page, searchParams)
            .then((result) => {
                setClients(result.data);
                setMeta(result.meta);
            })

    }
    const handleChangeSearch = (e) => {
        setSearchParams({
            ...searchParams,
            [e.target.name]: e.target.value
        })
    }

    const handleSearch = (e) => {
        e.preventDefault();
        load();
    }

    useEffect(() => {
        load()
    }, []);

    const goToClient = (id) => {
        navigate('/employee/clients/' + id);
    }

    return (
        <div className="container">
            <div className="card">
                <div className="card-header">
                    <h3 className="card-title">Clients</h3>
                </div>
                <div className="card-body">
                    <LoaderProvider>
                        <table className="table table-hover table-striped">
                            <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th></th>
                            </tr>
                            <tr>
                                <th>
                                    <input type="text" name="name" className="form-control" value={searchParams.name}
                                           onChange={handleChangeSearch}/>
                                </th>
                                <th>
                                    <input type="text" name="email" className="form-control" value={searchParams.email}
                                           onChange={handleChangeSearch}/>
                                </th>
                                <th>
                                    <input type="text" name="phone_number" className="form-control"
                                           value={searchParams.phone_number}
                                           onChange={handleChangeSearch}/>
                                </th>
                                <th>
                                    <button className="btn btn-primary" onClick={handleSearch}>Search</button>
                                </th>
                            </tr>
                            </thead>
                            <tbody>
                            {clients.map(client => (
                                <tr onDoubleClick={() => goToClient(client.id)} key={client.id}>
                                    <td>{client.name}</td>
                                    <td>{client.email}</td>
                                    <td>{client.phone_number}</td>
                                    <td>
                                        <button onDoubleClick={() => goToClient(client.id)}
                                                className="btn btn-sm btn-outline-secondary btn-sm">View
                                        </button>
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

export default ClientListing
