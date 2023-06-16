import Close from "@mui/icons-material/Close";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import { FooterNav, IconItem } from "../theme/styledComponents";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { startGame } from "../features/words/wordsSlice";
import { fetchWord, setFetchErr } from "../features/fetch/fetchSlice";

import {memo} from 'react';

function BottomNav() {
   console.log("bottom nav")
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleExit = () => {
    navigate("/");
  };

  const handleRestart = () => {
    dispatch(startGame());
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
