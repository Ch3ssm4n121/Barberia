const express = require('express');
const cors = require('cors');
const app = express();


const usuariosRoutes = require('./routes/usuarios');
const cortesRoutes = require('./routes/cortes');

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));
app.use('/api/usuarios', usuariosRoutes);
app.use('/api/cortes', cortesRoutes);

app.listen(3001, () => {
  console.log('Servidor corriendo en puerto 3001');
});