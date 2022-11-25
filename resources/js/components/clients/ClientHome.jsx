import React from "react";

class ClientHome extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="container">
                {/*<div className="row">*/}
                    <div className="d-flex flex-column">
                        <ul className="nav nav-pills">
                            <li className="nav-item">
                                <a href="#" className="nav-link active">Acc</a>
                            </li>
                            <li className="nav-item">
                                <a href="#" className="nav-link">Acc</a>
                            </li>
                            <li className="nav-item">
                                <a href="#" className="nav-link">Acc</a>
                            </li>
                        </ul>
                    </div>
                    {/*<div className="col-9"></div>*/}
                {/*</div>*/}
            </div>
        )
    }
}

export default ClientHome
