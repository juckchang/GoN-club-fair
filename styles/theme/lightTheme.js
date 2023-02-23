import { createTheme } from '@mui/material/styles';

const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: "#fefefe",
      contrastText: "#fefefe" //button text white instead of black
    }
  },
});

export default lightTheme;
