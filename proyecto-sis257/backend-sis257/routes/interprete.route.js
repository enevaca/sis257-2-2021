const express = require("express");
const router = express.Router();
const interprete = require("../controllers/interprete.controller");

router.post("/", interprete.create);

router.get("/", interprete.findAll);

router.get("/:interpreteId", interprete.findOne);

router.put("/:interpreteId", interprete.update);

router.delete("/:interpreteId", interprete.delete);

router.delete("/", interprete.deleteAll);

module.exports = router;