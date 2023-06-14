import { styled } from "@mui/system";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Card from "@mui/material/Card";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";

export const HeaderButton = styled(Paper)(({ theme }) => ({
  color: "white",
  backgroundColor: theme.palette.orange.main,
  fontSize: "1.3rem",
  paddingLeft: 9,
  paddingRight: 9,
  borderRadius: 4,
  textAlign: "center",
  justifyContent:'center',
  height:'100%',
  marginLeft:6,
  marginRight:6

}));

export const HintArea = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  padding: 12,
  marginTop: 50,
  marginBottom: 30,
  borderRadius: 4,
  textAlign: "center",
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  alignContent: "center",
  alignItems: "center",
  maxWidth: "90%",
}));

export const HintCard = styled(Card)(({ theme }) => ({
  color: theme.palette.dark.main,
  background: "white",
  fontSize: "1rem",
  padding: 4,
  marginRight: 15,
  borderRadius: 4,
  textAlign: "center",
}));

export const BoardBox = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
}));

export const AnswerArea = styled(Box)(({ theme }) => ({
  marginBottom: 50,
  borderBottom: "2px solid #b2ebf2",
  textAlign: "center",
  minWidth: "75%",
  height: "60px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-end",
}));

export const AnswerBox = styled(Box)(({ theme }) => ({
  color: theme.palette.dark.main,
  fontSize: "1.9rem",
  textTransform: "uppercase",
  fontWeight:600,
  letterSpacing:8
}));

export const LettersArea = styled(Stack)(({ theme }) => ({
  color: theme.palette.dark.main,
  padding: 12,
  // border:'1px solid #b2ebf2',
  textAlign: "center",
  width: "75%",
  minHeight: "80px",
  overflow: "auto",
  display: "flex",
  alignItems: "center",
  marginBottom: 30,
}));

export const Letter = styled(Paper)(({ theme }) => ({
  color: theme.palette.dark.main,
  fontSize: "1.3rem",
  fontWeight: "500",
  textAlign: "center",
  width: 30,
  height: 30,
}));

export const FooterNav = styled(Box)(({ theme }) => ({
  bottom: 10,
  width: "400px",
  height: "50px",
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-around",
  alignItems: "center",
}));

export const IconItem = styled(Button)(({ theme }) => ({
  background: theme.palette.dark.main,
  color: "white",
  fontSize: "1rem",
  fontWeight: "600",
  width: "120px",
  height: "30px",
  opacity: 0.4,
}));

export const TimerBox = styled(Box)(({ theme }) => ({
  color: theme.palette.orange.main,
  fontSize: "1.5rem",
  fontWeight: "600",
  width: "120px",
  height: "40px",
  opacity: 0.4,
  display:"flex",
  alignItems:"center",
  justifyContent:"center"
}));

export const ResultBox = styled(Box)(({ theme }) => ({
  display: "flex",
  flex: 1,
  flexDirection: "column",
  justifyContent: "space-around",
  alignItems: "center",
  maxWidth: "md",
  height: "100%",
  overflow: "auto",
  color: theme.palette.dark.main,
  h1:{
    fontSize:'2rem'
  }
}));


export const ResultArea = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  width:"30%",
  height:"35%",
  minHeight:'225px',
  minWidth:'200px',
  padding:"10px",
  fontSize:"1.3rem",
  textSpacing:"1.5rem",
  backgroundColor: theme.palette.orange.main,
  fontWeight:500,
  opacity:0.5,
  color: "white",
  marginBottom:"10px",
  span:{
    fontSize:"1.7rem",
    fontWeight:600


  }
}));

