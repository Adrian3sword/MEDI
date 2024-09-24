//Es script verifica que el token exista y sea correcto

require("dotenv").config();

const FirmaDeElToken = `${process.env.FirmaSecretaDelToken}`

const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ error: 'No autorizado Sin Token' });
  }

  try {
    console.log("Token Correcto");
    
    const decoded = jwt.verify(token, FirmaDeElToken);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Token inválido' });
  }
};

module.exports = verifyToken;