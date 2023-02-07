import {useEffect, useState} from "react";
import OfficeService from "../../../services/OfficeService";
import PackageService from "../../../services/PackageService";
import {useNavigate} from "react-router-dom";
import toast from "react-hot-toast";
import Api from "../../../services/Api";
import LoaderProvider from "../../../components/LoaderProvider";
import FormErrorWrapper from "../../../components/FormErrorWrapper";
import SelectFilter from "../../../components/SelectFilter";

const CreatePackage = () => {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        weight: null,
        delivery_type: 'address',
        recipient_name: null,
        recipient_address: null,
        recipient_phone_number: null,
        office_id: null,
    })

    const [errors, setErrors] = useState({
        weight: null,
        delivery_type: null,
        recipient_name: null,
        recipient_address: null,
        recipient_phone_number: null,
        office_id: null,
    })

    const [offices, setOffices] = useState([]);

    useEffect(() => {
        OfficeService.all()
            .then(result => {
                setOffices(result);
            })
    }, [])

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        PackageService.submitEmployee(form)
            .then(result => {
                navigate('/employee/packages/' + result.id)
            })
            .catch(error => {
                if(error.response.status === 422) {
                    setErrors(Api.resolveValidationError(error))
                }
                toast.error(Api.resolveError(error))
            })
    }

    return (
        <div className="container">
            <div className="card">
                <LoaderProvider>
                    <div className="card-header">
                        <h3>Create Package</h3>
                    </div>
                    <div className="card-body">
                        <form onSubmit={handleSubmit}>
                            <div className="d-flex justify-content-center">
                                <FormErrorWrapper error={errors.delivery_type}>
                                    <label htmlFor="delivery_type">Delivery Type</label>
                                    <select className="form-control" id="delivery_type" name="delivery_type"
                                            onChange={handleChange} value={form.delivery_type}>
                                        <option value="office">Office</option>
                                        <option value="address">Address</option>
                                    </select>
                                </FormErrorWrapper>
                            </div>
                            <div className="d-flex justify-content-start gap-2">
                                <FormErrorWrapper error={errors.recipient_name}>
                                    <label htmlFor="recipient_name">Recipient Name</label>
                                    <input type="text" className="form-control" id="recipient_name"
                                           name="recipient_name"
                                           onChange={handleChange} value={form.recipient_name}/>
                                </FormErrorWrapper>
                                {form.delivery_type === 'address' &&
                                    <FormErrorWrapper error={errors.recipient_address}>
                                        <label htmlFor="recipient_address">Recipient Address</label>
                                        <input type="text" className="form-control" id="recipient_address"
                                               name="recipient_address" onChange={handleChange}
                                               value={form.recipient_address}/>
                                    </FormErrorWrapper>
                                }
                                {form.delivery_type === 'office' &&
                                    <FormErrorWrapper error={errors.office_id}>
                                        <label htmlFor="office_id">Office</label>
                                        <SelectFilter/>
                                    </FormErrorWrapper>
                                }
                                <FormErrorWrapper error={errors.recipient_phone_number}>
                                    <label htmlFor="recipient_phone_number">Recipient Phone Number</label>
                                    <input type="text" className="form-control" id="recipient_phone_number"
                                           name="recipient_phone_number" onChange={handleChange}
                                           value={form.recipient_phone_number}/>
                                </FormErrorWrapper>
                            </div>
                            <div className="d-flex justify-content-start">
                                <FormErrorWrapper error={errors.weight}>
                                    <label htmlFor="weight">Weight</label>
                                    <input type="number" className="form-control" id="weight" name="weight"
                                           onChange={handleChange} value={form.weight}/>
                                </FormErrorWrapper>
                            </div>
                        </form>
                    </div>
                    <div className="card-footer">
                        <button className="btn btn-primary" onClick={handleSubmit}>Submit</button>
                    </div>
                </LoaderProvider>
            </div>
        </div>
    )
}

export default CreatePackage;
