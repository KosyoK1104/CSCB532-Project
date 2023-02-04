import {useEffect, useState} from "react";
import PackageService from "../../../services/PackageService";
import {useNavigate} from "react-router-dom";

const packageService = {
    packages: [
        {
            id: 1,
            sender: 'Ivan',
            recipient: 'Petkan',
            city: 'Varna',
            address: 'Levski',
            weight: 2,
        },
        {
            id: 2,
            sender: 'Georgi',
            recipient: 'Zlatomir',
            city: 'Sofia',
            address: 'Rakovska 5',
            weight: 1.5,
        }
    ],
    load: (page, searchParams) => {
        let packages = packageService.packages
        if (searchParams.id) {
            packages = packages.filter((el) => el.id === parseInt(searchParams.id))
        }
        if (searchParams.sender) {
            packages = packages.filter((el) => el.sender.toLowerCase().includes(searchParams.sender.toLowerCase()))
        }
        if (searchParams.recipient) {
            packages = packages.filter((el) => el.recipient.toLowerCase().includes(searchParams.recipient.toLowerCase()))
        }
        if (searchParams.city) {
            packages = packages.filter((el) => el.city.toLowerCase().includes(searchParams.city.toLowerCase()))
        }
        if (searchParams.address) {
            packages = packages.filter((el) => el.address.toLowerCase().includes(searchParams.address.toLowerCase()))
        }
        if (searchParams.weight) {
            packages = packages.filter((el) => el.weight === parseFloat(searchParams.weight))
        }

        return Promise.resolve({
            data: packages
        })
    }
}


const PackageListing = () => {
    const navigate = useNavigate();
    let [packages, setPackages] = useState([]);
    let [page, setPage] = useState(1);
    let [searchParams, setSearchParams] = useState({
        id: '',
        sender: '',
        recipient: '',
        city: '',
        address: '',
        weight: '',
    });

    const load = () => {
        PackageService.load(page, searchParams)
            .then((response) => {
                setPackages(response.data)
            })
    }

    useEffect(() => {
        packageService.load(page, searchParams)
            .then((response) => {
                setPackages(response.data)
            })
    }, [])

    const handlePageChange = (page) => {
        setPage(page)
        packageService.load(page, searchParams)
            .then((response) => {
                setPackages(response.data)
            })
    }

    const handleSearch = (e) => {
        e.preventDefault()
        packageService.load(page, searchParams)
            .then((response) => {
                setPackages(response.data)
            })
    }

    const handleSearchChange = (e) => {
        setSearchParams({
            ...searchParams,
            [e.target.name]: e.target.value
        })
    }

    // const handleFilterChange = (el) => {
    //     setFilterParams({
    //         ...filterParams,
    //     })
    // }

    const goToPackage = (id) => {
        navigate(`/employee/packages/${id}`)
    }

    return (
        <div className="container">
            <div className="card">
                <div className="card-header">
                    <h3 className="card-title">All packages</h3>
                </div>
                <div className="card-body p-3">
                    <table className="table table-hover">
                        <thead>
                        <tr>
                            <th>ID</th>
                            <th>Sender</th>
                            <th>Recipient</th>
                            <th>City</th>
                            <th>Address</th>
                            <th>Weight</th>
                            <th></th>
                        </tr>
                        <tr>
                            <th>
                                <input type="text" name="id" className="form-control" value={searchParams.id}
                                       onChange={handleSearchChange}/>
                            </th>

                            <th>
                                <input type="text" name="sender" className="form-control" value={searchParams.sender}
                                       onChange={handleSearchChange}/>
                            </th>

                            <th>
                                <input type="text" name="recipient" className="form-control"
                                       value={searchParams.recipient}
                                       onChange={handleSearchChange}/>
                            </th>

                            <th>
                                <input type="text" name="city" className="form-control" value={searchParams.city}
                                       onChange={handleSearchChange}/>
                            </th>

                            <th>
                                <input type="text" name="address" className="form-control" value={searchParams.address}
                                       onChange={handleSearchChange}/>
                            </th>

                            <th>
                                <input type="text" name="weight" className="form-control" value={searchParams.weight}
                                       onChange={handleSearchChange}/>
                            </th>

                            <th>
                                <button className="btn btn-primary" onClick={handleSearch}>Search</button>
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        {packages.map((el) => (
                            <tr onDoubleClick={() => goToPackage(el.id)} key={el.id}>
                                <td>{el.id}</td>
                                <td>{el.sender}</td>
                                <td>{el.recipient}</td>
                                <td>{el.city}</td>
                                <td>{el.address}</td>
                                <td>{el.weight}</td>
                                <td>
                                    <button className="btn btn-outline-secondary btn-sm"
                                            onClick={() => goToPackage(el.id)}>View
                                    </button>
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

export default PackageListing
