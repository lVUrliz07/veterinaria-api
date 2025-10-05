import React, { useContext } from 'react';
import {
  Container,
  Typography,
  Button,
  Box,
  AppBar,
  Toolbar,
  Grid,
  Card,
  CardContent,
  CardActions,
  Avatar,
} from '@mui/material';
import { People as PeopleIcon, Pets as PetsIcon, MedicalServices as MedicalIcon, Assignment as AssignmentIcon, Logout as LogoutIcon } from '@mui/icons-material';
import { AuthContext } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div>
      <AppBar position="static" sx={{ background: 'linear-gradient(135deg, #4CAF50 0%, #00BCD4 50%, #9C27B0 100%)' }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
            🐾 Clínica Veterinaria
          </Typography>
          <Button color="inherit" startIcon={<LogoutIcon />} onClick={handleLogout}>
            Cerrar Sesión
          </Button>
        </Toolbar>
      </AppBar>
      <Container maxWidth="lg" sx={{ mt: 4, background: 'linear-gradient(135deg, #E8F5E8 0%, #F3E5F5 100%)', p: 4, borderRadius: 3 }}>
        <Typography variant="h4" gutterBottom sx={{ color: '#4CAF50', fontWeight: 'bold', textAlign: 'center' }}>
          ¡Bienvenido al Panel de Control! 🐶
        </Typography>
        <Typography variant="h6" sx={{ textAlign: 'center', mb: 4, color: '#666' }}>
          Gestiona tu clínica veterinaria de manera eficiente
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6} md={3}>
            <Card
              sx={{
                height: '100%',
                background: 'linear-gradient(135deg, #FFF 0%, #F5F5F5 100%)',
                boxShadow: 3,
                '&:hover': { transform: 'scale(1.05)', boxShadow: 6 },
                transition: 'all 0.3s ease'
              }}
            >
              <CardContent sx={{ textAlign: 'center' }}>
                <Avatar sx={{ bgcolor: '#4CAF50', mx: 'auto', mb: 2 }}>
                  <PeopleIcon />
                </Avatar>
                <Typography variant="h5" component="div" sx={{ fontWeight: 'bold' }}>
                  Personas
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Gestionar dueños de mascotas
                </Typography>
              </CardContent>
              <CardActions sx={{ justifyContent: 'center' }}>
                <Button
                  size="small"
                  variant="contained"
                  sx={{ background: 'linear-gradient(135deg, #4CAF50 0%, #00BCD4 100%)', color: '#fff' }}
                  onClick={() => navigate('/personas')}
                >
                  Ver
                </Button>
              </CardActions>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card
              sx={{
                height: '100%',
                background: 'linear-gradient(135deg, #FFF 0%, #F5F5F5 100%)',
                boxShadow: 3,
                '&:hover': { transform: 'scale(1.05)', boxShadow: 6 },
                transition: 'all 0.3s ease'
              }}
            >
              <CardContent sx={{ textAlign: 'center' }}>
                <Avatar sx={{ bgcolor: '#FF9800', mx: 'auto', mb: 2 }}>
                  <PetsIcon />
                </Avatar>
                <Typography variant="h5" component="div" sx={{ fontWeight: 'bold' }}>
                  Mascotas
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Gestionar animales
                </Typography>
              </CardContent>
              <CardActions sx={{ justifyContent: 'center' }}>
                <Button
                  size="small"
                  variant="contained"
                  sx={{ background: 'linear-gradient(135deg, #FF9800 0%, #FFC107 100%)', color: '#fff' }}
                  onClick={() => navigate('/mascotas')}
                >
                  Ver
                </Button>
              </CardActions>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card
              sx={{
                height: '100%',
                background: 'linear-gradient(135deg, #FFF 0%, #F5F5F5 100%)',
                boxShadow: 3,
                '&:hover': { transform: 'scale(1.05)', boxShadow: 6 },
                transition: 'all 0.3s ease'
              }}
            >
              <CardContent sx={{ textAlign: 'center' }}>
                <Avatar sx={{ bgcolor: '#2196F3', mx: 'auto', mb: 2 }}>
                  <MedicalIcon />
                </Avatar>
                <Typography variant="h5" component="div" sx={{ fontWeight: 'bold' }}>
                  Veterinarios
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Gestionar profesionales
                </Typography>
              </CardContent>
              <CardActions sx={{ justifyContent: 'center' }}>
                <Button
                  size="small"
                  variant="contained"
                  sx={{ background: 'linear-gradient(135deg, #2196F3 0%, #00BCD4 100%)', color: '#fff' }}
                  onClick={() => navigate('/veterinarios')}
                >
                  Ver
                </Button>
              </CardActions>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card
              sx={{
                height: '100%',
                background: 'linear-gradient(135deg, #FFF 0%, #F5F5F5 100%)',
                boxShadow: 3,
                '&:hover': { transform: 'scale(1.05)', boxShadow: 6 },
                transition: 'all 0.3s ease'
              }}
            >
              <CardContent sx={{ textAlign: 'center' }}>
                <Avatar sx={{ bgcolor: '#9C27B0', mx: 'auto', mb: 2 }}>
                  <AssignmentIcon />
                </Avatar>
                <Typography variant="h5" component="div" sx={{ fontWeight: 'bold' }}>
                  Consultas
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Gestionar visitas médicas
                </Typography>
              </CardContent>
              <CardActions sx={{ justifyContent: 'center' }}>
                <Button
                  size="small"
                  variant="contained"
                  sx={{ background: 'linear-gradient(135deg, #9C27B0 0%, #E91E63 100%)', color: '#fff' }}
                  onClick={() => navigate('/consultas')}
                >
                  Ver
                </Button>
              </CardActions>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default Dashboard;