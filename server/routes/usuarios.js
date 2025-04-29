const express = require('express');
const router = express.Router();
const { 
  crearUsuario, obtenerBarberos, obtenerBarberoPorId, eliminarUsuario, 
  actualizarBarbero, mostrarClientes, login, modificarUsuario 
} = require('../controllers/usuariosController');

router.post('/create', crearUsuario);
router.get('/barberos', obtenerBarberos);
router.get('/barberos/:id', obtenerBarberoPorId);
router.delete('/usuarios', eliminarUsuario);
router.put('/barberos/:id', actualizarBarbero);
router.get('/mostrarclientes', mostrarClientes);
router.post('/login', login);
router.put('/modificarusuarios/:id', modificarUsuario);

module.exports = router;