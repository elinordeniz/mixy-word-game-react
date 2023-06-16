import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchWords,
  startGame,
  setGame,
  setErr,
} from "../features/words/wordsSlice";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Form = () => {
   console.log("form")
  const navigate = useNavigate();
  const [amount, setAmount] = useState("10");
  const [difficulty, setDifficulty] = useState("easy");
  const [userTime, setUserTime] = useState(30);

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(startGame());
    dispatch(setGame({ amount, difficulty, userTime }));
    dispatch(fetchWords())
      .unwrap()
      .catch((err) => dispatch(setErr(err)));
    navigate("/game");
  };
  return (
    <Box
      sx={{
        width: 250,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center",
        color: "dark.main",
      }}
    >
      <h3>Mixy Mixy Word Game</h3>
      <FormControl fullWidth sx={{ m: 2 }}>
        <InputLabel id="difficulty">Selecy Difficulty</InputLabel>
        <Select
          labelId="difficulty"
          defaultValue={"easy"}
          label="Selecy Difficulty"
          onChange={(e) => setDifficulty(e.target.value)}
        >
          <MenuItem value="easy">Easy</MenuItem>
          <MenuItem value="medium">Medium</MenuItem>
          <MenuItem value="hard">Hard</MenuItem>
        </Select>
      </FormControl>
      <FormControl fullWidth sx={{ m: 2 }}>
        <InputLabel id="amount">Select Questions</InputLabel>
        <Select
          labelId="amount"
          label="Select Quantity"
          defaultValue="10"
          onChange={(e) => setAmount(e.target.value)}
        >
          <MenuItem value="10">10</MenuItem>
          <MenuItem value="20">20</MenuItem>
          <MenuItem value="30">30</MenuItem>
        </Select>
      </FormControl>
      <FormControl fullWidth sx={{ m: 2 }}>
        <InputLabel id="time">Select Time</InputLabel>
        <Select
          labelId="time"
          label="Select Time"
          defaultValue="30"
          onChange={(e) => setUserTime(e.target.value)}
        >
          <MenuItem value="30">30 seconds</MenuItem>
          <MenuItem value="45">45 seconds</MenuItem>
          <MenuItem value="60">60 seconds</MenuItem>
        </Select>
      </FormControl>
      <Button
        fullWidth
        onClick={(e) => handleSubmit(e)}
        variant="outlined"
        sx={{ m: 2, color: "dark.main", fontSize: "1.3rem", fontWeight: "500" }}
      >
        Start Game
      </Button>
    </Box>
  );
};

export default Form;
