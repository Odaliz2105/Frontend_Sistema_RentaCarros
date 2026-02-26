import React, { useState, useEffect } from 'react';
import { clientesAPI } from '../services/api';
import Sidebar from '../components/Sidebar';
import Modal from '../components/Modal';
import './Clientes.css';

const Clientes = () => {
  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editingCliente, setEditingCliente] = useState(null);
  const [formData, setFormData] = useState({
    cedula: '',
    nombre: '',
    apellido: '',
    ciudad: '',
    email: '',
    direccion: '',
    telefono: '',
    fecha_nacimiento: ''
  });

  useEffect(() => {
    fetchClientes();
  }, []);

  const fetchClientes = async () => {
    try {
      setLoading(true);
      const response = await clientesAPI.listar();
      setClientes(response.data.cliente || []);
    } catch (err) {
      setError('Error al cargar clientes');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingCliente) {
        await clientesAPI.actualizar(editingCliente._id, formData);
      } else {
        await clientesAPI.crear(formData);
      }
      
      fetchClientes();
      resetForm();
      setShowModal(false);
    } catch (err) {
      setError(err.response?.data?.message || 'Error al guardar cliente');
    }
  };

  const handleEdit = (cliente) => {
    setEditingCliente(cliente);
    setFormData({
      cedula: cliente.cedula,
      nombre: cliente.nombre,
      apellido: cliente.apellido,
      ciudad: cliente.ciudad,
      email: cliente.email,
      direccion: cliente.direccion,
      telefono: cliente.telefono,
      fecha_nacimiento: cliente.fecha_nacimiento
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de eliminar este cliente?')) {
      try {
        await clientesAPI.eliminar(id);
        fetchClientes();
      } catch (error) {
        setError('Error al eliminar cliente');
        console.error('Error deleting client:', error);
      }
    }
  };

  const resetForm = () => {
    setFormData({
      cedula: '',
      nombre: '',
      apellido: '',
      ciudad: '',
      email: '',
      direccion: '',
      telefono: '',
      fecha_nacimiento: ''
    });
    setEditingCliente(null);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Cargando clientes...</p>
      </div>
    );
  }

  return (
    <div className="clientes-layout">
      <Sidebar />
      
      <div className="clientes-main">
        <div className="clientes-header">
          <h1>Gestión de Clientes</h1>
          <button 
            className="btn btn-primary"
            onClick={() => {
              resetForm();
              setShowModal(true);
            }}
          >
            + Nuevo Cliente
          </button>
        </div>

        {error && (
          <div className="error-message">
            {error}
            <button onClick={() => setError(null)}>×</button>
          </div>
        )}

        <div className="clientes-table-container">
          <table className="clientes-table">
            <thead>
              <tr>
                <th>Cédula</th>
                <th>Nombre</th>
                <th>Apellido</th>
                <th>Ciudad</th>
                <th>Email</th>
                <th>Teléfono</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {clientes.map((cliente) => (
                <tr key={cliente._id}>
                  <td>{cliente.cedula}</td>
                  <td>{cliente.nombre}</td>
                  <td>{cliente.apellido}</td>
                  <td>{cliente.ciudad}</td>
                  <td>{cliente.email}</td>
                  <td>{cliente.telefono}</td>
                  <td className="actions">
                    <button 
                      className="btn btn-edit"
                      onClick={() => handleEdit(cliente)}
                    >
                      Editar
                    </button>
                    <button 
                      className="btn btn-delete"
                      onClick={() => handleDelete(cliente._id)}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {clientes.length === 0 && (
            <div className="no-data">
              <p>No hay clientes registrados</p>
            </div>
          )}
        </div>

        <Modal 
          show={showModal} 
          onClose={() => {
            setShowModal(false);
            resetForm();
          }}
          title={editingCliente ? 'Editar Cliente' : 'Nuevo Cliente'}
        >
          <form onSubmit={handleSubmit} className="cliente-form">
            <div className="form-grid">
              <div className="form-group">
                <label>Cédula</label>
                <input
                  type="text"
                  name="cedula"
                  value={formData.cedula}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label>Nombre</label>
                <input
                  type="text"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label>Apellido</label>
                <input
                  type="text"
                  name="apellido"
                  value={formData.apellido}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label>Ciudad</label>
                <input
                  type="text"
                  name="ciudad"
                  value={formData.ciudad}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label>Teléfono</label>
                <input
                  type="tel"
                  name="telefono"
                  value={formData.telefono}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="form-group full-width">
                <label>Dirección</label>
                <input
                  type="text"
                  name="direccion"
                  value={formData.direccion}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="form-group full-width">
                <label>Fecha de Nacimiento</label>
                <input
                  type="date"
                  name="fecha_nacimiento"
                  value={formData.fecha_nacimiento}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            
            <div className="form-actions">
              <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>
                Cancelar
              </button>
              <button type="submit" className="btn btn-primary">
                {editingCliente ? 'Actualizar' : 'Guardar'}
              </button>
            </div>
          </form>
        </Modal>
      </div>
    </div>
  );
};

export default Clientes;