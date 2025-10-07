import React, { useState, useEffect } from 'react';
import apiClient from '../api/axios';

const Veterinarios = () => {
  const [veterinarios, setVeterinarios] = useState([]);
  const [form, setForm] = useState({ licencia: '', nombre: '', apellido: '', especialidad: '', email: '' });

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await apiClient.post('/veterinarios', form);
      setForm({ licencia: '', nombre: '', apellido: '', especialidad: '', email: '' });
      fetchVeterinarios();
    } catch (error) {
      console.error('Error creating veterinario:', error);
    }
  };

  return (
    <div>
      <h1>Veterinarios</h1>
      <form onSubmit={handleSubmit}>
        <input placeholder="Licencia" value={form.licencia} onChange={(e) => setForm({ ...form, licencia: e.target.value })} required />
        <input placeholder="Nombre" value={form.nombre} onChange={(e) => setForm({ ...form, nombre: e.target.value })} required />
        <input placeholder="Apellido" value={form.apellido} onChange={(e) => setForm({ ...form, apellido: e.target.value })} required />
        <input placeholder="Especialidad" value={form.especialidad} onChange={(e) => setForm({ ...form, especialidad: e.target.value })} />
        <input placeholder="Email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
        <button type="submit">Crear</button>
      </form>
      <ul>
        {veterinarios.map((vet) => (
          <li key={vet.id}>{vet.nombre} {vet.apellido} - {vet.especialidad || 'General'}</li>
        ))}
      </ul>
    </div>
  );
};

export default Veterinarios;