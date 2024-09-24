const ModeloDeUnaCuenta = require('../models/usuarioModel'); // Ajusta la ruta a tu modelo

const validarUsuarioExistente = async (req, res, next) => {
  const { email } = req.body;

  try {
    const usuarioExistente = await ModeloDeUnaCuenta.findOne({ email });

    if (usuarioExistente) {
      return res.status(400).json({ error: 'El correo electrónico ya está en uso' });
    }

    next(); // Si no existe, continúa con el siguiente middleware o controlador
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al verificar el usuario' });
  }
};

module.exports = validarUsuarioExistente;