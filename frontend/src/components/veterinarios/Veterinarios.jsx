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

const Veterinarios = () => {
  const [veterinarios, setVeterinarios] = useState([]);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [deleteDialog, setDeleteDialog] = useState({ open: false, id: null });
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [formData, setFormData] = useState({
    licencia: '',
    nombre: '',
    apellido: '',
    especialidad: '',
    email: '',
    telefono: '',
  });

  useEffect(() => {
    fetchVeterinarios();
  }, []);

  const fetchVeterinarios = async () => {
    try {
      const response = await apiClient.get('/veterinarios');
      setVeterinarios(response.data);
    } catch (error) {
      console.error('Error fetching veterinarios:', error);
    }
  };

  const handleOpen = (veterinario = null) => {
    if (veterinario) {
      setEditing(veterinario);
      setFormData({
        licencia: veterinario.licencia,
        nombre: veterinario.nombre,
        apellido: veterinario.apellido,
        especialidad: veterinario.especialidad || '',
        email: veterinario.email || '',
        telefono: veterinario.telefono || '',
      });
    } else {
      setEditing(null);
      setFormData({
        licencia: '',
        nombre: '',
        apellido: '',
        especialidad: '',
        email: '',
        telefono: '',
      });
    }
    setOpen(true);
  };

  const handleClose = () => {
    setFormData({
      licencia: '',
      nombre: '',
      apellido: '',
      especialidad: '',
      email: '',
      telefono: '',
    });
    setEditing(null);
    setOpen(false);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.licencia || !formData.nombre || !formData.apellido) {
      setSnackbar({ open: true, message: 'Por favor, complete todos los campos obligatorios.', severity: 'error' });
      return;
    }
    try {
      if (editing) {
        await apiClient.patch(`/veterinarios/${editing.id_veterinario}`, formData);
        setSnackbar({ open: true, message: 'Veterinario actualizado exitosamente.', severity: 'success' });
      } else {
        await apiClient.post('/veterinarios', formData);
        setSnackbar({ open: true, message: 'Veterinario creado exitosamente.', severity: 'success' });
      }
      fetchVeterinarios();
      handleClose();
    } catch (error) {
      console.error('Error saving veterinario:', error);
      setSnackbar({ open: true, message: 'Error al guardar el veterinario. Revisa los datos ingresados.', severity: 'error' });
    }
  };

  const handleDelete = (id) => {
    setDeleteDialog({ open: true, id });
  };

  const confirmDelete = async () => {
    try {
      await apiClient.delete(`/veterinarios/${deleteDialog.id}`);
      fetchVeterinarios();
      setSnackbar({ open: true, message: 'Veterinario eliminado exitosamente.', severity: 'success' });
    } catch (error) {
      console.error('Error deleting veterinario:', error);
      setSnackbar({ open: true, message: 'Error al eliminar el veterinario.', severity: 'error' });
    }
    setDeleteDialog({ open: false, id: null });
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4, background: 'linear-gradient(135deg, #E8F5E8 0%, #F3E5F5 100%)', p: 3, borderRadius: 3 }}>
        <Typography variant="h4" gutterBottom sx={{ color: '#4CAF50', fontWeight: 'bold' }}>
          🩺 Gestión de Veterinarios
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
          Agregar Veterinario
        </Button>
        <TableContainer component={Paper} sx={{ mt: 2, borderRadius: 2, boxShadow: 3, maxHeight: 500 }}>
          <Table stickyHeader>
            <TableHead sx={{ background: 'linear-gradient(135deg, #4CAF50 0%, #00BCD4 100%)' }}>
              <TableRow>
                <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>Licencia</TableCell>
                <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>Nombre</TableCell>
                <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>Apellido</TableCell>
                <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>Especialidad</TableCell>
                <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>Email</TableCell>
                <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {veterinarios.map((veterinario) => (
                <TableRow key={veterinario.id_veterinario} sx={{ '&:hover': { backgroundColor: '#f5f5f5' } }}>
                  <TableCell>{veterinario.licencia}</TableCell>
                  <TableCell>{veterinario.nombre}</TableCell>
                  <TableCell>{veterinario.apellido}</TableCell>
                  <TableCell>{veterinario.especialidad}</TableCell>
                  <TableCell>{veterinario.email}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleOpen(veterinario)} color="primary">
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(veterinario.id_veterinario)} color="error">
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
          {editing ? 'Editar Veterinario' : 'Agregar Veterinario'}
        </DialogTitle>
        <DialogContent sx={{ mt: 2 }}>
          <TextField
            autoFocus
            margin="dense"
            name="licencia"
            label="Licencia"
            fullWidth
            value={formData.licencia}
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
            name="especialidad"
            label="Especialidad"
            fullWidth
            value={formData.especialidad}
            onChange={handleChange}
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
          <Typography>¿Estás seguro de que deseas eliminar este veterinario? Esta acción no se puede deshacer.</Typography>
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

export default Veterinarios;