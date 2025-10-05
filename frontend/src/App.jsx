import React, { Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Box, CircularProgress, Typography } from '@mui/material';
import theme from './theme';
import Login from './components/auth/Login';
import ProtectedRoute from './components/ProtectedRoute';
import './App.css';

// Lazy loading para mejor performance
const Dashboard = React.lazy(() => import('./components/Dashboard'));
const Personas = React.lazy(() => import('./components/personas/Personas'));
const Mascotas = React.lazy(() => import('./components/mascotas/Mascotas'));
const Veterinarios = React.lazy(() => import('./components/veterinarios/Veterinarios'));
const Consultas = React.lazy(() => import('./components/consultas/Consultas'));

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <Suspense fallback={
          <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #E8F5E8 0%, #F3E5F5 100%)'
          }}>
            <CircularProgress sx={{ color: '#4CAF50', mb: 2 }} />
            <Typography variant="h6" color="text.secondary">Cargando módulo...</Typography>
          </Box>
        }>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/personas" element={<Personas />} />
              <Route path="/mascotas" element={<Mascotas />} />
              <Route path="/veterinarios" element={<Veterinarios />} />
              <Route path="/consultas" element={<Consultas />} />
            </Route>
            <Route path="/" element={<Navigate to="/dashboard" />} />
            <Route path="*" element={<Box sx={{ p: 4, textAlign: 'center' }}><Typography variant="h4">Página no encontrada</Typography></Box>} />
          </Routes>
        </Suspense>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
