import axios from "axios";
import toast from "react-hot-toast";
import store from "../store";
import {loading_minus, loading_plus} from "../store/loading";

function withInterceptor() {
    const instance = axios.create()
    store.dispatch(loading_plus())
    instance.interceptors.response.use(function(response) {
        store.dispatch(loading_minus())
        return response
    }, function(error) {
        store.dispatch(loading_minus())
        if(error.response.status === 401) {
            toast.error('Unauthenticated!')
            window.location.href = '/login'
        }
        if(error.response.status === 403) {
            toast.error('Unauthorized!')
            window.location.href = '/employee/account'
        }
        if(error.response.status >= 500 && error.response.status <= 599) {
            toast.error('Unexpected error')
            return
        }
        store.dispatch(loading_minus())
        return Promise.reject(error)
    })

    return instance
}

export default {
    formatQueryParams(searchParams = {}, page = null) {
        let queryParams = []
        for(let param in searchParams) {
            if(!(searchParams[param] === null || searchParams[param] === '')) {

                queryParams.push(param + '=' + encodeURIComponent(searchParams[param].trim()))
            }
        }

        if(page !== null) {
            queryParams.push('page=' + page)
        }
        return queryParams.length !== 0 ? '?' + queryParams.join('&') : ''
    },

    get: function(endpoint = '', config = {}) {
        return withInterceptor().get(endpoint, config)
    },
    post: function(endpoint = '', data = {}, config = {}) {
        return withInterceptor().post(endpoint, data, config)
    },
    put: function(endpoint = '', data = {}, config = {}) {
        return withInterceptor().put(endpoint, data, config)
    },
    delete: function(endpoint = '', data = {}) {
        return withInterceptor().delete(endpoint, data)
    },

    resolveError: function(error) {
        return error.response.data.error.message
    },

    resolveValidationError: function(error) {
        return error.response.data.errors
    },

    encodeUrl: function(url, page = 1, params = {}) {
        this.formatQueryParams(params, page)
        return url + this.formatQueryParams(params, page)
    }
}
