const express = require("express");
const router = express.Router();
const { withJWTAuthMiddleware } = require("express-kun");

const interprete = require("../controllers/interprete.controller");
const { authenticateToken } = require("../controllers/jwt.controller");
const { SECRET_TOKEN } = require("../config/config");
const protectedRouter = withJWTAuthMiddleware(router, SECRET_TOKEN);

protectedRouter.post("/", interprete.create);

protectedRouter.get("/", interprete.findAll);

protectedRouter.get("/:interpreteId", interprete.findOne);

protectedRouter.put("/:interpreteId", interprete.update);

protectedRouter.delete("/:interpreteId", interprete.delete);

protectedRouter.delete("/", interprete.deleteAll);

module.exports = router;