import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axiosInstance from '../api/axiosInstance';



export const fetchWords= createAsyncThunk(
    'wordsFetch/fetchWords', async (params)=>{
        try{
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
    // {
    //     condition: (_, { getState }) => {
    //       const { gameOperations } = getState()
    //       const fetchStatus = gameOperations.fetchStatus;
    //        console.log(fetchStatus)
    //       if (fetchStatus === 'fulfilled' || fetchStatus === 'pending') {
    //         // Already fetched or in progress, don't need to re-fetch
    //         return false
    //       }
    //     },
    //   }
)



export const wordsSlice= createSlice({
    name: 'game',
    initialState:{
        score: 90,
        stars:0,
        bestScore:0,
        isCorrect:false,
        whenTimeOut:false,
        totalHundredScore:0,
        setTimeOut:false,
        timer:60,
        warning:"",
        error: false,
        entities:[],
        fetchError:'',
        isFetchErr:false,
        isLoading:false,
        fetchStatus:null,
        currentQuestion:0,
        userAnswer:[],
        currentWord:[],
        interval:null,
        gameEnd:false,
        hintList:[],
        showHint:false,
        hint:"",
        hintLeft:true,
        displayHintList:[]
        
    },
    reducers:{
        
        setScore: (state, action)=>{
            //from action +10 or -10 if according to answer
           state.score+=action.payload;
           state.totalHundredScore+=action.payload;
           if(state.totalHundredScore===100){
            state.stars+=1;
            state.totalHundredScore=0;
           }
        },
        updateBestScore: (state, action)=>{
            //compare best score and current score if current score is bigger set it to best score
            if(state.bestScore < state.score){
                state.bestScore=state.score;
            } else return;
        },
        setTimeInterval:(state)=>{
        state.timer-=1;
        },
        setTimer:(state)=>{
            state.timer=60
        },
        setTime: (state, action)=>{
            state.setTimeOut=action.payload;
        },
        getInterval: (state,action)=>{
            state.interval=action.payload
},        
        nextQuestion : (state)=>{
             console.log(" nextQuestion action")
              console.log("state.entities?.wordList?.length"+state.entities.length)
               console.log("state.currentQuestion"+state.currentQuestion)
               if(state.entities?.length-1===state.currentQuestion){
                state.gameEnd=true;
                return;
            }
            if(state.entities?.length>state.currentQuestion){
             console.log(" nextQuestion action 1st if")
            state.setTimeOut=false;
            state.whenTimeOut=false
            state.isCorrect=false
            state.userAnswer=[]
            state.currentQuestion+=1;
            state.timer=60;
            state.displayHintList=[]
            //state.warning=""



            } 
        },
        getCurrentWord: (state,action)=>{
            state.currentWord=state.entities[state.currentQuestion];
            state.hintList=state.currentWord?.hintList;
            state.hintLeft=true;
            state.showHint=false;
     



        },
        setUserAnswer : (state,action)=>{
           state.userAnswer.push(action.payload.letter);
           state.currentWord.mixedWordArray.splice(action.payload.key,1);
        },
        removeUserAnswer : (state, {payload})=>{
           state.currentWord.mixedWordArray.push(payload.letter);
            state.userAnswer.splice(payload.key, 1);


        },
        getHint : (state, action)=>{
             console.log("getHint action")
          if(state.hintList.length!==0){
            state.hint= state.hintList[0]
            state.hintList.splice(0,1);
            state.displayHintList.push(state.hint);
            state.showHint=true;
            state.score-=2;
            state.totalHundredScore-=2;
            state.warning="1 hint is -2 points.";


          } else{
            state.hintLeft=false;
            state.warning="No available Hints!";
          }
        },
        checkForAnswer : (state,action)=>{
             console.log("checkForAnswer action")
            if(state.currentWord?.originalWordLength===state.userAnswer?.length){
             console.log("checkForAnswer action 1st if")

            let answerUser=state.userAnswer.join("");
            if(state.currentWord.originalWord===answerUser.toLowerCase()){
             console.log("checkForAnswer action 2nd if")
                if(!state.setTimeOut){
             console.log("checkForAnswer action 3th if")
                    clearInterval(state.interval)
                    state.isCorrect=true;
                    state.score+=10;
                    state.totalHundredScore+=10;
                    if(state.totalHundredScore===100){
                     state.stars+=1;
                     state.totalHundredScore=0;
                    }
                }
            }
            }
        },
        whenTimeIsOut: (state, action)=>{
            if(state.setTimeOut){
                 console.log('whenTimeIsOut action ')
                state.warning="Time is Up! Your point -10! Next Question is in 3 sec"
                state.isCorrect=false;
                    state.score-=10;
                    state.totalHundredScore-=10;
                    state.whenTimeOut=true
          
            }
        }
        //check for answer
        //bestscore, stars to localstorage
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
            state.gameEnd=false;
            state.setTimeOut=false;
            state.whenTimeOut=false
            state.isCorrect=false
            state.userAnswer=[]
            state.currentQuestion+=1;
            state.timer=60;
            state.displayHintList=[]
            state.warning=""
           


        }).addCase(fetchWords.rejected, (state,action)=>{
            state.isLoading=false;
            state.fetchError=action.error.message;
            state.isFetchErr=true;
            state.fetchStatus="rejected";


        })
    }
})

export const {nextQuestion, setScore, setStar, updateBestScore, setTimeInterval,getCurrentWord,setTimer,setTime, setUserAnswer, removeUserAnswer,
    checkForAnswer,whenTimeIsOut,getInterval, getHint}=wordsSlice.actions;

export default wordsSlice.reducer;