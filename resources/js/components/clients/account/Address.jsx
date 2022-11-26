import ClientStore from "../../../store/clients";
import React from "react";

export class Address extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            me: ClientStore.getState().me.me
        }
        console.log(this.state)
    }

    render() {
        return (
            <div className="container-fluid">
                <div className="card">
                    <div className="card-body">
                        <div className="card-text">
                            {this.state.me.username}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
