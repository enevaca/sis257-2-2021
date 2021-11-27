var express = require('express');
var router = express.Router();
const { withJWTAuthMiddleware } = require("express-kun");

const { generateAccessToken } = require("../controllers/jwt.controller");
const usuario = require("../controllers/usuario.controller");
const { SECRET_TOKEN } = require("../config/config");
const protectedRouter = withJWTAuthMiddleware(router, SECRET_TOKEN);

router.post("/login", generateAccessToken);

protectedRouter.post("/", usuario.create);

protectedRouter.get("/", usuario.findAll);

protectedRouter.get("/:usuarioId", usuario.findOne);

router.get("/:usuario/:clave", usuario.findValidate);

protectedRouter.put("/:usuarioId", usuario.update);

protectedRouter.delete("/:usuarioId", usuario.delete);

protectedRouter.delete("/", usuario.deleteAll);

module.exports = router;
