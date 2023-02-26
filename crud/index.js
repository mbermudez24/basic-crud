const cors = require('cors');
const express = require('express');
const { Pool } = require('pg');

const app = express();

// Configuración de la conexión a la base de datos
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'ventas',
    password: 'manael123.',
    port: 5432,
});

// Manejar errores de conexión a la base de datos
pool.on('error', (err, client) => {
    console.error('Error inesperado en la conexión a la base de datos', err);
    process.exit(-1);
});

// Middleware para parsear JSON en las peticiones
app.use(express.json());

// Middleware para permitir CORS
app.use(cors());

// Manejar petición GET a /clientes
app.get('/clientes', (req, res) => {
    pool.query('SELECT * FROM clientes', (error, results) => {
        if (error) {
            throw error;
        }
        res.status(200).json(results.rows);
    });
});

// Manejar petición GET a /clientes/:id
app.get('/clientes/:id', (req, res) => {
    const id = req.params.id;
    pool.query('SELECT * FROM clientes WHERE codcli = $1', [id], (error, results) => {
        if (error) {
            throw error;
        }
        res.status(200).json(results.rows[0]);
    });
});

// Manejar petición POST a /clientes
app.post('/clientes', (req, res) => {
    const { codcli, nombre, direccion, codpostal, codpue } = req.body;
    pool.query('INSERT INTO clientes (codcli, nombre, direccion, codpostal, codpue) VALUES ($1, $2, $3, $4, $5)', [codcli, nombre, direccion, codpostal, codpue], (error, results) => {
        if (error) {
            throw error;
        }
        res.status(201).send(`Cliente añadido con ID: ${codcli}`);
    });
});

// Manejar petición PUT a /clientes/:id
app.put('/clientes/:id', (req, res) => {
    const id = req.params.id;
    const { nombre, direccion, codpostal, codpue } = req.body;
    pool.query('UPDATE clientes SET nombre = $1, direccion = $2, codpostal = $3, codpue = $4 WHERE codcli = $5', [nombre, direccion, codpostal, codpue, id], (error, results) => {
        if (error) {
            throw error;
        }
        res.status(200).send(`Cliente modificado con ID: ${id}`);
    });
});

// Manejar petición DELETE a /clientes/:id
app.delete('/clientes/:id', (req, res) => {
    const id = req.params.id;
    pool.query('DELETE FROM clientes WHERE codcli = $1', [id], (error, results) => {
        if (error) {
            throw error;
        }
        res.status(200).send(`Cliente eliminado con ID: ${id}`);
    });
});

// Iniciar el servidor en el puerto 5000
app.listen(3000, () => {
    console.log('Servidor iniciado en el puerto 3000');
});
