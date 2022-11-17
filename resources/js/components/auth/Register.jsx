import React from "react";

export default function Register() {
    return (
        <div className="card ">
            <div className="card-header">
                Register
            </div>
            <div className="card-body container__body">
                <div className="card__body">
                    <form method="POST">
                        <div className="form-group">
                            <label htmlFor="email">Email address</label>
                            <input type="text" name="email" className="form-control"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="username">Username</label>
                            <input type="text" name="username" className="form-control"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input type="password" name="password" className="form-control"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="repeat_password">Repeat password</label>
                            <input type="password" name="repeat_password" className="form-control"/>
                        </div>
                        <button type="submit" className="btn btn-primary mt-2"
                                onClick={event => event.preventDefault()}>Register
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}
