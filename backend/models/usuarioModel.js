const mongoose = require("mongoose");

const Schema = new mongoose.Schema(
  {
    // Email Remplazar
    [`centro`]: String, // Correo electrónico del usuario.
    [`contraseña`]: {
      type: String,
      required: true
    }, // Contraseña del usuario (al guardarse se encriptara automaticamente).
    // ["EstaVerificado"]: {
    //   type: Boolean,
    //   default: false
    // }, //Se el usuario se verifico en su correo electronico
    [`ultima_sesion`]: Date, // Fecha de nacimiento del paciente.
  },
  {
    timestamps: true,
  }
);

const modelo = mongoose.model("usuario", Schema);

module.exports = modelo;