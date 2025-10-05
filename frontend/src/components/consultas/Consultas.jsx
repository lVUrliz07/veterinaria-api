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

const Consultas = () => {
  const [consultas, setConsultas] = useState([]);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [deleteDialog, setDeleteDialog] = useState({ open: false, id: null });
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [formData, setFormData] = useState({
    id_mascota: '',
    id_veterinario: '',
    motivo_consulta: '',
    diagnostico: '',
    fecha_consulta: '',
  });

  useEffect(() => {
    fetchConsultas();
  }, []);

  const fetchConsultas = async () => {
    try {
      const response = await apiClient.get('/consultas');
      setConsultas(response.data);
    } catch (error) {
      console.error('Error fetching consultas:', error);
    }
  };

  const handleOpen = (consulta = null) => {
    if (consulta) {
      setEditing(consulta);
      setFormData({
        id_mascota: consulta.mascota?.id_mascota || '',
        id_veterinario: consulta.veterinario?.id_veterinario || '',
        motivo_consulta: consulta.motivo_consulta,
        diagnostico: consulta.diagnostico || '',
        fecha_consulta: consulta.fecha_consulta ? new Date(consulta.fecha_consulta).toISOString().split('T')[0] : '',
      });
    } else {
      setEditing(null);
      setFormData({
        id_mascota: '',
        id_veterinario: '',
        motivo_consulta: '',
        diagnostico: '',
        fecha_consulta: new Date().toISOString().split('T')[0],
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
    if (!formData.id_mascota || !formData.id_veterinario || !formData.motivo_consulta || !formData.fecha_consulta) {
      setSnackbar({ open: true, message: 'Por favor, complete todos los campos obligatorios.', severity: 'error' });
      return;
    }
    try {
      const data = { ...formData };
      if (editing) {
        await apiClient.patch(`/consultas/${editing.id_consulta}`, data);
        setSnackbar({ open: true, message: 'Consulta actualizada exitosamente.', severity: 'success' });
      } else {
        await apiClient.post('/consultas', data);
        setSnackbar({ open: true, message: 'Consulta creada exitosamente.', severity: 'success' });
      }
      fetchConsultas();
      handleClose();
    } catch (error) {
      console.error('Error saving consulta:', error);
      setSnackbar({ open: true, message: 'Error al guardar la consulta.', severity: 'error' });
    }
  };

  const handleDelete = (id) => {
    setDeleteDialog({ open: true, id });
  };

  const confirmDelete = async () => {
    try {
      await apiClient.delete(`/consultas/${deleteDialog.id}`);
      fetchConsultas();
      setSnackbar({ open: true, message: 'Consulta eliminada exitosamente.', severity: 'success' });
    } catch (error) {
      console.error('Error deleting consulta:', error);
      setSnackbar({ open: true, message: 'Error al eliminar la consulta.', severity: 'error' });
    }
    setDeleteDialog({ open: false, id: null });
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4, background: 'linear-gradient(135deg, #E8F5E8 0%, #F3E5F5 100%)', p: 3, borderRadius: 3 }}>
        <Typography variant="h4" gutterBottom sx={{ color: '#4CAF50', fontWeight: 'bold' }}>
          🩺 Gestión de Consultas Veterinarias
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
          Agregar Consulta
        </Button>
        <TableContainer component={Paper} sx={{ mt: 2, borderRadius: 2, boxShadow: 3 }}>
          <Table>
            <TableHead sx={{ background: 'linear-gradient(135deg, #4CAF50 0%, #00BCD4 100%)' }}>
              <TableRow>
                <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>Mascota</TableCell>
                <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>Veterinario</TableCell>
                <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>Motivo</TableCell>
                <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>Diagnóstico</TableCell>
                <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>Fecha</TableCell>
                <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {consultas.map((consulta) => (
                <TableRow key={consulta.id_consulta} sx={{ '&:hover': { backgroundColor: '#f5f5f5' } }}>
                  <TableCell>{consulta.mascota?.nombre_mascota}</TableCell>
                  <TableCell>{consulta.veterinario?.nombre} {consulta.veterinario?.apellido}</TableCell>
                  <TableCell>{consulta.motivo_consulta}</TableCell>
                  <TableCell>{consulta.diagnostico}</TableCell>
                  <TableCell>{new Date(consulta.fecha_consulta).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleOpen(consulta)} color="primary">
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(consulta.id_consulta)} color="error">
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
          {editing ? 'Editar Consulta' : 'Agregar Consulta'}
        </DialogTitle>
        <DialogContent sx={{ mt: 2 }}>
          <TextField
            autoFocus
            margin="dense"
            name="id_mascota"
            label="ID Mascota"
            type="number"
            fullWidth
            value={formData.id_mascota}
            onChange={handleChange}
            required
          />
          <TextField
            margin="dense"
            name="id_veterinario"
            label="ID Veterinario"
            type="number"
            fullWidth
            value={formData.id_veterinario}
            onChange={handleChange}
            required
          />
          <TextField
            margin="dense"
            name="fecha_consulta"
            label="Fecha Consulta"
            type="date"
            fullWidth
            value={formData.fecha_consulta}
            onChange={handleChange}
            required
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            margin="dense"
            name="motivo_consulta"
            label="Motivo Consulta"
            fullWidth
            value={formData.motivo_consulta}
            onChange={handleChange}
            required
          />
          <TextField
            margin="dense"
            name="diagnostico"
            label="Diagnóstico"
            fullWidth
            multiline
            rows={3}
            value={formData.diagnostico}
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
          <Typography>¿Estás seguro de que deseas eliminar esta consulta? Esta acción no se puede deshacer.</Typography>
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

export default Consultas;