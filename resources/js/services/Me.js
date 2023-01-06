import Api from "./Api";

export default {
    me() {
        return Api.get('/api/clients/me')
            .then(response => {
                return {
                    me: response.data
                }
            })
    },

    logout() {
        return Api.post('/api/clients/logout')
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

