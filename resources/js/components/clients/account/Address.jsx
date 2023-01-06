import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import Api from "../../../services/Api";

export default function Address(props) {
    const me = useSelector(state => state.clientMe.me)
    let loading = true
    const [address, setAddress] = useState({
        id: null,
        city: null,
        street: null,
        street_number: null,
        region: null,
        block: null,
        postal_code: null,
    })

    useEffect(() => {
        Api.get('/api/clients/me/profile')
            .then(response => setAddress(response.data))
            .finally(() => loading = false)
    }, [])

    return (
        <div className="container-fluid">
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title ps-3 pt-2">
                        Address
                    </h5>
                    <div className="card-text p-3">
                        <div className="row">
                            <div className="col-12">
                                <div className="row">
                                    <div className="col-12 col-lg-6">
                                        <label htmlFor="region" className="form-label">Street</label>
                                        <input name="region" className="form-control" type="text"
                                               value={address.street}/>
                                    </div>
                                    <div className="ol-12 col-lg-6">
                                        <label htmlFor="city" className="form-label">Street №</label>
                                        <input name="city" className="form-control" type="text"
                                               value={address.street_number}/></div>

                                    <div className="ol-12 col-lg-6">
                                        <label htmlFor="address1" className="form-label">Region</label>
                                        <input name="address1" className="form-control" type="text"
                                               value={address.region}/>
                                    </div>
                                    <div className="ol-12 col-lg-6">
                                        <label htmlFor="region" className="form-label">Region №</label>
                                        <input name="region" className="form-control" type="text"
                                               value={address.block}/>
                                    </div>

                                    <div className="ol-12 col-lg-6">
                                        <label htmlFor="city" className="form-label">City</label>
                                        <input name="city" className="form-control" type="text" value={address.city}/>
                                    </div>

                                    <div className="ol-12 col-lg-6">
                                        <label htmlFor="address1" className="form-label">Postal code</label>
                                        <input name="address1" className="form-control" type="text"
                                               value={address.postal_code}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

/*

export class Address extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            me: ClientStore.getState().me.me
        }
    }

    componentDidMount() {
        this.setState({me: ClientStore.getState().me.me})
        console.log(this.state)
    }

    render() {
        return (

        )
    }
}
*/

// export default connect(mapStateToProps)(Address)
