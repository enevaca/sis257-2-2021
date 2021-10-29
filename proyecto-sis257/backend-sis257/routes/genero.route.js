const express = require("express");
const router = express.Router();
const genero = require("../controllers/genero.controller");

router.post("/", genero.create);

router.get("/", genero.findAll);

router.get("/:generoId", genero.findOne);

router.put("/:generoId", genero.update);

router.delete("/:generoId", genero.delete);

router.delete("/", genero.deleteAll);

module.exports = router;
