import axios from "axios";
import toast from "react-hot-toast";

function withInterceptor() {
    const instance = axios.create()

    instance.interceptors.response.use(function(response) {
        return response
    }, function(error) {
        console.log(error)
        if(error.response.status === 401) {
            toast.error('Unauthenticated!')
            // history.push('/login')
            window.location = '/login'
        }

        if(error.response.status >= 500 && error.response.status <= 599) {
            toast.error('Unexpected error')
            return
        }

        return Promise.reject(error)
    })

    return instance
}

export default {


    get: function(endpoint = '') {
        return withInterceptor().get(endpoint)
    },
    post: function(endpoint = '', data = {}) {
        return withInterceptor().post(endpoint, data)
    },
    put: function(endpoint = '', data = {}) {
        return withInterceptor().put(endpoint, data)
    },
    delete: function(endpoint = '', data = {}) {
        return withInterceptor().delete(endpoint, data)
    },

    resolveError: function(error) {
        return error.response.data.error.message
    },

    resolveValidationError: function(error) {
        return error.response.data.errors
    }
}
