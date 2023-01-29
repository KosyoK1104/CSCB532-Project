const CreateOffice = () => {
    const [office, setOffice] = useState({
        name: '',
        address: '',
        phone: '',
        email: '',
        website: '',
        description: '',
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const {name, value} = e.target;
        setOffice({...office, [name]: value});
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios
            .post('/api/offices', office)
            .then((res) => {
                if(res.data.status === 'success') {
                    setOffice({
                        name: '',
                        city: '',
                        address: '',
                    });
                    setErrors({});
                    alert(res.data.message);
                }
            })
            .catch((err) => {
                    setErrors(err.response.data.errors);
                }
            );
    };

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card">
                        <form onSubmit={handleSubmit}>
                            <div className="card-header">Create Office</div>
                            <div className="card-body">
                                <div className="form-group">
                                    <label htmlFor="name">Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        id="name"
                                        className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                                        value={office.name}
                                        onChange={handleChange}
                                    />
                                    <div className="invalid-feedback">{errors.name}</div>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="address">City</label>
                                    <input
                                        type="text"
                                        name="city"
                                        id="city"
                                        className={`form-control ${errors.city ? 'is-invalid' : ''}`}
                                        value={office.city}
                                        onChange={handleChange}
                                    />
                                    <div className="invalid-feedback">{errors.city}</div>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="address">Address</label>
                                    <textarea
                                        name="address"
                                        id="address"
                                        className={`form-control ${errors.address ? 'is-invalid' : ''}`}
                                        value={office.address}
                                        onChange={handleChange}
                                    />
                                    <div className="invalid-feedback">{errors.address}</div>
                                </div>
                                <div className="form-group">
                                    <button className="btn btn-primary">Create</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CreateOffice;
