import { createSlice } from "@reduxjs/toolkit"

const notificationSlice = createSlice({
    name: 'notification',
    initialState: {},
    reducers: {
        setNotification(state, action){
            return action.payload
        }
    }
})

export const { setNotification } = notificationSlice.actions

export const showNotification = (message, duration) => {
    return (dispatch) => {
        dispatch(setNotification(message))
        setTimeout(() => {
            dispatch(setNotification({}))
        }, duration)
    }
}

export default notificationSlice.reducer