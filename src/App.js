import { useSelector, useDispatch } from 'react-redux';
import ContainerMain from './components/Container';
import {selectWordsList} from './features/api/apiSlice'
import Home from './components/Home';
import Game from './components/Game';
import Result from './components/Result';
import {Routes, Route} from 'react-router-dom';
import { useEffect } from 'react';
import { fetchWords } from './features/api/apiSlice';
import axios from 'axios';
import Box from "@mui/material/Box";


function App() {
   console.log("app.js")
  const dispatch=useDispatch();
  
  const fetchedWords= useSelector(selectWordsList)

const dif='hard';
const amount='4';



  return (
     <ContainerMain>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/game' element={<Game />} />
        <Route path='/result' element={<Result />} /> 

      </Routes>
     </ContainerMain>
  );
}

export default App;

  {/* <button onClick={()=>dispatch(fetchWords({dif,amount}))}>
Click to fetch
      </button>
      <div>{JSON.stringify(fetchedWords.wordsList)}</div> */}