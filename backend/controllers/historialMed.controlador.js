require("../config/db");
const historialModel = require("../models/historial.model");

const controller = {};

controller.getHistorial = async (req, res) => {
  await res.send("Hola Mundo HISTORIAL desde Express");
};

module.exports = controller;