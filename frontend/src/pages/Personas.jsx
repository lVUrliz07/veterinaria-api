import React, { useState, useEffect } from 'react';
import apiClient from '../api/axios';
import './Personas.css';

const Personas = () => {
  const [personas, setPersonas] = useState([]);
  const [form, setForm] = useState({ dni: '', nombre: '', apellido: '', email: '', telefono: '', password: '' });
  const [editing, setEditing] = useState(null);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editing) {
        await apiClient.patch(`/personas/${editing}`, form);
      } else {
        await apiClient.post('/personas', form);
      }
      setForm({ dni: '', nombre: '', apellido: '', email: '', pass: '' });
      setEditing(null);
      fetchPersonas();
    } catch (error) {
      console.error('Error saving persona:', error);
    }
  };

  const handleEdit = (persona) => {
    setForm(persona);
    setEditing(persona.id);
  };

  const handleDelete = async (id) => {
    try {
      await apiClient.delete(`/personas/${id}`);
      fetchPersonas();
    } catch (error) {
      console.error('Error deleting persona:', error);
    }
  };

  return (
    <div className="personas">
      <h1>Gestionar Personas</h1>
      <form onSubmit={handleSubmit} className="persona-form">
        <input
          type="text"
          placeholder="DNI"
          value={form.dni}
          onChange={(e) => setForm({ ...form, dni: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Nombre"
          value={form.nombre}
          onChange={(e) => setForm({ ...form, nombre: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Apellido"
          value={form.apellido}
          onChange={(e) => setForm({ ...form, apellido: e.target.value })}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Teléfono"
          value={form.telefono}
          onChange={(e) => setForm({ ...form, telefono: e.target.value })}
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required={!editing}
        />
        <button type="submit">{editing ? 'Actualizar' : 'Crear'}</button>
        {editing && <button type="button" onClick={() => { setEditing(null); setForm({ dni: '', nombre: '', apellido: '', email: '', telefono: '', password: '' }); }}>Cancelar</button>}
      </form>
      <ul className="persona-list">
        {personas.map((persona) => (
          <li key={persona.id} className="persona-item">
            {persona.nombre} {persona.apellido} - {persona.email}
            <div>
              <button onClick={() => handleEdit(persona)}>Editar</button>
              <button onClick={() => handleDelete(persona.id)}>Eliminar</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Personas;