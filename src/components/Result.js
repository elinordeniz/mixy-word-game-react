import {ResultBox, ResultArea,HeaderButton} from '../theme/styledComponents'
import { useSelector } from 'react-redux'
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';


function Result() {
    const {score, stars, bestScore}= useSelector((store)=>store.game)
    const navigate=useNavigate();
  return (
    <ResultBox>
        <h1>Results</h1>
        <ResultArea>
            <p>Your Score : <span>{score}</span></p>
            <p>Best Score : <span>{bestScore}</span></p>
            <p>Total Start : <span>{stars}</span> </p>
        </ResultArea>
        <Button onClick={()=>navigate('/')} sx={{color:'dark.main', fontWeight:'500', fontSize:"1.4rem"}} variant='outlined'>Play again! </Button>

    </ResultBox>
  )
}

export default Result