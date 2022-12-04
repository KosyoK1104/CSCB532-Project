import {configureStore} from '@reduxjs/toolkit'
import clientMeReducer from './clients/me'

export default configureStore({
    reducer: {
        clientMe: clientMeReducer
    }
})
