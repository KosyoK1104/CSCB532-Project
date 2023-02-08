import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import Api from "../../../../services/Api";
import toast from "react-hot-toast";
import LoaderProvider from "../../../../components/LoaderProvider";
import FormErrorWrapper from "../../../../components/FormErrorWrapper";

const CreateOffice = () => {
    let [office, setOffice] = useState({
        name: '',
        city: '',
        address: '',
    });

    const navigate = useNavigate();

    const [errors, setErrors] = useState({
        name: null,
        city: null,
        address: null,
    })

    const handleChange = (e) => {
        setOffice({
            ...office,
            [e.target.name]: e.target.value
        })
        setErrors({
            ...errors,
            [e.target.name]: null
        })
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        Api.post('/api/employees/offices', office)
            .then(() => navigate('/employee/offices'))
            .catch((error) => {
                if (error.response.status === 422) {
                    setErrors(Api.resolveValidationError(error))
                }
                toast.error(Api.resolveError(error))
            })
    };

    return (
        <div className="container">
            <div className="card">
                <div className="card-header">
                    <h3 className="card-title">{office.visual_id}</h3>
                </div>
                <LoaderProvider>
                    <form onSubmit={handleSubmit}>
                        <div className="card-body">
                            <div className="form-group">
                                <FormErrorWrapper error={errors.name}>
                                    <label htmlFor="name">Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        className="form-control"
                                        value={office.name}
                                        onChange={handleChange}
                                    />
                                </FormErrorWrapper>
                            </div>
                            <div className="form-group">
                                <FormErrorWrapper error={errors.city}>
                                    <label htmlFor="address">City</label>
                                    <input
                                        type="text"
                                        name="city"
                                        className="form-control"
                                        value={office.city}
                                        onChange={handleChange}
                                    />
                                </FormErrorWrapper>
                            </div>
                            <div className="form-group">
                                <FormErrorWrapper error={errors.address}>
                                    <label htmlFor="address">Address</label>
                                    <textarea
                                        name="address"
                                        className="form-control"
                                        value={office.address}
                                        onChange={handleChange}
                                    />
                                </FormErrorWrapper>
                            </div>
                            <div className="form-group">
                                <button className="btn btn-primary" type='submit'>Save</button>
                            </div>
                        </div>
                    </form>
                </LoaderProvider>
            </div>
        </div>
    );
}

export default CreateOffice;
