import { TimerBox } from "../theme/styledComponents";
import {
  setTimeInterval,
  setTimer,
  setTime,
  getInterval,
} from "../features/words/wordsSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

const Timer = () => {
  const dispatch = useDispatch();
  const { timer, setTimeOut, currentQuestion } = useSelector(
    (state) => state.game
  );

  useEffect(() => {
    if (timer === 0) {
      dispatch(setTime(true));
      return;
    }
    let interval = setInterval(() => {
      dispatch(setTimeInterval());
    }, 1000);
    dispatch(getInterval(interval));
    return () => {
      clearInterval(interval);
    };
  }, [timer, setTimeOut]);

  useEffect(() => {
    dispatch(setTimer());
  }, [currentQuestion]);

  return <TimerBox>{timer}</TimerBox>;
};

export default Timer;
