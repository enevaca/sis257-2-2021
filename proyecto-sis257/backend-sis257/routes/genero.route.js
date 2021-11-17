const express = require("express");
const router = express.Router();
const genero = require("../controllers/genero.controller");
const { authenticateToken } = require("../controllers/jwt.controller");

router.post("/", authenticateToken, genero.create);

router.get("/", authenticateToken, genero.findAll);

router.get("/:generoId", authenticateToken, genero.findOne);

router.put("/:generoId", authenticateToken, genero.update);

router.delete("/:generoId", authenticateToken, genero.delete);

router.delete("/", authenticateToken, genero.deleteAll);

module.exports = router;
