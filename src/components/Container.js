import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Alert from '@mui/material/Alert';

const ContainerMain = ({children}) => {
   console.log("container")
  return (
    <Container maxWidth="md"  sx={{ backgroundColor: "primary.main", minHeight:"100vh", display:"flex", flexDirection:"column", margin:"auto", overflow:"auto"}}>
      <Box sx={{ backgroundColor: 'lighter.main', height:"100vh", overflow:'auto'}} >
        {/* <Alert>
          Hi
        </Alert> */}
      {children}
        </Box>
    </Container>
  );
};

export default ContainerMain;
