import { configureStore } from '@reduxjs/toolkit'
import meReducer from '../clients/me'
export default configureStore({
    reducer: {
        me: meReducer
    }
})
