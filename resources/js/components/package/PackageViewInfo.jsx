import {useParams} from "react-router-dom";
import {useState} from "react";
import Api from "../../services/Api";
import InfoLine from "../../components/InfoLine";
import LoaderProvider from "../LoaderProvider";

const PackageView = () => {
    const {id} = useParams();

    let [status, setStatus] = useState('');
    const onChangeStatus = (e) => {
        setStatus(e.target.value);
    }


    const onSubmit = (e) => {
        e.preventDefault();

        let [clientPackage, setClientPackage] = useState({
            id: id,
            tracking_number: '',
            office_id: '',
            client_id: '',
            delivery_type: '',
            status: status,
            price: '',
            weight: '',
            recipient_name: '',
            recipient_phone_number: '',
            recipient_address: '',
        });

        Api.post('/api/employees/packages', clientPackage)
            .catch((error) => {
                console.log(eror);
            })
    }

    return (
        <div className="container">
            <div className="card">
                <div className="card-header">
                    <h3>Package {clientPackage.visual_id}</h3>
                </div>
                <LoaderProvider>
                    <div className="card-body">
                        <div className="row">
                            <div className="col-12 col-md-6">
                                <InfoLine label="Tracking number" value={clientPackage.tracking_number}/>
                            </div>
                            <div className="col-12 col-md-6">
                                <InfoLine label="Office# " value={clientPackage.office_id}/>
                            </div>
                            <div className="col-12 col-md-6">
                                <InfoLine label="Client" value={clientPackage.client_id}/>
                            </div>
                            <div className="col-12 col-md-6">
                                <InfoLine label="Delivery type" value={clientPackage.status}
                                          onChange={onChangeStatus()}/>
                            </div>
                            <div className="col-12 col-md-6">
                                <InfoLine label="Price" value={clientPackage.price}/>
                            </div>
                            <div className="col-12 col-md-6">
                                <InfoLine label="Weight" value={clientPackage.weight}/>
                            </div>
                            <div className="col-12 col-md-6">
                                <InfoLine label="Recipient name" value={clientPackage.recipient_name}/>
                            </div>
                            <div className="col-12 col-md-6">
                                <InfoLine label="Recipient phone " value={clientPackage.recipient_phone_number}/>
                            </div>
                            <div className="col-12 col-md-6">
                                <InfoLine label="Recipient address" value={clientPackage.recipient_address}/>
                            </div>
                        </div>
                    </div>
                </LoaderProvider>
            </div>
        </div>
    );
}

export default PackageView;
