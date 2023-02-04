import {useParams} from "react-router-dom";
import {useState} from "react";
import Api from "../../services/Api";
import InfoLine from "../../components/InfoLine";

const PackageView = () => {
    const {id} = useParams();

    let [clientPackage, setClientPackage] = useState({
        id: id,
        sender: 'Test',
        recipient: 'Test',
        city: 'Test',
        address: 'Test',
        weight: 'Test',
    });

    const onChange = (e) => {
        setClientPackage({
            ...clientPackage,
            name: e.target.value
        })
    }

    const onSubmit = (e) => {
        e.preventDefault();
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
                <div className="card-body">
                    <div className="row">
                        <div className="col-12 col-md-6">
                            <InfoLine label="Sender" value={clientPackage.sender}/>
                        </div>
                        <div className="col-12 col-md-6">
                            <InfoLine label="Recipient" value={clientPackage.recipient}/>
                        </div>
                        <div className="col-12 col-md-6">
                            <InfoLine label="City" value={clientPackage.city}/>
                        </div>
                        <div className="col-12 col-md-6">
                            <InfoLine label="Address" value={clientPackage.address}/>
                        </div>
                        <div className="col-12 col-md-6">
                            <InfoLine label="Weight" value={clientPackage.weight}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PackageView;
