import Api from "./Api"

export default {
    /**
     *
     * @param {{password: null, email: null}} data
     * @param {string|null} data.email
     * @param {string|null} data.password
     */
    login(data) {
        return Api.post('/api/clients/login', data)
            .then(response => {
                return response.data.data
            })
    },
    /**
     *
     * @param {Object} data
     * @param {string|null} data.email
     * @param {string|null} data.username
     * @param {string|null} data.password
     * @param {string|null} data.repeat_password
     */
    register(data) {
        return Api.post('/api/clients/register', data)
            .then(response => {
                return response.data.data
            })
    }
}
