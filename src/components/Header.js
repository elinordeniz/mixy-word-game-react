import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import StarIcon from "@mui/icons-material/Star";
import Notification from "./Notification";
import { HeaderButton } from "../theme/styledComponents";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { getHint, getLetterHint } from "../features/words/wordsSlice";
import { memo } from "react";

const Header = () => {
  const score = useSelector((store) => store.game.score, shallowEqual);
  const stars = useSelector((store) => store.game.stars);

  const notification = useSelector(
    (store) => store.alert.notification,
    shallowEqual
  );
  const dispatch = useDispatch();
  const handleHint = () => {
    dispatch(getHint());
  };
  const handleLetter = () => {
    dispatch(getLetterHint());
  };

  return (
    <Box
      sx={{
        width: "100%",
      }}
    >
      <Box sx={{ height: "20px", marginBottom:"10px" }}>
        {notification && <Notification />}
      </Box>
      <Box
        sx={{
          width: "100%",
          mt: 7,
        }}
      >
        <Grid
          container
          spacing="5"
          flexDirection={{xs:'column', sm:'row', md:'row'}}
          justifyContent={{xs:'center', sm:'space-between', md:'space-between'}}

          height="100%"
          width= "100%"
         >
          <Grid display="flex" marginBottom={{xs:"25px", sm:0, md:0}} flexDirection="row" justifyContent="space-between" >
            <Grid item>
              <HeaderButton>Score: {score}</HeaderButton>
            </Grid>
            <Grid item>
              <HeaderButton>
                {stars} <StarIcon />
              </HeaderButton>
            </Grid>
          </Grid>
          <Grid display="flex" justifyContent="space-between">
            <HeaderButton onClick={() => handleHint()}>Get Hint</HeaderButton>
            <HeaderButton onClick={() => handleLetter()}>
              Get Letter
            </HeaderButton>
          </Grid>
          
        </Grid>
      </Box>
    </Box>
  );
};

export default memo(Header);
