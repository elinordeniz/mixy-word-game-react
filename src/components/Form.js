import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Button from '@mui/material/Button';
import { useDispatch, useSelector } from "react-redux";
import {fetchWords} from "../features/api/apiSlice";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Form = () => {
    const navigate=useNavigate()
    const [amount, setAmount]=useState('3');
    const [difficulty, setDifficulty]=useState('easy');
    const dispatch=useDispatch();
   //const list= useSelector(state=>state.wordsList.entities)
    const handleSubmit = (e)=>{
      e.preventDefault();
    try{
        console.log('handle submit')
        dispatch(fetchWords({amount, difficulty})).unwrap();
        navigate('/game');
    }catch(err){
         console.log(err)
    }

    }
  return (
    <Box  sx={{width:250,display:'flex',flexDirection:"column" ,justifyContent:'center', alignItems:'center', alignContent:'center',color:'dark.main' }}>
         <h3>Mixy Mixy Word Game</h3>
      <FormControl fullWidth sx={{m:2}}>
    
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
      <FormControl fullWidth sx={{m:2}}>
       <InputLabel id="amount">Select Questions</InputLabel>
        <Select 
        labelId="amount" 
        label="Select Quantity" 
        defaultValue="3"
        onChange={(e) => setAmount(e.target.value)}
        >
          <MenuItem value="3">3</MenuItem>
          <MenuItem value="20">20</MenuItem>
          <MenuItem value="30">30</MenuItem>
        </Select>
      </FormControl>
      <Button fullWidth  onClick={(e)=>handleSubmit(e)} variant="outlined" sx={{m:2, color:'dark.main', fontSize:'1.3rem', fontWeight:'500'}}>Start Game</Button>
    </Box>
  );
};

export default Form;
