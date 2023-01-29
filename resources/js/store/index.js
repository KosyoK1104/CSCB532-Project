import {configureStore} from '@reduxjs/toolkit'
import meClientReducer from './clients/MeClient'
import meEmployeeReducer from './employees/MeEmployee'
import loading from "./loading";

export default configureStore({
    reducer: {
        meClient: meClientReducer,
        meEmployee: meEmployeeReducer,
        loading: loading
    }
})
