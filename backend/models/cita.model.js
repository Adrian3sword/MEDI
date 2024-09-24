const mongoose = require("mongoose");

const citaMedicaSchema = new mongoose.Schema(
  {
    paciente_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Paciente",
      required: [true, "Por favor seleccione el paciente para la cita"],
    },
    medico_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Medico",
      required: [true, "Por favor seleccione el Doctor para la cita"],
    },
    fecha: {
      type: Date,
      required: [true, "Por favor indique una fecha para la cita"],
    },
    hora: {
      type: String,
      required: [true, "Por favor indique una hora para la cita"],
    },
    motivo: {
      type: String,
      required: [true, "Por favor indique el motivo de la cita"],
      trim: true,
    },
    estado: {
      type: String,
      enum: ["confirmada", "cancelada", "pendiente"],
      default: "pendiente",
    },
    notificaciones: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const citaMedica = mongoose.model("citas", citaMedicaSchema);

module.exports = citaMedica;