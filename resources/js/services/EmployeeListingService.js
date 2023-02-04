import Api from "./Api";

export default {
    /**
     *
     * @param page<int>
     * @param searchParams<Object>
     */
    load(page, searchParams) {

        return Api.get(Api.encodeUrl('/api/employees/employees', page, searchParams))
            .then(response => {
                return {
                    data: response.data.data,
                    meta: response.data.meta
                }
            })
    }
}
