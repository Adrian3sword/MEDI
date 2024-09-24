const mongoose = require("mongoose");

const Schema = new mongoose.Schema(
  {
    [`email`]: String, // Correo electrónico del usuario.
    [`contraseña`]: {
      type: String,
      required: true
    }, // Contraseña del usuario (al guardarse se encriptara automaticamente).
    ["rol"]: {
      type: String,
      enum: ["doctor", "administrador", "paciente"],
      default: 'paciente'
    }, //Rol del usuario (médico, administrador, paciente).
    [`nombre`]: String, // Nombre completo del usuario.
    [`primer_apellido`]: String, // Primer apellido del paciente.
    [`segundo_apellido`]: String, // Segundo apellido del paciente.
    [`fecha_nacimiento`]: Date, // Fecha de nacimiento del paciente.
    [`direccion`]: String, // Dirección del paciente.
    [`telefono`]: String, // Número de teléfono del paciente.
    [`contacto_emergencia`]: String, // Contacto en caso de emergencia.
    [`ultima_sesion`]: Date, // Fecha de nacimiento del paciente.
  },
  {
    timestamps: true,
  }
);

const modelo = mongoose.model("usuario", Schema);

module.exports = modelo;