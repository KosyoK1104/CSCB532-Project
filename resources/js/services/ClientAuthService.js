import Api from "./Api"

export default {
    /**
     *
     * @param {Object} data
     * @param {string} data.email
     * @param {string} data.password
     */
    login(data) {
        return Api.post('/api/clients/login', data)
            .then(response => {
                return response.data.data
            })
            .catch(error => Api.resolveError(error))
    },
    /**
     *
     * @param {Object} data
     * @param {string} data.email
     * @param {string} data.username
     * @param {string} data.password
     * @param {string} data.repeat_password
     */
    register(data) {
        return Api.post('/api/clients/register', data)
            .then(response => {
                return response.data.data
            })
            .catch(error => Api.resolveError(error))
    }
}
