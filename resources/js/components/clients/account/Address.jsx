import React from "react";
import {useSelector} from "react-redux";

export default function Address(props) {
    const me = useSelector(state => state.clientMe.me)

    return (
        <div className="container-fluid">
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title ps-3 pt-2">
                        Address
                    </h5>
                    <div className="card-text p-3">
                        <div className="row">
                            <div className="col-12 col-lg-6">
                                <div className="row">
                                    <div>
                                        <div className="col-12">
                                            <label htmlFor="region" className="form-label">Region</label>
                                            <input name="region" className="form-control" type="text"/>
                                        </div>

                                        <div className="col-12">
                                            <label htmlFor="city" className="form-label">City</label>
                                            <input name="city" className="form-control" type="text"/>                                        </div>

                                        <div className="col-12">
                                            <label htmlFor="address1" className="form-label">Address 1</label>
                                            <input name="address1" className="form-control" type="text"/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 col-lg-6">
                                <div className="row">
                                    <div>
                                        <div className="col-12">
                                            <label htmlFor="region" className="form-label">Region</label>
                                            <input name="region" className="form-control" type="text"/>
                                        </div>

                                        <div className="col-12">
                                            <label htmlFor="city" className="form-label">City</label>
                                            <input name="city" className="form-control" type="text"/>                                        </div>

                                        <div className="col-12">
                                            <label htmlFor="address1" className="form-label">Address 1</label>
                                            <input name="address1" className="form-control" type="text"/>
                                        </div>
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
