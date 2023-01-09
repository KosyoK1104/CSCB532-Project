import Api from "./Api"

export default {
    /**
     *
     * @param {{password: null, email: null}} data
     * @param {string|null} data.email
     * @param {string|null} data.password
     */
    login(data) {
        return Api.post('/api/employees/login', data)
            .then(response => {
                console.log(response)
                return response.data.data
            })

    }
}
