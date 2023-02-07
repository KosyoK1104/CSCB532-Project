import PackageViewInfo from "../../../components/package/PackageViewInfo";
import {useParams} from "react-router-dom";
import {useState} from "react";

const EmployeePackageView = () => {
    let {id} = useParams();
    let [clientPackage, setClientPackage] = useState({
        id: '',
        tracking_number: '',
        office: '',
        client: '',
        client_phone_number: '',
        delivery_type: '',
        status: '',
        price: '',
        weight: '',
        recipient_name: '',
        recipient_phone_number: '',
        recipient_address: '',
    });

    return (
        <div className="container">
            <div className="card">
                <div className="card-header">
                    <h3>Package {clientPackage.tracking_number}</h3>
                </div>
                <div className="card-body">

                    <PackageViewInfo></PackageViewInfo>
                    <br></br>
                    <div>
                        <button className="btn btn-primary">Mark as delivered</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EmployeePackageView;
