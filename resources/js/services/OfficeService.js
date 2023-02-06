import Api from '../services/Api'

/**
 *
 * @param page<int>
 * @param searchParams<Object>
 */
function load(page, searchParams) {

    return Api.get(Api.encodeUrl('/api/employees/offices', page, searchParams))
        .then(response => {
            return {
                data: response.data.data,
                meta: response.data.meta
            }
        })
}

export default {
    load
}
