import EmployeeProfileService from "../../../services/EmployeeProfileService";
import {useEffect, useState} from "react";
import './AccountSettings.css';

const AccountSettings = () => {
    const DEFAULT_PROFILE_PICTURE = '/storage/default-profile-picture.png';

    let [user, setUser] = useState({
        name: '',
        phone_number: '',
        profile_picture: '',
    });

    const acceptedImageTypes = ['image/png', 'image/jpeg', 'image/jpg'];

    useEffect(() => {
        EmployeeProfileService.get()
            .then((result) => {
                setUser(result.profile);
            })
    }, []);

    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        });
    };

    const handleImageChange = (e) => {
        if(e.target.files && e.target.files[0]) {
            let img = e.target.files[0];
            setUser({
                ...user,
                profile_picture: URL.createObjectURL(img)
            })
        }
    }

    const handleSubmitProfilePicture = (e) => {
        e.preventDefault();
        if(e.target.profile_picture.files && e.target.profile_picture.files[0]) {
            EmployeeProfileService.updateProfilePicture(e.target.profile_picture.files[0])
                .then(() => {
                    console.log(e.target.profile_picture)
                    e.target.profile_picture.value = null;
                })
                .catch((error) => {
                    console.log(error);
                })
        }

    }
    const handleDeleteProfilePicture = () => {
        setUser({
            ...user,
            profile_picture: DEFAULT_PROFILE_PICTURE
        })
        EmployeeProfileService.deleteProfilePicture()
            .catch((error) => {
                console.log(error);
            })
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        EmployeeProfileService.update(user)
            .catch((error) => {
                console.log(error);
            })
    };

    return (
        <div className="container-fluid">
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">
                        My account
                    </h5>
                    <div className="card-text">
                        <div className="row">
                            <div className="col-md-6 col-12">
                                <form onSubmit={handleSubmit}>
                                    <div className="form-group">
                                        <label htmlFor="name">Name</label>
                                        <input type="text" className="form-control" id="name" name="name"
                                               onChange={handleChange} value={user.name}/>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="phone_number">Phone number</label>
                                        <input type="text" className="form-control" id="phone_number"
                                               name="phone_number"
                                               onChange={handleChange} value={user.phone_number}/>
                                    </div>
                                    <button type="submit" className="btn btn-primary mt-3">Save</button>
                                </form>
                            </div>
                            <div className="col-md-6 col-12">
                                <form onSubmit={handleSubmitProfilePicture} encType="multipart/form-data">
                                    <img className="profile-picture" src={user.profile_picture} alt="Profile picture"/>
                                    <div className="form-group">
                                        <label htmlFor="profile_picture"></label>
                                        <input type={"file"} name="profile_picture" onChange={handleImageChange}
                                               multiple={false} id="profile-picture"
                                               accept={acceptedImageTypes.join(', ')}/>
                                    </div>
                                    <button type="submit" className="btn btn-primary mt-3">Save</button>
                                    {user.profile_picture === DEFAULT_PROFILE_PICTURE ? '' :
                                        <button className="btn btn-primary mt-3"
                                                onClick={handleDeleteProfilePicture}>Delete
                                        </button>}
                                </form>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AccountSettings;
