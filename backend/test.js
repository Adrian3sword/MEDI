// Axios para hacer solicitudes HTTP
const axios = require('axios');

// nombre: { type: String, required: true, unique: true },
// email: { type: String, required: true, unique: true },
// contraseña: { type: Strings, required: true },
// rol: { type: String, enum: ['user', 'admin'], default: 'user' }


// [`_id`]: String, // Identificador único del usuario.
// [`nombre`]: String, // Nombre completo del usuario.
// [`primer_apellido`]: String, // Primer apellido del paciente.
// [`segundo_apellido`]: String, // Segundo apellido del paciente.
// [`fecha_nacimiento`]: Date, // Fecha de nacimiento del paciente.
// [`direccion`]: String, // Dirección del paciente.
// [`telefono`]: String, // Número de teléfono del paciente.
// [`email`]: String, // Correo electrónico del usuario.
// [`contraseña`]: {
//       type: String,
//       required: true
//     }, // Contraseña del usuario (al guardarse se encriptara automaticamente).
//     ["rol"]: {
//       type: String,
//       enum: ["medico", "administrador", "paciente"],
//       default: 'paciente'
//     }, //Rol del usuario (médico, administrador, paciente).
//     [`contacto_emergencia`]: Date, // Contacto en caso de emergencia.
//     [`fecha_creacion`]: Date, // Fecha de creación del usuario en el sistema.
//     [`ultima_sesion`]: Date, // Última vez que el usuario accedió al sistema.

// Registrar un usuario
axios.post('http://localhost:5000/crear-cuenta', {
  // _id: '12345678911111111111111',
  nombre: 'ElUsuario',
  primer_apellido: "SoloMeo",
  segundo_apellido: "Paredes",
  fecha_nacimiento: Date.UTC(2001,3,1),
  direccion: "La 42",
  telefono: "829-000-0000",
  email: "ElUsuarioSoloMeoParedes@gmail.com",
  contraseña: "La_Contraseña_RAAA!",
  rol: "user",
  contacto_emergencia: "TuMama",
  // fecha_creacion: Date.UTC(2024,1,15),
  // ultima_sesion: Date.UTC(2024,1,15),
})
  .then(res => console.log(res.data))
  .catch(err => console.error(err));

// // Iniciar sesión
// axios.post('http://localhost:5000/login', {
//   email: 'usuario@example.com',
//   contraseña: 'mystrongpassword'
// }, { withCredentials: true }) // Importante para enviar cookies
//   .then(res => {
//     // El token se almacenará en una cookie automáticamente
//     console.log('Usuario autenticado');
//   })
//   .catch(err => console.error(err));