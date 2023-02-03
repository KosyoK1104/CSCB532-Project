import React, {useEffect} from "react";
import {useSelector} from "react-redux";
import InfoLine from "../../../components/InfoLine";
import LoaderProvider from "../../../components/LoaderProvider";
import Api from "../../../services/Api";

export default function AccountHome() {
    const id = useSelector(state => state.meClient.me.id);
    let [account, setAccount] = React.useState({
        id: id,
        name: null,
        email: null,
        phone_number: null,
        address: null,
    });

    useEffect(() => {
        Api.get('/api/clients/me/profile/summary')
            .then(response => {
                console.log(response.data.data)
                setAccount(response.data.data);
            })
            .catch(error => {
                console.log(error);
            })
    }, []);

    return (
        <div className="container-fluid">
            <div className="card">
                <div className="card-header">
                    <h5 className="card-title">
                        My account
                    </h5>
                </div>
                <LoaderProvider>
                    <div className="card-body">
                        <InfoLine label="Name" value={account.name}/>
                        <InfoLine label="Email" value={account.email}/>
                        <InfoLine label="Phone number" value={account.phone_number}/>
                        <InfoLine label="Address" value={account.address}/>
                    </div>
                </LoaderProvider>
            </div>
        </div>
    )
}
