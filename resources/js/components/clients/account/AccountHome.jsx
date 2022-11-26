import React from "react";

class AccountHome extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="container-fluid">
                <div className="card border-0">
                    <div className="card-body">
                        <h5 className="card-title">
                            My account
                        </h5>
                        <div className="card-text">
                            hello world
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default AccountHome
