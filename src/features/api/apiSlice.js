import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axiosInstance from './axiosInstance';



export const fetchWords= createAsyncThunk(
    'wordsFetch/fetchWords', async (params, apiThunk)=>{
        try{
             console.log('asythunk')
            const {amount, difficulty}=params;
            const response= await axiosInstance['get']('/api/v1/word', {
                params: {
                    difficulty: difficulty,
                    amount: amount
                  }
            });
          console.log(response.data.wordList)
            return response.data.wordList;

        }catch(err){
             console.log(err, err.message)
        }
    },
    {
        condition: (_, { getState }) => {
          const { wordsFetch } = getState()
          const fetchStatus = wordsFetch.fetchStatus;
           console.log(fetchStatus)
          if (fetchStatus === 'fulfilled' || fetchStatus === 'pending') {
            // Already fetched or in progress, don't need to re-fetch
            return false
          }
        },
      }
)

export const apiSlice=createSlice({
    name:"wordsFetch",
    initialState:{
        entities:[],
        fetchError:'',
        isFetchErr:false,
        isLoading:false,
        fetchStatus:null,
        currentQuestion:0,
        userAnswer:[],
        currentWord:[]

     },
    reducers:{
        nextQuestion : (state)=>{
            if(state.userAmount>state.currentQuestion){
            state.currentQuestion+=1;
            state.timer=60;
            state.setTimeOut=true;
            }
        },
        getCurrentWord: (state,action)=>{
            state.currentWord=state.entities[state.currentQuestion];
        }
    },
    extraReducers:(builder)=>{
        builder.addCase(fetchWords.pending, (state, action)=>{
            state.isLoading=true;
            state.isFetchErr=false;
            state.fetchStatus="pending";
        }
            ).addCase(fetchWords.fulfilled, (state,action)=>{
            state.entities=action.payload;
            state.isLoading=false;
            state.isFetchErr=false;
            state.fetchStatus="fullfilled";


        }).addCase(fetchWords.rejected, (state,action)=>{
            state.isLoading=false;
            state.fetchError=action.error.message;
            state.isFetchErr=true;
            state.fetchStatus="rejected";


        })
    }
});

export const selectWordsList= (state)=> state.entities

export const {getCurrentWord} = apiSlice.actions;

export default apiSlice.reducer;