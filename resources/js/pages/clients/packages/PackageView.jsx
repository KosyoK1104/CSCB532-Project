import PackageViewInfo from "../../../components/package/PackageViewInfo";
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import Api from "../../../services/Api";
import LoaderProvider from "../../../components/LoaderProvider";

const ClientPackageView = () => {
    let {id} = useParams();
    let [clientPackage, setClientPackage] = useState({
        id: '',
        tracking_number: '',
        office: '',
        delivery_type: '',
        status: '',
        price: '',
        weight: '',
        recipient_name: '',
        recipient_phone_number: '',
        recipient_address: '',
    });

    useEffect(() => {
        Api.get('/api/clients/packages/' + id)
            .then(response => {
                console.log(response.data.data);
                setClientPackage(response.data.data);
            })
    }, []);

    return (
        <div className="container">
            <div className="card">
                <LoaderProvider>
                    <div className="card-header">
                        <h3>Package {clientPackage.tracking_number}</h3>
                    </div>
                    <div className="card-body">
                        <PackageViewInfo clientPackage={clientPackage}></PackageViewInfo>
                    </div>
                </LoaderProvider>
            </div>
        </div>
    );
}

export default ClientPackageView;
