import React, { useState, useContext } from 'react';
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  Alert,
  Paper,
  Tabs,
  Tab,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import apiClient from '../../api/axios';

const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [tab, setTab] = useState(0); // 0: Login, 1: Register
  const [formData, setFormData] = useState({
    dni: '',
    nombre: '',
    apellido: '',
    email: '',
    telefono: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      if (tab === 0) {
        // Login
        const response = await apiClient.post('/auth/login', { dni: formData.dni, password: formData.password });
        const { accessToken, user } = response.data;
        login(accessToken, user);
        navigate('/dashboard');
      } else {
        // Register
        await apiClient.post('/auth/register', {
          dni: formData.dni,
          nombre: formData.nombre,
          apellido: formData.apellido,
          email: formData.email,
          telefono: formData.telefono,
          password: formData.password,
        });
        setSuccess('Registro exitoso. Ahora puedes iniciar sesión.');
        setTab(0);
      }
    } catch (err) {
      setError(tab === 0 ? 'Error en el login. Verifica tus credenciales.' : 'Error en el registro. Verifica los datos.');
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundImage: 'url("/images/fondo-mascotas.png")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundColor: 'rgba(76, 175, 80, 0.1)', // Fallback translucido verde
      }}
    >
      <Container maxWidth="sm">
        <Paper
          elevation={10}
          sx={{
            p: 4,
            background: 'rgba(255, 255, 255, 0.9)', // Translucido blanco
            borderRadius: 3,
          }}
        >
          <Typography component="h1" variant="h4" align="center" sx={{ mb: 2, fontWeight: 'bold' }}>
            🐾 Clínica Veterinaria
          </Typography>
          <Tabs value={tab} onChange={(e, newValue) => setTab(newValue)} centered sx={{ mb: 2 }}>
            <Tab label="Iniciar Sesión" />
            <Tab label="Registrarse" />
          </Tabs>
          <Box component="form" onSubmit={handleSubmit}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="dni"
              label="DNI"
              name="dni"
              autoComplete="dni"
              autoFocus
              value={formData.dni}
              onChange={handleChange}
            />
            {tab === 1 && (
              <>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="nombre"
                  label="Nombre"
                  name="nombre"
                  autoComplete="given-name"
                  value={formData.nombre}
                  onChange={handleChange}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="apellido"
                  label="Apellido"
                  name="apellido"
                  autoComplete="family-name"
                  value={formData.apellido}
                  onChange={handleChange}
                />
                <TextField
                  margin="normal"
                  fullWidth
                  id="email"
                  label="Email"
                  name="email"
                  autoComplete="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                />
                <TextField
                  margin="normal"
                  fullWidth
                  id="telefono"
                  label="Teléfono"
                  name="telefono"
                  autoComplete="tel"
                  value={formData.telefono}
                  onChange={handleChange}
                />
              </>
            )}
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Contraseña"
              type="password"
              id="password"
              autoComplete={tab === 0 ? "current-password" : "new-password"}
              value={formData.password}
              onChange={handleChange}
            />
            {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
            {success && <Alert severity="success" sx={{ mt: 2 }}>{success}</Alert>}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                mb: 2,
                py: 1.5,
                background: 'linear-gradient(135deg, #4CAF50 0%, #00BCD4 50%, #9C27B0 100%)',
                color: '#fff',
                fontWeight: 'bold',
                '&:hover': { opacity: 0.9 }
              }}
            >
              {tab === 0 ? 'Iniciar Sesión' : 'Registrarse'}
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default Login;