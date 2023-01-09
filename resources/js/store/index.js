import {configureStore} from '@reduxjs/toolkit'
import meClientReducer from './clients/MeClient'
import meEmployeeReducer from './emoloyees/MeEmployee'

export default configureStore({
    reducer: {
        meClient: meClientReducer,
        meEmployee: meEmployeeReducer
    }
})
