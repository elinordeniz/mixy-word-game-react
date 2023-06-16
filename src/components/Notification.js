import { Alert } from "@mui/material";
import Box from "@mui/material/Box";
import { useSelector, useDispatch } from "react-redux";
import { showNotification } from "../features/mui/notifySlice";
import { useEffect } from "react";

function Notification() {
  const dispatch = useDispatch();
  const { warning, gameEnd,currentQuestion, isFetchErr } = useSelector((store) => store.game);
  const { notification } = useSelector((store) => store.alert);
 

  useEffect(() => {
    if (gameEnd && !isFetchErr) {
      dispatch(
        showNotification({
          message: "",
          open: false,
        })
      );
    }
    warning.length !== 0 &&
      dispatch(
        showNotification({
          message: warning,
          open: true,
        })
      );
  }, [warning]);

  const handleClose = () => {
    dispatch(
      showNotification({
        open: false,
      })
    );
  };

  useEffect(()=>{
    dispatch(
      showNotification({
        message: "",
        open: false,
      })
    );

  }, [currentQuestion])
  return (
    <Box sx={{ height: "20px" , marginBottom:"10px" }}>
      {notification?.open && (
        <Alert onClose={() => handleClose()} sx={{ width: "100%" }}>
          {notification?.message}
        </Alert>
      )}
    </Box>
  );
}

export default Notification;
