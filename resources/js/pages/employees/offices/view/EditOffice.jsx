import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import Api from "../../../../services/Api";
import LoaderProvider from "../../../../components/LoaderProvider";
import InfoLine from "../../../../components/InfoLine";

const EditOffice = () => {
    const {id} = useParams();
    let [client, setClient] = useState({
        visual_id: '',
        name: '',
        city: '',
        address: '',
        status: '',
    });

    useEffect(() => {
        Api.get('/api/employees/offices/' + id)
            .then(response => {
                // console.log(response.data.data);
                setClient(response.data.data);
            })
    }, []);

    return (
        <div className="container">
            <div className="card">
                <div className="card-header">
                    <h3 className="card-title">Office</h3>
                </div>
                <LoaderProvider>
                    <div className="card-body">
                        <div className="row row-cols-md-3 row-cols-1">
                            <div className="col">
                                <InfoLine label="ID" value={client.visual_id}/>
                            </div>
                            <div className="col">
                                <InfoLine label="Name" value={client.name}/>
                            </div>
                            <div className="col">
                                <InfoLine label="City" value={client.city}/>
                            </div>
                        </div>
                        <div className="row row-cols-md-3 row-cols-1">
                            <div className="col">
                                <InfoLine label="Address" value={client.address}/>
                            </div>
                            <div className="col">
                                <InfoLine label="Status" value={client.status}/>
                            </div>
                        </div>
                    </div>
                </LoaderProvider>
            </div>
        </div>
    );
}

export default EditOffice;
