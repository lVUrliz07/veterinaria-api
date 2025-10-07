import React, { useState, useEffect } from 'react';
import apiClient from '../api/axios';

const Consultas = () => {
  const [consultas, setConsultas] = useState([]);
  const [form, setForm] = useState({ id_mascota: '', id_veterinario: '', motivo_consulta: '' });

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await apiClient.post('/consultas', form);
      setForm({ id_mascota: '', id_veterinario: '', motivo_consulta: '' });
      fetchConsultas();
    } catch (error) {
      console.error('Error creating consulta:', error);
    }
  };

  return (
    <div>
      <h1>Consultas</h1>
      <form onSubmit={handleSubmit}>
        <input placeholder="ID Mascota" type="number" value={form.id_mascota} onChange={(e) => setForm({ ...form, id_mascota: e.target.value })} required />
        <input placeholder="ID Veterinario" type="number" value={form.id_veterinario} onChange={(e) => setForm({ ...form, id_veterinario: e.target.value })} required />
        <input placeholder="Motivo Consulta" value={form.motivo_consulta} onChange={(e) => setForm({ ...form, motivo_consulta: e.target.value })} required />
        <button type="submit">Crear</button>
      </form>
      <ul>
        {consultas.map((consulta) => (
          <li key={consulta.id}>{consulta.motivo_consulta}</li>
        ))}
      </ul>
    </div>
  );
};

export default Consultas;