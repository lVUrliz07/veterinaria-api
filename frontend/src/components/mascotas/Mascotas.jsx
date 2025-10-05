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

const Mascotas = () => {
  const [mascotas, setMascotas] = useState([]);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [deleteDialog, setDeleteDialog] = useState({ open: false, id: null });
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [formData, setFormData] = useState({
    id_persona: '',
    nombre_mascota: '',
    tipo_animal: '',
    raza: '',
    fecha_nacimiento: '',
  });

  useEffect(() => {
    fetchMascotas();
  }, []);

  const fetchMascotas = async () => {
    try {
      const response = await apiClient.get('/mascotas');
      setMascotas(response.data);
    } catch (error) {
      console.error('Error fetching mascotas:', error);
    }
  };

  const handleOpen = (mascota = null) => {
    if (mascota) {
      setEditing(mascota);
      setFormData({
        id_persona: mascota.persona?.id_persona || '',
        nombre_mascota: mascota.nombre_mascota,
        tipo_animal: mascota.tipo_animal,
        raza: mascota.raza || '',
        fecha_nacimiento: mascota.fecha_nacimiento ? mascota.fecha_nacimiento.split('T')[0] : '',
      });
    } else {
      setEditing(null);
      setFormData({
        id_persona: '',
        nombre_mascota: '',
        tipo_animal: '',
        raza: '',
        fecha_nacimiento: '',
      });
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditing(null);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.id_persona || !formData.nombre_mascota || !formData.tipo_animal) {
      setSnackbar({ open: true, message: 'Por favor, complete todos los campos obligatorios.', severity: 'error' });
      return;
    }
    try {
      const data = { ...formData };
      if (editing) {
        await apiClient.patch(`/mascotas/${editing.id_mascota}`, data);
        setSnackbar({ open: true, message: 'Mascota actualizada exitosamente.', severity: 'success' });
      } else {
        await apiClient.post('/mascotas', data);
        setSnackbar({ open: true, message: 'Mascota creada exitosamente.', severity: 'success' });
      }
      fetchMascotas();
      handleClose();
    } catch (error) {
      console.error('Error saving mascota:', error);
      setSnackbar({ open: true, message: 'Error al guardar la mascota.', severity: 'error' });
    }
  };

  const handleDelete = (id) => {
    setDeleteDialog({ open: true, id });
  };

  const confirmDelete = async () => {
    try {
      await apiClient.delete(`/mascotas/${deleteDialog.id}`);
      fetchMascotas();
      setSnackbar({ open: true, message: 'Mascota eliminada exitosamente.', severity: 'success' });
    } catch (error) {
      console.error('Error deleting mascota:', error);
      setSnackbar({ open: true, message: 'Error al eliminar la mascota.', severity: 'error' });
    }
    setDeleteDialog({ open: false, id: null });
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4, background: 'linear-gradient(135deg, #E8F5E8 0%, #F3E5F5 100%)', p: 3, borderRadius: 3 }}>
        <Typography variant="h4" gutterBottom sx={{ color: '#4CAF50', fontWeight: 'bold' }}>
          🐾 Gestión de Mascotas
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
          Agregar Mascota
        </Button>
        <TableContainer component={Paper} sx={{ mt: 2, borderRadius: 2, boxShadow: 3 }}>
          <Table>
            <TableHead sx={{ background: 'linear-gradient(135deg, #4CAF50 0%, #00BCD4 100%)' }}>
              <TableRow>
                <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>Nombre</TableCell>
                <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>Tipo</TableCell>
                <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>Raza</TableCell>
                <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>Dueño</TableCell>
                <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {mascotas.map((mascota) => (
                <TableRow key={mascota.id_mascota} sx={{ '&:hover': { backgroundColor: '#f5f5f5' } }}>
                  <TableCell>{mascota.nombre_mascota}</TableCell>
                  <TableCell>{mascota.tipo_animal}</TableCell>
                  <TableCell>{mascota.raza}</TableCell>
                  <TableCell>{mascota.persona?.nombre} {mascota.persona?.apellido}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleOpen(mascota)} color="primary">
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(mascota.id_mascota)} color="error">
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
          {editing ? 'Editar Mascota' : 'Agregar Mascota'}
        </DialogTitle>
        <DialogContent sx={{ mt: 2 }}>
          <TextField
            autoFocus
            margin="dense"
            name="id_persona"
            label="ID Persona (Dueño)"
            type="number"
            fullWidth
            value={formData.id_persona}
            onChange={handleChange}
            required
          />
          <TextField
            margin="dense"
            name="nombre_mascota"
            label="Nombre Mascota"
            fullWidth
            value={formData.nombre_mascota}
            onChange={handleChange}
            required
          />
          <TextField
            margin="dense"
            name="tipo_animal"
            label="Tipo Animal"
            fullWidth
            value={formData.tipo_animal}
            onChange={handleChange}
            required
          />
          <TextField
            margin="dense"
            name="raza"
            label="Raza"
            fullWidth
            value={formData.raza}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="fecha_nacimiento"
            label="Fecha Nacimiento"
            type="date"
            fullWidth
            InputLabelProps={{ shrink: true }}
            value={formData.fecha_nacimiento}
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
          <Typography>¿Estás seguro de que deseas eliminar esta mascota? Esta acción no se puede deshacer.</Typography>
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

export default Mascotas;