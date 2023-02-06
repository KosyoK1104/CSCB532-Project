import {useEffect, useState} from "react";
import OfficeService from "../../../../services/OfficeService";
import {useNavigate} from "react-router-dom";
import '../OfficeListing.css';
import {useSelector} from "react-redux";
import LoaderProvider from "../../../../components/LoaderProvider";
import {DEFAULT_META} from "../../../../services/PaginationService";
import Pagination from "../../../../components/Pagination";

const OfficeListing = () => {
    const me = useSelector(state => state.meEmployee.me);
    const navigate = useNavigate();

    const [offices, setOffices] = useState([]);
    const [meta, setMeta] = useState(DEFAULT_META);
    const [searchParams, setSearchParams] = useState({
        name: '',
        id: '',
        city: '',
    })

    const load = (page = 1) => {
        OfficeService.load(page, searchParams)
            .then((response) => {
                setOffices(response.data)

                //TODO show notification if there are no offices
                if (response.data.length === 0) {
                    alert('No offices found')
                }

                setMeta(response.meta);
            })
    }

    useEffect(() => {
        load();
    }, []);

    const handleSearchChange = (e) => {
        setSearchParams({
            ...searchParams,
            [e.target.name]: e.target.value
        })
    }

    const handleSearch = (e) => {
        //TODO @Simeon - implement the search functionality
        e.preventDefault()
        console.log(e.target.value);
        // inMemoryOfficeService.load(page, searchParams)
        //     .then((response) => {
        //         setOffices(response.data)
        //     })
    }

    const goToEditOffice = (id) => {
        if(me.type !== 'admin') {
            return;
        }

        navigate(`/employee/offices/${id}`)
    }

    const deleteOffice = (id) => {
        //TODO @Simeon - implement the delete office functionality
        //send request to delete this office to the DeleteOfficeController
        //if the response is successful, then remove the office from the state
        //if the response is not successful, then show an error message
    }

    return (
        <div className="container">
            <div className="card">
                <div className="card-header">
                    <h3 className="card-title">Offices</h3>
                    {/*TODO @Simeon - create new tab tor creating offices and make controller and route*/}
                    {
                        me.type === 'admin' && (
                            <button className="btn btn-success" onClick={() => navigate('/employee/offices/create')}>Create</button>
                        )
                    }

                </div>
                <div className="card-body p-3">
                    <LoaderProvider>
                        <table className="table table-hover">
                            <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>City</th>
                                <th>Actions</th>
                            </tr>
                            <tr>
                                <td>
                                    <input type="text" name="id" className="form-control" value={searchParams.id}
                                           onChange={handleSearchChange}/>
                                </td>
                                <td>
                                    <input type="text" name="name" className="form-control" value={searchParams.name}
                                           onChange={handleSearchChange}/>
                                </td>
                                <td>
                                    <input type="text" name="city" className="form-control" value={searchParams.city}
                                           onChange={handleSearchChange}/>
                                </td>
                                <td>
                                    <button className="btn btn-primary w-100" onClick={handleSearch}>Search</button>
                                </td>
                            </tr>
                            </thead>
                            <tbody>
                            {offices.map((office) => (
                                <tr onDoubleClick={() => goToEditOffice(office.id)} key={office.id}>
                                    <td>{office.id}</td>
                                    <td>{office.name}</td>
                                    <td>{office.city}</td>
                                    <td>
                                        {
                                            me.type === 'admin' && (
                                                <div className="d-flex gap-2">
                                                    <button className="btn btn-sm btn-outline-warning w-100" onClick={() => goToEditOffice(office.id)}>Edit
                                                    </button>
                                                    <button className="btn btn-sm btn-outline-danger w-100" onClick={() => deleteOffice(office.id)} >Delete
                                                    </button>
                                                </div>
                                            )
                                        }
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                        <Pagination meta={meta} onPageChange={load}/>
                    </LoaderProvider>
                </div>
            </div>
        </div>
    )
}

export default OfficeListing
