import Api from '../services/Api'

/**
 *
 * @param page<int>
 * @param searchParams<Object>
 */
function load(page, searchParams) {

    return Api.get(Api.encodeUrl('/api/employees/offices', page, searchParams))
        .then(response => {
            console.log(response);
            return {
                data: response.data.data,
                meta: response.data.meta
            }
        })
}

function all() {
    return Api.get('/api/employees/offices/all')
        .then(response => {
            return response.data.data
        })
}

export default {
    load,
    all
}
