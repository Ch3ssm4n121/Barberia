const express = require('express');
const router = express.Router();
const citasController = require('../controllers/citasController');

router.post('/crear', citasController.crearCita);
router.get('/pendientes', citasController.obtenerCitasPendientes);
router.get('/cumplidas', citasController.obtenerCitasCumplidas);
router.put('/cumplir/:id', citasController.cumplirCita);
router.delete('/rechazar/:id', citasController.rechazarCita);

module.exports = router;