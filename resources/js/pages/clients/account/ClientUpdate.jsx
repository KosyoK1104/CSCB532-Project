import React, {useEffect, useState} from "react";
import Api from "../../../services/Api";
import LoaderProvider from "../../../components/LoaderProvider";
import FormErrorWrapper from "../../../components/FormErrorWrapper";
import toast from "react-hot-toast";

export default function ClientUpdate() {
    const [address, setAddress] = useState({
        id: null,
        first_name: null,
        last_name: null,
        phone_number: null,
        city: null,
        street: null,
        street_number: null,
        region: null,
        block: null,
        postal_code: null,
    })

    const [errors, setErrors] = useState({
        first_name: null,
        last_name: null,
        phone_number: null,
        city: null,
        street: null,
        street_number: null,
        region: null,
        block: null,
        postal_code: null,
    })

    const load = () => {
        Api.get('/api/clients/me/profile')
            .then(response => setAddress(response.data.data))
            .catch(error => toast.error(Api.resolveError(error)))

    }

    useEffect(() => {
        load()
    }, [])

    const handleChange = (e) => {
        setAddress({...address, [e.target.name]: e.target.value})
        setErrors({...errors, [e.target.name]: null})
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        Api.put('/api/clients/me/profile', address)
            .then(() => load())
            .catch(error => {
                if(error.response.status === 422) {
                    setErrors(Api.resolveValidationError(error))
                }
                toast.error(Api.resolveError(error))
            })
    }
    return (
        <div className="container-fluid">
            <div className="card">
                <form onSubmit={handleSubmit}>
                    <div className="card-header">
                        <h5 className="card-title ps-3 pt-2">
                            Address
                        </h5>
                    </div>

                    <LoaderProvider>
                        <div className="card-body">
                            <div className="row">
                                <div className="col-12">
                                    <div className="row">
                                        <div className="col-12 col-lg-4">
                                            <FormErrorWrapper error={errors.first_name}>
                                                <label htmlFor="first_name">First Name</label>
                                                <input name="first_name" className="form-control" type="text"
                                                       value={address.first_name} onChange={handleChange}/>
                                            </FormErrorWrapper>
                                        </div>
                                        <div className="col-12 col-lg-4">

                                            <FormErrorWrapper error={errors.last_name}>
                                                <label htmlFor="last_name">Last Name</label>
                                                <input name="last_name" className="form-control" type="text"
                                                       value={address.last_name} onChange={handleChange}/>
                                            </FormErrorWrapper><
                                            /div>
                                        <div className="col-12 col-lg-4">
                                            <FormErrorWrapper error={errors.phone_number}>
                                                <label htmlFor="phone">Phone</label>
                                                <input name="phone_number" className="form-control" type="text"
                                                       value={address.phone_number} onChange={handleChange}/>
                                            </FormErrorWrapper>
                                        </div>
                                        <div className="col-12 col-lg-6">
                                            <FormErrorWrapper error={errors.street}>
                                                <label htmlFor="street" className="form-label">Street</label>
                                                <input name="street" className="form-control" type="text"
                                                       value={address.street} onChange={handleChange}/>
                                            </FormErrorWrapper>
                                        </div>
                                        <div className="ol-12 col-lg-6">
                                            <FormErrorWrapper error={errors.street_number}>
                                                <label htmlFor="city" className="form-label">Street №</label>
                                                <input name="city" className="form-control" type="text"
                                                       value={address.street_number} onChange={handleChange}/>
                                            </FormErrorWrapper>
                                        </div>

                                        <div className="ol-12 col-lg-6">
                                            <FormErrorWrapper error={errors.region}>
                                                <label htmlFor="address1" className="form-label">Region</label>
                                                <input name="address1" className="form-control" type="text"
                                                       value={address.region} onChange={handleChange}/>
                                            </FormErrorWrapper>
                                        </div>
                                        <div className="ol-12 col-lg-6">
                                            <FormErrorWrapper error={errors.block}>
                                                <label htmlFor="region" className="form-label">Region №</label>
                                                <input name="region" className="form-control" type="text"
                                                       value={address.block} onChange={handleChange}/>
                                            </FormErrorWrapper>
                                        </div>

                                        <div className="ol-12 col-lg-6">
                                            <FormErrorWrapper error={errors.city}>
                                                <label htmlFor="city" className="form-label">City</label>
                                                <input name="city" className="form-control" type="text"
                                                       value={address.city} onChange={handleChange}/>
                                            </FormErrorWrapper>
                                        </div>

                                        <div className="ol-12 col-lg-6">
                                            <FormErrorWrapper error={errors.postal_code}>
                                                <label htmlFor="address1" className="form-label">Postal code</label>
                                                <input name="address1" className="form-control" type="text"
                                                       value={address.postal_code} onChange={handleChange}/>
                                            </FormErrorWrapper>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="card-footer">
                            <button type="submit" className="btn btn-primary">Save</button>
                        </div>
                    </LoaderProvider>
                </form>
            </div>
        </div>
    )
}
