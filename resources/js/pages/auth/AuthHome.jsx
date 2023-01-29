import React from "react";
import {useNavigate} from "react-router-dom";
import {Card, Col, Row} from "antd";

export default function AuthHome() {
    const navigate = useNavigate()
    return (
        <div>
        </div>
        /*
                <div className="card ">
                    <div className="card-header">
                        Home
                    </div>
                    <div className="card-body container__body">
                        <div className="card__body">
                            <div className="row">
                                <div className="col d-flex justify-content-center">
                                    <button className="btn btn-primary" onClick={() => navigate('login')}>Login</button>
                                </div>
                                <div className="col d-flex justify-content-center">
                                    <button className="btn btn-primary" onClick={() => navigate('register')}>Register
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>*/
    )
}
