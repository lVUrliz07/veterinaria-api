import React, { useState } from 'react';
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  Alert,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import apiClient from '../../api/axios';

const Register = () => {
  const navigate = useNavigate();
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
    // Validación de campos obligatorios
    if (!formData.dni || !formData.nombre || !formData.apellido || !formData.password) {
      setError('Todos los campos obligatorios deben estar completos.');
      setSuccess('');
      return;
    }
    if (formData.password.length < 8) {
      setError('La contraseña debe tener al menos 8 caracteres.');
      setSuccess('');
      return;
    }
    try {
      // Aseguramos la URL correcta
      await apiClient.post('/auth/register', {
        dni: formData.dni,
        nombre: formData.nombre,
        apellido: formData.apellido,
        email: formData.email,
        telefono: formData.telefono,
        password: formData.password,
      });
      setSuccess('Registro exitoso. Ahora puedes iniciar sesión.');
      setError('');
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        setError(`Error: ${err.response.data.message}`);
      } else {
        setError('Error en el registro. Verifica los datos.');
      }
      setSuccess('');
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography component="h1" variant="h5">
          Registrarse
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
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
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Contraseña"
            type="password"
            id="password"
            autoComplete="new-password"
            value={formData.password}
            onChange={handleChange}
          />
          {error && <Alert severity="error">{error}</Alert>}
          {success && <Alert severity="success">{success}</Alert>}
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
            Registrarse
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Register;