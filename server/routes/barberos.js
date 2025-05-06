const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const barberosController = require('../controllers/barberosController');

// Configurar Multer para fotos
const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

// Rutas
router.get('/', barberosController.obtenerBarberos);
router.post('/', upload.single('foto'), barberosController.crearBarbero);

module.exports = router;