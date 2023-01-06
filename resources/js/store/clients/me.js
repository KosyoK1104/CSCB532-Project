import {createSlice} from '@reduxjs/toolkit'
import Me from "../../services/Me"

export const slice = createSlice({
    name: 'me',
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
