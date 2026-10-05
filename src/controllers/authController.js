// Base de datos temporal en memoria para almacenar usuarios
const usuariosDB = [];

/**
 * Controlador para el registro de usuarios.
 */
const registrarUsuario = (req, res) => {
  const { usuario, password } = req.body;

  if (!usuario || !password) {
    return res.status(400).json({
      error: "Se requiere usuario y contraseña."
    });
  }

  const usuarioExiste = usuariosDB.find(u => u.usuario === usuario);
  if (usuarioExiste) {
    return res.status(409).json({
      error: "El nombre de usuario ya existe."
    });
  }

  usuariosDB.push({ usuario, password });

  return res.status(201).json({
    mensaje: "Registro satisfactorio en Pasos Grandes"
  });
};

/**
 * Controlador para la autenticación (Login).
 */
const iniciarSesion = (req, res) => {
  const { usuario, password } = req.body;

  const usuarioEncontrado = usuariosDB.find(
    u => u.usuario === usuario && u.password === password
  );

  if (usuarioEncontrado) {
    return res.status(200).json({
      mensaje: "Autenticación satisfactoria"
    });
  } else {
    return res.status(401).json({
      error: "Error en la autenticación"
    });
  }
};

module.exports = {
  registrarUsuario,
  iniciarSesion
};