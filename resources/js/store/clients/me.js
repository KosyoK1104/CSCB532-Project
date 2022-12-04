import {createSlice} from '@reduxjs/toolkit'
import Me from "../../services/Me"

export const slice = createSlice({
    name: 'me',
    initialState: {me: Me.initialState()},
    reducers: {
        setMe(state, newMe) {
            state.me = newMe.payload
        },
        logout(state) {
            state.me = Me.initialState()
        }
    }
})

export const {setMe, logout} = slice.actions

export default slice.reducer
