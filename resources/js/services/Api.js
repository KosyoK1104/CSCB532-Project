import axios from "axios";
import toast from "react-hot-toast";
import {useNavigate} from "react-router-dom";
import store from "../store";
import {loading_plus, loading_minus} from "../store/loading";

function withInterceptor() {
    const instance = axios.create()
    store.dispatch(loading_plus())
    instance.interceptors.response.use(function(response) {
        store.dispatch(loading_minus())
        return response
    }, function(error) {
        console.log(error)
        if(error.response.status === 401) {
            toast.error('Unauthenticated!')
            // history.push('/login')
            let navigate = useNavigate()
            navigate('/login')
            // window.location = '/login'
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
    formatQueryParams(params = {}, page = null) {
        let queryParams = ''

        if(page) {
            queryParams += 'page=' + page
        }

        for(let key in params) {
            if(params[key]) {
                queryParams += '&' + key + '=' + params[key]
            }
        }

        return queryParams
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
    }
}
