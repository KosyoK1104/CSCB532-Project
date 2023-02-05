import EmployeeProfileService from "../../../services/EmployeeProfileService";
import {useEffect, useState} from "react";
import './AccountSettings.css';
import FormErrorWrapper from "../../../components/FormErrorWrapper";
import Api from "../../../services/Api";
import toast from "react-hot-toast";

const AccountSettings = () => {
    const DEFAULT_PROFILE_PICTURE = '/storage/default-profile-picture.png';

    let [user, setUser] = useState({
        name: '',
        phone_number: '',
        profile_picture: '',
    });
    let [errors, setErrors] = useState({
        name: '',
        phone_number: '',
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
                toast.error(Api.resolveError(error));
            })
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        EmployeeProfileService.update(user)
            .catch((error) => {
                if(error.response.status === 422) {
                    setErrors(Api.resolveValidationError(error));
                }
                toast.error(Api.resolveError(error));
            })
    };

    return (
        <div className="container-fluid">
            <div className="card">
                <div className="card-header">
                    <h5 className="card-title">
                        My account
                    </h5>
                </div>
                <div className="card-body">
                    <div className="row">
                        <div className="col-md-6 col-12">
                            <form onSubmit={handleSubmit} id="settings">
                                <FormErrorWrapper error={errors.name}>
                                    <label htmlFor="name">Name</label>
                                    <input type="text" className="form-control" id="name" name="name"
                                           onChange={handleChange} value={user.name}/>
                                </FormErrorWrapper>
                                <FormErrorWrapper error={errors.phone_number}>
                                    <label htmlFor="phone_number">Phone number</label>
                                    <input type="text" className="form-control" id="phone_number"
                                           name="phone_number"
                                           onChange={handleChange} value={user.phone_number}/>
                                </FormErrorWrapper>
                            </form>
                        </div>
                        <div className="col-md-6 col-12">
                            <form onSubmit={handleSubmitProfilePicture} encType="multipart/form-data"
                                  id="profile_picture">
                                <img className="profile-picture img-fluid" src={user.profile_picture}
                                     alt="Profile picture"/>
                                <div className="form-group">
                                    <label htmlFor="profile_picture"></label>
                                    <input type={"file"} name="profile_picture" onChange={handleImageChange}
                                           multiple={false} id="profile-picture"
                                           className="form-control"
                                           accept={acceptedImageTypes.join(', ')}/>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <div className="card-footer">
                    <div className="row">
                        <div className="col-6">
                            <button type="submit" form="settings" className="btn btn-primary">Save</button>
                        </div>
                        <div className="col-6">
                            <div className="d-flex gap-2">
                                <button type="submit" form="profile_picture" className="btn btn-primary">Save</button>
                                {user.profile_picture === DEFAULT_PROFILE_PICTURE ? '' :
                                    <button className="btn btn-primary"
                                            onClick={handleDeleteProfilePicture}>Delete
                                    </button>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AccountSettings;
