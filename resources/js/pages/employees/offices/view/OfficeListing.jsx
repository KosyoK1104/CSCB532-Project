import {useEffect, useState} from "react";
import OfficeService from "../../../../services/OfficeService";
import {useNavigate} from "react-router-dom";
import '../OfficeListing.css';

const inMemoryOfficeService = {
    offices: [
        {
            id: 1,
            name: 'Office 1',
            city: 'City 1'
        },
        {
            id: 2,
            name: 'Office 2',
            city: 'City 2'
        },
        {
            id: 3,
            name: 'Office 3',
            city: 'City 3'
        },
        {
            id: 4,
            name: 'Office 4',
            city: 'City 4'
        },
    ],
    load: (page, searchParams) => {
        let offices = inMemoryOfficeService.offices
        if(searchParams.id) {
            offices = offices.filter((office) => office.id === parseInt(searchParams.id))
        }
        if(searchParams.name) {
            offices = offices.filter((office) => office.name.toLowerCase().includes(searchParams.name.toLowerCase()))
        }
        if(searchParams.city) {
            offices = offices.filter((office) => office.city.toLowerCase().includes(searchParams.city.toLowerCase()))
        }
        return Promise.resolve({
            data: offices
        })
    }
}


const OfficeListing = () => {
    const navigate = useNavigate();
    let [offices, setOffices] = useState([]);
    let [page, setPage] = useState(1);
    let [searchParams, setSearchParams] = useState({
        name: '',
        id: '',
        city: '',
    });

    const load = () => {
        OfficeService.load(page, searchParams)
            .then((response) => {
                setOffices(response.data)
            })
    }

    useEffect(() => {
      if (!searchParams.id && !searchParams.name && !searchParams.city) {
        inMemoryOfficeService.load(page, searchParams)
          .then(response => {
            setOffices(response.data)
          });
      }
    }, [searchParams]);

    const handlePageChange = (page) => {
        setPage(page)
        inMemoryOfficeService.load(page, searchParams)
            .then((response) => {
                setOffices(response.data)
            })
    }

    const handleSearch = (e) => {
        e.preventDefault()
        inMemoryOfficeService.load(page, searchParams)
            .then((response) => {
                setOffices(response.data)
            })
    }

    const handleSearchChange = (e) => {
        setSearchParams({
            ...searchParams,
            [e.target.name]: e.target.value
        })
    }

    // make a listener and if all the fields are empty, then load the data from the in-memory service use react state

    const goToEditOffice = (id) => {
        navigate(`/employee/offices/${id}`)
    }

    return (
        <div className="container">
            <div className="card">
                <div className="card-header">
                    <h3 className="card-title">Offices</h3>
                    <button className="btn btn-success">Create</button>
                </div>
                <div className="card-body p-3">
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
                                <button className="btn btn-primary" onClick={handleSearch}>Search</button>
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
                                    <div className="btn-group">
                                        <button className="btn btn-sm btn-outline-warning" onClick={() => goToEditOffice(office.id)}>Edit
                                        </button>
                                        <button className="btn btn-sm btn-outline-danger">Delete
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default OfficeListing
