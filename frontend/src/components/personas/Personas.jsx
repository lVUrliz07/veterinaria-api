import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Box,
  Alert,
  Snackbar,
  IconButton,
} from '@mui/material';
import { Delete as DeleteIcon, Edit as EditIcon, Add as AddIcon } from '@mui/icons-material';
import apiClient from '../../api/axios';

const Personas = () => {
  const [personas, setPersonas] = useState([]);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [deleteDialog, setDeleteDialog] = useState({ open: false, id: null });
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [formData, setFormData] = useState({
    dni: '',
    nombre: '',
    apellido: '',
    email: '',
    telefono: '',
    password: '',
  });

  useEffect(() => {
    fetchPersonas();
  }, []);

  const fetchPersonas = async () => {
    try {
      const response = await apiClient.get('/personas');
      setPersonas(response.data);
    } catch (error) {
      console.error('Error fetching personas:', error);
    }
  };

  const handleOpen = (persona = null) => {
    if (persona) {
      setEditing(persona);
      setFormData({
        dni: persona.dni,
        nombre: persona.nombre,
        apellido: persona.apellido,
        email: persona.email || '',
        telefono: persona.telefono || '',
        password: '', // Don't show password
      });
    } else {
      setEditing(null);
      setFormData({
        dni: '',
        nombre: '',
        apellido: '',
        email: '',
        telefono: '',
        password: '',
      });
    }
    setOpen(true);
  };

  const handleClose = () => {
    setFormData({
      dni: '',
      nombre: '',
      apellido: '',
      email: '',
      telefono: '',
      password: '',
    });
    setEditing(null);
    setOpen(false);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.nombre || !formData.apellido || !formData.dni) {
      setSnackbar({ open: true, message: 'Por favor, complete todos los campos obligatorios.', severity: 'error' });
      return;
    }
    try {
      if (editing) {
        await apiClient.patch(`/personas/${editing.id_persona}`, formData);
        setSnackbar({ open: true, message: 'Persona actualizada exitosamente.', severity: 'success' });
      } else {
        await apiClient.post('/personas', formData);
        setSnackbar({ open: true, message: 'Persona creada exitosamente.', severity: 'success' });
      }
      fetchPersonas();
      handleClose();
    } catch (error) {
      console.error('Error saving persona:', error);
      setSnackbar({ open: true, message: 'Error al guardar la persona. Revisa los datos ingresados.', severity: 'error' });
    }
  };

  const handleDelete = (id) => {
    setDeleteDialog({ open: true, id });
  };

  const confirmDelete = async () => {
    try {
      await apiClient.delete(`/personas/${deleteDialog.id}`);
      fetchPersonas();
      setSnackbar({ open: true, message: 'Persona eliminada exitosamente.', severity: 'success' });
    } catch (error) {
      console.error('Error deleting persona:', error);
      setSnackbar({ open: true, message: 'Error al eliminar la persona.', severity: 'error' });
    }
    setDeleteDialog({ open: false, id: null });
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4, background: 'linear-gradient(135deg, #E8F5E8 0%, #F3E5F5 100%)', p: 3, borderRadius: 3 }}>
        <Typography variant="h4" gutterBottom sx={{ color: '#4CAF50', fontWeight: 'bold' }}>
          👥 Gestión de Personas
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpen()}
          sx={{
            mb: 2,
            background: 'linear-gradient(135deg, #4CAF50 0%, #00BCD4 50%, #9C27B0 100%)',
            color: '#fff',
            fontWeight: 'bold',
            '&:hover': { opacity: 0.9 }
          }}
        >
          Agregar Persona
        </Button>
        <TableContainer component={Paper} sx={{ mt: 2, borderRadius: 2, boxShadow: 3, maxHeight: 500 }}>
          <Table stickyHeader>
            <TableHead sx={{ background: 'linear-gradient(135deg, #4CAF50 0%, #00BCD4 100%)' }}>
              <TableRow>
                <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>DNI</TableCell>
                <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>Nombre</TableCell>
                <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>Apellido</TableCell>
                <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>Email</TableCell>
                <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>Teléfono</TableCell>
                <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {personas.map((persona) => (
                <TableRow key={persona.id_persona} sx={{ '&:hover': { backgroundColor: '#f5f5f5' } }}>
                  <TableCell>{persona.dni}</TableCell>
                  <TableCell>{persona.nombre}</TableCell>
                  <TableCell>{persona.apellido}</TableCell>
                  <TableCell>{persona.email}</TableCell>
                  <TableCell>{persona.telefono}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleOpen(persona)} color="primary">
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(persona.id_persona)} color="error">
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ background: 'linear-gradient(135deg, #4CAF50 0%, #00BCD4 100%)', color: '#fff' }}>
          {editing ? 'Editar Persona' : 'Agregar Persona'}
        </DialogTitle>
        <DialogContent sx={{ mt: 2 }}>
          <TextField
            autoFocus
            margin="dense"
            name="dni"
            label="DNI"
            fullWidth
            value={formData.dni}
            onChange={handleChange}
            required
          />
          <TextField
            margin="dense"
            name="nombre"
            label="Nombre"
            fullWidth
            value={formData.nombre}
            onChange={handleChange}
            required
          />
          <TextField
            margin="dense"
            name="apellido"
            label="Apellido"
            fullWidth
            value={formData.apellido}
            onChange={handleChange}
            required
          />
          <TextField
            margin="dense"
            name="email"
            label="Email"
            type="email"
            fullWidth
            value={formData.email}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="telefono"
            label="Teléfono"
            fullWidth
            value={formData.telefono}
            onChange={handleChange}
          />
          {!editing && (
            <TextField
              margin="dense"
              name="password"
              label="Contraseña"
              type="password"
              fullWidth
              value={formData.password}
              onChange={handleChange}
              required
            />
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} sx={{ color: '#666' }}>Cancelar</Button>
          <Button
            onClick={handleSubmit}
            variant="contained"
            sx={{
              background: 'linear-gradient(135deg, #4CAF50 0%, #00BCD4 50%, #9C27B0 100%)',
              color: '#fff',
              fontWeight: 'bold',
              '&:hover': { opacity: 0.9 }
            }}
          >
            Guardar
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={deleteDialog.open} onClose={() => setDeleteDialog({ open: false, id: null })}>
        <DialogTitle sx={{ color: '#d32f2f' }}>Confirmar Eliminación</DialogTitle>
        <DialogContent>
          <Typography>¿Estás seguro de que deseas eliminar esta persona? Esta acción no se puede deshacer.</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialog({ open: false, id: null })}>Cancelar</Button>
          <Button onClick={confirmDelete} color="error" variant="contained">
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={() => setSnackbar({ ...snackbar, open: false })} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Personas;