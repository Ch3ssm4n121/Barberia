const express = require('express');
const cors = require('cors');
const app = express();
const path = require('path');
const usuariosRoutes = require('./routes/usuarios');
const cortesRoutes = require('./routes/cortes');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/api/usuarios', usuariosRoutes);
app.use('/api/cortes', cortesRoutes);

app.listen(3001, () => {
  console.log('Servidor corriendo en puerto 3001');
});