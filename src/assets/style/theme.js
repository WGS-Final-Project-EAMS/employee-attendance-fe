// src/theme.js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
          light: '#b3e5fc', // Soft light blue
          main: '#81d4fa',  // Soft main blue
          dark: '#4ba3c7',  // Soft dark blue
          contrastText: '#ffffff',
        },
        secondary: {
          light: '#ffe082', // Soft light yellow
          main: '#ffca28',  // Soft main yellow
          dark: '#c79a00',  // Soft dark yellow
          contrastText: '#000000',
        },
        warning: {
          light: '#fff59d', // Soft light amber
          main: '#ffc107',  // Soft main amber
          dark: '#c79100',  // Soft dark amber
          contrastText: '#000000',
        },
        error: {
          light: '#ef9a9a', // Soft light red
          main: '#e57373',  // Soft main red
          dark: '#af4448',  // Soft dark red
          contrastText: '#ffffff',
        },
        info: {
          light: '#80deea', // Soft light cyan
          main: '#4dd0e1',  // Soft main cyan
          dark: '#009faf',  // Soft dark cyan
          contrastText: '#000000',
        },
        success: {
          light: '#a5d6a7', // Soft light green
          main: '#81c784',  // Soft main green
          dark: '#519657',  // Soft dark green
          contrastText: '#ffffff',
        },
    },
});

export default theme;