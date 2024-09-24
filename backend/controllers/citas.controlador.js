/**
 * Módulo de controlador para el módulo de gestión de citas en una aplicación de gestión de consultorios médicos.
 * @module citaController
 */

const CitaModel = require("../models/cita.model");
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
controller.citas = async (req, res) => {
  const citasBD = await CitaModel.find();
  try {
    if (!citasBD) {
      return res.status(404).send({ msg: "Cita no encontrada" });
    } else {
      res.status(200).json(citaBD);
    }
  } catch (error) {
    res
      .status(500)
      // const errors = controlDeErrores(error);
      .send(`${error} ---> cita con el ID: ${citaID} no encontrada`);
  }
};

/**
 * Controlador para crear una nueva cita.
 * @function
 * @async
 * @param {Object} req - Objeto de solicitud de Express.
 * @param {Object} res - Objeto de respuesta de Express.
 * @returns {Promise<void>} - Una promesa que resuelve en un objeto JSON con la nueva cita o un objeto JSON con el error.
 */
controller.crearCita = async (req, res) => {
  const {
    paciente_id,
    medico_id,
    fecha,
    hora,
    motivo,
    estado,
    notificaciones,
  } = req.body;

  try {
    const cita = await new CitaModel({
      paciente_id,
      medico_id,
      fecha,
      hora,
      motivo,
      estado,
      notificaciones,
    }).save();
    // respuesta JSON. Se puede usar como notificacion:
    res.status(201).json(cita);
  } catch (error) {
    // const errors = controlDeErrores(error);
    res.status(400).json({ error: error.message });
  }
};

/**
 * Controlador para obtener detalles de una cita específica.
 * @function
 * @async
 * @param {Object} req - Objeto de solicitud de Express.
 * @param {Object} res - Objeto de respuesta de Express.
 * @returns {Promise<void>} - Una promesa que resuelve en una vista renderizada con los detalles de la cita o un mensaje de error.
 */
controller.unicaCita = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ error: "Se requiere el ID de la Cita" });
  }

  try {
    const cita = await CitaModel.findById(id);

    if (!cita) {
      return res.status(404).json({ error: "Cita no encontrada" });
    }

    res.status(200).json(cita);
  } catch (error) {
    console.error("Error al buscar la cita:", error);
    // const errors = controlDeErrores(error);
    res.status(500).json({ error: "Error al buscar la cita" });
  }
};

/**
 * Controlador para actualizar los detalles de una cita específica.
 * @function
 * @async
 * @param {Object} req - Objeto de solicitud de Express.
 * @param {Object} res - Objeto de respuesta de Express.
 * @returns {Promise<void>} - Una promesa que resuelve en una redirección a la página de citas o un mensaje de error.
 */

controller.actualizarCita = async (req, res) => {
  if (!req.params.id) {
    return res.status(400).json({ error: "Se requiere el ID de la Cita" });
  }

  const id = req.params.id;

  try {
    const citaActualizada = await CitaModel.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true, runValidators: true }
    );

    if (!citaActualizada) {
      return res.status(404).json({ error: "Cita no encontrada" });
    }

    res.json(citaActualizada);
  } catch (error) {
    console.error("Error al actualizar la cita:", error);
    // const errors = controlDeErrores(error);
    res.status(500).json({ error: "Error al actualizar la cita" });
  }
};

/**
 * Controlador para cancelar una cita existente.
 * @function
 * @async
 * @param {Object} req - Objeto de solicitud de Express.
 * @param {Object} res - Objeto de respuesta de Express.
 * @returns {Promise<void>} - Devuelve una promesa que resuelve en una respuesta HTTP indicando si la cita fue cancelada o un error.
 */
controller.eliminarCita = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ error: "Se requiere el ID de la Cita" });
  }

  try {
    const resultado = await CitaModel.findByIdAndDelete(id);

    if (!resultado) {
      return res.status(404).json({ error: "Cita no encontrada" });
    }

    res.status(200).json(resultado);
  } catch (error) {
    console.error("Error al eliminar la cita:", error);
    // const errors = controlDeErrores(error);
    res.status(500).json({ error: "Error al eliminar la cita" });
  }
};

// POST: Enviar recordatorio de cita
// router.post("/citas/:id/notificacion", citaController.notificarCita);

// Función auxiliar para el control de excepciones
// function controlDeErrores(error) {
// }

module.exports = controller;