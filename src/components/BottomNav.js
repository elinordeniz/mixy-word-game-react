
import Box from "@mui/material/Box";
import Close from '@mui/icons-material/Close';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import {FooterNav, IconItem} from '../theme/styledComponents'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


function BottomNav() {
    const [value, setValue]= useState();
    const navigate=useNavigate();
    const handleExit= ()=>{
      navigate('/');
    }
  return (
    <FooterNav >
        <IconItem aria-label="RESTART" startIcon={<RestartAltIcon/>}> RESTART</IconItem>
        <IconItem onClick={()=> handleExit()}  aria-label="EXIT" startIcon={<Close/>}> EXIT</IconItem>

    </FooterNav>
  )
}

export default BottomNav