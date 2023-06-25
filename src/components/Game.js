import Header from "./Header";
import Hint from "./Hint";
import CircularProgress from "@mui/material/CircularProgress";
import { useEffect } from "react";
import Board from "./Board";
import Timer from "./Timer";
import BottomNav from "./BottomNav";
import { HintBox, GameBox } from "../theme/styledComponents";
import { getCurrentWord } from "../features/words/wordsSlice";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  entity,
  loading as load,
  isFetchErr as err,
} from "../features/fetch/fetchSlice";

const Game = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const dataList = useSelector(entity);
  const loading = useSelector(load);
  const isFetchErr = useSelector(err);

  const { showHint, gameEnd, currentQuestion, currentWord } = useSelector(
    (store) => store.game
  );

  useEffect(() => {
    dataList.length !== 0 && dispatch(getCurrentWord(dataList));
  }, [dataList, currentQuestion]);

  useEffect(() => {
    if ((gameEnd && !currentWord?.id) || isFetchErr) {
      navigate("/");
    }
  }, [gameEnd, isFetchErr]);

  return (
    <GameBox>
      {loading === "pending" || currentWord?.length === 0 ? (
        <CircularProgress />
      ) : (
        currentWord?.length !== 0 && (
          <>
            <Header />
            <Timer />
            <HintBox>{showHint && <Hint />}</HintBox>
            <Board />
            <BottomNav />
          </>
        )
      )}
    </GameBox>
  );
};

export default Game;
