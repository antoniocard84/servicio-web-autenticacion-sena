// Base de datos temporal en memoria para almacenar usuarios
const usuariosDB = [];

const registrarUsuario = (req, res) => {
  // Ajuste a "usuario" en lugar de "username"
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

  // Mensaje exacto solicitado en el Escenario A
  return res.status(201).json({
    mensaje: "Registro satisfactorio en Pasos Grandes"
  });
};

const iniciarSesion = (req, res) => {
  // Ajuste a "usuario" en lugar de "username"
  const { usuario, password } = req.body;

  const usuarioEncontrado = usuariosDB.find(
    u => u.usuario === usuario && u.password === password
  );

  if (usuarioEncontrado) {
    // Mensaje exacto solicitado en el Escenario B
    return res.status(200).json({
      mensaje: "Autenticación satisfactoria"
    });
  } else {
    // Mensaje exacto solicitado en el Escenario C
    return res.status(401).json({
      error: "Error en la autenticación"
    });
  }
};

module.exports = {
  registrarUsuario,
  iniciarSesion
};