import { Alert } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import {showNotification} from '../features/mui/notifySlice';
import { useEffect } from "react";

function Notification() {
    const dispatch= useDispatch();
    const {warning}= useSelector((store)=>store.game);
    const {notification}= useSelector((store)=> store.alert)
    console.log("warning",warning)

    useEffect(()=>{
         console.log("warning",warning)
      warning.length!==0 &&  dispatch(showNotification({
            message: warning,
            open: true
        }))
    }, [warning])

    const handleClose = ()=>{
        dispatch(showNotification({
            open: false
        }))
    }
  return (
    notification?.open &&
    <Alert onClose={()=>handleClose()} sx={{top:0, marginBottom:3, width:"100%"}}>
   {notification.message }
    </Alert>
  )
}

export default Notification