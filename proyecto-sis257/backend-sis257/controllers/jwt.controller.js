const jwt = require("jsonwebtoken");
const { SECRET_TOKEN } = require("../config/config");

exports.generateAccessToken = (req, res) => {
  if (req.body.usuario == "nvaca" && req.body.clave == "HolaMundo123.") {
    const payload = {
      username: req.body.usuario,
      check: true,
    };

    const token = jwt.sign(payload, SECRET_TOKEN, {
      expiresIn: "30m",
    });

    res.send({
      message: "Autenticación correcta",
      token: token,
    });
  } else {
    res.status(401).send({ message: "Usuario o contraseña incorrectos" });
  }
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
