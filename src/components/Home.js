import Form from "./Form";
import Box from "@mui/material/Box";
import Notification from "./Notification";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { showNotification } from "../features/mui/notifySlice";

const Home = () => {
  const dispatch = useDispatch();
  const { fetchError, isFetchErr } = useSelector((store) => store.game);

  useEffect(() => {
    isFetchErr &&
      dispatch(
        showNotification({
          message: fetchError,
          open: true,
        })
      );
  }, [isFetchErr]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        flex: 1,
        justifyContent: "space-between",
        alignItems: "center",
        alignContent: "center",
        margin: "auto",
      }}
    >
      <Box sx={{ mb: 25, justifyContent: "flex", width: "100%" }}>
        <Notification />
      </Box>
      <Form />
    </Box>
  );
};

export default Home;
