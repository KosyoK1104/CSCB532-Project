import {useEffect, useState} from "react";
import PackageService from "../../../../services/PackageService";
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
            packages = packages.filter((package) => package.id === parseInt(searchParams.id))
        }
        if (searchParams.sender) {
            packages = packages.filter((package) => package.sender.toLowerCase().includes(searchParams.sender.toLowerCase()))
        }
        if (searchParams.recipient) {
            packages = packages.filter((package) => package.recipient.toLowerCase().includes(searchParams.recipient.toLowerCase()))
        }
        if (searchParams.city) {
            packages = packages.filter((package) => package.city.toLowerCase().includes(searchParams.city.toLowerCase()))
        }
        if (searchParams.address) {
            packages = packages.filter((package) => package.address.toLowerCase().includes(searchParams.address.toLowerCase()))
        }
        if (searchParams.weight) {
            packages = packages.filter((package) => package.weight === parseFloat(searchParams.weight))
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
                        </tr>
                        <tr>
                            <td>
                                <input type="text" name="id" className="form-control" value={searchParams.id}
                                       onChange={handleSearchChange}/>
                            </td>

                            <td>
                                <input type="text" name="sender" className="form-control" value={searchParams.sender}
                                       onChange={handleSearchChange}/>
                            </td>

                            <td>
                                <input type="text" name="recipient" className="form-control"
                                       value={searchParams.recipient}
                                       onChange={handleSearchChange}/>
                            </td>

                            <td>
                                <input type="text" name="city" className="form-control" value={searchParams.city}
                                       onChange={handleSearchChange}/>
                            </td>

                            <td>
                                <input type="text" name="address" className="form-control" value={searchParams.address}
                                       onChange={handleSearchChange}/>
                            </td>

                            <td>
                                <input type="text" name="weight" className="form-control" value={searchParams.weight}
                                       onChange={handleSearchChange}/>
                            </td>

                            <td>
                                <button className="btn btn-primary" onClick={handleSearch}>Search package</button>
                            </td>
                        </tr>
                        </thead>
                        <tbody>
                        {packages.map((package) => (
                            <tr onDoubleClick={() => goToPackage(package.id)} key={package.id}>
                                <td>{package.id}</td>
                                <td>{package.sender}</td>
                                <td>{package.recipient}</td>
                                <td>{package.city}</td>
                                <td>{package.address}</td>
                                <td>{package.weight}</td>
                                <td>
                                    <button className="btn btn-outline-secondary btn-sm"
                                            onClick={() => goToPackage(package.id)}>View
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
