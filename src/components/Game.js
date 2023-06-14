import Header from "./Header";
import Hint from "./Hint";
import Box from "@mui/material/Box";
import CircularProgress from '@mui/material/CircularProgress';
import { useState, useEffect } from "react";
import Board from "./Board";
import Timer from "./Timer";
import BottomNav from "./BottomNav";
import { selectWordsList,getCurrentWord } from "../features/words/wordsSlice";

import { useSelector, useDispatch } from "react-redux";

const Game = () => {
  const dispatch=useDispatch();
  const {isLoading, showHint}=useSelector((store)=>store.game)
  const currentQuestion=useSelector((state)=>state.game.currentQuestion);
  const currentWord=useSelector((state)=>state.game.currentWord);
  const wordList=useSelector((state)=>state.game.entities)
  
  useEffect(()=>{
    dispatch(getCurrentWord());
  console.log(currentWord)
  },[wordList,currentQuestion])

  return (
    <Box
      sx={{
        display: "flex",
        flex: 1,
        flexDirection: "column",
        justifyContent: "space-around",
        alignItems: "center",
        maxWidth: "md",
        minHeight: "100%",
        overflow: "auto",
      }}
    >
      {isLoading ? <CircularProgress />  : (
      <>
      <Header />
      <Timer />
      {showHint && <Hint />}
      {currentWord ? <Board /> : <CircularProgress />}
      <BottomNav /> 
      </>
      )}
    </Box>
  );
};

export default Game;
