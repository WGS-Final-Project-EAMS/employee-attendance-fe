// src/theme.js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
      primary: {
        light: '#5f738c', // Light navy blue
        main: '#3f51b5',  // Main navy blue
        dark: '#2c387e',  // Dark navy blue
        contrastText: '#ffffff', // White text
      },
      secondary: {
        light: '#bdbdbd', // Light grey
        main: '#9e9e9e',  // Main grey
        dark: '#616161',  // Dark grey
        contrastText: '#000000', // Black text
      },
      warning: {
        light: '#fff9c4', // Light yellow
        main: '#ffeb3b',  // Main yellow
        dark: '#fbc02d',  // Dark yellow
        contrastText: '#000000', // Black text
      },
      error: {
        light: '#ef5350', // Light red
        main: '#f44336',  // Main red
        dark: '#c62828',  // Dark red
        contrastText: '#ffffff', // White text
      },
      info: {
        light: '#b3e5fc', // Light blue
        main: '#03a9f4',  // Main light blue
        dark: '#0288d1',  // Dark blue
        contrastText: '#000000', // Black text
      },
      success: {
        light: '#81c784', // Light green
        main: '#4caf50',  // Main green
        dark: '#388e3c',  // Dark green
        contrastText: '#ffffff', // White text
    },
      background: {
        default: '#f0f4f8', // Light greyish blue
        paper: '#ffffff',   // Untuk card atau elemen paper
    },
    },
});

export default theme;