import {useParams} from "react-router-dom";
import {useState} from "react";
import Api from "../../../../services/Api";

const OfficeView = () => {
    const {id} = useParams();
    let [name, setName] = useState('');
    let [city, setCity] = useState('');
    let [address, setAddress] = useState('');

    const onChangeName = (e) => {
        setName(e.target.value);
    }

    const onChangeCity = (e) => {
        setCity(e.target.value);
    }

    const onChangeAddress = (e) => {
        setAddress(e.target.value);
    }


    // Make setter to be one
    const onSubmit = (e) => {
        e.preventDefault();

        const office = {
            id: id,
            name: name,
            city: city,
            address: address,
        }

        Api.post('/api/employees/offices', office)
            .catch((error) => {
                console.log(error)
            })
    }

    return (
        <div className="container">
            <div className="card">
                <form onSubmit={onSubmit}>
                    <div className="card-header">
                        <h3>Office# {id}</h3>
                    </div>
                    <div className="card-body">
                        <div className="row">
                            <div className="col-md-6 col-12">
                                <div className="form-group">
                                    <label htmlFor={"name"}>Name</label>
                                    <input type="text" className="form-control" id="name" name="name"
                                           value={name} onChange={onChangeName}/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor={"city"}>City</label>
                                    <input type="text" className="form-control" id="city" name="city"
                                           value={city} onChange={onChangeCity}/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor={"address"}>Address</label>
                                    <input type="text" className="form-control" id="address" name="address"
                                           value={address} onChange={onChangeAddress}/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="card-footer">
                        <button type={"submit"} className="btn btn-primary">Save</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default OfficeView;
