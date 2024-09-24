require("dotenv").config();

const FirmaDeElToken = `${process.env.FirmaSecretaDelToken}`

const jwt = require('jsonwebtoken');
const AsistenteDeToken = require("./AsistenteDeToken");
const { Types } = require("mongoose");
const { length } = require("body-parser");

function Autorizar(roles, permitirActualizacionPropia) {
    return (req, res, next) => {
        const token = AsistenteDeToken.ExtraerToken(req)

        if (token == null) return res.sendStatus(401).json({
            error: 'No se encontro el token'
        }); // Unauthorized

        jwt.verify(token, FirmaDeElToken, (err, user) => {
            if (err) return res.sendStatus(403); // Forbidden

            let TieneElRolAdecuado = roles.includes(user.rol)

            if (TieneElRolAdecuado) {
                req.user = user;
                console.log("Rol correcto");
                
                next();
            } else {
                const ParamsUserId = req.params.id;

                let EsElMismoUsuario = user.userId === ParamsUserId
                let Continuar = permitirActualizacionPropia && EsElMismoUsuario
                console.log(`Es El Mismo Usuario: ${EsElMismoUsuario}`);
                console.log(`userId: ${user.userId}`);
                console.log(`ParamsUserId: ${ParamsUserId}`);

                if (Continuar) {
                    req.user = user;

                    next();
                } else {
                    return res.status(403).json({ error: 'No tienes el rol para realizar esta acción' });
                }
            }
        });


    };
}

module.exports = Autorizar;