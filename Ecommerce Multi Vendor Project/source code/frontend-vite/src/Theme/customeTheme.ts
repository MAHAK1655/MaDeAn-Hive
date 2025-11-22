import { createTheme } from "@mui/material";

const customeTheme = createTheme({
  palette: {
    mode: "light", // This sets the theme to dark mode
    primary: {
      main: "#13123fff",

    },
    secondary: {
      main: "#ffffffff", 
    },
   
   
  },
});

export default customeTheme;