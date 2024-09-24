const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const citasRouter = require("./routes/citasRutas");
const historialMedRouter = require("./routes/historialMedRutas");
const UsuarioRutas = require("./routes/UsuarioRutas");

require("dotenv").config();
require("./config/db");

const app = express();

// Configuración para parsear JSON
app.use(bodyParser.json());
app.use(cookieParser());

// SERVER TEST
app.get("/", (req, res) => {
  res.send("Hola Mundo SERVIDOR CORRIENDO desde Express");
});

app.use(UsuarioRutas);
app.use(citasRouter);
app.use(historialMedRouter);

//Manejo general de Errores
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).json({ message: 'Algo salió mal' });
// });

const serverPort = process.env.SERVER_PORT;

app.listen(serverPort, () => {
  console.log(`Servidor corriendo en puerto ${serverPort}`);
});


