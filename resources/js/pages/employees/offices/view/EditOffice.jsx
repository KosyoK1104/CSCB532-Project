import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import Api from "../../../../services/Api";
import LoaderProvider from "../../../../components/LoaderProvider";
import InfoLine from "../../../../components/InfoLine";
import toast from "react-hot-toast";
import FormErrorWrapper from "../../../../components/FormErrorWrapper";

const EditOffice = () => {
    const {id} = useParams();
    let [office, setOffice] = useState({
        id: id,
        visual_id: '',
        name: '',
        city: '',
        address: '',
        status: '',
    });

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
        Api.put('/api/employees/offices/' + id, office)
            .then(() => load())
            .catch((error) => {
                if(error.response.status === 422) {
                    setErrors(Api.resolveValidationError(error))
                }
                toast.error(Api.resolveError(error))
            })
    };

    const load = () => {
        Api.get(`/api/employees/offices/${id}`, office)
            .then(response => {
                // console.log(response.data.data);
                setOffice(response.data.data);
            })
            .catch((error) => {
                setErrors(Api.resolveError(error))
            })
    }

    useEffect(() => {
        load()
    }, [])

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

export default EditOffice;
