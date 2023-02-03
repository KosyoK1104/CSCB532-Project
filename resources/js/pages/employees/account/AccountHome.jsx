import React from "react";
import EmployeeProfileService from "../../../services/EmployeeProfileService";
import './AccountHome.css';
import InfoLine from "../../../components/InfoLine";

export default function AccountHome() {

    const [employee, setEmployee] = React.useState({
        name: '',
        phone_number: '',
        profile_picture: '',
    });

    React.useEffect(() => {
        EmployeeProfileService.get().then((result) => {
            console.log(result);
            setEmployee(result.profile);
        }).catch((error) => {
            console.log(error);
        });
    }, []);

    return (
        <div className="container-fluid">
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">
                        My account
                    </h5>
                    <div className="card-body">
                        <div className="row">
                            <div className="col-md-4">
                                <img src={employee.profile_picture} alt="Profile picture" className="rounded img"/>
                            </div>
                            <div className="col-md-8">
                                <InfoLine label="Name" value={employee.name}/>
                                <InfoLine label="Phone number" value={employee.phone_number}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
