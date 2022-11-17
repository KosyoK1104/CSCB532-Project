import React from "react";

export default function Login() {
    return (
        <div className="card ">
            <div className="card-header">
                Login
            </div>
            <div className="card-body container__body">
                <div className="card__body">
                    <form method="POST">
                        <div className="form-group">
                            <label htmlFor="exampleInputEmail1">Email address</label>
                            <input type="text" name="email" className="form-control"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleInputEmail1">Password</label>
                            <input type="password" name="password" className="form-control"/>
                        </div>
                        <button type="submit" className="btn btn-primary mt-2"
                                onClick={event => event.preventDefault()}>Login
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}
