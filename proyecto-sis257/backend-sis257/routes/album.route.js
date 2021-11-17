const express = require("express");
const router = express.Router();
const album = require("../controllers/album.controller");
const { authenticateToken } = require("../controllers/jwt.controller");

router.post("/", authenticateToken, album.create);

router.get("/", authenticateToken, album.findAll);

router.get("/:albumId", authenticateToken, album.findOne);

router.put("/:albumId", authenticateToken, album.update);

router.delete("/:albumId", authenticateToken, album.delete);

router.delete("/", authenticateToken, album.deleteAll);

module.exports = router;
