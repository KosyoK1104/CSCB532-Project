import {useEffect, useState} from "react";
import Api from "../../../services/Api";
import toast from "react-hot-toast";
import LoaderProvider from "../../../components/LoaderProvider";

const ReportView = () => {
    let [earnings, setEarnings] = useState(0);
    let [period, setPeriod] = useState({
        from: null,
        to: null
    });

    const load = (providedPeriod = null) => {
        if(providedPeriod === null) {
            providedPeriod = period;
        }
        Api.post('/api/employees/report/earnings', providedPeriod)
            .then(response => {
                setEarnings(response.data.data.earnings);
            })
            .catch(error => {
                toast.error(Api.resolveError(error));
            });
    }
    useEffect(() => {
        load()
    }, []);

    const handlePeriodChange = (e) => {
        setPeriod({
            ...period,
            [e.target.name]: e.target.value
        });
    }

    const handlePeriodSubmit = (e) => {
        e.preventDefault()
        let providedPeriod = {
            from: document.getElementById('from').value !== null ? (new Date(document.getElementById('from').value)).getTime() : null,
            to: document.getElementById('to').value !== null ? (new Date(document.getElementById('to').value)).getTime() : null
        }
        console.log(providedPeriod)
        load(providedPeriod)
    }

    return (
        <div className="container">
            <div className="card">
                <div className="card-header">
                    <h3>Earnings</h3>
                </div>
                <LoaderProvider>
                    <div className="card-body">
                        <form onSubmit={handlePeriodSubmit}>
                            <div className="d-flex gap-2 justify-content-start w-50">
                                <div className="form-group">
                                    <label htmlFor="from">From</label>
                                    <input type="date" className="form-control" id="from" name="from"
                                           value={period.from}
                                           onChange={handlePeriodChange}/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="to">To</label>
                                    <input type="date" className="form-control" id="to" name="to"
                                           value={period.to}
                                           onChange={handlePeriodChange}/>
                                </div>
                            </div>
                            <button type="submit" className="btn btn-primary">Submit</button>
                        </form>
                        <div className="mt-3">
                            <h4>Earnings: {earnings}</h4>
                        </div>
                    </div>
                </LoaderProvider>
            </div>
        </div>
    );
}

export default ReportView;
