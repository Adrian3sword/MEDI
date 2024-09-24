const bcrypt = require('bcrypt');
const mongoose = require('mongoose');

//Hashing: Utiliza un algoritmo de hashing fuerte como bcrypt o Argon2
// para almacenar las contraseñas de forma segura. Estos algoritmos convierten
// las contraseñas en cadenas de caracteres difíciles de revertir.

/**
 * Módulo de controlador para el módulo de gestión de las en el de consultorios médicos.
 * @module citaController
 */

const AsistenteDeToken = require("../middleware/AsistenteDeToken");

const ModeloDeUnaUsuario = require("../models/usuarioModel");
require("../config/db");

const controller = {};

/**
 * Controlador para obtener la lista de citas.
 * @function
 * @async
 * @param {Object} req - Objeto de solicitud de Express.
 * @param {Object} res - Objeto de respuesta de Express.
 * @returns {Promise<void>} - Devuelve una promesa que resuelve en un objeto JSON con la lista de citas o un objeto JSON con el error.
 */
controller.DameTodosLosUsuarios = async (req, res) => {
  const cuentaBD = await ModeloDeUnaUsuario.find();
  try {
    if (!cuentaBD) {
      return res.status(404).send({ msg: "cuenta no encontrada" });
    } else {
      res.status(200).json(cuentaBD);
    }
  } catch (error) {
    res
      .status(500)
      // const errors = controlDeErrores(error);
      .send(`${error} ---> cuentas no encontradas`);
  }
};

/**
 * Controlador para crear una nueva cuenta.
 * @function
 * @async
 * @param {Object} req - Objeto de solicitud de Express.
 * @param {Object} res - Objeto de respuesta de Express.
 * @returns {Promise<void>} - Una promesa que resuelve en un objeto JSON con el usuario o un objeto JSON con el error.
 */
controller.CrearUsuario = async (req, res) => {
  try {
    const { nombre, email, contraseña, rol, ...rest } = req.body;
    console.log(`email: ${email}`);

    const UsuarioConEmailRepetido = await ModeloDeUnaUsuario.findOne({ email });

    // // Al verificar una contraseña utiliza para desencriptar:
    // const isMatch = await bcrypt.compare(password, user.password);
    const hashedPassword = await bcrypt.hash(contraseña, 10);

    const nuevoUsuario = new ModeloDeUnaUsuario({
      nombre,
      email,
      contraseña: hashedPassword,
      rol: "paciente", // enum: ["doctor", "administrador", "paciente"]
      ...rest
    });

    await nuevoUsuario.save();
    // respuesta JSON.:
    console.log(`Nuevo Usuario creado: ${email}`);

    res.status(201).json(nuevoUsuario);
  } catch (error) {
    // const errors = controlDeErrores(error);
    res.status(400).json({ error: error.message });
  }
};

controller.loginController = async (req, res) => {
  try {
    const { email, contraseña } = req.body;

    // Encuentra al usuario por email
    const usuario = await ModeloDeUnaUsuario.findOne({ email });

    if (!usuario) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    // Compara la contraseña proporcionada con la contraseña hasheada
    const isMatch = await bcrypt.compare(contraseña, usuario.contraseña);

    if (!isMatch) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    // Genera un token y lo establece en la cookie
    const token = AsistenteDeToken.GenerarToken(usuario);
    AsistenteDeToken.EstablecerToken(res, token);

    res.status(200).json({ message: 'Inicio de sesión exitoso' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al iniciar sesión' });
  }
};

controller.LogoutController = async (req, res) => {
  // Aquí no necesitamos hacer nada con la base de datos para invalidar el token
  // ya que los tokens JWT tienen una fecha de expiración.
  // Sin embargo, si quieres implementar una lista negra de tokens para una seguridad adicional,
  // puedes almacenar los tokens invalidados en una base de datos o en Redis.

  // Simplemente respondemos al cliente indicando que la sesión se ha cerrado
  res.clearCookie('token'); // Elimina la cookie del token del cliente
  res.status(200).json({ message: 'Sesión cerrada correctamente' });
}

/**
 * Controlador para obtener detalles de un usuario específico.
 * @function
 * @async
 * @param {Object} req - Objeto de solicitud de Express.
 * @param {Object} res - Objeto de respuesta de Express.
 * @returns {Promise<void>} - Una promesa que resuelve en una vista renderizada con los detalles de un usuario o un mensaje de error.
 */
controller.DameUnUsuario = async (req, res) => {
  const { id } = req.params;

  // Validar el formato del ID
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: `ID de usuario inválido: ${id}` });
  }

  try {
    const cuenta = await ModeloDeUnaUsuario.findById(id);

    if (!cuenta) {
      return res.status(404).json({ error: "cuenta no encontrada" });
    }

    res.status(200).json(cuenta);
  } catch (error) {
    console.error("Error al buscar la cuenta:", error);
    // const errors = controlDeErrores(error);
    res.status(500).json({ error: "Error al buscar la cuenta" });
  }
};

/**
 * Controlador para actualizar los detalles de una Cuenta específica.
 * @function
 * @async
 * @param {Object} req - Objeto de solicitud de Express.
 * @param {Object} res - Objeto de respuesta de Express.
 * @returns {Promise<void>} - Una promesa que resuelve en una redirección a la página de Cuentas o un mensaje de error.
 */

controller.ActualizarUnUsuario = async (req, res) => {
  const { id } = req.params;
  const { nombre, email, contraseña, ...rest } = req.body;

  // Validar el formato del ID
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: `ID de usuario inválido: ${id}` });
  }

  try {
    // Busca el usuario por su ID
    const usuario = await ModeloDeUnaUsuario.findById(id);

    if (!usuario) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    // Actualiza todos los campos, incluyendo los que no se enviaron en la solicitud
    usuario.set({
      nombre: nombre || usuario.nombre,
      email: email || usuario.email,
      contraseña: contraseña ? await bcrypt.hash(contraseña, 10) : usuario.contraseña,
      // ... Actualiza otros campos según tu modelo
      ...rest
    });

    // Guarda los cambios en la base de datos
    await usuario.save();

    res.json({ message: 'Usuario actualizado exitosamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al actualizar el usuario' });
  }
};



/**
 * Controlador para eliminar una Cuenta existente.
 * @function
 * @async
 * @param {Object} req - Objeto de solicitud de Express.
 * @param {Object} res - Objeto de respuesta de Express.
 * @returns {Promise<void>} - Devuelve una promesa que resuelve en una respuesta HTTP indicando si la Cuenta fue eliminada o un error.
 */
controller.EliminaUnUsuario = async (req, res) => {
  const { id } = req.params;

  // Validar el formato del ID
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: `ID de usuario inválido: ${id}` });
  }

  try {
    const resultado = await ModeloDeUnaUsuario.findByIdAndDelete(id);

    if (!resultado) {
      return res.status(404).json({ error: "cuenta no encontrada" });
    }

    res.status(200).json(resultado);
  } catch (error) {
    console.error("Error al eliminar la cuenta:", error);
    // const errors = controlDeErrores(error);
    res.status(500).json({ error: "Error al eliminar la cuenta" });
  }
};

// Función auxiliar para el control de excepciones
// function controlDeErrores(error) {
// }

module.exports = controller;