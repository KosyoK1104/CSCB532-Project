import React from "react"
import "./NotFound.css"
import {FaBan} from "react-icons/fa"

class NotFound extends React.Component {

    render() {
        return (
            <div className="not-found__wrapper">
                <div className="not-found">
                    <FaBan className="not-found__icon"/>
                    <h1 className="not-found__title">Not found</h1>
                </div>
            </div>
        )
    }
}

export default NotFound
