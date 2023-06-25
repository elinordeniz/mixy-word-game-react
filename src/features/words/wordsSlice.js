import { createSlice } from "@reduxjs/toolkit";

export const wordsSlice = createSlice({
  name: "game",
  initialState: {
    amount: 10,
    difficulty: "easy",
    userTime: 30,
    score: 0,
    stars: 0,
    bestScore: 0,
    isCorrect: false,
    whenTimeOut: false,
    totalHundredScore: 0,
    timer: 0,
    warning: "",
    error: false,
    entities: [],
    currentRequestId: undefined,
    fetchStatus: null,
    currentQuestion: 0,
    userAnswer: [],
    currentWord: [],
    gameEnd: true,
    hintList: [],
    showHint: false,
    hint: "",
    hintLeft: true,
    displayHintList: [],
    letterHintCount: 0,
    tempLetterHints: [],
    tempMixedLetters: [],
  },
  reducers: {
    setGame: (state, action) => {
      const { amount, difficulty, userTime } = action.payload;
      state.amount = amount;
      state.difficulty = difficulty;
      state.userTime = userTime;
    },
    startGame: (state, action) => {
      state.gameEnd = false;
      state.whenTimeOut = false;
      state.isCorrect = false;
      state.userAnswer = [];
      state.currentQuestion = 0;
      state.score = 0;
      state.totalHundredScore=0;
      state.displayHintList = [];
      state.warning = "";
      state.letterHintCount = 0;
      state.tempLetterHints = [];
      state.tempMixedLetters = [];

      if (localStorage.getItem("bestScore")) {
        state.bestScore = localStorage.getItem("bestScore");
      }

      if (localStorage.getItem("stars")) {
        state.stars = localStorage.getItem("stars");
      }
    },
    nextQuestion: (state) => {
      if (state.entities?.length - 1 === state.currentQuestion) {
        if (state.bestScore < state.score) {
          state.bestScore = state.score;
          localStorage.setItem("bestScore", state.bestScore);
        }
        localStorage.setItem("stars", state.stars);
        state.warning = "";
        state.gameEnd = true;
        return;
      }
      if (state.entities?.length > state.currentQuestion) {
        state.whenTimeOut = false;
        state.isCorrect = false;
        state.userAnswer = [];
        state.currentQuestion += 1;
        state.displayHintList = [];
        state.warning = "";
        state.letterHintCount = 0;
        state.tempLetterHints = [];
        state.tempMixedLetters = [];
      }
    },
    getEntities: (state, action)=>{
      state.entities=action.payload;
    },
    getCurrentWord: (state, action) => {
      state.currentWord = action.payload[state.currentQuestion];
      state.hintList = state.currentWord?.hintList;
      state.hintLeft = true;
      state.showHint = false;
      state.tempMixedLetters = state.currentWord?.mixedWordArray;
    },
    setUserAnswer: (state, action) => {
      state.userAnswer.push(action.payload.letter);
      state.currentWord.mixedWordArray.splice(action.payload.key, 1);
    },
    removeUserAnswer: (state, { payload }) => {
      if (payload.key > state.letterHintCount - 1) {
        state.currentWord.mixedWordArray.push(payload.letter);
        state.tempMixedLetters.push(payload.letter);
        state.userAnswer.splice(payload.key, 1);
      }
    },
    getHint: (state, action) => {
      if (!state.hintLeft) {
        return;
      }
      if (state.hintList.length !== 0) {
        state.hint = state.hintList[0];
        state.hintList.splice(0, 1);
        state.displayHintList.push(state.hint);
        state.showHint = true;
        state.score -= 2;
        state.totalHundredScore -= 2;
        state.warning = "1 hint is -2 points.";
      } else {
        state.hintLeft = false;
        state.warning = "No available Hints!";
      }
    },
    getLetterHint: (state, action) => {
      if (state.letterHintCount === state.currentWord.originalWordLength) {
        return;
      }
     

      if (state.letterHintCount < state.currentWord.originalWordLength) {
        state.warning = "1 letter hint is -2 points";
        state.score -= 2;
        state.totalHundredScore -= 2;

        if (state.userAnswer.length === 0) {
          let letter = state.currentWord.originalWord.charAt(0);
          let index = state.currentWord.mixedWordArray.findIndex(
            (l) => l === letter
          );

          let tIndex = state.tempMixedLetters.findIndex((l) => l === letter);
          state.currentWord.mixedWordArray.splice(index, 1);
          state.tempMixedLetters.splice(tIndex, 1);
          state.tempLetterHints.push(letter);
          state.userAnswer.push(letter);
          state.letterHintCount++;
          return;
        }

        let partialWord = state.currentWord.originalWord.slice(
          0,
          state.userAnswer.length
        );
        if (
          state.userAnswer.length > 0 &&
          state.userAnswer.join("") === partialWord
        ) {
          let index = state.userAnswer.length;
          let letter = state.currentWord.originalWord.charAt(index);
          let mIndex = state.currentWord.mixedWordArray.findIndex(
            (l) => l === letter
          );
          let tIndex = state.tempMixedLetters.findIndex((l) => l === letter);
          state.tempLetterHints.push(letter);
          state.userAnswer.push(letter);
          state.letterHintCount = state.userAnswer.length;
          state.currentWord.mixedWordArray.splice(mIndex, 1);
          state.tempMixedLetters.splice(tIndex, 1);
          return;
        }
        state.userAnswer = [];
        let letter = state.currentWord.originalWord.charAt(
          state.letterHintCount
        );
        let index = state.tempMixedLetters.findIndex((l) => l === letter);
        state.tempLetterHints.push(letter);
        state.userAnswer = state.tempLetterHints;
        state.letterHintCount = state.userAnswer.length;
        state.tempMixedLetters.splice(index, 1);
        state.currentWord.mixedWordArray = state.tempMixedLetters;
      }
    },
    checkForAnswer: (state, {payload}) => {
      if (state.currentWord?.originalWordLength === state.userAnswer?.length) {
        let answerUser = state.userAnswer.join("");
        if (state.currentWord.originalWord === answerUser.toLowerCase()) {
          state.hintLeft = false;
          if (!payload.setTimeOut) {
            clearInterval(payload.interval);
            state.isCorrect = true;
            state.score += 55;
            state.totalHundredScore += 55;

            if (state.totalHundredScore > 100) {
              state.stars ++;
              state.totalHundredScore = 0;
      
            }
           

          }
        }
      }
    },
    whenTimeIsOut: (state, action) => {
      if (action.payload) {
        state.warning = "Time is Up! Your point -10! Next Question is in 3 sec";
        state.isCorrect = false;
        state.score -= 5;
        state.totalHundredScore -= 5;
        state.whenTimeOut = true;
      }
    },
   
  },

});


export const {
  nextQuestion,
  getCurrentWord,
  setUserAnswer,
  removeUserAnswer,
  checkForAnswer,
  whenTimeIsOut,
  getHint,
  getLetterHint,
  startGame,
  setGame,
  getEntities
} = wordsSlice.actions;

export default wordsSlice.reducer;
