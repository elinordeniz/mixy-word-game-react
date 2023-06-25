import {
  AnswerBox,
  Letter,
  LettersArea,
  BoardBox,
  AnswerArea,
} from "../theme/styledComponents";
import {
  setUserAnswer,
  removeUserAnswer,
  checkForAnswer,
  nextQuestion,
  whenTimeIsOut,
  getCurrentWord,
} from "../features/words/wordsSlice";
import {
  selectTimer,
  selectInterval,
  selectSetTimeOut,
  resetTime,
} from "../features/timer/timerSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, memo } from "react";
import { useNavigate } from "react-router-dom";

const Board = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const interval = useSelector(selectInterval);
  const setTimeOut = useSelector(selectSetTimeOut);

  const {
    currentWord,
    userAnswer,
    isCorrect,
    whenTimeOut,
    currentQuestion,
    gameEnd,
    score,
    userTime,
  } = useSelector((state) => state.game);
  useEffect(() => {
    dispatch(whenTimeIsOut(setTimeOut));
  }, [setTimeOut]);

  const handleAnswer = (e, { letter, key }) => {
    e.preventDefault();
    dispatch(setUserAnswer({ letter, key }));
  };

  const handleRemove = (e, { letter, key }) => {
    e.preventDefault();
    dispatch(removeUserAnswer({ letter, key }));
  };

  useEffect(() => {
    dispatch(checkForAnswer({ setTimeOut, interval }));
  }, [userAnswer]);

  useEffect(() => {
    if (isCorrect) {
      setTimeout(() => {
        dispatch(resetTime(userTime));
        dispatch(nextQuestion());
      }, 2000);
    } else if (whenTimeOut) {
      setTimeout(() => {
        dispatch(resetTime(userTime));
        dispatch(nextQuestion());
      }, 3000);
    }
  }, [isCorrect, whenTimeOut]);

  useEffect(() => {
    if (currentWord.length === 0) {
      navigate("/");
    }
  }, [currentWord]);

  useEffect(() => {
    dispatch(getCurrentWord);
  }, [currentQuestion]);

  useEffect(() => {
    if (gameEnd && score) {
      navigate("/result");
    }
  }, [gameEnd]);
  return (
    <BoardBox>
      <AnswerArea>
        <AnswerBox
          sx={{ color: setTimeOut ? "red" : isCorrect ? "green" : "" }}
        >
          {setTimeOut
            ? currentWord.originalWord.toUpperCase()
            : userAnswer.map((letter, key) => (
                <span
                  key={key}
                  onClick={(e) => handleRemove(e, { letter, key })}
                >
                  {letter}
                </span>
              ))}
        </AnswerBox>
      </AnswerArea>
      <LettersArea
        direction="row"
        justifyContent="center"
        alignItems="center"
        spacing={2}
        useFlexGap
        flexWrap="wrap"
      >
        {!setTimeOut &&
          currentWord?.mixedWordArray?.map((letter, key) => (
            <span
              disabled
              onClick={(e) => handleAnswer(e, { letter, key })}
              key={key}
            >
              <Letter>{letter?.toUpperCase()}</Letter>
            </span>
          ))}
      </LettersArea>
    </BoardBox>
  );
};

export default memo(Board);
