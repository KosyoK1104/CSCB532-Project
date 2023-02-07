import Api from "./Api";

export default {
    load(page, searchParams) {
        return Api.get(Api.encodeUrl('/api/employees/clients', page, searchParams))
            .then(response => {
                return {
                    data: response.data.data,
                    meta: response.data.meta
                }
            })
    },
    all() {
        return Api.get('/api/employees/clients/all')
            .then(response => {
                return response.data.data
            })
    }
}
