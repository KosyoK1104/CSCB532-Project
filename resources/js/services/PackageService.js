import Api from '../services/Api';

const loadEmployee = (page = 1, searchParams = {}) => {
    return Api.get('/api/employees/packages' + Api.formatQueryParams(searchParams, page))
        .then((response) => {
            return {
                data: response.data.data,
                meta: response.data.meta
            }
        })
}

const loadClient = (page = 1, searchParams = {}) => {
    return Api.get('/api/clients/packages' + Api.formatQueryParams(searchParams, page))
        .then((response) => {
            return {
                data: response.data.data,
                meta: response.data.meta
            }
        })
}

const submitEmployee = (data) => {
    return Api.post('/api/employees/packages', data)
        .then((response) => {
            return response.data.data
        })
}

const submitClient = (data) => {
    return Api.post('/api/clients/packages', data)
        .then((response) => {
            return response.data.data
        })
}

const byIdForEmployee = (id) => {
    return Api.get('/api/employees/packages/' + id)
        .then((response) => {
            return response.data.data
        })
}

const byIdForClient = (id) => {
    return Api.get('/api/clients/packages/' + id)
        .then((response) => {
            return response.data.data
        })
}

export default {
    loadEmployee,
    loadClient,
    submitEmployee,
    submitClient
}
