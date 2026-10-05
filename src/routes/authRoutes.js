const express = require('express');
const router = express.Router();
const { registrarUsuario, iniciarSesion } = require('../controllers/authController');

// Ruta POST para el registro de un nuevo usuario
router.post('/register', registrarUsuario);

// Ruta POST para el inicio de sesión
router.post('/login', iniciarSesion);

module.exports = router;