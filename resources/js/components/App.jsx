import React, {useState} from "react";
import "./App.css"
import axios from "axios";

function App() {
    const [form, setForm] = useState({
        email: '',
        password: ''
    })

    const [login, setLogin] = useState({
        email: '',
        password: ''
    })

    const handleChangeForm = (e) => {
        setForm({...form, [e.target.name]: e.target.value})
    }
    const handleLoginForm = (e) => {
        setLogin({...login, [e.target.name]: e.target.value})
    }

    const handleCreate = (e) => {
        e.preventDefault()
        axios.post('/api/users/create', form).then(response => console.log(response))
    }


    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post('/api/users/login', form).then(response => console.log(response))
    }

    return <div className="border">
        <form onSubmit={handleCreate}>
            <input type="text" name="email" value={form.email} onChange={handleChangeForm}/>
            <input type="password" name="password" value={form.password} onChange={handleChangeForm}/>
            <button type="submit">Submit</button>
        </form>
        <form onSubmit={handleSubmit}>
            <input type="text" name="email" value={login.email} onChange={handleLoginForm}/>
            <input type="password" name="password" value={login.password} onChange={handleLoginForm}/>
            <button type="submit">Submit</button>
        </form>
        <pre>{form.email}</pre>
        <pre>{form.password}</pre>

        <pre>{login.email}</pre>
        <pre>{login.password}</pre>
    </div>
}

export default App;

