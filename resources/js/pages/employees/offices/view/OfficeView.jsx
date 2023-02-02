import {useParams} from "react-router-dom";
import {useState} from "react";
import Api from "../../../../services/Api";

const OfficeView = () => {
    const {id} = useParams();
    let [office, setOffice] = useState({
        id: id,
        visual_id: null,
        name: '',
        city: '',
        address: '',
    });
    const onChange = (e) => {
        setOffice(
            {
                ...office,
                name: e.target.value
            })
    }

    const onSubmit = (e) => {
        e.preventDefault();
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
                        <h3>Office {office.visual_id}</h3>
                    </div>
                    <div className="card-body">
                        <div className="row">
                            <div className="col-md-6 col-12">
                                <div className="form-group">
                                    <label htmlFor={"name"}>Name</label>
                                    <input type="text" className="form-control" id="name" name="name"
                                           value={office.name} onChange={onChange}/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor={"city"}>City</label>
                                    <input type="text" className="form-control" id="city" name="city"
                                           value={office.city} onChange={onChange}/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor={"address"}>Address</label>
                                    <input type="text" className="form-control" id="address" name="address"
                                           value={office.address} onChange={onChange}/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="card-footer">
                        <button className="btn btn-primary">Save</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default OfficeView;
