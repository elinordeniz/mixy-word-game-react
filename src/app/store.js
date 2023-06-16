import {configureStore} from '@reduxjs/toolkit';
import wordsReducer from '../features/words/wordsSlice'
import notifyReducer from '../features/mui/notifySlice';
import fetchReducer from '../features/fetch/fetchSlice';
import timerReducer from '../features/timer/timerSlice';

export const store= configureStore({
    reducer:{
        game: wordsReducer,
        alert: notifyReducer,
        fetch: fetchReducer,
        timer: timerReducer

    }

})