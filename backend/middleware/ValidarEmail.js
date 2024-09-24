const { check, validationResult } = require('express-validator');

const validateEmail = [
  check('email')
    .isEmail()
    .withMessage('Ingrese un correo electrónico válido')
    .normalizeEmail()
];

module.exports = validateEmail;