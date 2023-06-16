import Header from "./Header";
import Hint from "./Hint";
import CircularProgress from "@mui/material/CircularProgress";
import {useEffect } from "react";
import Board from "./Board";
import Timer from "./Timer";
import BottomNav from "./BottomNav";
import { HintBox, GameBox } from "../theme/styledComponents";
import { getCurrentWord } from "../features/words/wordsSlice";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const Game = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    loading,
    isFetchErr,
    showHint,
    gameEnd,
    currentQuestion,
    currentWord,
    entities,
  } = useSelector((store) => store.game);
  console.log("game");

  useEffect(() => {
    entities.length !== 0 && dispatch(getCurrentWord());
  }, [entities, currentQuestion]);

  useEffect(() => {
    if ((gameEnd && !currentWord?.id) || isFetchErr) {
      navigate("/");
    }
  }, [gameEnd, isFetchErr]);

  return (
    <GameBox>
      {loading === "pending" ? (
        <CircularProgress />
      ) : (
        currentWord?.id && (
          <>
            <Header />
            <Timer />
            <HintBox>{showHint && <Hint />}</HintBox>
            {currentWord ? <Board /> : <CircularProgress />}
            <BottomNav />
          </>
        )
      )}
    </GameBox>
  );
};

export default Game;
