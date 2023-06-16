import {configureStore} from '@reduxjs/toolkit';
import wordsReducer from '../features/words/wordsSlice'
import apiReducer from '../features/api/apiSlice'
import notifyReducer from '../features/mui/notifySlice';
import fetchReducer from '../features/fetch/fetchSlice';

export const store= configureStore({
    reducer:{
        game: wordsReducer,
        wordsFetch: apiReducer,
        alert: notifyReducer,
        fetch: fetchReducer
    }

})