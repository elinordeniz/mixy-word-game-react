import {createTheme } from '@mui/material/styles';
import { pink, blueGrey,deepOrange,cyan, teal } from "@mui/material/colors";



export const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });

  
  

  export const theme = createTheme({
    palette: {
      primary: {
       // main: pink['A400'],
       main: cyan[50]
        
      },
      secondary:{
        main: blueGrey['A700']
      },
      lighter: {
        main: '#fcfafc',
      },
      orange:{
        main: deepOrange['400']
      },
      dark:{
        main: cyan['900']
      }

    },
    typography: {
      color: blueGrey['A700'],
      fontFamily: 'Barlow, sans-serif',
      Button: {
        fontSize: '1.2rem',
        fontWeight:'400',
        backgroundColor:blueGrey['800'],
        color: '#fcfafc',

      },
      // Disable h3 variant
      h3: undefined,
    },
    p:{
      fontSize: '30px'
    }
  });