import {createSlice} from '@reduxjs/toolkit'
import Me from "../../services/MeEmployee"

export const slice = createSlice({
    name: 'employeeMe',
    initialState: {
        me: Me.initialState(),
        isAuthenticated: false
    },
    reducers: {
        setMe(state, newMe) {
            state.me = newMe.payload
            state.isAuthenticated = true
        },
        logout(state) {
            state.me = Me.initialState()
            state.isAuthenticated = false
        },
    }
})

export const {setMe, logout} = slice.actions

export default slice.reducer
