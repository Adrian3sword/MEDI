/**
 * Módulo de rutas para la usuarios en una aplicación de gestión de consultorios médicos.
 * @module UsuarioRoutes
 */

const express = require("express");
const router = express.Router();

//Logica y funcionalidad de el CRUD
const UsuarioController = require("../controllers/usuarioControlador");

//middlewares
const validateEmail = require('../middleware/ValidarEmail');
const verifyToken = require('../middleware/VerificacionDeToken');
const Authorization = require('../middleware/Autorizar');
const ValidarUsuarioExistente = require('../middleware/ValidarUsuarioExistente');

// Roles ["doctor", "administrador", "paciente"],

//Obtener todas las Usuarios
router.get("/usuarios",
    Authorization(["administrador"], false),
    verifyToken,
    UsuarioController.DameTodosLosUsuarios
);

//Crear un Usuario
router.post("/crear-usuario",
    //No necesita un Autentificacion De Rol
    validateEmail,
    ValidarUsuarioExistente,
    UsuarioController.CrearUsuario
);

//Iniciar secion
router.post('/login',
    //No necesita un Autentificacion De Rol
    UsuarioController.loginController
);

//Cierra secion
router.post('/logout',
    verifyToken,
    UsuarioController.LogoutController
);

//Obtener un Usuario
router.get("/usuario/:id",
    Authorization(["user"], false),
    verifyToken,
    UsuarioController.DameUnUsuario
);

//Actualizar Usuario
router.put("/usuario/:id",
    // Actualizar un usuario (solo el usuario mismo o un administrador)
    Authorization(["administrador"], true),
    verifyToken,
    UsuarioController.ActualizarUnUsuario
);

//Elimina un Usuario
router.delete("/usuario/:id",
    Authorization(["administrador"], false),
    verifyToken,
    UsuarioController.EliminaUnUsuario
);

// router.use(authMiddleware);

module.exports = router;