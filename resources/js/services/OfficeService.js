import Api from '../services/Api'

const load = (page = 1, searchParams = {}) => {
    return Api.get('/api/offices?' + Api.formatQueryParams(searchParams, page))
        .then((response) => {
            return response.data.data
        })
}

export default {
    load
}
