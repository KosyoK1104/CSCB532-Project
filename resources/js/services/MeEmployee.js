import Api from "./Api";

export default {
    me() {
        return Api.get('/api/employees/me')
            .then(response => {
                return {
                    me: response.data
                }
            })
    },

    logout() {
        return Api.post('/api/employees/logout')
            .then(() => {
                window.location = '/login'
            })
    },
    initialState() {
        return {
            username: null,
            id: null,
            email: null
        }
    }
}
