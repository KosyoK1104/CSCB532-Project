import {useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import Api from "../../../../services/Api";
import InfoLine from "../../../../components/InfoLine";

const EmployeeHome = () => {
    const {id} = useParams();
    let [employee, setEmployee] = useState({
        id: null,
        name: null,
        email: null,
        phone_number: null,
        profile_picture: null,
        type: null,
    });

    useEffect(() => {
        Api.get(`/api/employees/employees/${id}`)
            .then((result) => {
                setEmployee(result.data.data);
            })
            .catch((error) => {
                console.log((error))
            })
    }, [])
    return (
        <div className="card">
            <div className="card-body">
                <div className="row">
                    <div className="col-md-4">
                        <img src={employee.profile_picture} alt="Profile picture" className="rounded img"/>
                    </div>
                    <div className="col-md-8">
                        <InfoLine label="Name" value={employee.name} size="small"/>
                        <InfoLine label="Email" value={employee.email}/>
                        <InfoLine label="Phone number" value={employee.phone_number}/>
                        <InfoLine label="Type" value={employee.type}/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EmployeeHome;
