import React from 'react';
import { Box, Typography, Button } from '@mui/material';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #E8F5E8 0%, #F3E5F5 100%)',
            p: 4,
            textAlign: 'center'
          }}
        >
          <Typography variant="h4" sx={{ color: '#4CAF50', mb: 2 }}>
            ¡Oops! Algo salió mal
          </Typography>
          <Typography variant="body1" sx={{ mb: 4 }}>
            Ocurrió un error inesperado. Por favor, recarga la página.
          </Typography>
          <Button
            variant="contained"
            onClick={() => window.location.reload()}
            sx={{
              background: 'linear-gradient(135deg, #4CAF50 0%, #00BCD4 100%)',
              color: '#fff'
            }}
          >
            Recargar Página
          </Button>
        </Box>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;