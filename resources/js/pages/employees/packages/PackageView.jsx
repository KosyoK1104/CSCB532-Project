import {useParams} from "react-router-dom";
import {useState} from "react";
import Api from "../../../../services/Api";

const PackageView = () => {
    const {id} = useParams();
    //Пратките имат подател, получател, адрес за доставка и тегло.
    // За определяне на цената на за доставка играе роля теглото на пратката и дали тя ще се доставя до офис или до точен адрес

    let [package, setPackage] = useState({
        id: id,
        sender: '',
        recipient: '',
        city: '',
        address: '',
        weight: '',
    });

    const onChange = (e) => {
        setPackage({
            ...package,
            name: e.target.value
        })
    }

    const onSubmit = (e) => {
        e.preventDefault();
        Api.post('/api/employees/packages', package)
            .catch((error) => {
                console.log(eror);
            })
    }

    return (
        <div className="container">
            <div className="card">
                <form onSubmit={onSubmit}>
                    <div className="card-header">
                        <h3>Package {package.visual_id}</h3>
                    </div>
                    <div className="card-body">
                        <div className="row">
                            <div className="col-md-6 col-12">

                                <div className="form-group">
                                    <label htmlFor={"sender"}>Sender</label>
                                    <input type="text" className="form-control" id="sender" name="sender"
                                           value={package.sender} onChange={onChange}/>
                                </div>

                                <div className="form-group">
                                    <label htmlFor={"recipient"}>Recipient</label>
                                    <input type="text" className="form-control" id="recipient" name="recipient"
                                           value={package.recipient} onChange={onChange}/>
                                </div>

                                <div className="form-group">
                                    <label htmlFor={"city"}>City</label>
                                    <input type="text" className="form-control" id="city" name="city"
                                           value={package.city} onChange={onChange}/>
                                </div>

                                <div className="form-group">
                                    <label htmlFor={"address"}>Address</label>
                                    <input type="text" className="form-control" id="address" name="address"
                                           value={package.address} onChange={onChange}/>
                                </div>

                                <div className="form-group">
                                    <label htmlFor={"weight"}>Weight</label>
                                    <input type="text" className="form-control" id="weight" name="weight"
                                           value={package.weight} onChange={onChange}/>
                                </div>

                            </div>
                        </div>
                    </div>

                </form>
            </div>
        </div>
    );
}

export default PackageView;
