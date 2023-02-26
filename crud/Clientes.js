import axios from 'axios';

const API_URL = 'http://localhost:3000';

// Obtener todos los clientes
const getClientes = async () => {
    const response = await axios.get(`${API_URL}/clientes`);
    return response.data;
};

// Obtener un cliente por su ID
const getClienteById = async (id) => {
    const response = await axios.get(`${API_URL}/clientes/${id}`);
    return response.data;
};

// Agregar un nuevo cliente
const addCliente = async (cliente) => {
    const response = await axios.post(`${API_URL}/clientes`, cliente);
    return response.data;
};

// Modificar un cliente existente
const updateCliente = async (id, cliente) => {
    const response = await axios.put(`${API_URL}/clientes/${id}`, cliente);
    return response.data;
};

// Eliminar un cliente por su ID
const deleteCliente = async (id) => {
    const response = await axios.delete(`${API_URL}/clientes/${id}`);
    return response.data;
};

export { getClientes, getClienteById, addCliente, updateCliente, deleteCliente };
