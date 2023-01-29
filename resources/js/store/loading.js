import {createSlice} from "@reduxjs/toolkit";

export const slice = createSlice({
    name: 'loading',
    initialState: {
        loading: 0
    },
    reducers: {
        loading_plus(state) {
            state.loading++
        },
        loading_minus(state) {
            state.loading--
        }
    }
})

export const {loading_plus, loading_minus} = slice.actions

export default slice.reducer
