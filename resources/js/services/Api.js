import axios from "axios";

const instance = axios.create()
export default {
    get: function(endpoint = '') {
        return instance.get(endpoint)
    },
    post: function(endpoint = '', data = {}) {
        return instance.post(endpoint, data)
    },
    put: function(endpoint = '', data = {}) {
        return instance.put(endpoint, data)
    },
    delete: function(endpoint = '', data = {}) {
        return instance.delete(endpoint, data)
    },

    resolveError: function(error){
        // TODO
        return error
    }
}
