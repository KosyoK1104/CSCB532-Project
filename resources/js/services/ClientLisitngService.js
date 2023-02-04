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
    }}
