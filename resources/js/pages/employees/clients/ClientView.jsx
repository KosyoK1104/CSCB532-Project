import {useEffect, useState} from "react";
import Api from "../../../services/Api";
import InfoLine from "../../../components/InfoLine";
import {useParams} from "react-router-dom";
import LoaderProvider from "../../../components/LoaderProvider";

const ClientView = () => {
    const {id} = useParams();
    let [client, setClient] = useState({
        id: '',
        username: '',
        email: '',
        name: '',
        phone_number: '',
        city: '',
        street: '',
        street_number: '',
        region: '',
        block: '',
        postal_code: '',
    });

    useEffect(() => {
        Api.get('/api/employees/clients/' + id)
            .then(response => {
                // console.log(response.data.data);
                setClient(response.data.data);
            })
    }, []);

    return (
        <div className="container">
            <div className="card">
                <div className="card-header">
                    <h3 className="card-title">Client</h3>
                </div>
                <LoaderProvider>
                    <div className="card-body">
                        <div className="row row-cols-md-3 row-cols-1">
                            <div className="col">
                                <InfoLine label="Name" value={client.name}/>
                            </div>
                            <div className="col">
                                <InfoLine label="Email" value={client.email}/>
                            </div>
                            <div className="col">
                                <InfoLine label="Phone" value={client.phone_number}/>
                            </div>
                        </div>
                        <div className="row row-cols-md-3 row-cols-1">
                            <div className="col">
                                <InfoLine label="City" value={client.city}/>
                            </div>
                            <div className="col">
                                <InfoLine label="Street" value={client.street}/>
                            </div>
                            <div className="col">
                                <InfoLine label="Street number" value={client.street_number}/>
                            </div>
                            <div className="col">
                                <InfoLine label="Region" value={client.region}/>
                            </div>
                            <div className="col">
                                <InfoLine label="Block" value={client.block}/>
                            </div>
                            <div className="col">
                                <InfoLine label="Postal code" value={client.postal_code}/>
                            </div>
                        </div>
                    </div>
                </LoaderProvider>
            </div>
        </div>
    );
}

export default ClientView
