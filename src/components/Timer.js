import { TimerBox } from "../theme/styledComponents";
import {
  selectTimer,
  selectSetTimeOut,
  setTimeInterval,
  setTimer,
  setTime,
  getInterval,
} from "../features/timer/timerSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, memo } from "react";

const Timer = () => {
  const dispatch = useDispatch();
  const timer = useSelector(selectTimer);

  const setTimeOut = useSelector(selectSetTimeOut);
  const { currentQuestion, userTime } = useSelector((state) => state.game);

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
    dispatch(setTimer(userTime));
  }, [currentQuestion]);

  return <TimerBox>{timer}</TimerBox>;
};

export default memo(Timer);
