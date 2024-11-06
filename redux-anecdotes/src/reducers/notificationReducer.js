import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
    name: 'notification',
    initialState: '',
    reducers: {
        setNotification(state, action){
            return action.payload
        },
        unsetNotification(){
            return ''
        }
    }
})

export const {setNotification, unsetNotification} = notificationSlice.actions

export const showNotification = (message, duration = 5000) => {
    return (dispatch) => {
        dispatch(setNotification(message))
        setTimeout(() =>{
            dispatch(unsetNotification())
        }, duration)
    }
}

export default notificationSlice.reducer