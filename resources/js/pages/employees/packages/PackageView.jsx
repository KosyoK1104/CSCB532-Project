import PackageViewInfo from "../../../components/package/PackageViewInfo";
import {useParams} from "react-router-dom";
import {useState, useEffect} from "react";
import Api from "../../../services/Api";
import LoaderProvider from "../../../components/LoaderProvider";
import InfoLine from "../../../components/InfoLine";

const EmployeePackageView = () => {
    let {id} = useParams();
    let [clientPackage, setClientPackage] = useState({
        id: '',
        tracking_number: '',
        office: '',
        client_name: '',
        client_phone_number: '',
        delivery_type: '',
        status: '',
        price: '',
        weight: '',
        recipient_name: '',
        recipient_phone_number: '',
        recipient_address: '',
    });

    function load() {
        Api.get('/api/employees/packages/' + id)
            .then(response => {
                console.log(response.data.data);
                setClientPackage(response.data.data);
            })
    }

    useEffect(() => {
        load()
    }, []);

    function markAsDelivered() {
        Api.put('/api/employees/packages/' + id + "/deliver")
            .then(() => {
                load()
            })
    }

    return (
        <div className="container">
            <div className="card">
                <LoaderProvider>
                    <div className="card-header">
                        <h3>Package {clientPackage.tracking_number}</h3>

                        {clientPackage.status === "created" && (<div className="card-options">
                            <button className="btn btn-primary" onClick={markAsDelivered}>Mark as delivered</button>
                        </div>)}

                    </div>
                    <div className="card-body">
                        <PackageViewInfo clientPackage={clientPackage}></PackageViewInfo>
                        <div className="col-12 col-md-6">
                            <InfoLine label="Client" value={clientPackage.client_name}/>
                        </div>
                    </div>
                </LoaderProvider>
            </div>
        </div>
    );
}

export default EmployeePackageView;
