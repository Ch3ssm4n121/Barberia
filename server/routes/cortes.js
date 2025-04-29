const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const { crearCorte, obtenerCortes } = require("../controllers/cortesController");

// Configurar multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = "./uploads";
    if (!fs.existsSync(dir)) fs.mkdirSync(dir);
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

// Rutas
router.post("/", upload.single("imagen"), crearCorte);
router.get("/", obtenerCortes);

module.exports = router;