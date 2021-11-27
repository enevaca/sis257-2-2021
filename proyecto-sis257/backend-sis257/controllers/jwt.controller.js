const jwt = require("jsonwebtoken");
const { SECRET_KEY, SECRET_TOKEN } = require("../config/config");
const usuario = require("../models/usuario.model");

exports.generateAccessToken = (req, res) => {
  const clave = require("crypto").createHmac("sha256", SECRET_KEY).update(req.body.clave).digest("hex");
  var auth = usuario.findByUserPass(req.body.usuario, clave, (err, data) => {
    if(err) {
      res.status(500).send({
        message: `Error al requerir el usuario ${req.params.usuario}`,
      });
    }
    else {
      if (data !== null) {
        const payload = {
          username: req.body.usuario,
          check: true,
        };
    
        const token = jwt.sign(payload, SECRET_TOKEN, {
          expiresIn: "30m",
        });
    
        res.send({
          message: "Autenticación correcta",
          id: data.id,
          usuario: data.usuario,
          rol: data.rol,
          email: data.email,
          token: token,
        });
      } else {
        res.status(401).send({ message: "Usuario o contraseña incorrectos" });
      }
    }
  });
};

exports.authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).send({ message: "Token no proporcionada" });
  }

  jwt.verify(token, SECRET_TOKEN, (err, authData) => {
    if (err) {
      return res.status(403).send({ message: "Token inválido" });
    }

    req.authData = authData;
    next();
  });
};
