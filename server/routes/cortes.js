const express = require('express');
const router = express.Router();
const cortesController = require('../controllers/cortesController');
const multer = require('multer');
const path = require('path');

// Configuración de almacenamiento para imágenes
const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// Ruta para crear un nuevo corte
router.post('/', upload.single('imagen'), cortesController.crearCorte);

module.exports = router;