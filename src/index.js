// Importación del framework Express
const express = require('express');
const authRoutes = require('./routes/authRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para procesar solicitudes con cuerpo en formato JSON
app.use(express.json());

// Enrutador para la autenticación
app.use('/api/auth', authRoutes);

// Inicio del servidor HTTP
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});