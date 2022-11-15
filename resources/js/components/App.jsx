import React, {useState} from "react";
import "./App.css"
import Api from "../services/Api";
import ClientAuthService from "../services/ClientAuthService";

function App() {
    const [form, setForm] = useState({
        email: '',
        username: '',
        password: '',
        repeat_password: ''
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
        ClientAuthService.register(form)
            .then(r => console.log(r))
    }


    const handleSubmit = (e) => {
        e.preventDefault()
        ClientAuthService.login(login)
            .then(r => console.log(r))
    }

    const handleLogout = (e) => {
        Api.post('/api/clients/logout', login).then(response => console.log(response))
    }

    return <div className="border">
        asdasd
        <form onSubmit={handleCreate}>
            <label htmlFor="email">Email</label>
            <input type="text" name="email" value={form.email} onChange={handleChangeForm}/>
            <label htmlFor="email">username</label>
            <input type="text" name="username" value={form.username} onChange={handleChangeForm}/>
            <label htmlFor="email">password</label>
            <input type="password" name="password" value={form.password} onChange={handleChangeForm}/>
            <label htmlFor="email">repeat_password</label>
            <input type="password" name="repeat_password" value={form.repeat_password} onChange={handleChangeForm}/>
            <button type="submit">Submit</button>
        </form>
        <form onSubmit={handleSubmit}>
            <input type="text" name="email" value={login.email} onChange={handleLoginForm}/>
            <input type="password" name="password" value={login.password} onChange={handleLoginForm}/>
            <button type="submit">Submit</button>
        </form>
        <button onClick={handleLogout}>Logout</button>
        <pre>{form.email}</pre>
        <pre>{form.password}</pre>

        <pre>{login.email}</pre>
        <pre>{login.password}</pre>
    </div>
}

export default App;

