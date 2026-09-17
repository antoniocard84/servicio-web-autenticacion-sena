// Base de datos temporal en memoria para almacenar usuarios
const usuariosDB = [];

/**
 * Controlador para el registro de usuarios.
 * Recibe username y password en el cuerpo de la solicitud (req.body).
 */
const registrarUsuario = (req, res) => {
  const { username, password } = req.body;

  // Validación: Comprobar si se enviaron ambos campos
  if (!username || !password) {
    return res.status(400).json({
      error: "Error en el registro: Se requiere usuario y contraseña."
    });
  }

  // Validación: Verificar si el usuario ya se encuentra registrado
  const usuarioExiste = usuariosDB.find(u => u.username === username);
  if (usuarioExiste) {
    return res.status(409).json({
      error: "Error en el registro: El nombre de usuario ya existe."
    });
  }

  // Guardar el nuevo usuario en la lista
  usuariosDB.push({ username, password });

  return res.status(201).json({
    mensaje: "Usuario registrado con éxito.",
    usuario: { username }
  });
};

/**
 * Controlador para el inicio de sesión.
 * Compara las credenciales enviadas con las registradas.
 */
const iniciarSesion = (req, res) => {
  const { username, password } = req.body;

  // Buscar usuario y validar credenciales
  const usuarioEncontrado = usuariosDB.find(
    u => u.username === username && u.password === password
  );

  // Respuesta según la validez de los datos introducidos
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