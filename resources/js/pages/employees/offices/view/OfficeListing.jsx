import {useEffect, useState} from "react";
import OfficeService from "../../../../services/OfficeService";

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
        inMemoryOfficeService.load(page, searchParams)
            .then((response) => {
                setOffices(response.data)
            })
    }, [])

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

    return (
        <div className="container-fluid">
            <div className="card">
                <div className="card-header">
                    <h3 className="card-title">Offices</h3>
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
                            <tr key={office.id}>
                                <td>{office.id}</td>
                                <td>{office.name}</td>
                                <td>{office.city}</td>
                                <td>
                                    <a href={'/offices/' + office.id}>View</a>
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
