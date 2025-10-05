import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#4CAF50', // Verde
    },
    secondary: {
      main: '#00BCD4', // Turquesa
    },
    background: {
      default: '#E8F5E8', // Verde muy claro
    },
    gradient: {
      main: 'linear-gradient(135deg, #4CAF50 0%, #00BCD4 50%, #9C27B0 100%)', // Verde, Turquesa, Plum
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 600,
    },
    h5: {
      fontWeight: 500,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
      },
    },
  },
});

export default theme;