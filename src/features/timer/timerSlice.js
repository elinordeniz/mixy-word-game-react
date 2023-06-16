import {createSlice} from '@reduxjs/toolkit';


const timerSlice= createSlice({
    name:"timer",
    initialState:{
        setTimeOut: false,
        timer: 0,
        interval: null, 
    
    },
    reducers:{
        resetTime: (state,action)=>{
            state.setTimeOut = false;
            state.timer = action.payload;

        },
        setTimeInterval: (state) => {
            state.timer -= 1;
          },
          setTimer: (state,action) => {
            state.timer = action.payload;
          },
          setTime: (state, action) => {
            state.setTimeOut = action.payload;
          },
          getInterval: (state, action) => {
            state.interval = action.payload;
          },
    },
    extraReducers:{}

})

export const selectSetTimeOut=(state)=>state.timer.setTimeOut;
export const selectTimer= (state)=> state.timer.timer;
export const selectInterval= (state)=> state.timer.interval

export const {resetTime, setTimeInterval, setTimer, setTime, getInterval}=timerSlice.actions;


export default timerSlice.reducer;