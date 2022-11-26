import {createSlice} from '@reduxjs/toolkit'
import Me from "../../services/Me"

export const meSlice = createSlice({
    name: 'me',
    initialState: {me: Me.initialState()}
    ,
    reducers: {
        setMe(state, newMe) {
            console.log(newMe)
            state.me = newMe.payload
        },
        logout(state) {
            state.me = Me.initialState()
        }
    }
})

export const {setMe, logout} = meSlice.actions

export default meSlice.reducer
