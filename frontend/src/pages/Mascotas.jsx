import React, { useState, useEffect } from 'react';
import apiClient from '../api/axios';

const Mascotas = () => {
  const [mascotas, setMascotas] = useState([]);
  const [form, setForm] = useState({ id_persona: '', nombre_mascota: '', tipo_animal: '' });

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await apiClient.post('/mascotas', form);
      setForm({ id_persona: '', nombre_mascota: '', tipo_animal: '' });
      fetchMascotas();
    } catch (error) {
      console.error('Error creating mascota:', error);
    }
  };

  return (
    <div>
      <h1>Mascotas</h1>
      <form onSubmit={handleSubmit}>
        <input placeholder="ID Persona" type="number" value={form.id_persona} onChange={(e) => setForm({ ...form, id_persona: e.target.value })} required />
        <input placeholder="Nombre Mascota" value={form.nombre_mascota} onChange={(e) => setForm({ ...form, nombre_mascota: e.target.value })} required />
        <input placeholder="Tipo Animal" value={form.tipo_animal} onChange={(e) => setForm({ ...form, tipo_animal: e.target.value })} required />
        <button type="submit">Crear</button>
      </form>
      <ul>
        {mascotas.map((mascota) => (
          <li key={mascota.id}>{mascota.nombre_mascota} - {mascota.tipo_animal}</li>
        ))}
      </ul>
    </div>
  );
};

export default Mascotas;