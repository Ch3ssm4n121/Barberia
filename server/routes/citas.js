const express = require('express');
const router = express.Router();
const citasController = require('../controllers/citasController');

router.post('/nueva', citasController.crearCita);
router.get('/pendientes', citasController.obtenerPendientes);
router.get('/cumplidas', citasController.obtenerCumplidas);
router.put('/cumplir/:id', citasController.marcarComoCumplida);
router.put('/rechazar/:id', citasController.rechazarCita);

module.exports = router;