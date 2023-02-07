import InfoLine from "../../components/InfoLine";

const PackageView = ({clientPackage}) => {

    return (

        <>
            <div className="col-12 col-md-6">
                <InfoLine label="Tracking number" value={clientPackage.tracking_number}/>
            </div>
            <div className="col-12 col-md-6">
                <InfoLine label="Office# " value={clientPackage.office_id}/>
            </div>

            <div className="col-12 col-md-6">
                <InfoLine label="Delivery type" value={clientPackage.status}/>
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
        </>
    );
}

export default PackageView;
