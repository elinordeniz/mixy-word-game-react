import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import StarIcon from "@mui/icons-material/Star";
import Notification from "./Notification";
import { HeaderButton } from "../theme/styledComponents";
import { useSelector, useDispatch } from "react-redux";
import { getHint,getLetterHint } from "../features/words/wordsSlice";

const Header = () => {
  const { score, stars, hintLeft } = useSelector((store) => store.game);
  const {notification}= useSelector((store)=> store.alert)
  const dispatch = useDispatch();
  const handleHint = () => {
    dispatch(getHint());
  };
  const handleLetter= ()=>{
    dispatch(getLetterHint())
  }

  return (
    <Box sx={{
      width: "100%",
    }}>
<Notification />
    <Box
      sx={{
        width: "100%",
        mt: 7,
      }}
    >
      <Grid
        container
        spacing="10"
        justifyContent="space-between"
        flexDirection="row"
        margin="5"
       
      >
        <Grid  display="flex" marginLeft="15px" >
          <HeaderButton onClick={() => handleHint()}>Get Hint</HeaderButton>
          <HeaderButton onClick={() => handleLetter()}>Get Letter</HeaderButton>
        </Grid>
        <Grid  display="flex" marginRight="15px"  >
          <Grid item>
            <HeaderButton>Score: {score}</HeaderButton>
          </Grid>
          <Grid item>
            <HeaderButton>
              {stars} <StarIcon />
            </HeaderButton>
          </Grid>
        </Grid>
      </Grid>
    </Box>
    </ Box>
  );
};

export default Header;
