const jwt = require('jsonwebtoken');

let FuncionesDeCreacionDeToken = {}

require("dotenv").config();

const FirmaDeElToken = `${process.env.FirmaSecretaDelToken}`

const GenerarToken = (user) => {
    const DatosDeUserAGuardarEnElToken = {
        userId: user._id,
        rol: user.rol
    }

    return jwt.sign(DatosDeUserAGuardarEnElToken, FirmaDeElToken, { expiresIn: '24h' });
};

const EstablecerToken = (res, token) => {
    res.cookie('token', token, { httpOnly: true });
};

const ExtraerToken = (req) => {
    const token = req.cookies['token']; //token está almacenado en una cookie llamada 'token'

    return token
};

const DecodificaElToken = (token) => {
    try {
        const TokenDeCodificado = jwt.verify(token, FirmaDeElToken); // Reemplaza 'tu_secreto_jwt' por tu clave secreta
        
        return TokenDeCodificado
    } catch (error) {
        console.error('Error al decodificar el token:', error);
    }
};

FuncionesDeCreacionDeToken.GenerarToken = GenerarToken
FuncionesDeCreacionDeToken.EstablecerToken = EstablecerToken
FuncionesDeCreacionDeToken.ExtraerToken = ExtraerToken
FuncionesDeCreacionDeToken.DecodificaElToken = DecodificaElToken


module.exports = FuncionesDeCreacionDeToken;