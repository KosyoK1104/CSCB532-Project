import {useEffect, useState} from "react";
import Api from "../../../services/Api";
import {useNavigate} from "react-router-dom";
import LoaderProvider from "../../../components/LoaderProvider";

const ClientListing = () => {
    let [clients, setClients] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        Api.get('/api/employees/clients')
            .then(response => {
                setClients(response.data.data);
            })
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
                        <table className="table table-hover">
                            <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th></th>
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
                    </LoaderProvider>
                </div>
            </div>
        </div>
    );
}

export default ClientListing
