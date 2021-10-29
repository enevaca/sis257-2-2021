const express = require("express");
const router = express.Router();
const album = require("../controllers/album.controller");

router.post("/", album.create);

router.get("/", album.findAll);

router.get("/:albumId", album.findOne);

router.put("/:albumId", album.update);

router.delete("/:albumId", album.delete);

router.delete("/", album.deleteAll);

module.exports = router;
