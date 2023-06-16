import Close from "@mui/icons-material/Close";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import { FooterNav, IconItem } from "../theme/styledComponents";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { startGame } from "../features/words/wordsSlice";
import { fetchWord, setFetchErr } from "../features/fetch/fetchSlice";
import { resetTime } from "../features/timer/timerSlice";

import { memo } from "react";

function BottomNav() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userTime } = useSelector((state) => state.game);

  const handleExit = () => {
    navigate("/");
  };

  const handleRestart = () => {
    dispatch(startGame());
    dispatch(resetTime(userTime));
    dispatch(fetchWord())
      .unwrap()
      .catch((err) => dispatch(setFetchErr(err)));
    navigate("/game");
  };

  return (
    <FooterNav>
      <IconItem
        onClick={() => handleRestart()}
        aria-label="RESTART"
        startIcon={<RestartAltIcon />}
      >
        {" "}
        RESTART
      </IconItem>
      <IconItem
        onClick={() => handleExit()}
        aria-label="EXIT"
        startIcon={<Close />}
      >
        {" "}
        EXIT
      </IconItem>
    </FooterNav>
  );
}

export default memo(BottomNav);
