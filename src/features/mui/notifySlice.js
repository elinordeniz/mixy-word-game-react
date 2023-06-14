import {createSlice} from '@reduxjs/toolkit';


export const notifySlice = createSlice({
    name:'alert',
    initialState:{notification:null},
    reducers:{
        showNotification(state,action){
            state.notification={
                message:action.payload.message,
                type:action.payload.type,
                open: action.payload.open
            }
        }
    }
})


export const {showNotification}=notifySlice.actions;

export default notifySlice.reducer;